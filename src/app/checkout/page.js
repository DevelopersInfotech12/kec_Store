'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Verify payment on backend
      const verifyResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success && verifyData.isValid) {
        clearCart();
        router.push(`/success?orderId=${verifyData.orderId}&paymentId=${response.razorpay_payment_id}`);
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error.description || 'Please try again'}`);
    setLoading(false);
  };

  const initializeRazorpay = (orderData) => {
    const options = {
      key: orderData.razorpayKey,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Your Store Name',
      description: 'Product Purchase',
      order_id: orderData.orderId,
      prefill: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        contact: orderData.customerPhone,
      },
      theme: {
        color: '#3B82F6', // Your primary color
      },
      handler: handlePaymentSuccess,
      modal: {
        ondismiss: () => {
          setLoading(false);
          alert('Payment cancelled');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', handlePaymentError);
    razorpay.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!window.Razorpay) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }
    
    setLoading(true);

    try {
      // Prepare items for order
      const items = cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // Calculate total
      const totalAmount = getTotal();
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create payment order
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          orderId: orderId,
          amount: totalAmount,
          currency: 'INR',
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          metadata: {
            items: items,
            shippingAddress: formData.address,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Initialize Razorpay payment
        initializeRazorpay(data);
      } else {
        alert(data.error || 'Failed to initiate payment. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push('/products')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-emerald-800 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Customer Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-black placeholder-gray-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER YOUR FULL NAME HERE"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-black placeholder-gray-300  ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER YOUR EMAIL ADDRESS HERE"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-black placeholder-gray-300 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER YOUR PHONE NUMBER HERE"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Shipping Address *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-black placeholder-gray-300 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ENTER YOUR SHIPPING ADDRESS HERE"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map(item => {
                const itemId = item._id || item.id;
                return (
                  <div key={itemId} className="flex items-start space-x-4 pb-4 border-b">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-xl">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-2 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>Included</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xl font-bold text-emerald-700">
              <span>Total:</span>
              <span className="text-primary text-2xl">₹{getTotal().toFixed(2)}</span>
            </div>
            
            <div className="mt-6 p-4 bg-emerald-700 rounded-lg">
              <p className="text-sm text-white">
                <span className="font-semibold">🔒 Secure Checkout</span>
                <br />
                Your payment information is encrypted and secure with Razorpay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}