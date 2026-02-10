// Meta (Facebook) Pixel helper functions
// Pixel ID: 1198424312101245

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
  }
}

/**
 * User data for Advanced Matching
 */
export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

/**
 * Generate a UUID v4 for event_id deduplication
 */
export function generateEventId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get Meta browser cookies for advanced matching
 */
export function getMetaCookies(): { fbp: string | null; fbc: string | null } {
  if (typeof document === 'undefined') {
    return { fbp: null, fbc: null };
  }

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbp: cookies['_fbp'] || null,
    fbc: cookies['_fbc'] || null,
  };
}

/**
 * Remove accents and diacritics from a string
 */
function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Normalize a string for Meta Advanced Matching: trim, lowercase, remove accents
 */
function normalizeForMeta(value: string | undefined | null): string | undefined {
  if (!value || value.trim() === '') return undefined;
  return removeAccents(value.trim().toLowerCase());
}

/**
 * Normalize phone number: digits only with Brazil country code
 */
function normalizePhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return undefined;
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}

/**
 * Normalize zip code: digits only
 */
function normalizeZipCode(zip: string | undefined | null): string | undefined {
  if (!zip) return undefined;
  const digits = zip.replace(/\D/g, '');
  return digits.length > 0 ? digits : undefined;
}

/**
 * Parse full name into first and last name
 */
function parseName(fullName: string | undefined): { firstName?: string; lastName?: string } {
  if (!fullName || fullName.trim() === '') return {};
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

/**
 * Build Advanced Matching user data object for fbq
 * Only includes non-empty, normalized values
 */
function buildAdvancedMatchingData(userData: MetaUserData): Record<string, string> | undefined {
  const data: Record<string, string> = {};

  const email = normalizeForMeta(userData.email);
  if (email) data.em = email;

  const phone = normalizePhone(userData.phone);
  if (phone) data.ph = phone;

  // Parse name if firstName/lastName not provided
  let fn = normalizeForMeta(userData.firstName);
  let ln = normalizeForMeta(userData.lastName);
  
  if (fn) data.fn = fn;
  if (ln) data.ln = ln;

  const city = normalizeForMeta(userData.city);
  if (city) data.ct = city;

  const state = normalizeForMeta(userData.state);
  if (state) data.st = state;

  const zip = normalizeZipCode(userData.zipCode);
  if (zip) data.zp = zip;

  const country = normalizeForMeta(userData.country) || 'br';
  data.country = country;

  return Object.keys(data).length > 0 ? data : undefined;
}

/**
 * Update Meta Pixel Advanced Matching data globally
 * Re-initializes fbq with user data so ALL subsequent events include it
 * This boosts coverage for em, ph, fn, ln, ct, st, zp, country
 */
export function updateMetaAdvancedMatching(userData: MetaUserData) {
  if (typeof window === 'undefined' || !window.fbq) return;

  const amData = buildAdvancedMatchingData(userData);
  if (!amData) return;

  window.fbq('init', '1198424312101245', amData);
  console.log('Meta Pixel: Advanced Matching updated globally', {
    fields: Object.keys(amData),
  });
}

/**
 * Track PageView event (for SPA navigation)
 */
export function trackMetaPageView() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('Meta Pixel: PageView tracked');
  }
}

/**
 * Track Lead event - fires when user provides contact info
 * Used when user fills name + email in checkout form
 */
export function trackMetaLead(params: {
  value?: number;
  currency?: string;
  userData?: MetaUserData;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId();
    
    const eventData: Record<string, unknown> = {
      value: params.value || 0,
      currency: params.currency || 'BRL',
      content_name: 'Kit SOS Crescimento e Antiqueda',
    };

    // Add Advanced Matching data if available
    if (params.userData) {
      const amData = buildAdvancedMatchingData(params.userData);
      if (amData) {
        Object.assign(eventData, amData);
      }
    }

    window.fbq('track', 'Lead', eventData, { eventID: eventId });
    
    console.log('Meta Pixel: Lead tracked', {
      event_id: eventId,
      has_email: !!params.userData?.email,
      has_phone: !!params.userData?.phone,
      has_name: !!(params.userData?.firstName || params.userData?.lastName),
    });
  }
}

/**
 * Track ViewContent event
 */
export function trackMetaViewContent(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_ids: params.content_ids || ['kit-sos-crescimento'],
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: params.content_type || 'product',
    });
    console.log('Meta Pixel: ViewContent tracked');
  }
}

/**
 * Track InitiateCheckout event with Advanced Matching
 */
export function trackMetaInitiateCheckout(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
  userData?: MetaUserData;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId();
    const { fbp, fbc } = getMetaCookies();
    
    // Build event data
    const eventData: Record<string, unknown> = {
      value: params.value,
      currency: params.currency || 'BRL',
      content_ids: params.content_ids || ['kit-sos-crescimento'],
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
      num_items: params.num_items || 1,
    };

    // Add Advanced Matching data if available
    if (params.userData) {
      const amData = buildAdvancedMatchingData(params.userData);
      if (amData) {
        Object.assign(eventData, amData);
      }
    }

    window.fbq('track', 'InitiateCheckout', eventData, { eventID: eventId });
    
    console.log('Meta Pixel: InitiateCheckout tracked', {
      value: params.value,
      event_id: eventId,
      fbp: fbp ? 'present' : 'missing',
      fbc: fbc ? 'present' : 'missing',
      advanced_matching: params.userData ? 'enabled' : 'disabled',
    });
  }
}

/**
 * Track AddPaymentInfo event with Advanced Matching
 * Fires when user fills payment/shipping form
 */
export function trackMetaAddPaymentInfo(params: {
  value: number;
  currency?: string;
  userData?: MetaUserData;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventId = generateEventId();
    
    const eventData: Record<string, unknown> = {
      value: params.value,
      currency: params.currency || 'BRL',
      content_ids: ['kit-sos-crescimento'],
      content_name: 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
    };

    if (params.userData) {
      const amData = buildAdvancedMatchingData(params.userData);
      if (amData) {
        Object.assign(eventData, amData);
      }
    }

    window.fbq('track', 'AddPaymentInfo', eventData, { eventID: eventId });
    
    console.log('Meta Pixel: AddPaymentInfo tracked', {
      value: params.value,
      event_id: eventId,
      has_user_data: !!params.userData,
    });
  }
}

/**
 * Track Purchase event - Browser-side with server-side CAPI call
 * Uses event_id for deduplication between browser and server events
 */
export async function trackMetaPurchase(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
  order_id: string;
  event_id?: string;
  // Full user data for Advanced Matching
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  test_event_code?: string;
}): Promise<{ success: boolean; event_id: string }> {
  const eventId = params.event_id || generateEventId();
  const { fbp, fbc } = getMetaCookies();

  // Build Advanced Matching data for browser pixel
  const userData: MetaUserData = {
    email: params.email,
    phone: params.phone,
    firstName: params.firstName,
    lastName: params.lastName,
    city: params.city,
    state: params.state,
    zipCode: params.zipCode,
    country: params.country || 'br',
  };

  // 1. Fire browser-side pixel event
  const firePixelEvent = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      const eventData: Record<string, unknown> = {
        value: params.value,
        currency: params.currency || 'BRL',
        content_ids: params.content_ids || ['kit-sos-crescimento'],
        content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
        content_type: 'product',
        num_items: params.num_items || 1,
        order_id: params.order_id,
      };

      // Add Advanced Matching data
      const amData = buildAdvancedMatchingData(userData);
      if (amData) {
        Object.assign(eventData, amData);
      }

      window.fbq('track', 'Purchase', eventData, { eventID: eventId });
      
      console.log('Meta Pixel: Purchase tracked (browser)', { 
        value: params.value, 
        order_id: params.order_id, 
        event_id: eventId,
        fbp: fbp ? 'present' : 'missing',
        fbc: fbc ? 'present' : 'missing',
        advanced_matching_fields: amData ? Object.keys(amData) : [],
      });
      return true;
    }
    return false;
  };

  // Try immediately, with retries if needed
  if (!firePixelEvent()) {
    let attempts = 0;
    const maxAttempts = 5;
    const retryDelays = [500, 1000, 2000, 3000, 5000];

    const retry = (): Promise<void> => {
      return new Promise((resolve) => {
        attempts++;
        console.log(`Meta Pixel: Purchase retry attempt ${attempts}/${maxAttempts}`);
        
        if (firePixelEvent()) {
          resolve();
          return;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(() => retry().then(resolve), retryDelays[attempts] || 5000);
        } else {
          console.error('Meta Pixel: Purchase event FAILED after all retries - fbq not available');
          resolve();
        }
      });
    };

    await new Promise<void>((resolve) => {
      setTimeout(() => retry().then(resolve), retryDelays[0]);
    });
  }

  // 2. Call server-side CAPI endpoint (non-blocking)
  sendServerSideEvent({
    order_id: params.order_id,
    event_id: eventId,
    value: params.value,
    currency: params.currency,
    email: params.email,
    phone: params.phone,
    first_name: params.firstName,
    last_name: params.lastName,
    city: params.city,
    state: params.state,
    zip_code: params.zipCode,
    country: params.country || 'br',
    fbp: fbp || undefined,
    fbc: fbc || undefined,
    client_user_agent: navigator.userAgent,
    test_event_code: params.test_event_code,
  }).catch((error) => {
    console.error('Meta CAPI: Server-side event failed:', error);
  });

  return { success: true, event_id: eventId };
}

/**
 * Send server-side event to Meta CAPI via Edge Function
 */
async function sendServerSideEvent(params: {
  order_id: string;
  event_id: string;
  value: number;
  currency?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  fbp?: string;
  fbc?: string;
  client_user_agent?: string;
  test_event_code?: string;
}): Promise<void> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (!supabaseUrl) {
    console.warn('Meta CAPI: SUPABASE_URL not configured, skipping server-side event');
    return;
  }

  console.log('Meta CAPI: Sending server-side event with user data:', {
    order_id: params.order_id,
    event_id: params.event_id,
    has_email: !!params.email,
    has_phone: !!params.phone,
    has_first_name: !!params.first_name,
    has_last_name: !!params.last_name,
    has_city: !!params.city,
    has_state: !!params.state,
    has_zip: !!params.zip_code,
    has_fbp: !!params.fbp,
    has_fbc: !!params.fbc,
  });

  const response = await fetch(`${supabaseUrl}/functions/v1/meta-purchase-event`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const result = await response.json();

  if (response.ok && result.success) {
    console.log('Meta CAPI: Server-side event sent successfully', {
      order_id: params.order_id,
      event_id: params.event_id,
      events_received: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });
  } else {
    console.error('Meta CAPI: Server-side event error:', result);
  }
}

/**
 * Track AddToCart event
 */
export function trackMetaAddToCart(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_ids: params.content_ids || ['kit-sos-crescimento'],
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
    });
    console.log('Meta Pixel: AddToCart tracked');
  }
}
