import { NextResponse } from 'next/server';
import PaymentController from '@/controllers/PaymentController';

// POST endpoint for creating order and verifying payment
export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    // Route to different handlers based on action
    switch (action) {
      case 'create':
      case 'create1':
        return await createPayment(body);
      
      case 'verify':
        return await verifyPayment(body);
      
      case 'refund':
        return await refundPayment(body);
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: create, verify, or refund' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Payment API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Create Payment Order
async function createPayment(body) {
  try {
    const { orderId, amount, currency, customer, metadata } = body;

    if (!orderId || !amount || !customer) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: orderId, amount, customer' 
        },
        { status: 400 }
      );
    }

    if (!customer.email || !customer.name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Customer email and name are required' 
        },
        { status: 400 }
      );
    }

    const paymentData = {
      orderId,
      amount,
      currency: currency || 'INR',
      customer: {
        email: customer.email,
        name: customer.name,
        phone: customer.phone || '',
      },
      metadata: metadata || {},
    };

    const result = await PaymentController.initiatePayment(paymentData);

    // ✅ ADD THIS: Ensure razorpayKey is always present
    const response = {
      ...result,
      razorpayKey: result.razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    };

    // ✅ ADD DEBUG LOGGING
    console.log('=== Payment Creation Response ===');
    console.log('Razorpay Key:', response.razorpayKey);
    console.log('Order ID:', response.orderId);
    console.log('Amount:', response.amount);
    console.log('Currency:', response.currency);
    console.log('================================');

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create payment order' 
      },
      { status: 500 }
    );
  }
}

// Verify Payment
async function verifyPayment(body) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature' 
        },
        { status: 400 }
      );
    }

    const result = await PaymentController.verifyPayment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Payment verification failed' 
      },
      { status: 500 }
    );
  }
}

// Refund Payment
async function refundPayment(body) {
  try {
    const { paymentId, amount, reason } = body;

    if (!paymentId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment ID is required' 
        },
        { status: 400 }
      );
    }

    const result = await PaymentController.refundPayment(
      paymentId,
      amount,
      reason
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing refund:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to process refund' 
      },
      { status: 500 }
    );
  }
}

// GET endpoint for fetching payment details
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const transactionId = searchParams.get('transactionId');

    if (orderId) {
      const result = await PaymentController.getPaymentByOrderId(orderId);
      return NextResponse.json(result);
    }

    if (transactionId) {
      const result = await PaymentController.getPaymentByTransactionId(transactionId);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Provide either orderId or transactionId as query parameter' 
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch payment details' 
      },
      { status: 500 }
    );
  }
}