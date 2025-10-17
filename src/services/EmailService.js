import nodemailer from 'nodemailer';
import { emailConfig } from '@/config/zoho.config';

class EmailService {
  constructor() {
    this.transporter = null;
  }

  async getTransporter() {
    if (this.transporter) {
      return this.transporter;
    }

    this.transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    });

    return this.transporter;
  }

  async sendOrderConfirmation(order) {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: emailConfig.user,
        to: order.customer.email,
        subject: `Order Confirmation - ${order.orderId}`,
        html: this.getOrderConfirmationTemplate(order),
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return { success: false, error: error.message };
    }
  }

  getOrderConfirmationTemplate(order) {
    const itemsHtml = order.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f3f4f6; }
          .total { font-size: 18px; font-weight: bold; text-align: right; padding: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="content">
            <h2>Thank you for your order!</h2>
            <p>Order ID: <strong>${order.orderId}</strong></p>
            <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
            
            <h3>Order Details:</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              Total: $${order.totalAmount.toFixed(2)}
            </div>
            
            <h3>Shipping Address:</h3>
            <p>
              ${order.customer.name}<br>
              ${order.customer.address}<br>
              Phone: ${order.customer.phone}<br>
              Email: ${order.customer.email}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default new EmailService();