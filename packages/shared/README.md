# @nc/shared

Shared utilities, types, constants, and validators used across the Nc e-commerce platform.

## Overview

This package provides:
- **TypeScript types** - Common interfaces and types
- **Constants** - Platform-wide constants
- **Utility functions** - Shared helper functions
- **Validators** - Zod schemas for validation

## Installation

Already installed via workspace root.

## Usage

### Types

```typescript
import { User, Vendor, Product, Order } from '@nc/shared';

const user: User = {
  id: 'user_123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  languagePreference: 'en',
  location: {
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

### Constants

```typescript
import { 
  SUPPORTED_LANGUAGES,
  INDIAN_STATES,
  GST_RATES,
  TCS_THRESHOLD,
  GRIEVANCE_OFFICER 
} from '@nc/shared';

// Use supported languages
console.log(SUPPORTED_LANGUAGES); // ['en', 'hi', 'bn', ...]

// Get GST rate
const gstRate = GST_RATES.EIGHTEEN; // 18

// Check TCS threshold
if (vendorSales >= TCS_THRESHOLD) {
  // Apply 1% TCS
}

// Display grievance officer
console.log(GRIEVANCE_OFFICER.email); // grievance@nc-ecommerce.in
```

### Utility Functions

```typescript
import { 
  formatPrice,
  calculateGST,
  calculateTCS,
  isValidGSTIN,
  generateSlug,
  formatDate,
  calculateDeliveryTime 
} from '@nc/shared';

// Format price
const price = formatPrice(2499); // "₹2,499"

// Calculate GST
const gst = calculateGST(1000, 18, true);
// { cgst: 90, sgst: 90, igst: 0, total: 1180 }

// Calculate TCS
const tcs = calculateTCS(6000000, TCS_THRESHOLD, 0.01); // 60000

// Validate GSTIN
const isValid = isValidGSTIN('27AABCU9603R1ZM'); // true

// Generate slug
const slug = generateSlug('Red Banarasi Saree'); // 'red-banarasi-saree'

// Format date
const date = formatDate(new Date()); // '10 Feb 2026'

// Calculate delivery time
const deliveryTime = calculateDeliveryTime('Bangalore');
// Returns Date object with estimated delivery
```

### Validators

```typescript
import { 
  userSchema,
  productSchema,
  orderSchema,
  gstinSchema 
} from '@nc/shared';

// Validate user input
const result = userSchema.safeParse({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
});

if (result.success) {
  const user = result.data;
  // Use validated data
} else {
  console.error(result.error.issues);
}

// Validate GSTIN
const gstinResult = gstinSchema.safeParse('27AABCU9603R1ZM');

// Validate product
const productResult = productSchema.safeParse({
  title: { en: 'Product Name' },
  description: { en: 'Product description' },
  price: 2499,
  mrp: 4999,
  category: ['fashion'],
  compliance: {
    countryOfOrigin: 'India',
    manufacturerDetails: {
      name: 'Manufacturer',
      address: 'Address',
      contact: '9876543210',
    },
    unitSalePrice: {
      value: 249.9,
      unit: 'meter',
    },
  },
});
```

## Available Types

### User Types
- `User`
- `ConsentRecord`
- `ConsentDetail`
- `DataAccessRequest`
- `DataDeletionRequest`

### Vendor Types
- `Vendor`
- `Warehouse`
- `TrustScore`
- `TrustScoreHistory`

### Product Types
- `Product`
- `ProductAttributes`
- `ProductMedia`
- `ComplianceInfo`
- `SEOInfo`
- `InventoryItem`

### Order Types
- `Order`
- `OrderItem`
- `OrderStatus`
- `PaymentInfo`
- `ShippingInfo`

### API Types
- `ApiResponse<T>`
- `PaginationParams`
- `PaginatedResponse<T>`

## Available Constants

### Languages
- `SUPPORTED_LANGUAGES` - Array of supported language codes
- `SupportedLanguage` - Type for language codes

### Geography
- `INDIAN_STATES` - Array of all Indian states and UTs

### Tax & Finance
- `GST_RATES` - GST rate constants
- `TCS_THRESHOLD` - TCS threshold (₹50 lakhs)
- `TCS_RATE` - TCS rate (1%)

### Order & Payment
- `ORDER_STATUS_FLOW` - Order status constants
- `PAYMENT_METHODS` - Payment method constants

### Compliance
- `GRIEVANCE_OFFICER` - Grievance officer details
- `RATE_LIMITS` - API rate limit constants
- `CACHE_TTL` - Cache TTL constants

### File Upload
- `FILE_UPLOAD_LIMITS` - Max file sizes

### Categories
- `PRODUCT_CATEGORIES` - Product category constants
- `NOTIFICATION_CHANNELS` - Notification channel constants

## Utility Functions Reference

### Price & Finance
- `formatPrice(amount: number): string`
- `calculateDiscount(mrp: number, price: number): number`
- `calculateGST(amount, gstRate, isIntraState): { cgst, sgst, igst, total }`
- `calculateTCS(amount, threshold, rate): number`

### Validation
- `isValidGSTIN(gstin: string): boolean`
- `isValidIndianPhone(phone: string): boolean`
- `isValidEmail(email: string): boolean`

### Text Processing
- `generateSlug(text: string): string`
- `truncateText(text: string, maxLength: number): string`

### Date & Time
- `formatDate(date: Date | string, includeTime?: boolean): string`
- `calculateDeliveryTime(city: string, orderTime?: Date): Date`

### Utilities
- `generateId(prefix?: string): string`
- `deepClone<T>(obj: T): T`
- `debounce<T>(func: T, wait: number): Function`
- `throttle<T>(func: T, limit: number): Function`

## Zod Validators

All validators use [Zod](https://zod.dev/) for runtime type checking:

- `userSchema` - User input validation
- `gstinSchema` - GSTIN format validation
- `productSchema` - Product data validation
- `orderSchema` - Order data validation
- `consentSchema` - Consent input validation
- `paginationSchema` - Pagination parameters
- `searchSchema` - Search input validation

## Development

### Build
```bash
npm run build
```

### Type Check
```bash
npm run type-check
```

### Watch Mode
```bash
npm run dev
```

## Best Practices

### When to add to this package
- Types used in multiple packages/services
- Utility functions needed across frontend & backend
- Platform-wide constants
- Common validation schemas

### When NOT to add
- Package-specific logic
- UI components (use @nc/ui)
- Database models (use @nc/database)
- Service-specific business logic

## Contributing

When adding new utilities:
1. Add TypeScript types/interfaces
2. Add tests for functions
3. Update this README
4. Export from `index.ts`

## License

Proprietary - All rights reserved
