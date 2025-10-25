'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, Package } from 'lucide-react';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, getTotal, isOpen, setIsOpen, getItemCount } = useCart();
  const router = useRouter();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      {/* Backdrop - Only show when open */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      {/* Sidebar - Always rendered, slides in/out */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with Gradient */}
        <div className="p-4 border-b border-emerald-200 bg-gradient-to-r from-emerald-500 to-teal-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <p className="text-sm text-emerald-100">{getItemCount()} items in cart</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition w-10 h-10 flex items-center justify-center backdrop-blur-sm"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-emerald-500" />
              </div>
              <p className="text-gray-600 mb-4 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-500 text-sm mb-6">Add products to get started!</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/products');
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition font-semibold inline-flex items-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const itemId = item._id || item.id;
                const itemPrice = item.price || 0;
                const itemQuantity = item.quantity || 1;
                
                return (
                  <div key={itemId} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-emerald-100">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="fallback-icon hidden items-center justify-center w-full h-full" style={{ display: item.image ? 'none' : 'flex' }}>
                          <Package className="w-8 h-8 text-emerald-500" />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.name}</h3>
                        <p className="text-emerald-600 font-bold text-lg mb-3">₹{itemPrice.toFixed(2)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 bg-emerald-50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                              className="w-8 h-8 bg-white rounded-md hover:bg-emerald-100 flex items-center justify-center transition shadow-sm"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 text-emerald-600" />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-900">{itemQuantity}</span>
                            <button
                              onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                              disabled={item.stock && itemQuantity >= item.stock}
                              className="w-8 h-8 bg-white rounded-md hover:bg-emerald-100 flex items-center justify-center transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 text-emerald-600" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(itemId)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Subtotal */}
                        <div className="mt-2 pt-2 border-t border-emerald-100">
                          <p className="text-xs text-gray-500">Subtotal:</p>
                          <p className="text-sm font-bold text-gray-900">
                            ₹{(itemPrice * itemQuantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-emerald-200 p-5 bg-white">
            <div className="mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Shipping:</span>
                <span className="text-emerald-600 font-bold">Free</span>
              </div>
              <div className="border-t border-emerald-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-700">Total Amount:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    ₹{getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl hover:shadow-lg transition font-bold text-lg flex items-center justify-center space-x-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-3 bg-white text-gray-700 py-3 rounded-xl hover:bg-emerald-50 transition font-semibold border-2 border-emerald-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}