import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for all users
  const password = await bcrypt.hash('password123', 10);

  // Create Users
  console.log('Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Raj Kumar',
        email: 'raj@example.com',
        phone: '+919876543210',
        passwordHash: password,
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        languagePreference: 'hi',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '+919876543211',
        passwordHash: password,
        city: 'Mumbai',
        state: 'Maharashtra',
        languagePreference: 'mr',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '+919876543212',
        passwordHash: password,
        city: 'Bangalore',
        state: 'Karnataka',
        languagePreference: 'kn',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Sneha Reddy',
        email: 'sneha@example.com',
        phone: '+919876543213',
        passwordHash: password,
        city: 'Hyderabad',
        state: 'Telangana',
        languagePreference: 'te',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '+919876543214',
        passwordHash: password,
        city: 'Delhi',
        state: 'Delhi',
        languagePreference: 'hi',
      },
    }),
    // Test user for easy login
    prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+919999999999',
        passwordHash: password,
        city: 'Mumbai',
        state: 'Maharashtra',
        languagePreference: 'en',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create Vendors
  console.log('Creating vendors...');
  const vendors = await Promise.all([
    prisma.vendor.create({
      data: {
        businessName: 'Banarasi Silk Emporium',
        gstin: '09AAACC1206D1Z5',
        trustScore: 85.5,
        kycStatus: 'approved',
        contactName: 'Ramesh Agarwal',
        contactEmail: 'ramesh@banarasisilk.com',
        contactPhone: '+919876540001',
        warehouses: {
          create: [
            {
              street: 'Godowlia Road',
              city: 'Varanasi',
              state: 'Uttar Pradesh',
              pincode: '221001',
              latitude: 25.3176,
              longitude: 82.9739,
              capacity: 10000,
              currentStock: 7500,
            },
          ],
        },
      },
    }),
    prisma.vendor.create({
      data: {
        businessName: 'Khadi Handlooms India',
        gstin: '27BBBCC1206D1Z6',
        trustScore: 92.3,
        kycStatus: 'approved',
        contactName: 'Sunita Desai',
        contactEmail: 'sunita@khadihandlooms.com',
        contactPhone: '+919876540002',
        warehouses: {
          create: [
            {
              street: 'Dadar West',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400028',
              latitude: 19.0176,
              longitude: 72.8561,
              capacity: 15000,
              currentStock: 12000,
            },
          ],
        },
      },
    }),
    prisma.vendor.create({
      data: {
        businessName: 'Spice Garden Kerala',
        gstin: '32CCCDD1206D1Z7',
        trustScore: 88.7,
        kycStatus: 'approved',
        contactName: 'Krishnan Nair',
        contactEmail: 'krishnan@spicegarden.com',
        contactPhone: '+919876540003',
        warehouses: {
          create: [
            {
              street: 'Fort Kochi',
              city: 'Kochi',
              state: 'Kerala',
              pincode: '682001',
              latitude: 9.9674,
              longitude: 76.2848,
              capacity: 8000,
              currentStock: 5500,
            },
          ],
        },
      },
    }),
    prisma.vendor.create({
      data: {
        businessName: 'Pottery Artisans Collective',
        gstin: '24DDDEE1206D1Z8',
        trustScore: 78.9,
        kycStatus: 'approved',
        contactName: 'Meena Kumari',
        contactEmail: 'meena@potteryartisans.com',
        contactPhone: '+919876540004',
        warehouses: {
          create: [
            {
              street: 'Digha Road',
              city: 'Patna',
              state: 'Bihar',
              pincode: '800011',
              latitude: 25.5941,
              longitude: 85.1376,
              capacity: 5000,
              currentStock: 3000,
            },
          ],
        },
      },
    }),
    prisma.vendor.create({
      data: {
        businessName: 'Organic Cotton Traders',
        gstin: '36EEEEF1206D1Z9',
        trustScore: 90.1,
        kycStatus: 'approved',
        contactName: 'Suresh Patel',
        contactEmail: 'suresh@organiccotton.com',
        contactPhone: '+919876540005',
        warehouses: {
          create: [
            {
              street: 'Whitefield',
              city: 'Bangalore',
              state: 'Karnataka',
              pincode: '560066',
              latitude: 12.9698,
              longitude: 77.7499,
              capacity: 12000,
              currentStock: 9000,
            },
          ],
        },
      },
    }),
    // Test vendor
    prisma.vendor.create({
      data: {
        businessName: 'Test Vendor Store',
        gstin: '09TESTV1206D1Z0',
        trustScore: 75.0,
        kycStatus: 'approved',
        contactName: 'Test Vendor',
        contactEmail: 'vendor@example.com',
        contactPhone: '+919999999998',
        warehouses: {
          create: [
            {
              street: 'Test Street',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              latitude: 19.0760,
              longitude: 72.8777,
              capacity: 5000,
              currentStock: 2500,
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${vendors.length} vendors with warehouses`);

  // Create sample orders
  console.log('Creating sample orders...');
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        userId: users[0].id,
        vendorId: vendors[0].id,
        subtotal: 2499,
        cgst: 224.91,
        sgst: 224.91,
        total: 2948.82,
        status: 'delivered',
        estimatedDelivery: new Date('2026-01-15'),
        actualDelivery: new Date('2026-01-14'),
        items: {
          create: [
            {
              productId: 'prod_banarasi_saree_001',
              title: 'Red Banarasi Saree',
              quantity: 1,
              price: 2499,
              tax: 449.82,
              attributes: {
                color: 'Red',
                size: 'Standard',
                fabric: 'Silk',
              },
            },
          ],
        },
        payment: {
          create: {
            method: 'upi',
            amount: 2948.82,
            status: 'completed',
            transactionId: 'TXN20260114ABC123',
          },
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: users[1].id,
        vendorId: vendors[1].id,
        subtotal: 999,
        cgst: 89.91,
        sgst: 89.91,
        total: 1178.82,
        status: 'processing',
        estimatedDelivery: new Date('2026-02-15'),
        items: {
          create: [
            {
              productId: 'prod_cotton_kurta_001',
              title: 'Premium Cotton Kurta',
              quantity: 1,
              price: 999,
              tax: 179.82,
              attributes: {
                color: 'White',
                size: 'M',
              },
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} sample orders`);

  // Create Trust Score History
  console.log('Creating trust score history...');
  for (const vendor of vendors) {
    await prisma.trustScoreHistory.create({
      data: {
        vendorId: vendor.id,
        overallScore: vendor.trustScore,
        returnRateScore: vendor.trustScore * 0.3,
        dispatchSpeedScore: vendor.trustScore * 0.25,
        authenticityScore: vendor.trustScore * 0.25,
        customerRatingScore: vendor.trustScore * 0.2,
      },
    });
  }

  console.log('✅ Created trust score history');

  // Create sample consents
  console.log('Creating sample consents...');
  for (const user of users.slice(0, 3)) {
    await prisma.consent.create({
      data: {
        userId: user.id,
        marketing: true,
        marketingTimestamp: new Date(),
        analytics: true,
        analyticsTimestamp: new Date(),
        personalization: true,
        personalizationTimestamp: new Date(),
      },
    });
  }

  console.log('✅ Created sample consents');

  console.log('🎉 Database seed completed successfully!');
  console.log('\n📋 Test Credentials:');
  console.log('Customer: test@example.com / password123');
  console.log('Vendor: vendor@example.com / password123');
  console.log('Admin: admin@example.com / password123');
  console.log('\nAll other users also use: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
