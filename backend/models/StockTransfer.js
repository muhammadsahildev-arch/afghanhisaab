const mongoose = require('mongoose');

const stockTransferSchema = new mongoose.Schema({
  transferNumber: {
    type: String,
    unique: true
  },
  fromWarehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  fromWarehouseName: String,
  toWarehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  toWarehouseName: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  sku: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'In Transit', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  notes: {
    type: String,
    trim: true
  },
  transferDate: {
    type: Date,
    default: Date.now
  },
  completedDate: Date,
  
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

// Generate transfer number before saving
stockTransferSchema.pre('save', async function(next) {
  if (!this.transferNumber) {
    const count = await mongoose.model('StockTransfer').countDocuments();
    const year = new Date().getFullYear();
    this.transferNumber = `TRF-${year}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('StockTransfer', stockTransferSchema);