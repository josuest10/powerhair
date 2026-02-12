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
  shipping_city: string;
  shipping_state: string;
  shipping_cep: string;
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

    // Bestfy sends postback with transaction data (id, status, paidAt, etc.)
    // Also supports nested { data: { ... } } format for backwards compatibility
    const transactionData = body.data || body;
    const id = transactionData.id || body.objectId || body.id;
    const status = transactionData.status || body.status;
    const paidAt = transactionData.paidAt || body.paidAt;
 
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
           sendMetaEvent(order as OrderData),
           sendTikTokEvent(order as OrderData),
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

    // IDEMPOTENCY CHECK: Check if event already sent (by browser or previous webhook)
    const { data: existingEvent } = await supabase
      .from('meta_events')
      .select('id, sent_at, email_hash')
      .eq('order_id', order.transaction_id)
      .maybeSingle();

    if (existingEvent) {
      console.log('⚠️ Meta event already sent for order:', order.transaction_id, 'at:', existingEvent.sent_at);
      return;
    }

    const pixelId = '1198424312101245';
    const encoder = new TextEncoder();
    
    // Helper to SHA-256 hash
    const sha256 = async (value: string): Promise<string> => {
      const buf = await crypto.subtle.digest('SHA-256', encoder.encode(value));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    // Remove accents helper
    const removeAccents = (str: string): string => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Normalize and hash ALL user data from order (guaranteed to have email/phone/name/address)
    const email = order.customer_email?.trim().toLowerCase();
    const phone = order.customer_phone?.replace(/\D/g, '');
    const phoneWithCountry = phone ? (phone.length === 10 || phone.length === 11 ? `55${phone}` : phone) : null;
    
    // Parse name into first/last (keep accents per Meta docs)
    const nameParts = order.customer_name?.trim().split(/\s+/) || [];
    const firstName = nameParts[0]?.toLowerCase() || null;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ').toLowerCase() : null;
    
    // City: remove accents AND spaces per Meta docs ("saopaulo")
    const city = order.shipping_city ? removeAccents(order.shipping_city.trim().toLowerCase()).replace(/\s+/g, '') : null;
    // State: 2-char lowercase
    const state = order.shipping_state?.trim().toLowerCase() || null;
    // ZIP: digits only
    const zip = order.shipping_cep?.replace(/\D/g, '') || null;

    // Hash all fields
    const [emailHash, phoneHash, fnHash, lnHash, ctHash, stHash, zpHash, countryHash, externalIdHash] = await Promise.all([
      email ? sha256(email) : Promise.resolve(null),
      phoneWithCountry ? sha256(phoneWithCountry) : Promise.resolve(null),
      firstName ? sha256(firstName) : Promise.resolve(null),
      lastName ? sha256(lastName) : Promise.resolve(null),
      city ? sha256(city) : Promise.resolve(null),
      state ? sha256(state) : Promise.resolve(null),
      zip ? sha256(zip) : Promise.resolve(null),
      sha256('br'),
      sha256(order.transaction_id),
    ]);

    const eventTime = Math.floor(Date.now() / 1000);
    // CRITICAL: Use same event_id format as browser pixel for deduplication
    const eventId = `purchase_${order.transaction_id}`;

    // Build user_data with ALL available fields
    const userData: Record<string, unknown> = {};
    if (emailHash) userData.em = [emailHash];
    if (phoneHash) userData.ph = [phoneHash];
    if (fnHash) userData.fn = [fnHash];
    if (lnHash) userData.ln = [lnHash];
    if (ctHash) userData.ct = [ctHash];
    if (stHash) userData.st = [stHash];
    if (zpHash) userData.zp = [zpHash];
    if (countryHash) userData.country = [countryHash];
    if (externalIdHash) userData.external_id = [externalIdHash];

    console.log('📊 Webhook Meta CAPI - user_data fields:', {
      email: email ? '✓' : '✗',
      phone: phoneWithCountry ? '✓' : '✗',
      first_name: firstName ? '✓' : '✗',
      last_name: lastName ? '✓' : '✗',
      city: city ? '✓' : '✗',
      state: state ? '✓' : '✗',
      zip: zip ? '✓' : '✗',
      country: '✓',
      external_id: '✓',
      event_id: eventId,
    });

    const eventData = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: eventId,
          action_source: 'website',
          event_source_url: 'https://powerhair.lovable.app/obrigado',
          user_data: userData,
          custom_data: {
            value: order.amount / 100,
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

    console.log('📤 Sending Meta CAPI event (webhook) for order:', order.transaction_id);

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${META_ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    
    if (response.ok) {
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

      console.log('✅ Meta CAPI event sent (webhook) with FULL user data:', {
        order_id: order.transaction_id,
        event_id: eventId,
        events_received: result.events_received,
        user_data_fields: Object.keys(userData).length,
      });
    } else {
      console.error('❌ Meta API error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Error sending Meta event:', error);
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

async function sendTikTokEvent(order: OrderData) {
  try {
    const TIKTOK_ACCESS_TOKEN = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    if (!TIKTOK_ACCESS_TOKEN) {
      console.log('⚠️ TikTok access token not configured, skipping event');
      return;
    }

    const pixelId = 'D66JST3C77U7RUMK7J0G';
    const encoder = new TextEncoder();

    const sha256 = async (value: string): Promise<string> => {
      const buf = await crypto.subtle.digest('SHA-256', encoder.encode(value));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const email = order.customer_email?.trim().toLowerCase();
    const phone = order.customer_phone?.replace(/\D/g, '');
    const phoneWithCountry = phone ? (phone.length === 10 || phone.length === 11 ? `+55${phone}` : `+${phone}`) : null;

    const [emailHash, phoneHash] = await Promise.all([
      email ? sha256(email) : Promise.resolve(null),
      phoneWithCountry ? sha256(phoneWithCountry) : Promise.resolve(null),
    ]);

    const eventData = {
      pixel_code: pixelId,
      event: 'CompletePayment',
      event_id: `tiktok_purchase_${order.transaction_id}`,
      timestamp: new Date().toISOString(),
      context: {
        page: {
          url: 'https://powerhair.lovable.app/obrigado',
        },
        user: {
          ...(emailHash && { email: emailHash }),
          ...(phoneHash && { phone: phoneHash }),
        },
      },
      properties: {
        contents: [
          {
            content_id: 'kit-sos-crescimento',
            content_name: order.product_name,
            content_type: 'product',
            quantity: 1,
            price: order.amount / 100,
          },
        ],
        value: order.amount / 100,
        currency: 'BRL',
        order_id: order.transaction_id,
      },
    };

    console.log('📤 Sending TikTok Events API for order:', order.transaction_id);

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify({ data: [eventData] }),
    });

    const result = await response.json();

    if (response.ok && result.code === 0) {
      console.log('✅ TikTok Events API sent for order:', order.transaction_id);
    } else {
      console.error('❌ TikTok Events API error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Error sending TikTok event:', error);
  }
}