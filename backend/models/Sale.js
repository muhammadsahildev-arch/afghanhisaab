const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    trim: true,
    default: 'Walk-in Customer'
  },
  customerPhone: {
    type: String,
    trim: true
  },
  customerEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    warehouseId: {  // NEW: Track which warehouse sold from
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
    },
    warehouseName: String,  // NEW: Warehouse name for display
    productName: String,
    sku: String,
    quantity: Number,
    unitPrice: Number,
    discount: {
      type: Number,
      default: 0
    },
    total: Number
  }],
  subtotal: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'mobile_payment'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'partial'],
    default: 'paid'
  },
  status: {
    type: String,
    enum: ['completed', 'refunded', 'cancelled'],
    default: 'completed'
  },
  saleDate: {
    type: Date,
    default: Date.now
  },
  
  // Shop Association
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Generate invoice number before saving
saleSchema.pre('save', async function(next) {
  if (!this.invoiceNumber) {
    const count = await mongoose.model('Sale').countDocuments();
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    this.invoiceNumber = `INV-${year}${month}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Sale', saleSchema);