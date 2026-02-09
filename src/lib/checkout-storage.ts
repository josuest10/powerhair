/**
 * Checkout Storage Helper
 * 
 * Persists checkout user data to localStorage as a fallback mechanism
 * to ensure Meta CAPI always receives Advanced Matching data even if:
 * - User refreshes the ThankYou page
 * - User accesses ThankYou URL directly
 * - Navigation state is lost
 */

const CHECKOUT_DATA_KEY = 'powerhair_checkout_data';
const CHECKOUT_DATA_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

export interface CheckoutUserData {
  orderId: string;
  amount: number;
  transactionId?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  timestamp: number;
}

/**
 * Save checkout user data to localStorage before redirecting to ThankYou
 * This ensures data is available even if navigation state is lost
 */
export function saveCheckoutData(data: Omit<CheckoutUserData, 'timestamp'>): void {
  try {
    const dataWithTimestamp: CheckoutUserData = {
      ...data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CHECKOUT_DATA_KEY, JSON.stringify(dataWithTimestamp));
    console.log('Checkout data saved to localStorage:', {
      orderId: data.orderId,
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      hasName: !!(data.firstName || data.lastName),
    });
  } catch (error) {
    console.error('Failed to save checkout data:', error);
  }
}

/**
 * Retrieve checkout user data from localStorage
 * Returns null if data is expired or doesn't exist
 */
export function getCheckoutData(): CheckoutUserData | null {
  try {
    const stored = localStorage.getItem(CHECKOUT_DATA_KEY);
    if (!stored) return null;

    const data: CheckoutUserData = JSON.parse(stored);
    
    // Check if data is expired
    if (Date.now() - data.timestamp > CHECKOUT_DATA_EXPIRY_MS) {
      console.log('Checkout data expired, clearing...');
      clearCheckoutData();
      return null;
    }

    console.log('Checkout data retrieved from localStorage:', {
      orderId: data.orderId,
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      age: Math.round((Date.now() - data.timestamp) / 1000) + 's ago',
    });

    return data;
  } catch (error) {
    console.error('Failed to retrieve checkout data:', error);
    return null;
  }
}

/**
 * Clear checkout data from localStorage
 * Called after successful purchase tracking
 */
export function clearCheckoutData(): void {
  try {
    localStorage.removeItem(CHECKOUT_DATA_KEY);
    console.log('Checkout data cleared from localStorage');
  } catch (error) {
    console.error('Failed to clear checkout data:', error);
  }
}
