// src/lib/products.js
// Mock products - No database needed!

export const products = [
  {
    id: '1',
    _id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who demand the best audio experience.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    sku: 'ELEC-001',
    isActive: true,
  },
  {
    id: '2',
    _id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    sku: 'ELEC-002',
    isActive: true,
  },
  {
    id: '3',
    _id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery. Perfect for outdoor adventures, beach trips, and parties.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 75,
    sku: 'ELEC-003',
    isActive: true,
  },
  {
    id: '4',
    _id: '4',
    name: 'Leather Laptop Bag',
    description: 'Premium genuine leather laptop bag with multiple compartments and padded protection for devices up to 15 inches. Professional and stylish.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 40,
    sku: 'ACC-001',
    isActive: true,
  },
  {
    id: '5',
    _id: '5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1591290619762-d49b43e3d1d5?w=500',
    category: 'Accessories',
    stock: 100,
    sku: 'ACC-002',
    isActive: true,
  },
  {
    id: '6',
    _id: '6',
    name: 'USB-C Hub Adapter',
    description: '7-in-1 USB-C hub with HDMI 4K output, 3x USB 3.0 ports, SD/TF card reader, and 100W power delivery support. Essential for modern laptops.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    category: 'Accessories',
    stock: 60,
    sku: 'ACC-003',
    isActive: true,
  },
  {
    id: '7',
    _id: '7',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical gaming keyboard with Cherry MX switches, customizable macros, and anti-ghosting technology for competitive gaming.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500',
    category: 'Electronics',
    stock: 45,
    sku: 'ELEC-004',
    isActive: true,
  },
  {
    id: '8',
    _id: '8',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI, 6 programmable buttons, and long battery life. Perfect for productivity and gaming.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'Accessories',
    stock: 80,
    sku: 'ACC-004',
    isActive: true,
  },
];

// Get all products
export function getProducts() {
  return products.filter(p => p.isActive);
}

// Get product by ID
export function getProductById(id) {
  return products.find(p => (p.id === id || p._id === id) && p.isActive);
}

// Get products by category
export function getProductsByCategory(category) {
  return products.filter(p => p.category === category && p.isActive);
}

// Search products
export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.isActive && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    )
  );
}

export default {
  products,
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
};