import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nc-ecommerce';

const products = [
  {
    _id: 'prod_banarasi_saree_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Red Banarasi Saree',
      hi: 'लाल बनारसी साड़ी',
    },
    description: {
      en: 'Authentic handwoven Banarasi silk saree in vibrant red with traditional gold zari work. Perfect for weddings and special occasions.',
      hi: 'शादियों और विशेष अवसरों के लिए एकदम सही, जीवंत लाल रंग में पारंपरिक सोने की ज़री के काम के साथ प्रामाणिक हथकरघा बनारसी रेशम साड़ी।',
    },
    price: 2499,
    mrp: 4999,
    category: ['fashion', 'sarees', 'ethnic-wear'],
    attributes: {
      fabric: 'Pure Silk',
      color: ['Red', 'Gold'],
      occasion: 'Wedding',
      care: 'Dry Clean Only',
    },
    media: {
      images: [
        'https://picsum.photos/seed/saree1/800/1000',
        'https://picsum.photos/seed/saree2/800/1000',
      ],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Banarasi Silk Emporium, Varanasi, UP',
      isGITagged: true,
      giTagDetails: 'Banarasi Silk - GI Tag Certified',
      unitSalePrice: { value: 2499, unit: 'piece' },
    },
    seo: {
      slug: 'red-banarasi-saree-wedding-silk',
      metaTitle: 'Red Banarasi Silk Saree | Handwoven | GI Tagged',
      metaDescription: 'Buy authentic red Banarasi silk saree with gold zari work. GI tagged, perfect for weddings.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_001',
        quantity: 25,
        location: { city: 'Varanasi', state: 'Uttar Pradesh' },
      },
    ],
    rating: 4.8,
    reviews: 156,
    soldCount: 420,
    trending: true,
  },
  {
    _id: 'prod_cotton_kurta_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Premium Cotton Kurta',
      hi: 'प्रीमियम कॉटन कुर्ता',
    },
    description: {
      en: 'Comfortable premium cotton kurta for men. Breathable fabric, perfect for daily wear and festivals.',
      hi: 'पुरुषों के लिए आरामदायक प्रीमियम कॉटन कुर्ता। सांस लेने योग्य कपड़ा, दैनिक पहनने और त्योहारों के लिए एकदम सही।',
    },
    price: 999,
    mrp: 1999,
    category: ['fashion', 'men', 'kurta'],
    attributes: {
      fabric: 'Premium Cotton',
      color: ['White', 'Blue', 'Green'],
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      fit: 'Regular',
    },
    media: {
      images: [
        'https://picsum.photos/seed/kurta1/800/1000',
        'https://picsum.photos/seed/kurta2/800/1000',
      ],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Khadi Handlooms India, Mumbai, MH',
      isGITagged: false,
      unitSalePrice: { value: 999, unit: 'piece' },
    },
    seo: {
      slug: 'premium-cotton-kurta-men',
      metaTitle: 'Premium Cotton Kurta for Men | Comfortable | 50% OFF',
      metaDescription: 'Buy premium cotton kurta at 50% discount. Breathable, comfortable for daily wear.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_002',
        quantity: 150,
        location: { city: 'Mumbai', state: 'Maharashtra' },
      },
    ],
    rating: 4.5,
    reviews: 89,
    soldCount: 320,
    trending: true,
  },
  {
    _id: 'prod_spice_collection_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Organic Spice Collection',
      hi: 'ऑर्गेनिक मसाला संग्रह',
    },
    description: {
      en: 'Premium organic spice collection from Kerala. Includes cardamom, black pepper, cinnamon, cloves, and nutmeg.',
      hi: 'केरल से प्रीमियम ऑर्गेनिक मसाला संग्रह। इसमें इलायची, काली मिर्च, दालचीनी, लौंग और जायफल शामिल हैं।',
    },
    price: 599,
    mrp: 899,
    category: ['grocery', 'spices', 'organic'],
    attributes: {
      type: 'Organic',
      weight: '500g',
      contains: ['Cardamom 100g', 'Black Pepper 100g', 'Cinnamon 100g', 'Cloves 100g', 'Nutmeg 100g'],
    },
    media: {
      images: [
        'https://picsum.photos/seed/spice1/800/800',
        'https://picsum.photos/seed/spice2/800/800',
      ],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Spice Garden Kerala, Kochi, KL',
      isGITagged: true,
      giTagDetails: 'Kerala Spices - GI Tag Certified',
      expiryDate: new Date('2027-12-31'),
      unitSalePrice: { value: 1198, unit: 'kg' },
    },
    seo: {
      slug: 'organic-spice-collection-kerala',
      metaTitle: 'Organic Spice Collection | Kerala | GI Tagged',
      metaDescription: 'Buy authentic Kerala organic spices. GI tagged, pure and fresh.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_003',
        quantity: 200,
        location: { city: 'Kochi', state: 'Kerala' },
      },
    ],
    rating: 4.9,
    reviews: 234,
    soldCount: 650,
    trending: true,
  },
  {
    _id: 'prod_pottery_set_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Handcrafted Pottery Set',
      hi: 'हस्तनिर्मित मिट्टी के बर्तन सेट',
    },
    description: {
      en: 'Beautiful handcrafted pottery set of 6 pieces. Traditional designs, perfect for home decor and gifting.',
      hi: '6 टुकड़ों का सुंदर हस्तनिर्मित मिट्टी के बर्तन सेट। पारंपरिक डिज़ाइन, घर की सजावट और उपहार के लिए एकदम सही।',
    },
    price: 1299,
    mrp: 2199,
    category: ['home-living', 'decor', 'handcrafted'],
    attributes: {
      material: 'Clay',
      pieces: 6,
      type: ['Bowls', 'Cups'],
      finish: 'Glazed',
    },
    media: {
      images: [
        'https://picsum.photos/seed/pottery1/800/800',
        'https://picsum.photos/seed/pottery2/800/800',
      ],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Pottery Artisans Collective, Patna, BR',
      isGITagged: false,
      unitSalePrice: { value: 1299, unit: 'set' },
    },
    seo: {
      slug: 'handcrafted-pottery-set-6-pieces',
      metaTitle: 'Handcrafted Pottery Set | 6 Pieces | Traditional',
      metaDescription: 'Buy handcrafted pottery set. Perfect for home decor and gifting.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_004',
        quantity: 45,
        location: { city: 'Patna', state: 'Bihar' },
      },
    ],
    rating: 4.6,
    reviews: 67,
    soldCount: 180,
    trending: true,
  },
  // Additional products
  {
    _id: 'prod_silk_dupatta_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Designer Silk Dupatta',
      hi: 'डिज़ाइनर सिल्क दुपट्टा',
    },
    description: {
      en: 'Elegant designer silk dupatta with intricate embroidery. Perfect complement to any ethnic outfit.',
      hi: 'जटिल कढ़ाई के साथ सुरुचिपूर्ण डिज़ाइनर सिल्क दुपट्टा। किसी भी जातीय पोशाक के लिए एकदम सही पूरक।',
    },
    price: 799,
    mrp: 1599,
    category: ['fashion', 'accessories', 'dupatta'],
    attributes: {
      fabric: 'Silk',
      color: ['Pink', 'Blue', 'Green'],
      length: '2.5 meters',
    },
    media: {
      images: ['https://picsum.photos/seed/dupatta1/800/1000'],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Banarasi Silk Emporium, Varanasi, UP',
      isGITagged: true,
      giTagDetails: 'Banarasi Silk - GI Tag Certified',
      unitSalePrice: { value: 799, unit: 'piece' },
    },
    seo: {
      slug: 'designer-silk-dupatta',
      metaTitle: 'Designer Silk Dupatta | GI Tagged | Embroidered',
      metaDescription: 'Beautiful silk dupatta with embroidery work.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_001',
        quantity: 60,
        location: { city: 'Varanasi', state: 'Uttar Pradesh' },
      },
    ],
    rating: 4.7,
    reviews: 45,
    soldCount: 125,
    trending: false,
  },
  {
    _id: 'prod_organic_tea_001',
    vendorId: 'will_be_replaced',
    title: {
      en: 'Organic Darjeeling Tea',
      hi: 'ऑर्गेनिक दार्जिलिंग चाय',
    },
    description: {
      en: 'Premium organic Darjeeling tea. Fresh, aromatic, and full of flavor.',
      hi: 'प्रीमियम ऑर्गेनिक दार्जिलिंग चाय। ताज़ा, सुगंधित और स्वाद से भरपूर।',
    },
    price: 399,
    mrp: 599,
    category: ['grocery', 'beverages', 'tea'],
    attributes: {
      type: 'Organic Black Tea',
      weight: '250g',
      origin: 'Darjeeling',
    },
    media: {
      images: ['https://picsum.photos/seed/tea1/800/800'],
      videos: [],
    },
    compliance: {
      countryOfOrigin: 'India',
      manufacturerDetails: 'Spice Garden Kerala, Kochi, KL',
      isGITagged: true,
      giTagDetails: 'Darjeeling Tea - GI Tag Certified',
      expiryDate: new Date('2027-06-30'),
      unitSalePrice: { value: 1596, unit: 'kg' },
    },
    seo: {
      slug: 'organic-darjeeling-tea',
      metaTitle: 'Organic Darjeeling Tea | GI Tagged | 250g',
      metaDescription: 'Premium Darjeeling tea, organic and aromatic.',
    },
    inventory: [
      {
        warehouseId: 'warehouse_003',
        quantity: 300,
        location: { city: 'Kochi', state: 'Kerala' },
      },
    ],
    rating: 4.8,
    reviews: 189,
    soldCount: 450,
    trending: false,
  },
];

async function seedProducts() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🌱 Starting MongoDB product seed...');
    await client.connect();
    const db = client.db();
    const productsCollection = db.collection('products');

    // Clear existing products
    await productsCollection.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert products
    await productsCollection.insertMany(products);
    console.log(`✅ Created ${products.length} products`);

    console.log('🎉 MongoDB product seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedProducts();
