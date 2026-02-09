/**
 * FBC (Facebook Click ID) Capture
 * 
 * Captures the fbclid parameter from Facebook ads and stores it as _fbc cookie.
 * This significantly improves Meta Pixel attribution and Event Match Quality.
 * 
 * Cookie format: fb.{version}.{creation_time}.{fbclid}
 * Example: fb.1.1609459200000.AbCdEfGhIjKlMnOpQrStUvWxYz
 */

const FBC_COOKIE_NAME = '_fbc';
const FBC_COOKIE_DAYS = 90; // Meta recommends 90 days

/**
 * Get fbclid from URL if present
 */
function getFbclidFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  return params.get('fbclid');
}

/**
 * Get existing _fbc cookie value
 */
function getExistingFbc(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === FBC_COOKIE_NAME) {
      return value || null;
    }
  }
  return null;
}

/**
 * Set _fbc cookie with proper format
 */
function setFbcCookie(fbclid: string): void {
  if (typeof document === 'undefined') return;
  
  const creationTime = Date.now();
  const fbcValue = `fb.1.${creationTime}.${fbclid}`;
  
  const expires = new Date();
  expires.setDate(expires.getDate() + FBC_COOKIE_DAYS);
  
  // Set cookie with SameSite=Lax for cross-site compatibility
  document.cookie = `${FBC_COOKIE_NAME}=${fbcValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  
  console.log('FBC cookie set:', {
    fbclid: fbclid.substring(0, 10) + '...',
    fbc: fbcValue.substring(0, 20) + '...',
    expires: expires.toISOString(),
  });
}

/**
 * Capture fbclid from URL and store as _fbc cookie
 * Should be called early on page load (e.g., in ScrollToTop or main.tsx)
 * 
 * Only sets cookie if:
 * - fbclid is present in URL
 * - No existing _fbc cookie OR fbclid is different from stored one
 */
export function captureFbclid(): void {
  const fbclid = getFbclidFromUrl();
  
  if (!fbclid) {
    return; // No fbclid in URL, nothing to do
  }
  
  const existingFbc = getExistingFbc();
  
  // Check if we already have this fbclid stored
  if (existingFbc && existingFbc.includes(fbclid)) {
    console.log('FBC already captured for this fbclid');
    return;
  }
  
  // Store the new fbclid
  setFbcCookie(fbclid);
}

/**
 * Get current _fbc value (for debugging/verification)
 */
export function getCurrentFbc(): string | null {
  return getExistingFbc();
}
