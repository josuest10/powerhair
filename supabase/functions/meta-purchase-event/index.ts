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
  // User data for Advanced Matching
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  // Meta cookies
  fbp?: string;
  fbc?: string;
  client_user_agent?: string;
  event_source_url?: string;
  test_event_code?: string;
}

/**
 * Remove accents and diacritics from a string
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalize a generic string for Meta: trim, lowercase, remove accents
 */
function normalizeString(value: string | undefined | null): string | null {
  if (!value || value.trim() === '') return null;
  return removeAccents(value.trim().toLowerCase());
}

/**
 * Normalize name fields for Meta: trim + lowercase, KEEP accents (Meta preserves UTF-8)
 * Per Meta docs: "Valéry" → "valéry" (accents kept)
 */
function normalizeName(value: string | undefined | null): string | null {
  if (!value || value.trim() === '') return null;
  return value.trim().toLowerCase();
}

/**
 * Normalize city for Meta: trim, lowercase, remove accents AND spaces
 * Per Meta docs: "newyork", "saopaulo" (no spaces, no special chars)
 */
function normalizeCity(value: string | undefined | null): string | null {
  if (!value || value.trim() === '') return null;
  return removeAccents(value.trim().toLowerCase()).replace(/\s+/g, '');
}

/**
 * Normalize phone number: digits only with Brazil country code
 */
function normalizePhone(phone: string | undefined | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return null;
  // Add Brazil country code if not present
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  // If already has country code or other format, return as is
  return digits;
}

/**
 * Normalize zip code: digits only
 */
function normalizeZipCode(zip: string | undefined | null): string | null {
  if (!zip) return null;
  const digits = zip.replace(/\D/g, '');
  return digits.length > 0 ? digits : null;
}

/**
 * SHA256 hash function for user data
 */
async function sha256Hash(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash a normalized value if it exists
 */
async function hashIfPresent(value: string | null): Promise<string | undefined> {
  if (!value) return undefined;
  return await sha256Hash(value);
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
      has_first_name: !!body.first_name,
      has_last_name: !!body.last_name,
      has_city: !!body.city,
      has_state: !!body.state,
      has_zip: !!body.zip_code,
      client_ip: clientIp ? 'present' : 'missing',
      user_agent: userAgent ? 'present' : 'missing',
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

    // ENRICHMENT: If email/phone missing from browser request, look up from orders table
    let enrichedEmail = body.email;
    let enrichedPhone = body.phone;
    let enrichedFirstName = body.first_name;
    let enrichedLastName = body.last_name;
    let enrichedCity = body.city;
    let enrichedState = body.state;
    let enrichedZipCode = body.zip_code;

    if (!enrichedEmail || !enrichedPhone) {
      console.log('📥 Browser missing user data, enriching from orders table...');
      const { data: orderData } = await supabase
        .from('orders')
        .select('customer_email, customer_phone, customer_name, shipping_city, shipping_state, shipping_cep')
        .eq('transaction_id', body.order_id)
        .maybeSingle();

      if (orderData) {
        if (!enrichedEmail && orderData.customer_email) enrichedEmail = orderData.customer_email;
        if (!enrichedPhone && orderData.customer_phone) enrichedPhone = orderData.customer_phone;
        if (!enrichedFirstName && orderData.customer_name) {
          const parts = orderData.customer_name.trim().split(/\s+/);
          enrichedFirstName = parts[0];
          if (parts.length > 1) enrichedLastName = parts.slice(1).join(' ');
        }
        if (!enrichedCity && orderData.shipping_city) enrichedCity = orderData.shipping_city;
        if (!enrichedState && orderData.shipping_state) enrichedState = orderData.shipping_state;
        if (!enrichedZipCode && orderData.shipping_cep) enrichedZipCode = orderData.shipping_cep;
        
        console.log('✅ Enriched from orders table:', {
          email: !!enrichedEmail,
          phone: !!enrichedPhone,
          name: !!(enrichedFirstName || enrichedLastName),
          city: !!enrichedCity,
          state: !!enrichedState,
        });
      } else {
        console.log('⚠️ Order not found in DB for enrichment:', body.order_id);
      }
    }

    // Normalize all user data per Meta documentation
    const normalizedEmail = normalizeString(enrichedEmail);
    const normalizedPhone = normalizePhone(enrichedPhone);
    const normalizedFirstName = normalizeName(enrichedFirstName);
    const normalizedLastName = normalizeName(enrichedLastName);
    const normalizedCity = normalizeCity(enrichedCity);
    const normalizedState = normalizeString(enrichedState);
    const normalizedZip = normalizeZipCode(enrichedZipCode);
    const normalizedCountry = normalizeString(body.country) || 'br';

    // Hash all user data fields
    const [emailHash, phoneHash, fnHash, lnHash, ctHash, stHash, zpHash, countryHash] = await Promise.all([
      hashIfPresent(normalizedEmail),
      hashIfPresent(normalizedPhone),
      hashIfPresent(normalizedFirstName),
      hashIfPresent(normalizedLastName),
      hashIfPresent(normalizedCity),
      hashIfPresent(normalizedState),
      hashIfPresent(normalizedZip),
      hashIfPresent(normalizedCountry),
    ]);

    // Build user_data object - only include non-empty fields
    const userData: Record<string, unknown> = {};
    
    if (emailHash) userData.em = [emailHash];
    if (phoneHash) userData.ph = [phoneHash];
    if (fnHash) userData.fn = [fnHash];
    if (lnHash) userData.ln = [lnHash];
    if (ctHash) userData.ct = [ctHash];
    if (stHash) userData.st = [stHash];
    if (zpHash) userData.zp = [zpHash];
    if (countryHash) userData.country = [countryHash];
    
    // Add browser IDs (not hashed - they're already unique identifiers)
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    
    // Add External ID (order_id) for improved matching - Meta recommends this
    const externalIdHash = await hashIfPresent(body.order_id);
    if (externalIdHash) userData.external_id = [externalIdHash];
    
    // Add IP and user agent for advanced matching
    if (clientIp) userData.client_ip_address = clientIp;
    if (userAgent) userData.client_user_agent = userAgent;

    const eventTime = Math.floor(Date.now() / 1000);
    const pixelId = '1198424312101245';

    // Log normalized values for debugging (not hashes)
    console.log('📊 Normalized user_data fields:', {
      email: normalizedEmail ? '✓' : '✗',
      phone: normalizedPhone ? '✓' : '✗',
      first_name: normalizedFirstName ? '✓' : '✗',
      last_name: normalizedLastName ? '✓' : '✗',
      city: normalizedCity ? '✓' : '✗',
      state: normalizedState ? '✓' : '✗',
      zip_code: normalizedZip ? '✓' : '✗',
      country: normalizedCountry ? '✓' : '✗',
      fbp: body.fbp ? '✓' : '✗',
      fbc: body.fbc ? '✓' : '✗',
      client_ip: clientIp ? '✓' : '✗',
      client_user_agent: userAgent ? '✓' : '✗',
    });

    // Build the event payload
    const eventPayload: Record<string, unknown> = {
      data: [
        {
          event_name: 'Purchase',
          event_time: eventTime,
          event_id: body.event_id,
          action_source: 'website',
          event_source_url: body.event_source_url || 'https://powerhair.lovable.app/obrigado',
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
      console.log('🧪 TEST MODE enabled with code:', body.test_event_code);
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
        email_hash: emailHash || null,
        phone_hash: phoneHash || null,
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
        fbtrace_id: result.fbtrace_id,
        user_data_fields: Object.keys(userData).length,
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
