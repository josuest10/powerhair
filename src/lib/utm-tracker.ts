// UTM Tracking utility
// Persists UTM parameters in localStorage to survive navigation between pages

const UTM_STORAGE_KEY = 'powerhair_utm_params';
const UTM_EXPIRY_HOURS = 24; // UTMs expire after 24 hours

interface UTMParams {
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  utm_term: string | null;
  src: string | null;
  sck: string | null;
  timestamp: number;
}

/**
 * Capture UTM parameters from URL and store in localStorage
 * Should be called on app initialization
 */
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  
  // Check if there are any UTM params in the current URL
  const hasUTMParams = 
    params.has('utm_source') || 
    params.has('utm_campaign') || 
    params.has('utm_medium') ||
    params.has('utm_content') ||
    params.has('utm_term') ||
    params.has('src') ||
    params.has('sck');

  // Only update if there are new UTM params in the URL
  if (hasUTMParams) {
    const utmData: UTMParams = {
      utm_source: params.get('utm_source'),
      utm_campaign: params.get('utm_campaign'),
      utm_medium: params.get('utm_medium'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term'),
      src: params.get('src'),
      sck: params.get('sck'),
      timestamp: Date.now(),
    };

    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    console.log('UTM params captured:', utmData);
  }
}

/**
 * Get stored UTM parameters
 * Returns null values if expired or not found
 */
export function getStoredUTMParams(): Omit<UTMParams, 'timestamp'> {
  const emptyParams = {
    utm_source: null,
    utm_campaign: null,
    utm_medium: null,
    utm_content: null,
    utm_term: null,
    src: null,
    sck: null,
  };

  if (typeof window === 'undefined') return emptyParams;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return emptyParams;

    const data: UTMParams = JSON.parse(stored);
    
    // Check if expired
    const expiryTime = UTM_EXPIRY_HOURS * 60 * 60 * 1000;
    if (Date.now() - data.timestamp > expiryTime) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      console.log('UTM params expired, cleared');
      return emptyParams;
    }

    // Return without timestamp
    const { timestamp, ...params } = data;
    return params;
  } catch (error) {
    console.error('Error reading UTM params:', error);
    return emptyParams;
  }
}

/**
 * Clear stored UTM parameters (call after successful purchase)
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(UTM_STORAGE_KEY);
}
