'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // ✅ Category mapping: Button Label -> Actual Database Category
  const categoryConfig = [
    { label: 'ORGANIC', dbValue: 'Organic' },
    { label: 'BIOFERTILIZERS', dbValue: 'Bio-Fertilizer' },
    { label: 'PESTICIDES', dbValue: 'Pesticides' },
    { label: 'FERTILIZERS', dbValue: 'Chemical' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      if (data.success) {
        const validProducts = (data.data || []).filter(product =>
          product && product.name && product.price !== undefined
        );
        setProducts(validProducts);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Filter with proper category mapping
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Map button category to actual database category
    let matchesCategory = selectedCategory === 'all';
    
    if (!matchesCategory) {
      const categoryItem = categoryConfig.find(c => c.label === selectedCategory);
      if (categoryItem) {
        matchesCategory = product.category === categoryItem.dbValue;
      }
    }

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="text-center py-20 font-bold text-2xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      <div className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

        

          {/* Category Navigation */}
          <div className="mb-8 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-900 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-emerald-100 p-4">
            <div className="flex flex-wrap gap-2 justify-center">

              {/* ALL PRODUCTS */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                🌟 ALL PRODUCTS
              </button>

              {/* Category Buttons */}
              {categoryConfig.map((category) => (
                <button
                  key={category.label}
                  onClick={() => setSelectedCategory(category.label)}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                    selectedCategory === category.label
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

            {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-gray-900"
            />
          </div>

          {/* Results Counter */}
          <div className="mb-4 text-center">
            <p className="text-gray-600 font-semibold">
              Showing {filteredProducts.length} of {products.length} products
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-gray-500 text-lg">No products found.</p>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id || product.id || index} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
