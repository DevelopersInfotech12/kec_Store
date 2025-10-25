'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-lg p-6 animate-pulse">
        <p className="text-gray-400">Product not available</p>
      </div>
    );
  }

  const productId = product._id || product.id;
  const productImage = product.image || product.imageUrl;
  const productName = product.name || 'Unnamed Product';
  const productDescription = product.description || 'No description available';
  const productPrice = product.price || 0;
  const productStock = product.stock !== undefined ? product.stock : 0;
  const productCategory = product.category || 'Uncategorized';

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      addToCart(product);
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-emerald-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-green-500/0 group-hover:from-emerald-500/10 group-hover:via-teal-500/10 group-hover:to-green-500/10 transition-all duration-700 pointer-events-none z-10" />

      {/* Floating orbs */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-400/20 to-emerald-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000 translate-y-16 -translate-x-16" />

      {/* Stock badge with animation */}
      {productStock > 0 && productStock <= 10 && (
        <div className="absolute top-5 right-5 z-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl animate-bounce">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-ping absolute" />
            <span className="w-2 h-2 bg-white rounded-full mr-2" />
            Only {productStock} left!
          </span>
        </div>
      )}

      {/* Image container with enhanced effects */}
      <div className="relative h-80 bg-gradient-to-br from-emerald-100/50 via-teal-100/30 to-green-100/50 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),rgba(5,150,105,0))]" />

        {productImage ? (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-emerald-200 rounded-full" />
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
                </div>
              </div>
            )}
            <img
              src={productImage}
              alt={productName}
              className={`h-full my-4 mx-auto bg-transparent object-cover transform transition-all duration-1000  ${isImageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-125 rotate-2' : 'scale-100 rotate-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%2310b981" width="200" height="200"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
                setIsImageLoaded(true);
              }}
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="text-emerald-300 text-7xl transform transition-all duration-700 inline-block" style={{
                transform: isHovered ? 'scale(1.3) rotate(10deg)' : 'scale(1) rotate(0deg)'
              }}>📦</span>
              <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
            </div>
          </div>
        )}

        {/* Floating category badge */}
        <div className="absolute top-5 left-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500"
          style={{
            transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
          }}
        >
          <span className="text-sm font-bold tracking-wide uppercase">
            {productCategory}
          </span>
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <Link
            href={`/products/${productId}`}
            className="bg-white text-emerald-600 px-6 py-3 rounded-2xl font-bold shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 hover:scale-110"
          >
            Quick View →
          </Link>
        </div>
      </div>

      {/* Content section with glassmorphism */}
      <div className="relative p-7 space-y-5 backdrop-blur-sm">
        {/* Title with gradient */}
        <h3 className="text-2xl font-bold leading-tight bg-gradient-to-r from-emerald-700 via-teal-600 to-green-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:via-teal-500 group-hover:to-green-500 transition-all duration-500">
          {productName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 h-10">
          {productDescription}
        </p>

        {/* Stock indicator with enhanced design */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-inner">
          <div className="relative flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${productStock > 10 ? 'bg-emerald-500' : productStock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {productStock > 0 && (
                <div className={`absolute inset-0 rounded-full ${productStock > 10 ? 'bg-emerald-500' : 'bg-yellow-500'} animate-ping opacity-75`} />
              )}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {productStock > 10 ? '✓ In Stock' : productStock > 0 ? `⚡ ${productStock} left` : '✗ Out of Stock'}
            </span>
          </div>
        </div>

        {/* Price section with mega emphasis */}
        <div className="pt-5 border-t-2 border-emerald-100">
          <div className="mb-5">
            <p className="text-xs font-semibold text-emerald-600 mb-2 uppercase tracking-wider">Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 bg-clip-text text-transparent">
                ₹{typeof productPrice === 'number' ? productPrice.toFixed(2) : '0.00'}
              </span>
              <span className="text-gray-400 line-through text-lg">₹{(productPrice * 1.3).toFixed(2)}</span>
            </div>
          </div>

          {/* Action buttons with advanced effects */}
          <div className="flex gap-3">
            <Link
              href={`/products/${productId}`}
              className="flex-1 relative overflow-hidden px-5 py-4 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-emerald-300 group/btn"
            >
              <span className="relative z-10 group-hover/btn:text-emerald-600 transition-colors">Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={productStock === 0 || isAdding}
              className="flex-[1.5] relative overflow-hidden px-5 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn"
              style={{
                transform: isHovered && productStock > 0 && !isAdding ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="relative">
                    <div className="w-5 h-5 border-3 border-white/30 rounded-full" />
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
                  </div>
                  <span className="font-bold">Adding...</span>
                </span>
              ) : productStock === 0 ? (
                <span className="flex items-center justify-center gap-2">
                  <span>😔</span> Sold Out
                </span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>🛒</span> Add to Cart
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left" />
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 transform translate-x-16 -translate-y-16 rotate-45 group-hover:translate-x-12 group-hover:-translate-y-12 transition-all duration-700 rounded-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/20 to-emerald-500/20 transform -translate-x-12 translate-y-12 rotate-45 group-hover:-translate-x-8 group-hover:translate-y-8 transition-all duration-700 rounded-3xl" />
    </div>
  );
}