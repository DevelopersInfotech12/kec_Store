import Razorpay from 'razorpay';
import crypto from 'crypto';

class RazorpayService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createPayment(paymentData) {
    try {
      // Create Razorpay order
      const options = {
        amount: Math.round(paymentData.amount * 100), // Convert to paise (smallest currency unit)
        currency: paymentData.currency || 'INR',
        receipt: paymentData.orderId,
        notes: {
          customerName: paymentData.customerName,
          customerEmail: paymentData.customerEmail,
          customerPhone: paymentData.customerPhone,
          description: paymentData.description,
          ...paymentData.metadata,
        },
      };

      const order = await this.razorpay.orders.create(options);

      return {
        success: true,
        paymentId: order.id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        data: order,
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new Error('Failed to create payment order');
    }
  }

  async verifyPayment(paymentData) {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = paymentData;

      // Verify signature
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isValid = generatedSignature === razorpay_signature;

      if (!isValid) {
        return {
          success: false,
          status: 'failed',
          error: 'Invalid signature',
          data: { status: 'failed' },
        };
      }

      // Fetch payment details
      const payment = await this.razorpay.payments.fetch(razorpay_payment_id);

      return {
        success: true,
        status: payment.status === 'captured' ? 'success' : payment.status,
        data: {
          status: payment.status === 'captured' ? 'success' : payment.status,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount: payment.amount / 100, // Convert back to currency unit
          method: payment.method,
          email: payment.email,
          contact: payment.contact,
          ...payment,
        },
      };
    } catch (error) {
      console.error('Error verifying Razorpay payment:', error);
      throw new Error('Failed to verify payment');
    }
  }

  async refundPayment(paymentId, amount, reason) {
    try {
      const refundAmount = amount ? Math.round(amount * 100) : undefined;

      const refund = await this.razorpay.payments.refund(paymentId, {
        amount: refundAmount, // If undefined, full refund
        notes: {
          reason: reason || 'Refund requested',
        },
      });

      return {
        success: true,
        refundId: refund.id,
        data: refund,
      };
    } catch (error) {
      console.error('Error refunding Razorpay payment:', error);
      throw new Error('Failed to process refund');
    }
  }

  async fetchPayment(paymentId) {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      console.error('Error fetching Razorpay payment:', error);
      throw new Error('Failed to fetch payment details');
    }
  }

  async fetchOrder(orderId) {
    try {
      const order = await this.razorpay.orders.fetch(orderId);
      return {
        success: true,
        data: order,
      };
    } catch (error) {
      console.error('Error fetching Razorpay order:', error);
      throw new Error('Failed to fetch order details');
    }
  }
}

export default new RazorpayService();