# Compliance Implementation Guide

## Overview

Nc e-commerce platform is built to comply with Indian digital and e-commerce regulations as of 2026. This document outlines the compliance requirements and their implementation.

## 1. DPDP Act 2023 (Digital Personal Data Protection Act)

### Requirements
The DPDP Act mandates:
- Explicit user consent for data collection
- Easy consent withdrawal mechanisms
- Data portability rights
- Right to deletion
- Data breach notifications
- Grievance redressal mechanism

### Implementation

#### Consent Manager
**Location**: `services/compliance-service`

**Database Schema** (PostgreSQL):
```sql
CREATE TABLE consents (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  marketing BOOLEAN DEFAULT false,
  marketing_timestamp TIMESTAMP,
  analytics BOOLEAN DEFAULT false,
  analytics_timestamp TIMESTAMP,
  personalization BOOLEAN DEFAULT false,
  personalization_timestamp TIMESTAMP,
  third_party_sharing BOOLEAN DEFAULT false,
  third_party_sharing_timestamp TIMESTAMP,
  ip_address VARCHAR,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**User Dashboard Features**:
- One-click consent revocation
- Consent history view
- Download consent record (PDF/JSON)

**API Endpoints**:
```
POST /api/v1/consent/grant
POST /api/v1/consent/revoke
GET /api/v1/consent/status
GET /api/v1/consent/history
```

#### Data Access Requests
Users can request their data via the platform.

**Process**:
1. User submits request via dashboard
2. System generates comprehensive data export
3. Data delivered within 72 hours (DPDP requirement)
4. Includes: profile, orders, preferences, consent logs

**Database Table**:
```sql
CREATE TABLE data_requests (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- 'access' or 'deletion'
  status VARCHAR DEFAULT 'pending',
  requested_at TIMESTAMP DEFAULT NOW(),
  scheduled_for TIMESTAMP,
  completed_at TIMESTAMP,
  data JSONB
);
```

#### Data Deletion
**Retention Policy**:
- User data retained for 7 years (tax compliance)
- After user requests deletion, data anonymized
- Deletion completed within 30 days
- Audit trail maintained

**Implementation**:
- Soft delete with anonymization
- Scheduled jobs for batch deletion
- Email confirmation to user

### Compliance Checklist
- [x] Consent collection at registration
- [x] Granular consent options
- [x] Easy consent revocation
- [x] Data access request workflow
- [x] Data deletion within 30 days
- [x] Grievance officer appointed
- [x] Privacy policy accessible
- [x] Cookie consent banner

---

## 2. GST (Goods and Services Tax) Compliance

### Requirements
- GST registration for vendors
- Invoice generation with GST details
- TCS (Tax Collected at Source) deduction
- GSTR-1 filing support
- HSN/SAC code management

### Implementation

#### Vendor GST Verification
**Process**:
1. Vendor enters GSTIN during onboarding
2. System validates format: `27AABCU9603R1ZM`
3. API call to GSTN for verification
4. Store verified GSTIN in database

**Validation Regex**:
```typescript
/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
```

**API Integration**:
```typescript
// GSTN API
POST https://api.gstn.org/taxpayers
Headers: {
  'Authorization': 'Bearer {api_key}',
  'Content-Type': 'application/json'
}
Body: {
  'gstin': '27AABCU9603R1ZM'
}
```

#### Tax Calculation
**Intra-State (CGST + SGST)**:
```typescript
const taxableAmount = 1000;
const gstRate = 18; // 18%
const gstAmount = (taxableAmount * gstRate) / 100; // 180
const cgst = gstAmount / 2; // 90
const sgst = gstAmount / 2; // 90
```

**Inter-State (IGST)**:
```typescript
const igst = gstAmount; // 180
```

**Invoice Schema**:
```typescript
{
  invoiceNumber: "NC/2026/001234",
  date: "2026-02-10",
  vendor: {
    gstin: "27AABCU9603R1ZM",
    name: "Artisan Crafts India",
    address: "123, MG Road, Bangalore"
  },
  customer: {
    gstin: "29AAGCC7409R1ZT", // optional
    name: "Rahul Sharma",
    address: "456, Residency Road, Bangalore"
  },
  items: [
    {
      description: "Red Banarasi Saree",
      hsnCode: "54071010",
      quantity: 1,
      rate: 2500,
      taxableValue: 2500,
      cgst: 225,
      sgst: 225,
      total: 2950
    }
  ],
  totalTaxableValue: 2500,
  totalCgst: 225,
  totalSgst: 225,
  totalIgst: 0,
  grandTotal: 2950
}
```

#### TCS (Tax Collected at Source)
**Requirement**:
- E-commerce operators must collect 1% TCS from vendors
- Applicable when vendor's annual sales exceed ₹50 lakhs

**Implementation**:
```typescript
const TCS_THRESHOLD = 5000000; // ₹50 Lakhs
const TCS_RATE = 0.01; // 1%

function calculateTCS(vendorId: string, saleAmount: number) {
  const annualSales = getAnnualSales(vendorId);
  
  if (annualSales >= TCS_THRESHOLD) {
    const tcs = saleAmount * TCS_RATE;
    return tcs;
  }
  
  return 0;
}
```

**TCS Deduction Flow**:
1. Order completed
2. Calculate vendor payout
3. Check if vendor crossed ₹50L threshold
4. Deduct 1% TCS if applicable
5. Generate TCS certificate
6. Vendor can claim TCS in tax filing

#### GSTR-1 Auto-Generation
**What is GSTR-1?**
Monthly/quarterly return of outward supplies (sales).

**Auto-Generation**:
```typescript
interface GSTR1Data {
  gstin: string;
  period: string; // "022026" (MM/YYYY)
  b2b: B2BInvoice[]; // Business to Business
  b2c: B2CInvoice[]; // Business to Consumer
  totalInvoices: number;
  totalTaxableValue: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
}
```

**Export Format**: JSON (compatible with GST portal upload)

### Compliance Checklist
- [x] GSTIN validation during vendor onboarding
- [x] HSN/SAC code for all products
- [x] Tax calculation (CGST/SGST/IGST)
- [x] Invoice generation with all required fields
- [x] TCS deduction for eligible vendors
- [x] GSTR-1 data export
- [x] Tax invoice archival (7 years)

---

## 3. Legal Metrology (Packaged Commodities Rules)

### Requirements
- Mandatory disclosure of:
  - Country of Origin
  - Manufacturer details (name, address)
  - Unit sale price (₹/kg, ₹/liter, ₹/gram)
  - Expiry date (for perishables)
  - Net quantity

### Implementation

**Product Compliance Schema**:
```typescript
interface ProductCompliance {
  countryOfOrigin: string; // "India"
  manufacturerDetails: {
    name: string;
    address: string;
    contact: string;
  };
  unitSalePrice: {
    value: number;
    unit: 'kg' | 'gram' | 'liter' | 'ml' | 'piece';
  };
  expiryDate?: Date;
  netQuantity: {
    value: number;
    unit: string;
  };
}
```

**Example Display**:
```
Red Banarasi Saree
Price: ₹2,499
Unit Price: ₹249.90 per meter

Made in India
Manufacturer: Artisan Crafts India
Address: Varanasi, Uttar Pradesh
Contact: +91-9876543210
```

**Digital Label Generator**:
Creates compliant product labels as images for packaging.

### Compliance Checklist
- [x] Country of Origin displayed
- [x] Manufacturer details mandatory
- [x] Unit sale price calculation
- [x] Expiry date for perishables
- [x] Net quantity displayed

---

## 4. Consumer Protection (E-commerce Rules 2020)

### Requirements
- Grievance Officer contact details
- 24-hour complaint acknowledgment
- 30-day complaint resolution
- No unfair trade practices
- Clear return/refund policy

### Implementation

#### Grievance Officer
**Details** (visible on all pages):
```
Name: Compliance Officer
Email: grievance@nc-ecommerce.in
Phone: +91-1234567890
Address: Nc E-commerce Pvt Ltd, Bangalore, India
```

#### Complaint Management
**Database Table**:
```sql
CREATE TABLE complaints (
  id VARCHAR PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  order_id VARCHAR,
  category VARCHAR,
  description TEXT,
  status VARCHAR DEFAULT 'pending',
  filed_at TIMESTAMP DEFAULT NOW(),
  acknowledged_at TIMESTAMP,
  resolved_at TIMESTAMP,
  resolution TEXT
);
```

**SLA**:
- Acknowledgment: Within 24 hours
- Resolution: Within 30 days

**Workflow**:
1. User files complaint via dashboard
2. Auto-email acknowledgment (< 24 hrs)
3. Assigned to support team
4. Investigation and resolution
5. User notified of resolution
6. Complaint closed

### Compliance Checklist
- [x] Grievance officer details displayed
- [x] 24-hour acknowledgment SLA
- [x] Complaint tracking system
- [x] Return/refund policy page
- [x] Terms of service accessible

---

## 5. FDI Policy (Foreign Direct Investment in E-commerce)

### Requirements
- Marketplace model only (no inventory ownership)
- No price influence
- No exclusive brand arrangements
- Level playing field for all vendors

### Implementation

#### Marketplace Model Verification
**Rules**:
- Platform NEVER owns inventory
- All products owned by registered vendors
- Platform facilitates transactions only

**Audit Trail**:
```typescript
interface ProductOwnership {
  productId: string;
  vendorId: string; // Always a registered vendor
  platformOwned: false; // Always false
  verifiedAt: Date;
}
```

#### Pricing Independence
**Rules**:
- Vendors set their own prices
- Platform cannot dictate pricing
- No predatory pricing enforced

**Verification**:
- Price changes logged with vendor ID
- Platform admin cannot modify prices
- Audit reports generated monthly

### Compliance Checklist
- [x] Marketplace model (no inventory ownership)
- [x] Vendor-set pricing
- [x] No exclusive brand deals
- [x] Audit trail for regulatory checks

---

## Regulatory Reporting

### Monthly Reports
1. **DPDP Compliance Report**
   - Total consent grants/revocations
   - Data access requests processed
   - Data deletion requests completed

2. **GST Report**
   - Total tax collected
   - TCS deducted
   - Invoices generated

3. **Consumer Protection Report**
   - Complaints filed
   - Complaints resolved
   - Average resolution time

### Annual Reports
- Comprehensive compliance audit
- Third-party compliance verification
- Regulatory submission

---

## Contact for Compliance

**Grievance Officer**
- Name: Compliance Officer
- Email: grievance@nc-ecommerce.in
- Phone: +91-1234567890

**Data Protection Officer**
- Email: dpo@nc-ecommerce.in

---

*Last Updated: February 2026*
*Version: 1.0*
