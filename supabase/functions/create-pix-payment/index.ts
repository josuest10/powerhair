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
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const PODPAY_PUBLIC_KEY = Deno.env.get('PODPAY_PUBLIC_KEY');
     const PODPAY_SECRET_KEY = Deno.env.get('PODPAY_SECRET_KEY');
     const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
     const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 
     if (!PODPAY_PUBLIC_KEY) {
       throw new Error('PODPAY_PUBLIC_KEY is not configured');
     }
     if (!PODPAY_SECRET_KEY) {
       throw new Error('PODPAY_SECRET_KEY is not configured');
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
 
     // Create Basic Auth header
     const auth = 'Basic ' + btoa(`${PODPAY_PUBLIC_KEY}:${PODPAY_SECRET_KEY}`);
 
     // Format phone number (remove non-digits)
     const phoneDigits = body.customer.phone.replace(/\D/g, '');
     const phoneAreaCode = phoneDigits.substring(0, 2);
     const phoneNumber = phoneDigits.substring(2);
 
     // Get the project URL for webhook
     const projectId = SUPABASE_URL.match(/https:\/\/([^.]+)\./)?.[1] || '';
     const webhookUrl = `https://${projectId}.supabase.co/functions/v1/podpay-webhook`;
 
     // Build Podpay payload
     const payload = {
       amount: body.amount, // Already in cents
       paymentMethod: 'pix',
       pix: {
         expiresIn: 1800, // 30 minutes
       },
       postbackUrl: webhookUrl,
       items: body.items.map(item => ({
         title: item.name,
         quantity: item.quantity,
         unitPrice: item.amount,
         tangible: true,
       })),
       shipping: {
         name: body.shipping.name,
         country: 'BR',
         state: body.shipping.state,
         city: body.shipping.city,
         zipCode: body.shipping.zipCode.replace(/\D/g, ''),
         neighborhood: body.shipping.neighborhood,
         street: body.shipping.address,
         number: body.shipping.number,
         complement: body.shipping.complement || '',
         fee: 0, // Free shipping
       },
       customer: {
         name: body.customer.name,
         email: body.customer.email,
         document: {
           type: 'cpf',
           number: body.customer.document.replace(/\D/g, ''),
         },
         phone: phoneDigits,
       },
     };
 
     console.log('Sending payment request to Podpay:', JSON.stringify(payload, null, 2));
 
     const response = await fetch('https://api.podpay.pro/v1/transactions', {
       method: 'POST',
       headers: {
         'Authorization': auth,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(payload),
     });
 
     const data = await response.json();
 
     console.log('Podpay response:', JSON.stringify(data, null, 2));
 
     if (!response.ok) {
       console.error('Podpay error:', data);
       return new Response(
         JSON.stringify({ 
           success: false, 
           error: data.message || 'Payment creation failed',
           details: data
         }),
         { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Return successful response with PIX data
     // Save order to database
     const { error: insertError } = await supabase
       .from('orders')
       .insert({
         transaction_id: data.id.toString(),
         status: data.status,
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
       // Don't fail the payment, just log the error
     }
 
     return new Response(
       JSON.stringify({
         success: true,
         transactionId: data.id,
         status: data.status,
         pix: {
           qrCode: data.pix?.qrcode,
           qrCodeImage: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(data.pix?.qrcode || '')}`,
           expiresAt: data.pix?.expirationDate,
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