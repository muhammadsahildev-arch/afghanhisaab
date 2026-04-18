const mongoose = require('mongoose');

const customerTransactionSchema = new mongoose.Schema({
  // Customer Information
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  
  // Sender Details
  senderEmail: {
    type: String,
    required: [true, 'Sender email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  senderPhone: {
    type: String,
    required: [true, 'Sender phone is required'],
    trim: true
  },
  senderCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'AFN'],
    default: 'USD'
  },
  senderAmount: {
    type: Number,
    required: [true, 'Sender amount is required'],
    min: [0, 'Amount must be positive']
  },
  senderCountry: {
    type: String,
    required: [true, 'Sender country is required'],
    trim: true
  },
  senderState: {
    type: String,
    trim: true
  },
  senderCity: {
    type: String,
    trim: true
  },
  senderAddress: {
    type: String,
    required: [true, 'Sender address is required'],
    trim: true
  },
  
  // Receiver Details
  receiverEmail: {
    type: String,
    required: [true, 'Receiver email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  receiverPhone: {
    type: String,
    required: [true, 'Receiver phone is required'],
    trim: true
  },
  receiverCurrency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'AFN'],
    default: 'PKR'
  },
  receiverAmount: {
    type: Number,
    default: 0
  },
  receiverCountry: {
    type: String,
    required: [true, 'Receiver country is required'],
    trim: true
  },
  receiverState: {
    type: String,
    trim: true
  },
  receiverCity: {
    type: String,
    trim: true
  },
  receiverAddress: {
    type: String,
    required: [true, 'Receiver address is required'],
    trim: true
  },
  
  // Fees & Charges
  commission: {
    type: Number,
    default: 0,
    min: 0
  },
  fee: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  totalFees: {
    type: Number,
    default: 0
  },
  exchangeRate: {
    type: Number,
    required: [true, 'Exchange rate is required'],
    min: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Additional Notes
  notes: {
    type: String,
    trim: true
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

// Calculate receiver amount and total fees before saving
customerTransactionSchema.pre('save', function(next) {
  // Calculate receiver amount based on sender amount and exchange rate
  if (this.senderAmount && this.exchangeRate) {
    const baseAmount = this.senderAmount * this.exchangeRate;
    this.totalFees = (this.commission || 0) + (this.fee || 0) + (this.tax || 0);
    this.receiverAmount = baseAmount - this.totalFees;
  }
  next();
});

// Calculate receiver amount and total fees before update
customerTransactionSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.senderAmount !== undefined || update.exchangeRate !== undefined ||
      update.commission !== undefined || update.fee !== undefined || update.tax !== undefined) {
    const doc = await this.model.findOne(this.getQuery());
    
    const senderAmount = update.senderAmount !== undefined ? update.senderAmount : doc.senderAmount;
    const exchangeRate = update.exchangeRate !== undefined ? update.exchangeRate : doc.exchangeRate;
    const commission = update.commission !== undefined ? update.commission : doc.commission;
    const fee = update.fee !== undefined ? update.fee : doc.fee;
    const tax = update.tax !== undefined ? update.tax : doc.tax;
    
    const baseAmount = senderAmount * exchangeRate;
    const totalFees = commission + fee + tax;
    
    update.receiverAmount = baseAmount - totalFees;
    update.totalFees = totalFees;
  }
  
  next();
});

module.exports = mongoose.model('CustomerTransaction', customerTransactionSchema);