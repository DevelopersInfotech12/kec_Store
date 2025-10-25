// src/lib/products.js
// Mock products - No database needed!

export const products = 
[
  {
    "id": "1",
    "_id": "1",
    "name": "KEC Carbon Enhancer with (Neem Oil)",
    "description": "Organic carbon enhancer with neem oil for soil enrichment and plant growth. Improves soil health and provides natural pest protection.",
    "price": 65.00,
    "image": "images/2.png",
    "category": "Organic",
    "stock": 100,
    "sku": "ORG-001",
    "isActive": true,
    "reviews": 18,
    "rating": 5
  },
  {
    "id": "2",
    "_id": "2",
    "name": "PROM",
    "description": "Phosphorus and potassium rich organic mixture for enhanced crop productivity and yield.",
    "price": 65.00,
    "image": "images/3.png",
    "category": "Organic",
    "stock": 85,
    "sku": "ORG-002",
    "isActive": true,
    "reviews": 18,
    "rating": 4
  },
  {
    "id": "3",
    "_id": "3",
    "name": "Savarika",
    "description": "Advanced nutrient supplement for comprehensive plant nourishment and disease resistance.",
    "price": 72.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/4.png",
    "category": "Organic",
    "stock": 120,
    "sku": "ORG-003",
    "isActive": true,
    "reviews": 22,
    "rating": 4
  },
  {
    "id": "4",
    "_id": "4",
    "name": "Organic Potash",
    "description": "Natural organic potash supplement for improving fruit quality and crop resistance.",
    "price": 72.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/5.png",
    "category": "Organic",
    "stock": 95,
    "sku": "ORG-004",
    "isActive": true,
    "reviews": 21,
    "rating": 4
  },
  {
    "id": "5",
    "_id": "5",
    "name": "KECHUMIC",
    "description": "Humic acid based organic supplement for enhanced nutrient absorption and soil fertility.",
    "price": 72.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/6.png",
    "category": "Organic",
    "stock": 75,
    "sku": "ORG-005",
    "isActive": true,
    "reviews": 23,
    "rating": 4
  },
  {
    "id": "6",
    "_id": "6",
    "name": "KEC Carbon Enhancer with (Seaweed Extract)",
    "description": "Bio-fertilizer with seaweed extract for improved plant growth and stress tolerance.",
    "price": 65.00,
    "image": "images/7.png",
    "category": "Bio-Fertilizer",
    "stock": 110,
    "sku": "BIO-001",
    "isActive": true,
    "reviews": 18,
    "rating": 5
  },
  {
    "id": "7",
    "_id": "7",
    "name": "Neem Cake",
    "description": "Organic neem cake for natural pest control and soil conditioning with slow-release nutrients.",
    "price": 65.00,
    "image": "images/8.png",
    "category": "Bio-Fertilizer",
    "stock": 130,
    "sku": "BIO-002",
    "isActive": true,
    "reviews": 18,
    "rating": 4
  },
  {
    "id": "8",
    "_id": "8",
    "name": "N.P.K",
    "description": "Balanced NPK fertilizer (19:19:19) for all-round plant nutrition and vigorous growth.",
    "price": 350.00,
    "image": "images/9.png",
    "category": "Chemical",
    "stock": 200,
    "sku": "CHEM-001",
    "isActive": true,
    "reviews": 18,
    "rating": 5
  },
  {
    "id": "9",
    "_id": "9",
    "name": "Mono Potassium Phosphate",
    "description": "High-quality mono potassium phosphate (0:52:34) for enhanced flowering and fruiting.",
    "price": 225.00,
    "image": "images/10.png",
    "category": "Chemical",
    "stock": 150,
    "sku": "CHEM-002",
    "isActive": true,
    "reviews": 18,
    "rating": 5
  },
  {
    "id": "10",
    "_id": "10",
    "name": "Potassium Nitrate",
    "description": "Premium potassium nitrate (13:0:45) fertilizer for improved crop quality and yield.",
    "price": 275.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/11.png",
    "category": "Chemical",
    "stock": 140,
    "sku": "CHEM-003",
    "isActive": true,
    "reviews": 32,
    "rating": 5,
    "featured": true
  },
  {
    "id": "11",
    "_id": "11",
    "name": "Sulfur Bentonite (90%)",
    "description": "High concentration sulfur bentonite for soil pH management and sulfur supplementation.",
    "price": 350.00,
    "originalPrice": 350.00,
    "discount": "15% OFF",
    "image": "images/12.png",
    "category": "Chemical",
    "stock": 125,
    "sku": "CHEM-004",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "12",
    "_id": "12",
    "name": "Potassium Sulphate Fertilizer",
    "description": "Potassium sulphate fertilizer (0:0:50) for chloride-sensitive crops and quality improvement.",
    "price": 225.00,
    "discount": "15% OFF",
    "image": "images/13.png",
    "category": "Chemical",
    "stock": 160,
    "sku": "CHEM-005",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "13",
    "_id": "13",
    "name": "Mono Ammonium Phosphate",
    "description": "Mono ammonium phosphate (12:61:0) for early stage plant development and root growth.",
    "price": 225.00,
    "discount": "15% OFF",
    "image": "images/14.png",
    "category": "Chemical",
    "stock": 135,
    "sku": "CHEM-006",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "14",
    "_id": "14",
    "name": "Di Sodium Terta Borate Penta Hydrate",
    "description": "Boron supplement for preventing boron deficiency and improving crop quality.",
    "price": 600.00,
    "discount": "15% OFF",
    "image": "images/15.png",
    "category": "Chemical",
    "stock": 90,
    "sku": "CHEM-007",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "15",
    "_id": "15",
    "name": "Calcium Nitrate",
    "description": "Calcium nitrate fertilizer for preventing blossom end rot and strengthening cell walls.",
    "price": 72.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/16.png",
    "category": "Chemical",
    "stock": 145,
    "sku": "CHEM-008",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "16",
    "_id": "16",
    "name": "Magnesium Sulphate",
    "description": "Magnesium sulphate for photosynthesis enhancement and chlorophyll production.",
    "price": 140.00,
    "originalPrice": 85.00,
    "discount": "15% OFF",
    "image": "images/17.png",
    "category": "Chemical",
    "stock": 155,
    "sku": "CHEM-009",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "17",
    "_id": "17",
    "name": "Zinc Sulphate Monohydrate (33%)",
    "description": "Zinc sulphate supplement for enzyme activation and hormone production in plants.",
    "price": 250.00,
    "discount": "15% OFF",
    "image": "images/18.png",
    "category": "Chemical",
    "stock": 170,
    "sku": "CHEM-010",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "18",
    "_id": "18",
    "name": "Micro Nutrient Mixture",
    "description": "Complete micro nutrient mixture for addressing multiple nutrient deficiencies.",
    "price": 350.00,
    "discount": "15% OFF",
    "image": "images/19.png",
    "category": "Chemical",
    "stock": 115,
    "sku": "CHEM-011",
    "isActive": true,
    "reviews": 32,
    "rating": 5
  },
  {
    "id": "19",
    "_id": "19",
    "name": "Stoper FX",
    "description": "Plant growth regulator for controlling excessive vegetative growth and improving yield.",
    "price": 65.00,
    "image": "images/2.png",
    "category": "Pesticides",
    "stock": 80,
    "sku": "PEST-001",
    "isActive": true,
    "reviews": 18,
    "rating": 5,
    "status": "Coming Soon"
  },
  {
    "id": "20",
    "_id": "20",
    "name": "NPK Consortia Liquid",
    "description": "Liquid NPK consortia with beneficial microorganisms for enhanced nutrient availability.",
    "price": 65.00,
    "image": "images/20.png",
    "category": "Pesticides",
    "stock": 95,
    "sku": "PEST-002",
    "isActive": true,
    "reviews": 18,
    "rating": 4,
    "status": "Coming Soon"
  },
  {
    "id": "21",
    "_id": "21",
    "name": "BIO Kitshatru",
    "description": "Biological pesticide for natural pest control using beneficial microorganisms.",
    "price": 72.00,
    "originalPrice": 85.00,
    "discount": "16% OFF",
    "image": "images/21.png",
    "category": "Pesticides",
    "stock": 105,
    "sku": "PEST-003",
    "isActive": true,
    "reviews": 32,
    "rating": 4,
    "status": "Coming Soon"
  },

]

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