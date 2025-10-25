import connectDB from '@/app/config/database';
import Order from '@/models/Order';
import Product from '@/models/Product';
// import connectDB from '@/config/database';
import EmailService from '@/services/EmailService';

class OrderController {
  generateOrderId() {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  async createOrder(orderData) {
    try {
      await connectDB();

      // Validate stock availability
      for (const item of orderData.items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
      }

      const orderId = this.generateOrderId();

      const order = await Order.create({
        ...orderData,
        orderId,
      });

      // Reduce stock
      for (const item of orderData.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } }
        );
      }

      return {
        success: true,
        data: order,
        orderId: order.orderId,
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error(error.message || 'Failed to create order');
    }
  }

  async getOrderById(orderId) {
    try {
      await connectDB();

      const order = await Order.findOne({ orderId })
        .populate('items.productId')
        .lean();

      if (!order) {
        return {
          success: false,
          error: 'Order not found',
        };
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }

  async getAllOrders(filters = {}) {
    try {
      await connectDB();

      const query = {};

      if (filters.status) {
        query.status = filters.status;
      }

      if (filters.email) {
        query['customer.email'] = filters.email;
      }

      const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .populate('items.productId')
        .lean();

      return {
        success: true,
        data: orders,
        count: orders.length,
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  async updateOrderStatus(orderId, status, paymentId = null) {
    try {
      await connectDB();

      const updateData = { status };
      if (paymentId) {
        updateData.paymentId = paymentId;
        updateData.paymentStatus = 'completed';
      }

      const order = await Order.findOneAndUpdate(
        { orderId },
        updateData,
        { new: true }
      ).populate('items.productId');

      if (!order) {
        return {
          success: false,
          error: 'Order not found',
        };
      }

      // Send confirmation email if order is paid
      if (status === 'paid') {
        await EmailService.sendOrderConfirmation(order);
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  async cancelOrder(orderId) {
    try {
      await connectDB();

      const order = await Order.findOne({ orderId });

      if (!order) {
        return {
          success: false,
          error: 'Order not found',
        };
      }

      if (order.status === 'shipped' || order.status === 'delivered') {
        return {
          success: false,
          error: 'Cannot cancel order that has been shipped or delivered',
        };
      }

      // Restore stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: item.quantity } }
        );
      }

      order.status = 'cancelled';
      await order.save();

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw new Error('Failed to cancel order');
    }
  }
}

export default new OrderController();