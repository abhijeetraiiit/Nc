/**
 * MongoDB Models using Mongoose
 * Handles flexible product catalog and user preferences
 */

import mongoose, { Schema, Document } from 'mongoose';

// Product Interface
export interface IProduct extends Document {
  vendorId: string;
  title: Record<string, string>;
  description: Record<string, string>;
  price: number;
  mrp: number;
  category: string[];
  attributes: {
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
    [key: string]: any;
  };
  media: {
    images: string[];
    videos: string[];
    model3D?: string;
    thumbnails: string[];
  };
  compliance: {
    countryOfOrigin: string;
    manufacturerDetails: {
      name: string;
      address: string;
      contact: string;
    };
    expiryDate?: Date;
    unitSalePrice: {
      value: number;
      unit: string;
    };
    isGITagged: boolean;
    giTagDetails?: {
      name: string;
      certificationNumber: string;
      state: string;
    };
    hsnCode?: string;
  };
  seo: {
    slug: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  inventory: Array<{
    warehouseId: string;
    quantity: number;
    location: {
      city: string;
      state: string;
    };
  }>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    vendorId: { type: String, required: true, index: true },
    title: { type: Schema.Types.Mixed, required: true },
    description: { type: Schema.Types.Mixed, required: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    category: [{ type: String, index: true }],
    attributes: { type: Schema.Types.Mixed, default: {} },
    media: {
      images: [String],
      videos: [String],
      model3D: String,
      thumbnails: [String],
    },
    compliance: {
      countryOfOrigin: { type: String, required: true },
      manufacturerDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contact: { type: String, required: true },
      },
      expiryDate: Date,
      unitSalePrice: {
        value: { type: Number, required: true },
        unit: { type: String, required: true },
      },
      isGITagged: { type: Boolean, default: false },
      giTagDetails: {
        name: String,
        certificationNumber: String,
        state: String,
      },
      hsnCode: String,
    },
    seo: {
      slug: { type: String, required: true, unique: true, index: true },
      metaTitle: { type: String, required: true },
      metaDescription: { type: String, required: true },
      keywords: [String],
    },
    inventory: [
      {
        warehouseId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        location: {
          city: { type: String, required: true },
          state: { type: String, required: true },
        },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Indexes for search
ProductSchema.index({ 'seo.slug': 1 });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ vendorId: 1, isActive: 1 });
ProductSchema.index({ 'title.en': 'text', 'description.en': 'text' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);

// User Preferences Interface
export interface IUserPreference extends Document {
  userId: string;
  browsingHistory: Array<{
    productId: string;
    timestamp: Date;
  }>;
  searchHistory: Array<{
    query: string;
    language: string;
    timestamp: Date;
  }>;
  wishlist: string[];
  recentlyViewed: string[];
  preferences: {
    priceRange?: { min: number; max: number };
    preferredCategories?: string[];
    preferredBrands?: string[];
    excludedTags?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// User Preferences Schema
const UserPreferenceSchema = new Schema<IUserPreference>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    browsingHistory: [
      {
        productId: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    searchHistory: [
      {
        query: String,
        language: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    wishlist: [String],
    recentlyViewed: [String],
    preferences: {
      priceRange: {
        min: Number,
        max: Number,
      },
      preferredCategories: [String],
      preferredBrands: [String],
      excludedTags: [String],
    },
  },
  {
    timestamps: true,
  }
);

export const UserPreference = mongoose.model<IUserPreference>(
  'UserPreference',
  UserPreferenceSchema
);

// Review Interface
export interface IReview extends Document {
  productId: string;
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  media: {
    images: string[];
    videos: string[];
  };
  isVerifiedPurchase: boolean;
  helpful: number;
  reported: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Review Schema
const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    orderId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    media: {
      images: [String],
      videos: [String],
    },
    isVerifiedPurchase: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
    reported: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ productId: 1, status: 1 });
ReviewSchema.index({ userId: 1 });

export const Review = mongoose.model<IReview>('Review', ReviewSchema);

// Cart Interface (temporary storage)
export interface ICart extends Document {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    selectedAttributes: Record<string, any>;
    addedAt: Date;
  }>;
  updatedAt: Date;
}

// Cart Schema
const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        selectedAttributes: Schema.Types.Mixed,
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
