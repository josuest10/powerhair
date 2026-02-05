 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
interface OrderData {
  id: string;
  transaction_id: string;
  status: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  customer_cpf: string;
  customer_phone: string;
  product_name: string;
  created_at: string;
  paid_at: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  utm_term: string | null;
  src: string | null;
  sck: string | null;
}

 serve(async (req) => {
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
     const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 
     if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
       throw new Error('Supabase credentials are not configured');
     }
 
     const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
 
     const body = await req.json();
     
     console.log('Webhook received:', JSON.stringify(body, null, 2));
 
     // Podpay sends transaction updates
     const { id, status, paidAt, paidAmount } = body;
 
     if (!id) {
       return new Response(
         JSON.stringify({ success: false, error: 'Transaction ID is required' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Update order status in database
     const updateData: Record<string, unknown> = {
       status: status,
     };
 
     if (status === 'paid' && paidAt) {
       updateData.paid_at = paidAt;
     }
 
     const { data, error } = await supabase
       .from('orders')
       .update(updateData)
       .eq('transaction_id', id.toString())
       .select();
 
     if (error) {
       console.error('Error updating order:', error);
       return new Response(
         JSON.stringify({ success: false, error: 'Failed to update order' }),
         { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     console.log('Order updated:', data);
 
    // Send server-side event to TikTok if payment was confirmed
    if (status === 'paid' && data && data.length > 0) {
      const order = data[0];
     await Promise.all([
       sendTikTokEvent(order as OrderData),
       sendUtmifyEvent(order as OrderData, 'paid'),
     ]);
   }

   // Send waiting_payment event to UTMify for PIX generated
   if (status === 'waiting_payment' && data && data.length > 0) {
     const order = data[0];
     await sendUtmifyEvent(order as OrderData, 'waiting_payment');
    }
 
     return new Response(
       JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   } catch (error) {
     console.error('Webhook error:', error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });
 
async function sendTikTokEvent(order: OrderData) {
   try {
     const TIKTOK_ACCESS_TOKEN = Deno.env.get('TIKTOK_ACCESS_TOKEN');
     if (!TIKTOK_ACCESS_TOKEN) {
       console.log('TikTok access token not configured, skipping event');
       return;
     }
 
     const pixelId = 'D61CDMRC77UAR2VU6H60';
     
     // Hash email and phone for privacy
    const email = order.customer_email;
    const phone = order.customer_phone?.replace(/\D/g, '');
     
     const encoder = new TextEncoder();
     const emailHash = email ? await crypto.subtle.digest('SHA-256', encoder.encode(email.toLowerCase().trim())).then(buf => 
       Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
     ) : undefined;
     const phoneHash = phone ? await crypto.subtle.digest('SHA-256', encoder.encode(phone)).then(buf =>
       Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
     ) : undefined;
 
     const eventPayload = {
       pixel_code: pixelId,
       event: 'CompletePayment',
       event_id: order.transaction_id,
       timestamp: new Date().toISOString(),
       context: {
         user: {
           email: emailHash,
           phone: phoneHash,
         },
       },
       properties: {
        value: order.amount / 100, // Convert from cents
         currency: 'BRL',
         content_id: 'kit-sos-crescimento',
         content_name: order.product_name,
         content_type: 'product',
         order_id: order.transaction_id,
       },
     };
 
     console.log('Sending TikTok server event:', JSON.stringify(eventPayload, null, 2));
 
     const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Access-Token': TIKTOK_ACCESS_TOKEN,
       },
       body: JSON.stringify({
         pixel_code: pixelId,
         event: 'CompletePayment',
         event_id: order.transaction_id,
         timestamp: new Date().toISOString(),
         context: eventPayload.context,
         properties: eventPayload.properties,
       }),
     });
 
     const result = await response.json();
     console.log('TikTok API response:', JSON.stringify(result, null, 2));
   } catch (error) {
     console.error('Error sending TikTok event:', error);
     // Don't throw - this is non-critical
   }
 }

async function sendUtmifyEvent(order: OrderData, status: 'waiting_payment' | 'paid' | 'refunded' | 'chargedback') {
  try {
    const UTMIFY_API_TOKEN = Deno.env.get('UTMIFY_API_TOKEN');
    if (!UTMIFY_API_TOKEN) {
      console.log('UTMify API token not configured, skipping event');
      return;
    }

    const utmifyStatus = status === 'waiting_payment' ? 'waiting_payment' : status;

    const payload = {
      orderId: order.transaction_id,
      platform: 'PowerHair',
      paymentMethod: 'pix',
      status: utmifyStatus,
      createdAt: new Date(order.created_at).toISOString().replace('T', ' ').slice(0, 19),
      approvedDate: order.paid_at ? new Date(order.paid_at).toISOString().replace('T', ' ').slice(0, 19) : null,
      refundedAt: null,
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone?.replace(/\D/g, '') || null,
        document: order.customer_cpf?.replace(/\D/g, '') || null,
        country: 'BR',
      },
      products: [
        {
          id: 'kit-sos-crescimento',
          name: order.product_name,
          planId: null,
          planName: null,
          quantity: 1,
          priceInCents: order.amount,
        },
      ],
      trackingParameters: {
        src: order.src,
        sck: order.sck,
        utm_source: order.utm_source,
        utm_campaign: order.utm_campaign,
        utm_medium: order.utm_medium,
        utm_content: order.utm_content,
        utm_term: order.utm_term,
      },
      commission: {
        totalPriceInCents: order.amount,
        gatewayFeeInCents: 0,
        userCommissionInCents: order.amount,
        currency: 'BRL',
      },
    };

    console.log('Sending UTMify event:', JSON.stringify(payload, null, 2));

    const response = await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': UTMIFY_API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('UTMify API response:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error('UTMify API error:', result);
    }
  } catch (error) {
    console.error('Error sending UTMify event:', error);
    // Don't throw - this is non-critical
  }
}