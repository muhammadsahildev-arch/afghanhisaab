const mongoose = require('mongoose');

const customerTransactionSchema = new mongoose.Schema({
  // Customer Information (Required)
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  
  // Sender Details (Required)
  senderName: {
    type: String,
    required: [true, 'Sender name is required'],
    trim: true
  },
  senderCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'CAD', 'AUD'],
    default: 'USD'
  },
  senderAmount: {
    type: Number,
    required: [true, 'Sender amount is required'],
    min: [0, 'Amount must be positive']
  },
  
  // Receiver Details (Required)
  receiverName: {
    type: String,
    required: [true, 'Receiver name is required'],
    trim: true
  },
  receiverCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'CAD', 'AUD'],
    default: 'PKR'
  },
  receiverAmount: {
    type: Number,
    default: 0
  },
  
  // Exchange Rate (Required)
  exchangeRate: {
    type: Number,
    required: [true, 'Exchange rate is required'],
    min: 0
  },
  
  // Optional Fields
  description: {
    type: String,
    trim: true
  },
  
  // Status (Fixed to completed)
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'completed'
  },
  
  // Transaction Date
  transactionDate: {
    type: Date,
    default: Date.now
  },
  
  // Shop/User Association
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

// Calculate receiver amount before saving
customerTransactionSchema.pre('save', function(next) {
  if (this.senderAmount && this.exchangeRate) {
    this.receiverAmount = this.senderAmount * this.exchangeRate;
  }
  next();
});

// Calculate receiver amount before update
customerTransactionSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.senderAmount !== undefined || update.exchangeRate !== undefined) {
    const doc = await this.model.findOne(this.getQuery());
    const senderAmount = update.senderAmount !== undefined ? update.senderAmount : doc.senderAmount;
    const exchangeRate = update.exchangeRate !== undefined ? update.exchangeRate : doc.exchangeRate;
    update.receiverAmount = senderAmount * exchangeRate;
  }
  
  next();
});

module.exports = mongoose.model('CustomerTransaction', customerTransactionSchema);