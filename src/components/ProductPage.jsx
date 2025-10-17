'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Category structure matching your menu
  const categoryStructure = {
    'AGRI INPUTS': ['All', 'Item 1', 'Item 2', 'Item 3'],
    'SMART FARMING': ['All', 'Technology 1', 'Technology 2'],
    'SERVICES': ['All', 'Service 1', 'Service 2'],
    'SOLAR PRODUCTS': ['All', 'Solar Panel', 'Solar Battery'],
    'CATTLE FEED': ['All', 'Feed Type 1', 'Feed Type 2'],
    'ELECTRIC VEHICLE': ['All', 'EV Model 1', 'EV Model 2'],
    'FARM EQUIVALENT': ['All', 'Equipment 1', 'Equipment 2'],
    'FERTILIZERS': ['ORGANIC', 'BIOFERTILIZERS', 'CHEMICAL'],
    'PESTICIDES': ['All', 'Type 1', 'Type 2'],
    'SEEDS': ['All', 'Vegetable Seeds', 'Crop Seeds']
  };

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
      console.log('API Response:', data);
      
      if (data.success) {
        const validProducts = (data.data || []).filter(product => {
          if (!product) return false;
          if (!product.name || product.price === undefined) return false;
          return true;
        });
        
        setProducts(validProducts);
      } else {
        setError(data.error || 'Failed to load products');
      }
    } catch (err) {
      setError(err.message || 'Failed to load products');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || 
                               selectedSubcategory === 'All' || 
                               product.subcategory === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    setActiveDropdown(null);
  };

  const handleSubcategorySelect = (subcategory) => {
    // If "All" is selected, reset to show all products in the category
    if (subcategory === 'All') {
      setSelectedSubcategory('all');
    } else {
      setSelectedSubcategory(subcategory);
    }
    setActiveDropdown(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 border-8 border-emerald-200 rounded-full" />
              <div className="w-24 h-24 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
              <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
                🛍️
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
              Loading Products
            </h2>
            <p className="text-gray-600 text-lg animate-pulse">Fetching amazing deals for you...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl" />
        
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="text-center bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border-2 border-red-100 max-w-md">
            <div className="text-8xl mb-6 animate-bounce">😢</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-8 text-lg font-semibold bg-red-50 p-4 rounded-2xl">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-700 hover:to-teal-700 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      
      <div className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-6xl animate-bounce inline-block">🛍️</span>
            </div>
            <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
              Our Premium Collection
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing products crafted with care
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-8 bg-[radial-gradient(circle_at_center,_#013d32_0%,_#001a15_60%,_#000d0c_100%)] backdrop-blur-sm rounded-2xl shadow-xl border-2 border-emerald-100 p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {/* All Products Button */}
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                🌟 ALL PRODUCTS
              </button>

              {/* Category Buttons with Dropdowns */}
              {Object.keys(categoryStructure).map((category) => (
                <div key={category} className="relative">
                  <button
                    onClick={() => {
                      if (activeDropdown === category) {
                        setActiveDropdown(null);
                      } else {
                        setActiveDropdown(category);
                        handleCategorySelect(category);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                    }`}
                  >
                    {category}
                    <span className="text-xs">▼</span>
                  </button>

                  {/* Subcategory Dropdown */}
                  {activeDropdown === category && (
                    <div className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border-2 border-emerald-100 py-2 min-w-[200px] z-50">
                      {categoryStructure[category].map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategorySelect(subcategory)}
                          className={`w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors font-semibold ${
                            selectedSubcategory === subcategory
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-700'
                          }`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                    {selectedCategory}
                    <button
                      onClick={() => handleCategorySelect('all')}
                      className="hover:text-emerald-900"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {selectedSubcategory !== 'all' && (
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                    {selectedSubcategory}
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className="hover:text-teal-900"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="🔍 Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl shadow-xl focus:outline-none focus:border-emerald-500 focus:shadow-2xl transition-all duration-300 text-lg font-semibold text-gray-700 placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-emerald-100">
              <div className="text-2xl font-bold text-emerald-600">{filteredProducts.length}</div>
              <div className="text-xs text-gray-600 font-semibold">Results</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-teal-100">
              <div className="text-2xl font-bold text-teal-600">{products.length}</div>
              <div className="text-xs text-gray-600 font-semibold">Total Products</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg border border-green-100">
              <div className="text-2xl font-bold text-green-600">{products.filter(p => p.stock > 0).length}</div>
              <div className="text-xs text-gray-600 font-semibold">In Stock</div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-emerald-100">
              <div className="text-8xl mb-4 animate-bounce">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Clear Search
                  </button>
                )}
                {(selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className="bg-white text-emerald-600 px-6 py-3 rounded-xl hover:bg-emerald-50 font-bold shadow-lg border-2 border-emerald-200 transform hover:scale-105 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                if (!product) return null;
                
                const key = product._id || product.id || `product-${index}`;
                return (
                  <div
                    key={key}
                    className="animate-fade-in"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center text-xl z-50"
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}