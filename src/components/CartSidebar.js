'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-blue-600 text-white">
          <div>
            <h2 className="text-2xl font-bold">Cart</h2>
            <p className="text-sm text-blue-100">{getItemCount()} items</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-700 rounded-full p-2 transition w-10 h-10 flex items-center justify-center text-2xl font-bold"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/products');
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => {
                const itemId = item._id || item.id;
                const itemPrice = item.price || 0;
                const itemQuantity = item.quantity || 1;
                
                return (
                  <div key={itemId} className="flex items-start space-x-4 border-b pb-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <span className="text-2xl" style={{ display: item.image ? 'none' : 'block' }}>📦</span>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">${itemPrice.toFixed(2)} each</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center font-bold transition"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{itemQuantity}</span>
                        <button
                          onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                          disabled={item.stock && itemQuantity >= item.stock}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(itemId)}
                          className="ml-auto text-red-500 hover:text-red-700 text-sm font-semibold transition"
                        >
                          Remove
                        </button>
                      </div>
                      
                      {/* Subtotal */}
                      <p className="text-sm font-bold text-gray-900 mt-2">
                        Subtotal: ${(itemPrice * itemQuantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Shipping:</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-3 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition font-semibold border border-gray-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}