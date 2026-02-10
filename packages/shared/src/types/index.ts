/**
 * Common TypeScript types used across the platform
 */

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  languagePreference: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Vendor Types
export interface Vendor {
  id: string;
  businessName: string;
  gstin: string;
  trustScore: number;
  kycStatus: 'pending' | 'approved' | 'rejected';
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  warehouses: Warehouse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Warehouse {
  id: string;
  vendorId: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  currentStock: number;
}

// Product Types
export interface Product {
  id: string;
  vendorId: string;
  title: Record<string, string>; // Multi-language support
  description: Record<string, string>;
  price: number;
  mrp: number;
  category: string[];
  attributes: ProductAttributes;
  media: ProductMedia;
  compliance: ComplianceInfo;
  seo: SEOInfo;
  inventory: InventoryItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAttributes {
  fabric?: string;
  size?: string[];
  color?: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  [key: string]: any; // Flexible attributes
}

export interface ProductMedia {
  images: string[];
  videos: string[];
  model3D?: string;
  thumbnails: string[];
}

export interface ComplianceInfo {
  countryOfOrigin: string;
  manufacturerDetails: {
    name: string;
    address: string;
    contact: string;
  };
  expiryDate?: Date;
  unitSalePrice: {
    value: number;
    unit: string; // e.g., 'kg', 'gram', 'liter'
  };
  isGITagged: boolean;
  giTagDetails?: {
    name: string;
    certificationNumber: string;
    state: string;
  };
  hsnCode?: string;
}

export interface SEOInfo {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface InventoryItem {
  warehouseId: string;
  quantity: number;
  location: {
    city: string;
    state: string;
  };
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  items: OrderItem[];
  total: number;
  tax: {
    cgst: number;
    sgst: number;
    igst: number;
  };
  tcs: number; // Tax Collected at Source
  status: OrderStatus;
  deliveryTime: {
    estimated: Date;
    actual?: Date;
  };
  payment: PaymentInfo;
  shipping: ShippingInfo;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  tax: number;
  attributes: {
    size?: string;
    color?: string;
    [key: string]: any;
  };
}

export interface PaymentInfo {
  id: string;
  method: 'card' | 'upi' | 'netbanking' | 'cod' | 'wallet';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  gatewayResponse?: any;
  transactionId?: string;
}

export interface ShippingInfo {
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery: Date;
}

// Consent Types (DPDP Act)
export interface ConsentRecord {
  userId: string;
  consents: {
    marketing: ConsentDetail;
    analytics: ConsentDetail;
    personalization: ConsentDetail;
    thirdPartySharing: ConsentDetail;
  };
  dataAccessRequests: DataAccessRequest[];
  dataDeletionRequests: DataDeletionRequest[];
}

export interface ConsentDetail {
  granted: boolean;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface DataAccessRequest {
  id: string;
  requestedAt: Date;
  fulfilledAt?: Date;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  data?: any;
}

export interface DataDeletionRequest {
  id: string;
  requestedAt: Date;
  scheduledFor: Date;
  completedAt?: Date;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
}

// Trust Score Types
export interface TrustScore {
  vendorId: string;
  overallScore: number; // 0-100
  components: {
    returnRateScore: number;
    dispatchSpeedScore: number;
    authenticityScore: number;
    customerRatingScore: number;
  };
  lastCalculated: Date;
  history: TrustScoreHistory[];
}

export interface TrustScoreHistory {
  score: number;
  calculatedAt: Date;
  factors: Record<string, number>;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'sms' | 'whatsapp' | 'push';
  channel: string;
  subject?: string;
  message: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered' | 'read';
  metadata?: any;
  createdAt: Date;
  sentAt?: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
