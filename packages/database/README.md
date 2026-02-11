# @nc/database

Database package containing Prisma schemas and MongoDB models for the Nc e-commerce platform.

## Overview

This package provides:
- **PostgreSQL schemas** (via Prisma) for transactional data
- **MongoDB models** (via Mongoose) for flexible catalog data
- **Database connection utilities**
- **Migration management**

## Databases

### PostgreSQL (Prisma)
**Use case**: Transactional data requiring ACID properties

**Tables**:
- `users` - User accounts and profiles
- `vendors` - Vendor information and KYC
- `warehouses` - Warehouse locations
- `orders` - Order transactions
- `order_items` - Order line items
- `payments` - Payment records
- `consents` - DPDP Act consent records
- `data_requests` - Data access/deletion requests
- `trust_score_history` - Vendor trust scores
- `notifications` - Notification logs

### MongoDB (Mongoose)
**Use case**: Flexible schema for catalog and user preferences

**Collections**:
- `products` - Product catalog with flexible attributes
- `user_preferences` - User browsing history and preferences
- `reviews` - Product reviews and ratings
- `carts` - Shopping cart data

## Setup

### 1. Install Dependencies

Already installed via workspace root.

### 2. Configure Database URLs

In `.env`:
```env
DATABASE_URL="postgresql://nc_user:nc_password@localhost:5432/nc_ecommerce"
MONGODB_URI="mongodb://nc_user:nc_password@localhost:27017/nc_ecommerce"
```

### 3. Generate Prisma Client

```bash
cd packages/database
npx prisma generate
```

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 5. View Data (Optional)

```bash
npx prisma studio
```

## Usage

### Prisma (PostgreSQL)

```typescript
import { prisma } from '@nc/database';

// Create a user
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
  },
});

// Find users
const users = await prisma.user.findMany({
  where: {
    city: 'Bangalore',
  },
});

// Update user
await prisma.user.update({
  where: { id: 'user_123' },
  data: { city: 'Mumbai' },
});
```

### Mongoose (MongoDB)

```typescript
import { connectMongoDB, Product } from '@nc/database';

// Connect to MongoDB
await connectMongoDB(process.env.MONGODB_URI);

// Create a product
const product = await Product.create({
  vendorId: 'vendor_123',
  title: { en: 'Red Banarasi Saree' },
  description: { en: 'Beautiful handwoven saree' },
  price: 2499,
  mrp: 4999,
  category: ['fashion', 'sarees'],
  media: {
    images: ['https://example.com/saree.jpg'],
    videos: [],
    thumbnails: [],
  },
  compliance: {
    countryOfOrigin: 'India',
    manufacturerDetails: {
      name: 'Artisan Crafts',
      address: 'Varanasi, UP',
      contact: '+91-9876543210',
    },
    unitSalePrice: {
      value: 249.9,
      unit: 'meter',
    },
    isGITagged: true,
  },
  seo: {
    slug: 'red-banarasi-saree',
    metaTitle: 'Red Banarasi Saree - Handwoven',
    metaDescription: 'Buy authentic Banarasi saree',
    keywords: ['saree', 'banarasi', 'handwoven'],
  },
  inventory: [
    {
      warehouseId: 'warehouse_123',
      quantity: 50,
      location: { city: 'Varanasi', state: 'Uttar Pradesh' },
    },
  ],
});

// Find products
const products = await Product.find({
  category: 'fashion',
  price: { $gte: 1000, $lte: 5000 },
}).limit(20);
```

## Schemas

### User Schema (PostgreSQL)

```prisma
model User {
  id                 String   @id @default(cuid())
  name               String
  email              String   @unique
  phone              String   @unique
  languagePreference String   @default("en")
  city               String?
  state              String?
  country            String   @default("India")
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
```

### Product Schema (MongoDB)

```typescript
{
  vendorId: String,
  title: { [lang]: String },
  description: { [lang]: String },
  price: Number,
  mrp: Number,
  category: [String],
  attributes: Object,
  media: {
    images: [String],
    videos: [String],
    model3D: String,
    thumbnails: [String]
  },
  compliance: {
    countryOfOrigin: String,
    manufacturerDetails: Object,
    unitSalePrice: Object,
    isGITagged: Boolean
  },
  seo: Object,
  inventory: [Object]
}
```

## Migrations

### Create Migration

```bash
npx prisma migrate dev --name add_user_preferences
```

### Apply Migration (Production)

```bash
npx prisma migrate deploy
```

### Rollback Migration

```bash
npx prisma migrate rollback
```

## Scripts

Available in package.json:

- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run migrations (dev)
- `npm run db:push` - Push schema changes (dev)
- `npm run db:studio` - Open Prisma Studio

## Best Practices

### When to use PostgreSQL
- User authentication
- Financial transactions
- Orders and payments
- Audit logs
- Compliance records

### When to use MongoDB
- Product catalog (flexible attributes)
- User preferences
- Reviews and ratings
- Shopping cart (temporary data)
- Search history

## Connection Pooling

### PostgreSQL
Prisma handles connection pooling automatically.

For production, configure in `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  connectionLimit = 10
}
```

### MongoDB
Mongoose connection pooling configured in `connection.ts`.

## Indexes

### PostgreSQL
Indexes defined in Prisma schema:
```prisma
@@index([email])
@@index([phone])
```

### MongoDB
Indexes defined in Mongoose schemas:
```typescript
ProductSchema.index({ 'seo.slug': 1 });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ vendorId: 1, isActive: 1 });
```

## Troubleshooting

### Prisma Client not found
```bash
npx prisma generate
```

### Migration failed
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### MongoDB connection timeout
Check:
1. MongoDB is running
2. Connection string is correct
3. Firewall allows connection

## References

- [Prisma Documentation](https://www.prisma.io/docs)
- [Mongoose Documentation](https://mongoosejs.com/docs)
