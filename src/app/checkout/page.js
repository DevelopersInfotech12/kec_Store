'use client';

import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [cart] = useState([
    { _id: '1', name: 'Premium Wireless Headphones', price: 2499, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
    { _id: '2', name: 'Smart Watch Pro', price: 4999, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }
  ]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Payment initiated! (Demo mode)');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-600 rounded-3xl p-6 text-green-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Customer Details</h2>
                  <p className="text-green-700 text-sm">Fill in your information securely</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-green-800 font-semibold mb-2">Full Name <span className="text-green-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/80 border border-green-300 rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:border-green-500"
                    placeholder="ENTER YOUR FULL NAME HERE"
                  />
                </div>
                <div>
                  <label className="block text-green-800 font-semibold mb-2">Email Address <span className="text-green-600">*</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white/80 border border-green-300 rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:border-green-500"
                    placeholder="ENTER YOUR EMAIL ADDRESS HERE"
                  />
                </div>
                <div>
                  <label className="block text-green-800 font-semibold mb-2">Phone Number <span className="text-green-600">*</span></label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white/80 border border-green-300 rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:border-green-500"
                    placeholder="ENTER YOUR PHONE NUMBER HERE"
                  />
                </div>
                <div>
                  <label className="block text-green-800 font-semibold mb-2">Shipping Address <span className="text-green-600">*</span></label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-2 bg-white/80 border border-green-300 rounded-lg text-green-900 placeholder-green-400 focus:outline-none focus:border-green-500"
                    placeholder="ENTER YOUR SHIPPING ADDRESS HERE"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-100 text-black py-3 rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-300 text-lg"
                >
                  {loading ? 'Processing...' : 'Complete Secure Payment'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-600 rounded-3xl p-6 text-green-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  <p className="text-green-700 text-sm">2 items in cart</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-white/80 rounded-lg shadow">
                  <h3 className="font-bold text-green-900">Premium Wireless Headphones</h3>
                  <p className="text-green-700">Qty: 1 - ₹2499.00</p>
                </div>
                <div className="p-4 bg-white/80 rounded-lg shadow">
                  <h3 className="font-bold text-green-900">Smart Watch Pro</h3>
                  <p className="text-green-700">Qty: 1 - ₹4999.00</p>
                </div>
                <div className="flex justify-between text-green-800">
                  <span>Subtotal</span>
                  <span>₹7498.00</span>
                </div>
                <div className="flex justify-between text-green-800">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-green-800">
                  <span>Tax</span>
                  <span className="text-green-700">Included</span>
                </div>
                <div className="flex justify-between text-green-600 font-bold mt-4">
                  <span>Total Amount</span>
                  <span>₹7498.00</span>
                </div>
              </div>
              
              <div className="p-4 bg-green-300/50 rounded-lg text-green-800">
                <p className="flex items-center gap-2"><span>🔒</span> Bank-Level Security</p>
                <p className="text-sm text-green-700">Your payment is protected by 256-bit SSL encryption & Razorpay</p>
              </div>
              
              <div className="flex justify-around mt-4">
                <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">VISA</div>
                <div className="w-12 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-xs">AMEX</div>
                <div className="w-12 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs">UPI</div>
              </div>
              <p className="text-center text-xs text-green-700 mt-2">Protected by Razorpay Payment Gateway</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}