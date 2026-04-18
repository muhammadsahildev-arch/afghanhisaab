const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Warehouse name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Warehouse code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  manager: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  capacity: {
    type: Number,
    default: 1000,
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
  status: {
    type: String,
    enum: ['Active', 'Maintenance', 'Full'],
    default: 'Active'
  },
  utilization: {
    type: Number,
    default: 0
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

// Calculate utilization before save
warehouseSchema.pre('save', function(next) {
  if (this.capacity > 0) {
    this.utilization = (this.currentStock / this.capacity) * 100;
  }
  next();
});

module.exports = mongoose.model('Warehouse', warehouseSchema);