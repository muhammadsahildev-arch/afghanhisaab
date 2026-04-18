const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  supplierName: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  expectedDate: {
    type: Date
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'AFN'],
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Partially Received', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName: String,
    sku: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
    },
    expectedDeliveryDate: Date,
    expiryDate: Date,
    location: String,
    rack: String
  }],
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

// Generate order number before saving
purchaseOrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('PurchaseOrder').countDocuments();
    const year = new Date().getFullYear();
    this.orderNumber = `PO-${year}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);