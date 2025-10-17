'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    
    if (paymentId) {
      verifyPayment(paymentId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const verifyPayment = async (paymentId) => {
    try {
      const response = await fetch(`/api/payment/verify?payment_id=${paymentId}`);
      const data = await response.json();
      
      setPaymentStatus(data);
      
      if (data.success && data.data) {
        setOrderDetails(data.data);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  const isSuccess = paymentStatus?.success && paymentStatus?.status === 'success';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {isSuccess ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            
            {orderDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono font-semibold">{orderDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-mono font-semibold">{orderDetails.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">${orderDetails.amount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📧 A confirmation email has been sent to your email address with order details.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/products')}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-white text-primary border-2 border-primary py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Failed
            </h1>
            
            <p className="text-gray-600 mb-8">
              Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                {paymentStatus?.error || 'Payment verification failed'}
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/products')}
                className="w-full bg-white text-gray-700 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}