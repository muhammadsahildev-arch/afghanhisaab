const Ledger = require('../models/Ledger');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format currency
const formatCurrency = (amount, currency) => {
  const symbols = {
    USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', AFN: '؋'
  };
  return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
};

// Helper function to format ledger entry for frontend
const formatLedgerEntry = (entry) => {
  return {
    id: entry._id,
    date: entry.entryDate,
    description: entry.description,
    name: entry.name,
    amount: entry.amount,
    currency: entry.currency,
    remainingAmount: entry.remainingAmount,
    remainingCurrency: entry.remainingCurrency,
    remainingPersonName: entry.remainingPersonName,
    balance: entry.balance,
    status: entry.status,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt
  };
};

// @desc    Create new ledger entry (Single or Multiple)
// @route   POST /api/ledger
// @access  Private
exports.createLedgerEntry = asyncHandler(async (req, res) => {
  // Check if request body is an array (multiple entries) or object (single entry)
  const isMultiple = Array.isArray(req.body);
  const entries = isMultiple ? req.body : [req.body];
  
  if (entries.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No entries provided'
    });
  }
  
  const createdEntries = [];
  const errors = [];
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    
    // Validate amount vs remaining amount
    if (parseFloat(entry.amount) < parseFloat(entry.remainingAmount)) {
      errors.push({
        index: i,
        message: `Entry ${i + 1}: Remaining amount cannot be greater than total amount`
      });
      continue;
    }
    
    try {
      const ledgerEntry = await Ledger.create({
        description: entry.description,
        name: entry.name,
        amount: parseFloat(entry.amount),
        currency: entry.currency,
        remainingAmount: parseFloat(entry.remainingAmount),
        remainingCurrency: entry.remainingCurrency,
        remainingPersonName: entry.remainingPersonName,
        status: entry.status || 'active',
        entryDate: entry.entryDate || Date.now(),
        shopId: req.user.shopData.shopId,
        createdBy: req.user._id
      });
      
      createdEntries.push(formatLedgerEntry(ledgerEntry));
    } catch (error) {
      errors.push({
        index: i,
        message: `Entry ${i + 1}: ${error.message}`
      });
    }
  }
  
  // If single entry and no errors, return single object (for backward compatibility)
  if (!isMultiple && createdEntries.length === 1 && errors.length === 0) {
    return res.status(201).json({
      success: true,
      data: createdEntries[0]
    });
  }
  
  // For multiple entries or if there were errors
  res.status(201).json({
    success: true,
    data: createdEntries,
    errors: errors.length > 0 ? errors : undefined,
    summary: {
      total: entries.length,
      created: createdEntries.length,
      failed: errors.length
    }
  });
});

// @desc    Get all ledger entries
// @route   GET /api/ledger
// @access  Private
exports.getLedgerEntries = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status, fromDate, toDate } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  // Search filter
  if (search) {
    query.$or = [
      { description: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } },
      { remainingPersonName: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Status filter
  if (status && status !== 'all') {
    query.status = status;
  }
  
  // Date range filter
  if (fromDate || toDate) {
    query.entryDate = {};
    if (fromDate) {
      query.entryDate.$gte = new Date(fromDate);
    }
    if (toDate) {
      query.entryDate.$lte = new Date(toDate);
    }
  }
  
  const total = await Ledger.countDocuments(query);
  const entries = await Ledger.find(query)
    .sort({ entryDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedEntries = entries.map(formatLedgerEntry);
  
  // Calculate summary statistics
  const totalAmount = entries.reduce((sum, e) => sum + e.amount, 0);
  const totalRemaining = entries.reduce((sum, e) => sum + e.remainingAmount, 0);
  const totalBalance = entries.reduce((sum, e) => sum + e.balance, 0);
  
  res.status(200).json({
    success: true,
    data: formattedEntries,
    summary: {
      totalEntries: total,
      totalAmount,
      totalRemaining,
      totalBalance,
      filteredCount: formattedEntries.length
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single ledger entry
// @route   GET /api/ledger/:id
// @access  Private
exports.getLedgerEntry = asyncHandler(async (req, res) => {
  const entry = await Ledger.findById(req.params.id);
  
  if (!entry) {
    return res.status(404).json({
      success: false,
      message: 'Ledger entry not found'
    });
  }
  
  // Check if entry belongs to user
  if (entry.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  res.status(200).json({
    success: true,
    data: formatLedgerEntry(entry)
  });
});

// @desc    Update ledger entry
// @route   PUT /api/ledger/:id
// @access  Private
exports.updateLedgerEntry = asyncHandler(async (req, res) => {
  let entry = await Ledger.findById(req.params.id);
  
  if (!entry) {
    return res.status(404).json({
      success: false,
      message: 'Ledger entry not found'
    });
  }
  
  // Check if entry belongs to user
  if (entry.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const {
    description,
    name,
    amount,
    currency,
    remainingAmount,
    remainingCurrency,
    remainingPersonName,
    status,
    entryDate
  } = req.body;
  
  // Validate amount vs remaining amount
  const newAmount = amount !== undefined ? parseFloat(amount) : entry.amount;
  const newRemainingAmount = remainingAmount !== undefined ? parseFloat(remainingAmount) : entry.remainingAmount;
  
  if (newAmount < newRemainingAmount) {
    return res.status(400).json({
      success: false,
      message: 'Remaining amount cannot be greater than total amount'
    });
  }
  
  // Update fields
  if (description) entry.description = description;
  if (name) entry.name = name;
  if (amount) entry.amount = parseFloat(amount);
  if (currency) entry.currency = currency;
  if (remainingAmount) entry.remainingAmount = parseFloat(remainingAmount);
  if (remainingCurrency) entry.remainingCurrency = remainingCurrency;
  if (remainingPersonName) entry.remainingPersonName = remainingPersonName;
  if (status) entry.status = status;
  if (entryDate) entry.entryDate = entryDate;
  
  // Recalculate balance
  entry.balance = entry.amount - entry.remainingAmount;
  
  await entry.save();
  
  res.status(200).json({
    success: true,
    data: formatLedgerEntry(entry)
  });
});

// @desc    Delete ledger entry
// @route   DELETE /api/ledger/:id
// @access  Private
exports.deleteLedgerEntry = asyncHandler(async (req, res) => {
  const entry = await Ledger.findById(req.params.id);
  
  if (!entry) {
    return res.status(404).json({
      success: false,
      message: 'Ledger entry not found'
    });
  }
  
  // Check if entry belongs to user
  if (entry.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  await entry.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Ledger entry deleted successfully'
  });
});

// @desc    Get ledger statistics
// @route   GET /api/ledger/stats
// @access  Private
exports.getLedgerStats = asyncHandler(async (req, res) => {
  const query = { shopId: req.user.shopData.shopId };
  
  const totalEntries = await Ledger.countDocuments(query);
  const totalAmount = await Ledger.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  
  const totalRemaining = await Ledger.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$remainingAmount' } } }
  ]);
  
  const totalBalance = await Ledger.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$balance' } } }
  ]);
  
  const statusCount = await Ledger.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  const currencyBreakdown = await Ledger.aggregate([
    { $match: query },
    { $group: { _id: '$currency', total: { $sum: '$amount' }, count: { $sum: 1 } } }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalEntries,
      totalAmount: totalAmount[0]?.total || 0,
      totalRemaining: totalRemaining[0]?.total || 0,
      totalBalance: totalBalance[0]?.total || 0,
      statusCount: statusCount.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      currencyBreakdown
    }
  });
});