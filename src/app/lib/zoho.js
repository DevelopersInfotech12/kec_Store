import axios from 'axios';
import { zohoConfig } from '@/config/zoho.config';

export class ZohoPayment {
  constructor() {
    this.config = zohoConfig;
  }

  async getAccessToken() {
    try {
      const response = await axios.post(this.config.apiEndpoint, {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        grant_type: 'client_credentials',
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async createPayment(orderData) {
    try {
      const accessToken = await this.getAccessToken();
      
      const paymentData = {
        amount: orderData.amount,
        currency: orderData.currency || 'USD',
        customer: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
        },
        order_id: orderData.orderId,
        redirect_url: orderData.redirectUrl,
        description: orderData.description,
      };

      const response = await axios.post(
        this.config.paymentEndpoint,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async verifyPayment(paymentId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await axios.get(
        `${this.config.paymentEndpoint}/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }
}