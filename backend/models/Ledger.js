const mongoose = require('mongoose');

const ledgerEntrySchema = new mongoose.Schema({
  // Basic Information
  description: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  
  // Amount Information
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'AFN'],
    default: 'USD'
  },
  
  // Remaining Amount Information (Optional)
  remainingAmount: {
    type: Number,
    default: null
  },
  
  // Calculated Field
  balance: {
    type: Number,
    default: 0
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'pending', 'completed'],
    default: 'active'
  },
  
  // Date
  entryDate: {
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

// Calculate balance before saving
ledgerEntrySchema.pre('save', function(next) {
  // If remainingAmount is not provided, set it to amount (meaning fully paid)
  if (this.remainingAmount === null || this.remainingAmount === undefined) {
    this.remainingAmount = this.amount;
  }
  this.balance = this.amount - this.remainingAmount;
  next();
});

// Calculate balance before update
ledgerEntrySchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.amount !== undefined || update.remainingAmount !== undefined) {
    const doc = await this.model.findOne(this.getQuery());
    const amount = update.amount !== undefined ? update.amount : doc.amount;
    let remainingAmount = update.remainingAmount !== undefined ? update.remainingAmount : doc.remainingAmount;
    
    // If remainingAmount is null or undefined, set to amount
    if (remainingAmount === null || remainingAmount === undefined) {
      remainingAmount = amount;
    }
    update.balance = amount - remainingAmount;
  }
  next();
});

module.exports = mongoose.model('Ledger', ledgerEntrySchema);