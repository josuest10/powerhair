 // TikTok Pixel helper functions
 // Pixel ID: D61CDMRC77UAR2VU6H60
 
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
  * Track InitiateCheckout event
  */
 export function trackInitiateCheckout(params: {
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
     });
     console.log('TikTok Pixel: InitiateCheckout tracked');
   }
 }
 
 /**
  * Track CompletePayment event
  */
 export function trackCompletePayment(params: {
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
       order_id: params.order_id,
     });
     console.log('TikTok Pixel: CompletePayment tracked');
   }
 }
 
 /**
  * Track AddToCart event
  */
 export function trackAddToCart(params: {
   value: number;
   currency?: string;
   content_id?: string;
   content_name?: string;
 }) {
   if (typeof window !== 'undefined' && window.ttq) {
     window.ttq.track('AddToCart', {
       value: params.value,
       currency: params.currency || 'BRL',
       content_id: params.content_id || 'kit-sos-crescimento',
       content_name: params.content_name || 'Kit SOS Crescimento e Antiqueda',
       content_type: 'product',
     });
     console.log('TikTok Pixel: AddToCart tracked');
   }
 }
 
 /**
  * Track ViewContent event
  */
 export function trackViewContent(params: {
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
  * Identify user for advanced matching
  */
 export function identifyUser(params: {
   email?: string;
   phone?: string;
 }) {
   if (typeof window !== 'undefined' && window.ttq) {
     const identifyParams: Record<string, string> = {};
     if (params.email) identifyParams.email = params.email;
     if (params.phone) identifyParams.phone_number = params.phone.replace(/\D/g, '');
     
     if (Object.keys(identifyParams).length > 0) {
       window.ttq.identify(identifyParams);
       console.log('TikTok Pixel: User identified');
     }
   }
 }