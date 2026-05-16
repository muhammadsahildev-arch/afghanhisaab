const CustomerTransaction = require('../models/CustomerTransaction');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format transaction for frontend
const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    name: transaction.name,
    senderName: transaction.senderName,
    senderCurrency: transaction.senderCurrency,
    senderAmount: transaction.senderAmount,
    receiverName: transaction.receiverName,
    receiverCurrency: transaction.receiverCurrency,
    receiverAmount: transaction.receiverAmount,
    exchangeRate: transaction.exchangeRate,
    description: transaction.description,
    status: transaction.status,
    date: transaction.transactionDate,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt
  };
};

// @desc    Create new customer transaction
// @route   POST /api/customer-transactions
// @access  Private
exports.createTransaction = asyncHandler(async (req, res) => {
  const {
    name,
    senderName,
    senderCurrency,
    senderAmount,
    receiverName,
    receiverCurrency,
    exchangeRate,
    description
  } = req.body;

  const transaction = await CustomerTransaction.create({
    name,
    senderName,
    senderCurrency,
    senderAmount: parseFloat(senderAmount),
    receiverName,
    receiverCurrency,
    exchangeRate: parseFloat(exchangeRate),
    description: description || '',
    status: 'completed',
    transactionDate: Date.now(),
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: formatTransaction(transaction)
  });
});

// @desc    Get all customer transactions
// @route   GET /api/customer-transactions
// @access  Private
exports.getTransactions = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  // Search filter
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { senderName: { $regex: search, $options: 'i' } },
      { receiverName: { $regex: search, $options: 'i' } }
    ];
  }
  
  const total = await CustomerTransaction.countDocuments(query);
  const transactions = await CustomerTransaction.find(query)
    .sort({ transactionDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedTransactions = transactions.map(formatTransaction);
  
  // Calculate summary statistics
  const totalSenderAmount = transactions.reduce((sum, t) => sum + t.senderAmount, 0);
  const totalReceiverAmount = transactions.reduce((sum, t) => sum + t.receiverAmount, 0);
  
  // Get totals by currency
  const senderTotalsByCurrency = {};
  const receiverTotalsByCurrency = {};
  
  transactions.forEach(t => {
    if (!senderTotalsByCurrency[t.senderCurrency]) senderTotalsByCurrency[t.senderCurrency] = 0;
    senderTotalsByCurrency[t.senderCurrency] += t.senderAmount;
    
    if (!receiverTotalsByCurrency[t.receiverCurrency]) receiverTotalsByCurrency[t.receiverCurrency] = 0;
    receiverTotalsByCurrency[t.receiverCurrency] += t.receiverAmount;
  });
  
  res.status(200).json({
    success: true,
    data: formattedTransactions,
    summary: {
      totalTransactions: total,
      totalSenderAmount,
      totalReceiverAmount,
      senderTotalsByCurrency,
      receiverTotalsByCurrency,
      filteredCount: formattedTransactions.length
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single customer transaction
// @route   GET /api/customer-transactions/:id
// @access  Private
exports.getTransaction = asyncHandler(async (req, res) => {
  const transaction = await CustomerTransaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  // Check if transaction belongs to user
  if (transaction.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  res.status(200).json({
    success: true,
    data: formatTransaction(transaction)
  });
});

// @desc    Update customer transaction
// @route   PUT /api/customer-transactions/:id
// @access  Private
exports.updateTransaction = asyncHandler(async (req, res) => {
  let transaction = await CustomerTransaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  // Check if transaction belongs to user
  if (transaction.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const {
    name,
    senderName,
    senderCurrency,
    senderAmount,
    receiverName,
    receiverCurrency,
    exchangeRate,
    description
  } = req.body;
  
  // Update fields
  if (name) transaction.name = name;
  if (senderName) transaction.senderName = senderName;
  if (senderCurrency) transaction.senderCurrency = senderCurrency;
  if (senderAmount) transaction.senderAmount = parseFloat(senderAmount);
  if (receiverName) transaction.receiverName = receiverName;
  if (receiverCurrency) transaction.receiverCurrency = receiverCurrency;
  if (exchangeRate) transaction.exchangeRate = parseFloat(exchangeRate);
  if (description !== undefined) transaction.description = description;
  
  // Recalculate receiver amount
  transaction.receiverAmount = transaction.senderAmount * transaction.exchangeRate;
  
  await transaction.save();
  
  res.status(200).json({
    success: true,
    data: formatTransaction(transaction)
  });
});

// @desc    Delete customer transaction
// @route   DELETE /api/customer-transactions/:id
// @access  Private
exports.deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await CustomerTransaction.findById(req.params.id);
  
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }
  
  // Check if transaction belongs to user
  if (transaction.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  await transaction.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Transaction deleted successfully'
  });
});

// @desc    Get transaction statistics
// @route   GET /api/customer-transactions/stats
// @access  Private
exports.getTransactionStats = asyncHandler(async (req, res) => {
  const query = { shopId: req.user.shopData.shopId };
  
  const totalTransactions = await CustomerTransaction.countDocuments(query);
  
  // Get totals by currency for sender
  const senderCurrencyBreakdown = await CustomerTransaction.aggregate([
    { $match: query },
    { $group: {
        _id: '$senderCurrency',
        total: { $sum: '$senderAmount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Get totals by currency for receiver
  const receiverCurrencyBreakdown = await CustomerTransaction.aggregate([
    { $match: query },
    { $group: {
        _id: '$receiverCurrency',
        total: { $sum: '$receiverAmount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Get top customers by transaction volume
  const topCustomers = await CustomerTransaction.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$name',
        totalVolume: { $sum: '$senderAmount' },
        transactionCount: { $sum: 1 },
        lastTransaction: { $max: '$transactionDate' }
      }
    },
    { $sort: { totalVolume: -1 } },
    { $limit: 10 }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalTransactions,
      senderCurrencyBreakdown,
      receiverCurrencyBreakdown,
      topCustomers
    }
  });
});