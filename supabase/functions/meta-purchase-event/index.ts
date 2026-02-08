import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface PurchaseEventRequest {
  order_id: string;
  event_id: string;
  value: number;
  currency?: string;
  email?: string;
  phone?: string;
  fbp?: string;  // _fbp cookie
  fbc?: string;  // _fbc cookie
  client_user_agent?: string;
  test_event_code?: string; // For Meta Events Manager test mode
}

// SHA256 hash function for user data
async function sha256Hash(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Normalize phone number for Brazil
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  // Add Brazil country code if not present
  if (digits.length === 11 || digits.length === 10) {
    return `55${digits}`;
  }
  return digits;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }

    if (!META_ACCESS_TOKEN) {
      console.error('❌ META_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Meta access token not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body: PurchaseEventRequest = await req.json();

    // Get client IP from request headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('x-real-ip') 
      || req.headers.get('cf-connecting-ip')
      || null;

    // Get user agent from request or body
    const userAgent = body.client_user_agent || req.headers.get('user-agent') || null;

    console.log('📥 Meta Purchase Event request:', {
      order_id: body.order_id,
      event_id: body.event_id,
      value: body.value,
      has_fbp: !!body.fbp,
      has_fbc: !!body.fbc,
      has_email: !!body.email,
      has_phone: !!body.phone,
      test_mode: !!body.test_event_code,
    });

    // IDEMPOTENCY CHECK: Check if event already sent for this order
    const { data: existingEvent, error: checkError } = await supabase
      .from('meta_events')
      .select('id, sent_at')
      .eq('order_id', body.order_id)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing event:', checkError);
    }

    if (existingEvent) {
      console.log('⚠️ Event already sent for order:', body.order_id, 'at:', existingEvent.sent_at);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Event already sent (idempotency)',
          sent_at: existingEvent.sent_at 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare user data with hashing
    const userData: Record<string, unknown> = {
      country: ['br'],
    };

    // Hash email if provided
    let emailHash: string | null = null;
    if (body.email) {
      emailHash = await sha256Hash(body.email);
      userData.em = [emailHash];
    }

    // Hash phone if provided
    let phoneHash: string | null = null;
    if (body.phone) {
      const normalizedPhone = normalizePhone(body.phone);
      phoneHash = await sha256Hash(normalizedPhone);
      userData.ph = [phoneHash];
    }

    // Add browser IDs (not hashed - they're already unique identifiers)
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    // Add IP and user agent for advanced matching
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;

    const eventTime = Math.floor(Date.now() / 1000);
    const pixelId = '1198424312101245';

    // Build the event payload
    const eventPayload: Record<string, unknown> = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: body.event_id, // Same as browser for deduplication
          action_source: 'website',
          user_data: userData,
          custom_data: {
            value: body.value,
            currency: body.currency || 'BRL',
            content_ids: ['kit-sos-crescimento'],
            content_name: 'Kit SOS Crescimento e Antiqueda',
            content_type: 'product',
            order_id: body.order_id,
            num_items: 1,
          },
        },
      ],
    };

    // Add test event code if in test mode
    if (body.test_event_code) {
      eventPayload.test_event_code = body.test_event_code;
    }

    console.log('📤 Sending Meta CAPI event:', JSON.stringify(eventPayload, null, 2));

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${META_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      }
    );

    const result = await response.json();

    // Record the event for idempotency
    const { error: insertError } = await supabase
      .from('meta_events')
      .insert({
        order_id: body.order_id,
        event_id: body.event_id,
        event_name: 'Purchase',
        event_time: eventTime,
        value: body.value,
        currency: body.currency || 'BRL',
        fbc: body.fbc || null,
        fbp: body.fbp || null,
        client_ip: clientIp,
        client_user_agent: userAgent,
        email_hash: emailHash,
        phone_hash: phoneHash,
        api_response: result,
        test_event_code: body.test_event_code || null,
      });

    if (insertError) {
      // If it's a unique constraint violation, the event was already sent (race condition)
      if (insertError.code === '23505') {
        console.log('⚠️ Race condition detected - event already recorded');
        return new Response(
          JSON.stringify({ success: true, message: 'Event already sent (race condition)' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      console.error('Error recording event:', insertError);
    }

    if (response.ok) {
      console.log('✅ Meta CAPI event sent successfully:', {
        order_id: body.order_id,
        event_id: body.event_id,
        events_received: result.events_received,
      });

      return new Response(
        JSON.stringify({ 
          success: true, 
          events_received: result.events_received,
          fbtrace_id: result.fbtrace_id,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.error('❌ Meta CAPI error:', JSON.stringify(result, null, 2));
      return new Response(
        JSON.stringify({ success: false, error: result }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('❌ Meta Purchase Event error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
