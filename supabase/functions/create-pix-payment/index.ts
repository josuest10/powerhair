import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  amount: number;
  customer: {
    name: string;
    email: string;
    document: string;
    phone: string;
  };
  items: {
    name: string;
    description: string;
    quantity: number;
    amount: number;
  }[];
  shipping: {
    name: string;
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingParameters?: {
    utm_source: string | null;
    utm_campaign: string | null;
    utm_medium: string | null;
    utm_content: string | null;
    utm_term: string | null;
    src: string | null;
    sck: string | null;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BESTFY_SECRET_KEY = Deno.env.get('BESTFY_SECRET_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!BESTFY_SECRET_KEY) {
      throw new Error('BESTFY_SECRET_KEY is not configured');
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials are not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body: PaymentRequest = await req.json();

    // Validate required fields
    if (!body.amount || body.amount <= 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Amount is required and must be positive' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!body.customer?.name || !body.customer?.email || !body.customer?.document) {
      return new Response(
        JSON.stringify({ success: false, error: 'Customer data is incomplete' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Bestfy uses Basic Auth: base64(SECRET_KEY:x)
    const auth = 'Basic ' + btoa(BESTFY_SECRET_KEY + ':x');

    // Format phone number (remove non-digits)
    const phoneDigits = body.customer.phone.replace(/\D/g, '');

    // Get the project URL for webhook
    const projectId = SUPABASE_URL.match(/https:\/\/([^.]+)\./)?.[1] || '';
    const webhookUrl = `https://${projectId}.supabase.co/functions/v1/podpay-webhook`;

    // Build Bestfy payload
    const payload = {
      amount: body.amount, // Already in cents
      paymentMethod: 'pix',
      pix: {
        expiresInMinutes: 30,
      },
      postbackUrl: webhookUrl,
      items: body.items.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unitPrice: item.amount,
        externalRef: 'kit-sos-crescimento',
      })),
      shipping: {
        street: body.shipping.address,
        streetNumber: body.shipping.number,
        complement: body.shipping.complement || '',
        neighborhood: body.shipping.neighborhood,
        city: body.shipping.city,
        state: body.shipping.state,
        zipCode: body.shipping.zipCode.replace(/\D/g, ''),
      },
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        phone: phoneDigits,
        document: body.customer.document.replace(/\D/g, ''),
      },
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined,
      traceable: true,
    };

    console.log('Sending payment request to Bestfy:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.bestfybr.com.br/v1/transactions', {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('Bestfy response status:', response.status, 'body:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Bestfy returned non-JSON response:', responseText);
      return new Response(
        JSON.stringify({ success: false, error: `Bestfy error (${response.status}): ${responseText}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      console.error('Bestfy error:', data);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.message || 'Payment creation failed',
          details: data
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save order to database
    const transactionId = data.id?.toString() || data.data?.id?.toString();
    
    const { error: insertError } = await supabase
      .from('orders')
      .insert({
        transaction_id: transactionId,
        status: data.status || 'waiting_payment',
        amount: body.amount,
        customer_name: body.customer.name,
        customer_email: body.customer.email,
        customer_cpf: body.customer.document,
        customer_phone: body.customer.phone,
        shipping_address: body.shipping.address,
        shipping_number: body.shipping.number,
        shipping_complement: body.shipping.complement || null,
        shipping_neighborhood: body.shipping.neighborhood,
        shipping_city: body.shipping.city,
        shipping_state: body.shipping.state,
        shipping_cep: body.shipping.zipCode,
        product_name: body.items[0]?.name || 'Produto',
        utm_source: body.trackingParameters?.utm_source || null,
        utm_campaign: body.trackingParameters?.utm_campaign || null,
        utm_medium: body.trackingParameters?.utm_medium || null,
        utm_content: body.trackingParameters?.utm_content || null,
        utm_term: body.trackingParameters?.utm_term || null,
        src: body.trackingParameters?.src || null,
        sck: body.trackingParameters?.sck || null,
      });

    if (insertError) {
      console.error('Error saving order:', insertError);
    }

    // Extract PIX data from Bestfy response
    const pixQrCode = data.pix?.qrcode || data.data?.pix?.qrcode || '';
    const pixExpirationDate = data.pix?.expirationDate || data.data?.pix?.expirationDate;
    const pixQrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(pixQrCode)}`;

    // Send PIX email (non-blocking)
    try {
      const emailPayload = {
        customerName: body.customer.name,
        customerEmail: body.customer.email,
        customerPhone: body.customer.phone,
        customerCpf: body.customer.document,
        amount: body.amount,
        pixCode: pixQrCode,
        pixQrCodeUrl: pixQrCodeUrl,
        transactionId: transactionId,
        productName: body.items[0]?.name || 'Kit SOS Crescimento e Antiqueda',
        quantity: body.items[0]?.quantity || 1,
        shipping: {
          address: body.shipping.address,
          number: body.shipping.number,
          complement: body.shipping.complement || '',
          neighborhood: body.shipping.neighborhood,
          city: body.shipping.city,
          state: body.shipping.state,
          cep: body.shipping.zipCode,
        },
        expiresAt: pixExpirationDate,
      };

      // Fire and forget - email
      fetch(`${SUPABASE_URL}/functions/v1/send-pix-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      }).then(res => res.json()).then(result => {
        console.log('Order confirmation email sent:', result);
      }).catch(err => {
        console.error('Error sending order email:', err);
      });

      // Fire and forget - WhatsApp
      fetch(`${SUPABASE_URL}/functions/v1/send-whatsapp-pix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          customerPhone: body.customer.phone,
          customerName: body.customer.name,
          pixCode: pixQrCode,
          amount: body.amount,
          transactionId: transactionId,
          productName: body.items[0]?.name || 'Kit SOS Crescimento e Antiqueda',
          expiresAt: pixExpirationDate,
        }),
      }).then(res => res.json()).then(result => {
        console.log('WhatsApp PIX notification sent:', result);
      }).catch(err => {
        console.error('Error sending WhatsApp notification:', err);
      });
    } catch (emailError) {
      console.error('Error preparing order email:', emailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: transactionId,
        status: data.status || 'waiting_payment',
        pix: {
          qrCode: pixQrCode,
          qrCodeImage: pixQrCodeUrl,
          expiresAt: pixExpirationDate,
        },
        amount: data.amount,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating PIX payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
