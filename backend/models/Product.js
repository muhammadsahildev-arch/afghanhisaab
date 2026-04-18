const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'AFN'],
    default: 'USD'
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Phones', 'Laptops', 'Tablets', 'Audio', 'Wearables', 'Accessories', 'TVs', 'Computers'],
    default: 'Electronics'
  },
  brand: {
    type: String,
    trim: true
  },
 // In models/Product.js - ensure warehouseStock is in the schema
warehouseStock: {
  type: [{
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Warehouse'
    },
    warehouseName: {
      type: String
    },
    quantity: {
      type: Number,
      default: 0
    }
  }],
  default: []
},
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: 0
  },
  purchasePrice: {
    type: Number,
    default: 0,
    min: 0
  },
  currentStock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative'],
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Stock cannot be negative'
    }
  },
  reorderLevel: {
    type: Number,
    default: 10,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Critical Stock', 'Out of Stock'],
    default: 'Out of Stock'
  },
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

// Calculate status before saving
productSchema.pre('save', function(next) {
  if (this.currentStock === 0) {
    this.status = 'Out of Stock';
  } else if (this.currentStock <= this.reorderLevel) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  next();
});

// Index for search
productSchema.index({ name: 'text', sku: 'text', barcode: 'text' });

module.exports = mongoose.model('Product', productSchema);