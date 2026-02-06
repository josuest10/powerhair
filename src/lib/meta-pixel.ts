// Meta (Facebook) Pixel helper functions
// Pixel ID: 1198424312101245

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
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
 * Track Purchase event - CRITICAL: This must fire on thank you page
 * Includes retry logic to ensure the event is tracked even if fbq loads slowly
 */
export function trackMetaPurchase(params: {
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  num_items?: number;
  order_id?: string;
}) {
  const fireEvent = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value: params.value,
        currency: params.currency || 'BRL',
        content_ids: params.content_ids || ['kit-sos-crescimento'],
        content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
        content_type: 'product',
        num_items: params.num_items || 1,
      });
      console.log('Meta Pixel: Purchase tracked successfully', { value: params.value, order_id: params.order_id });
      return true;
    }
    return false;
  };

  // Try immediately
  if (fireEvent()) return;

  // If fbq not ready, retry up to 5 times with increasing delays
  let attempts = 0;
  const maxAttempts = 5;
  const retryDelays = [500, 1000, 2000, 3000, 5000]; // ms

  const retry = () => {
    attempts++;
    console.log(`Meta Pixel: Purchase retry attempt ${attempts}/${maxAttempts}`);
    
    if (fireEvent()) return;
    
    if (attempts < maxAttempts) {
      setTimeout(retry, retryDelays[attempts] || 5000);
    } else {
      console.error('Meta Pixel: Purchase event FAILED after all retries - fbq not available');
    }
  };

  setTimeout(retry, retryDelays[0]);
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
