import Product from '@/models/Product';
import connectDB from '@/config/database';

class ProductController {
  async getAllProducts(filters = {}) {
    try {
      await connectDB();

      const query = { isActive: true };

      if (filters.category) {
        query.category = filters.category;
      }

      if (filters.search) {
        query.$text = { $search: filters.search };
      }

      const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .lean();

      return {
        success: true,
        data: products,
        count: products.length,
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProductById(productId) {
    try {
      await connectDB();

      const product = await Product.findById(productId).lean();

      if (!product) {
        return {
          success: false,
          error: 'Product not found',
        };
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async createProduct(productData) {
    try {
      await connectDB();

      const product = await Product.create(productData);

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(productId, updateData) {
    try {
      await connectDB();

      const product = await Product.findByIdAndUpdate(
        productId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!product) {
        return {
          success: false,
          error: 'Product not found',
        };
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(productId) {
    try {
      await connectDB();

      const product = await Product.findByIdAndUpdate(
        productId,
        { isActive: false },
        { new: true }
      );

      if (!product) {
        return {
          success: false,
          error: 'Product not found',
        };
      }

      return {
        success: true,
        message: 'Product deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  async updateStock(productId, quantity) {
    try {
      await connectDB();

      const product = await Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: quantity } },
        { new: true }
      );

      if (!product) {
        return {
          success: false,
          error: 'Product not found',
        };
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      console.error('Error updating stock:', error);
      throw new Error('Failed to update stock');
    }
  }
}

export default new ProductController();