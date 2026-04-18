const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
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
  personName: {
    type: String,
    required: [true, 'Person name is required'],
    trim: true
  }
});

const dailyRecordSchema = new mongoose.Schema({
  // Record Date
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  
  // Income Entries
  incomeEntries: [entrySchema],
  
  // Spend Entries
  spendEntries: [entrySchema],
  
  // Calculated Totals
  totalIncome: {
    type: Number,
    default: 0
  },
  totalSpend: {
    type: Number,
    default: 0
  },
  netBalance: {
    type: Number,
    default: 0
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

// Calculate totals before saving
dailyRecordSchema.pre('save', function(next) {
  // Calculate total income
  this.totalIncome = this.incomeEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
  
  // Calculate total spend
  this.totalSpend = this.spendEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
  
  // Calculate net balance
  this.netBalance = this.totalIncome - this.totalSpend;
  
  next();
});

// Calculate totals before update
dailyRecordSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  
  if (update.incomeEntries || update.spendEntries) {
    const doc = await this.model.findOne(this.getQuery());
    
    const incomeEntries = update.incomeEntries || doc.incomeEntries;
    const spendEntries = update.spendEntries || doc.spendEntries;
    
    const totalIncome = incomeEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
    const totalSpend = spendEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
    
    update.totalIncome = totalIncome;
    update.totalSpend = totalSpend;
    update.netBalance = totalIncome - totalSpend;
  }
  
  next();
});

module.exports = mongoose.model('DailyRecord', dailyRecordSchema);