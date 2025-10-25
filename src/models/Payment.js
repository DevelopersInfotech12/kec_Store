import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      ref: 'Order',
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['initiated', 'success', 'failed', 'pending', 'refunded'],
      default: 'initiated',
    },
    paymentMethod: String,
    transactionId: String,
    gatewayResponse: { type: mongoose.Schema.Types.Mixed },
    customerEmail: String,
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// ✅ Keep only the needed one
PaymentSchema.index({ status: 1 });

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
