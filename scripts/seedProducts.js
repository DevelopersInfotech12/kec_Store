// scripts/seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  sku: String,
  isActive: Boolean,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    image: '/images/headphones.jpg',
    category: 'Electronics',
    stock: 50,
    sku: 'ELEC-001',
    isActive: true,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and sleep tracking.',
    price: 299.99,
    image: '/images/watch.jpg',
    category: 'Electronics',
    stock: 30,
    sku: 'ELEC-002',
    isActive: true,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery. Perfect for outdoor adventures.',
    price: 79.99,
    image: '/images/speaker.jpg',
    category: 'Electronics',
    stock: 75,
    sku: 'ELEC-003',
    isActive: true,
  },
  {
    name: 'Leather Laptop Bag',
    description: 'Premium leather laptop bag with multiple compartments and padded protection for devices up to 15 inches.',
    price: 149.99,
    image: '/images/bag.jpg',
    category: 'Accessories',
    stock: 40,
    sku: 'ACC-001',
    isActive: true,
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    image: '/images/charger.jpg',
    category: 'Accessories',
    stock: 100,
    sku: 'ACC-002',
    isActive: true,
  },
  {
    name: 'USB-C Hub Adapter',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery support.',
    price: 59.99,
    image: '/images/hub.jpg',
    category: 'Accessories',
    stock: 60,
    sku: 'ACC-003',
    isActive: true,
  },
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    console.log('Inserting sample products...');
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Inserted ${inserted.length} products successfully!`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now run: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();