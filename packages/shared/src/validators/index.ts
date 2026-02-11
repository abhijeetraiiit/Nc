/**
 * Zod validation schemas for common data structures
 */

import { z } from 'zod';

// User validation
export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  languagePreference: z.string().optional(),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string().default('India'),
  }).optional(),
});

// GSTIN validation
export const gstinSchema = z.string().regex(
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  'Invalid GSTIN format'
);

// Product validation
export const productSchema = z.object({
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  price: z.number().positive(),
  mrp: z.number().positive(),
  category: z.array(z.string()),
  compliance: z.object({
    countryOfOrigin: z.string(),
    manufacturerDetails: z.object({
      name: z.string(),
      address: z.string(),
      contact: z.string(),
    }),
    unitSalePrice: z.object({
      value: z.number().positive(),
      unit: z.string(),
    }),
  }),
});

// Order validation
export const orderSchema = z.object({
  userId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })),
  shipping: z.object({
    address: z.object({
      name: z.string(),
      phone: z.string(),
      street: z.string(),
      city: z.string(),
      state: z.string(),
      pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
      country: z.string().default('India'),
    }),
  }),
});

// Consent validation
export const consentSchema = z.object({
  marketing: z.boolean(),
  analytics: z.boolean(),
  personalization: z.boolean(),
  thirdPartySharing: z.boolean(),
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1).max(200),
  filters: z.record(z.any()).optional(),
  language: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type ConsentInput = z.infer<typeof consentSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
