/**
 * Shared utility functions
 */

/**
 * Format price in Indian Rupees
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(mrp: number, price: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Calculate GST components
 */
export function calculateGST(
  amount: number,
  gstRate: number,
  isIntraState: boolean
): {
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
} {
  const gstAmount = (amount * gstRate) / 100;

  if (isIntraState) {
    // Intra-state: CGST + SGST
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    return {
      cgst,
      sgst,
      igst: 0,
      total: amount + gstAmount,
    };
  } else {
    // Inter-state: IGST
    return {
      cgst: 0,
      sgst: 0,
      igst: gstAmount,
      total: amount + gstAmount,
    };
  }
}

/**
 * Calculate TCS (Tax Collected at Source)
 */
export function calculateTCS(amount: number, threshold: number, rate: number): number {
  if (amount < threshold) return 0;
  return amount * rate;
}

/**
 * Validate GSTIN format
 */
export function isValidGSTIN(gstin: string): boolean {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
}

/**
 * Validate Indian phone number
 */
export function isValidIndianPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Format date to Indian locale
 */
export function formatDate(date: Date | string, includeTime = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (includeTime) {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(d);
}

/**
 * Calculate estimated delivery time
 * Metro cities: same day if ordered before 2 PM
 * Other cities: 1-3 days
 */
export function calculateDeliveryTime(
  city: string,
  orderTime: Date = new Date()
): Date {
  const metroCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
  const deliveryDate = new Date(orderTime);
  
  if (metroCities.includes(city)) {
    const orderHour = orderTime.getHours();
    if (orderHour < 14) {
      // Same day delivery
      deliveryDate.setHours(18, 0, 0, 0);
    } else {
      // Next day delivery
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      deliveryDate.setHours(18, 0, 0, 0);
    }
  } else {
    // 2-3 days for other cities
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    deliveryDate.setHours(18, 0, 0, 0);
  }
  
  return deliveryDate;
}

/**
 * Generate unique ID
 */
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}_${timestamp}${randomStr}` : `${timestamp}${randomStr}`;
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
