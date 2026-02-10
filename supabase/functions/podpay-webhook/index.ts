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
    
    console.log('📥 Webhook received at', new Date().toISOString());
    console.log('📦 Payload:', JSON.stringify(body, null, 2));
 
    // Podpay sends transaction updates - data can be in body directly or in body.data
    const transactionData = body.data || body;
    const id = transactionData.id;
    const status = transactionData.status;
    const paidAt = transactionData.paidAt;
 
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
 
     console.log('✅ Order updated in database:', data);
 
     // Send server-side events if payment was confirmed
     if (status === 'paid' && data && data.length > 0) {
       const order = data[0];
       await Promise.all([
         sendTikTokEvent(order as OrderData),
         sendMetaEvent(order as OrderData),
         sendUtmifyEvent(order as OrderData, 'paid'),
         sendPaymentConfirmationEmail(order as OrderData),
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
      console.warn('⚠️ TikTok access token not configured, skipping event');
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
      event_id: `purchase_${order.transaction_id}`, // Same format as client-side for deduplication
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

    console.log('📤 Sending TikTok server event for order:', order.transaction_id);

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        pixel_code: pixelId,
        event: 'CompletePayment',
        event_id: `purchase_${order.transaction_id}`, // Same format as client-side for deduplication
        timestamp: new Date().toISOString(),
        context: eventPayload.context,
        properties: eventPayload.properties,
      }),
    });

    const result = await response.json();
    
    if (response.ok && result.code === 0) {
      console.log('✅ TikTok event sent successfully for order:', order.transaction_id);
    } else {
      console.error('❌ TikTok API error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Error sending TikTok event:', error);
    // Don't throw - this is non-critical
  }
}

async function sendMetaEvent(order: OrderData) {
  try {
    const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
    if (!META_ACCESS_TOKEN) {
      console.warn('⚠️ Meta access token not configured, skipping event');
      return;
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('⚠️ Supabase credentials not configured for idempotency check');
      return;
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // IDEMPOTENCY CHECK: Check if event already sent by browser-side CAPI
    const { data: existingEvent } = await supabase
      .from('meta_events')
      .select('id, sent_at')
      .eq('order_id', order.transaction_id)
      .maybeSingle();

    if (existingEvent) {
      console.log('⚠️ Meta event already sent by browser for order:', order.transaction_id, 'at:', existingEvent.sent_at);
      return; // Skip - browser already sent this event
    }

    const pixelId = '1198424312101245';
    
    // Hash email and phone for privacy (required by Meta)
    const email = order.customer_email;
    const phone = order.customer_phone?.replace(/\D/g, '');
    
    const encoder = new TextEncoder();
    const emailHash = email ? await crypto.subtle.digest('SHA-256', encoder.encode(email.toLowerCase().trim())).then(buf => 
      Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    ) : undefined;
    const phoneHash = phone ? await crypto.subtle.digest('SHA-256', encoder.encode(`55${phone}`)).then(buf =>
      Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    ) : undefined;

    const eventTime = Math.floor(Date.now() / 1000);
    const eventId = `webhook_${order.transaction_id}_${eventTime}`;

    const eventData = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: eventId,
          action_source: 'website',
          user_data: {
            em: emailHash ? [emailHash] : undefined,
            ph: phoneHash ? [phoneHash] : undefined,
            country: ['br'],
          },
          custom_data: {
            value: order.amount / 100, // Convert from cents
            currency: 'BRL',
            content_ids: ['kit-sos-crescimento'],
            content_name: order.product_name,
            content_type: 'product',
            order_id: order.transaction_id,
            num_items: 1,
          },
        },
      ],
    };

    console.log('📤 Sending Meta server event (webhook fallback) for order:', order.transaction_id);

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${META_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    
    if (response.ok) {
      // Record event for idempotency (prevent future duplicates)
      await supabase
        .from('meta_events')
        .insert({
          order_id: order.transaction_id,
          event_id: eventId,
          event_name: 'Purchase',
          event_time: eventTime,
          value: order.amount / 100,
          currency: 'BRL',
          email_hash: emailHash || null,
          phone_hash: phoneHash || null,
          api_response: result,
        });

      console.log('✅ Meta event sent successfully (webhook) for order:', order.transaction_id, result);
    } else {
      console.error('❌ Meta API error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Error sending Meta event:', error);
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

async function sendPaymentConfirmationEmail(order: OrderData) {
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('⚠️ Supabase credentials not configured for email sending');
      return;
    }

    // Get full order details from database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: fullOrder, error } = await supabase
      .from('orders')
      .select('*')
      .eq('transaction_id', order.transaction_id)
      .single();

    if (error || !fullOrder) {
      console.error('Error fetching order details for email:', error);
      return;
    }

    const emailPayload = {
      customerName: fullOrder.customer_name,
      customerEmail: fullOrder.customer_email,
      amount: fullOrder.amount,
      transactionId: fullOrder.transaction_id,
      productName: fullOrder.product_name,
      shippingAddress: fullOrder.shipping_address,
      shippingNumber: fullOrder.shipping_number,
      shippingComplement: fullOrder.shipping_complement,
      shippingNeighborhood: fullOrder.shipping_neighborhood,
      shippingCity: fullOrder.shipping_city,
      shippingState: fullOrder.shipping_state,
      shippingCep: fullOrder.shipping_cep,
    };

    console.log('📤 Sending payment confirmation email for order:', order.transaction_id);

    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-payment-confirmation-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Payment confirmation email sent successfully for order:', order.transaction_id);
    } else {
      console.error('❌ Payment confirmation email error:', result);
    }
  } catch (error) {
    console.error('❌ Error sending payment confirmation email:', error);
    // Don't throw - this is non-critical
  }
}