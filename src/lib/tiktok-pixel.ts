// TikTok Pixel helper functions
// Pixel ID: D66JST3C77U7RUMK7J0G

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      identify: (params: Record<string, unknown>) => void;
      page: () => void;
    };
  }
}

/**
 * Track TikTok PageView (SPA route changes)
 */
export function trackTikTokPageView() {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.page();
    console.log('TikTok Pixel: PageView tracked');
  }
}

/**
 * Identify user for Advanced Matching
 */
export function identifyTikTokUser(params: {
  email?: string;
  phone?: string;
}) {
  if (typeof window !== 'undefined' && window.ttq) {
    const data: Record<string, unknown> = {};
    if (params.email) data.email = params.email.trim().toLowerCase();
    if (params.phone) {
      const digits = params.phone.replace(/\D/g, '');
      data.phone_number = digits.length === 10 || digits.length === 11 ? `+55${digits}` : `+${digits}`;
    }
    if (Object.keys(data).length > 0) {
      window.ttq.identify(data);
      console.log('TikTok Pixel: User identified', { has_email: !!data.email, has_phone: !!data.phone_number });
    }
  }
}

/**
 * Track ViewContent event (product page)
 */
export function trackTikTokViewContent(params: {
  value: number;
  currency?: string;
  content_id?: string;
  content_name?: string;
}) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('ViewContent', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_id: params.content_id || 'kit-sos-crescimento',
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
    });
    console.log('TikTok Pixel: ViewContent tracked');
  }
}

/**
 * Track InitiateCheckout event
 */
export function trackTikTokInitiateCheckout(params: {
  value: number;
  currency?: string;
  content_id?: string;
  content_name?: string;
}) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('InitiateCheckout', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_id: params.content_id || 'kit-sos-crescimento',
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
      quantity: 1,
    });
    console.log('TikTok Pixel: InitiateCheckout tracked');
  }
}

/**
 * Track CompletePayment event (thank you page)
 */
export function trackTikTokCompletePayment(params: {
  value: number;
  currency?: string;
  content_id?: string;
  content_name?: string;
  order_id?: string;
}) {
  if (typeof window !== 'undefined' && window.ttq) {
    window.ttq.track('CompletePayment', {
      value: params.value,
      currency: params.currency || 'BRL',
      content_id: params.content_id || 'kit-sos-crescimento',
      content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
      content_type: 'product',
      quantity: 1,
    });
    console.log('TikTok Pixel: CompletePayment tracked', { order_id: params.order_id });
  }
}
