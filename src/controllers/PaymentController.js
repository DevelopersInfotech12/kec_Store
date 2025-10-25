import Payment from '@/models/Payment';
// import connectDB from '@/config/database';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import OrderController from './OrderController';
import connectDB from '@/app/config/database';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentController {
  async initiatePayment(paymentData) {
    try {
      await connectDB();

      const { orderId, amount, customer } = paymentData;

      // Create Razorpay order
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: paymentData.currency || 'INR',
        receipt: orderId,
        notes: {
          orderId,
          customerEmail: customer.email,
          customerName: customer.name,
        },
      });

      // Create payment record in database
      const paymentRecord = await Payment.create({
        orderId,
        paymentId: `PAY-${Date.now()}`,
        amount,
        currency: paymentData.currency || 'INR',
        status: 'initiated',
        customerEmail: customer.email,
        transactionId: razorpayOrder.id,
        gatewayResponse: razorpayOrder,
        metadata: paymentData.metadata || {},
      });

      // ✅ EXPLICITLY RETURN ALL REQUIRED FIELDS
      return {
        success: true,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        razorpayKey: process.env.RAZORPAY_KEY_ID, // ✅ Make sure this exists
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || '',
        data: paymentRecord,
      };
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Failed to initiate payment: ' + error.message);
    }
  }

  async verifyPayment(paymentData) {
    try {
      await connectDB();

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;

      // Verify Razorpay signature
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

      const isValid = expectedSign === razorpay_signature;

      // Find payment record by Razorpay order ID
      const payment = await Payment.findOne({ transactionId: razorpay_order_id });

      if (!payment) {
        return {
          success: false,
          error: 'Payment record not found',
        };
      }

      // Update payment status
      payment.status = isValid ? 'success' : 'failed';
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        razorpay_payment_id,
        razorpay_signature,
        verified: isValid,
        verifiedAt: new Date(),
      };
      await payment.save();

      // Update order status if payment successful
      if (isValid) {
        await OrderController.updateOrderStatus(
          payment.orderId,
          'paid',
          razorpay_payment_id
        );
      }

      return {
        success: true,
        status: payment.status,
        isValid,
        orderId: payment.orderId,
        data: payment,
      };
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Failed to verify payment: ' + error.message);
    }
  }

  async getPaymentByOrderId(orderId) {
    try {
      await connectDB();

      const payment = await Payment.findOne({ orderId }).lean();

      if (!payment) {
        return {
          success: false,
          error: 'Payment not found',
        };
      }

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw new Error('Failed to fetch payment');
    }
  }

  async getPaymentByTransactionId(transactionId) {
    try {
      await connectDB();

      const payment = await Payment.findOne({ transactionId }).lean();

      if (!payment) {
        return {
          success: false,
          error: 'Payment not found',
        };
      }

      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw new Error('Failed to fetch payment');
    }
  }

  async refundPayment(paymentId, amount, reason) {
    try {
      await connectDB();

      // Find payment by Razorpay payment ID
      const payment = await Payment.findOne({
        'gatewayResponse.razorpay_payment_id': paymentId
      });

      if (!payment) {
        return {
          success: false,
          error: 'Payment not found',
        };
      }

      if (payment.status !== 'success') {
        return {
          success: false,
          error: 'Only successful payments can be refunded',
        };
      }

      // Process refund with Razorpay
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
        notes: {
          reason: reason || 'Customer requested refund',
          orderId: payment.orderId,
        },
      });

      // Update payment record
      payment.status = 'refunded';
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        refund: refund,
        refundedAt: new Date(),
      };
      await payment.save();

      // Update order status
      await OrderController.updateOrderStatus(
        payment.orderId,
        'refunded'
      );

      return {
        success: true,
        data: payment,
        refundId: refund.id,
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund: ' + error.message);
    }
  }

  async handleWebhook(payload, signature) {
    try {
      // Verify webhook signature
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(payload))
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new Error('Invalid webhook signature');
      }

      const { event, payload: data } = payload;

      switch (event) {
        case 'payment.captured':
          await this.handlePaymentCaptured(data.payment.entity);
          break;
        case 'payment.failed':
          await this.handlePaymentFailed(data.payment.entity);
          break;
        case 'refund.created':
          await this.handleRefundCreated(data.refund.entity);
          break;
        default:
          console.log('Unhandled webhook event:', event);
      }

      return { success: true };
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw error;
    }
  }

  async handlePaymentCaptured(paymentEntity) {
    const payment = await Payment.findOne({
      transactionId: paymentEntity.order_id
    });

    if (payment && payment.status !== 'success') {
      payment.status = 'success';
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        webhookData: paymentEntity,
      };
      await payment.save();

      await OrderController.updateOrderStatus(
        payment.orderId,
        'paid',
        paymentEntity.id
      );
    }
  }

  async handlePaymentFailed(paymentEntity) {
    const payment = await Payment.findOne({
      transactionId: paymentEntity.order_id
    });

    if (payment) {
      payment.status = 'failed';
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        webhookData: paymentEntity,
      };
      await payment.save();
    }
  }

  async handleRefundCreated(refundEntity) {
    const payment = await Payment.findOne({
      'gatewayResponse.razorpay_payment_id': refundEntity.payment_id
    });

    if (payment) {
      payment.status = 'refunded';
      payment.gatewayResponse = {
        ...payment.gatewayResponse,
        refundWebhook: refundEntity,
      };
      await payment.save();
    }
  }
}

export default new PaymentController();