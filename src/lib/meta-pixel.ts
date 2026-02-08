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
 * Track PageView event (for SPA navigation)
 */
export function trackMetaPageView() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    console.log('Meta Pixel: PageView tracked');
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
 * Track InitiateCheckout event
 */
export function trackMetaInitiateCheckout(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_ids: params.content_ids || ['kit-sos-crescimento'],
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
      num_items: params.num_items || 1,
    });
    console.log('Meta Pixel: InitiateCheckout tracked');
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
  email?: string;
  phone?: string;
  test_event_code?: string; // For Meta Events Manager test mode
}): Promise<{ success: boolean; event_id: string }> {
  // Generate event_id if not provided
  const eventId = params.event_id || generateEventId();
  
  // Get Meta cookies for advanced matching
  const { fbp, fbc } = getMetaCookies();

  // 1. Fire browser-side pixel event
  const firePixelEvent = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: params.value,
        currency: params.currency || 'BRL',
        content_ids: params.content_ids || ['kit-sos-crescimento'],
        content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
        content_type: 'product',
        num_items: params.num_items || 1,
        order_id: params.order_id,
      }, { eventID: eventId });
      console.log('Meta Pixel: Purchase tracked (browser)', { 
        value: params.value, 
        order_id: params.order_id, 
        event_id: eventId,
        fbp: fbp ? 'present' : 'missing',
        fbc: fbc ? 'present' : 'missing',
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
