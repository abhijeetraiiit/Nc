/**
 * Platform-wide constants
 */

// Supported Languages
export const SUPPORTED_LANGUAGES = [
  'en', // English
  'hi', // Hindi
  'bn', // Bengali
  'te', // Telugu
  'mr', // Marathi
  'ta', // Tamil
  'gu', // Gujarati
  'kn', // Kannada
  'ml', // Malayalam
  'pa', // Punjabi
  'or', // Odia
  'as', // Assamese
  'ur', // Urdu
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Indian States
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const;

// GST Rates
export const GST_RATES = {
  ZERO: 0,
  FIVE: 5,
  TWELVE: 12,
  EIGHTEEN: 18,
  TWENTY_EIGHT: 28,
} as const;

// TCS Threshold (in INR)
export const TCS_THRESHOLD = 5000000; // ₹50 Lakhs
export const TCS_RATE = 0.01; // 1%

// Order Status Flow
export const ORDER_STATUS_FLOW = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  COD: 'cod',
  WALLET: 'wallet',
} as const;

// Trust Score Weights
export const TRUST_SCORE_WEIGHTS = {
  RETURN_RATE: 0.3,
  DISPATCH_SPEED: 0.25,
  AUTHENTICITY: 0.25,
  CUSTOMER_RATING: 0.2,
} as const;

// Compliance Constants
export const GRIEVANCE_OFFICER = {
  name: 'Compliance Officer',
  email: 'grievance@nc-ecommerce.in',
  phone: '+91-1234567890',
  address: 'Nc E-commerce Pvt Ltd, India',
} as const;

// API Rate Limits
export const RATE_LIMITS = {
  DEFAULT: 100, // requests per minute
  AUTH: 5, // login attempts per minute
  SEARCH: 30, // search requests per minute
} as const;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 300, // 5 minutes
  MEDIUM: 1800, // 30 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

// File Upload Limits
export const FILE_UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 50 * 1024 * 1024, // 50MB
  MODEL_3D_MAX_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// Product Categories (simplified)
export const PRODUCT_CATEGORIES = {
  FASHION: 'fashion',
  ELECTRONICS: 'electronics',
  HOME: 'home',
  BEAUTY: 'beauty',
  GROCERY: 'grocery',
  BOOKS: 'books',
  SPORTS: 'sports',
  AUTOMOTIVE: 'automotive',
} as const;

// Notification Channels
export const NOTIFICATION_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  PUSH: 'push',
} as const;
