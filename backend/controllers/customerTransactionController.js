const CustomerTransaction = require('../models/CustomerTransaction');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format currency
const formatCurrency = (amount, currency) => {
  const symbols = {
    USD: '$', EUR: '€', GBP: '£', PKR: '₨', AED: 'د.إ', SAR: 'ر.س', AFN: '؋'
  };
  return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
};

// Helper function to format transaction for frontend
const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    name: transaction.name,
    senderEmail: transaction.senderEmail,
    senderPhone: transaction.senderPhone,
    senderCurrency: transaction.senderCurrency,
    senderAmount: transaction.senderAmount,
    senderCountry: transaction.senderCountry,
    senderState: transaction.senderState,
    senderCity: transaction.senderCity,
    senderAddress: transaction.senderAddress,
    receiverEmail: transaction.receiverEmail,
    receiverPhone: transaction.receiverPhone,
    receiverCurrency: transaction.receiverCurrency,
    receiverAmount: transaction.receiverAmount,
    receiverCountry: transaction.receiverCountry,
    receiverState: transaction.receiverState,
    receiverCity: transaction.receiverCity,
    receiverAddress: transaction.receiverAddress,
    commission: transaction.commission,
    fee: transaction.fee,
    tax: transaction.tax,
    totalFees: transaction.totalFees,
    exchangeRate: transaction.exchangeRate,
    status: transaction.status,
    notes: transaction.notes,
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
    senderEmail,
    senderPhone,
    senderCurrency,
    senderAmount,
    senderCountry,
    senderState,
    senderCity,
    senderAddress,
    receiverEmail,
    receiverPhone,
    receiverCurrency,
    receiverCountry,
    receiverState,
    receiverCity,
    receiverAddress,
    commission,
    fee,
    tax,
    exchangeRate,
    status,
    notes,
    transactionDate
  } = req.body;

  const transaction = await CustomerTransaction.create({
    name,
    senderEmail,
    senderPhone,
    senderCurrency,
    senderAmount: parseFloat(senderAmount),
    senderCountry,
    senderState,
    senderCity,
    senderAddress,
    receiverEmail,
    receiverPhone,
    receiverCurrency,
    receiverCountry,
    receiverState,
    receiverCity,
    receiverAddress,
    commission: parseFloat(commission) || 0,
    fee: parseFloat(fee) || 0,
    tax: parseFloat(tax) || 0,
    exchangeRate: parseFloat(exchangeRate),
    status: status || 'pending',
    notes,
    transactionDate: transactionDate || Date.now(),
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
  const { page = 1, limit = 10, search = '', currency, status, fromDate, toDate } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  // Search filter
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { senderEmail: { $regex: search, $options: 'i' } },
      { receiverEmail: { $regex: search, $options: 'i' } },
      { senderPhone: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Currency filter
  if (currency) {
    query.$or = [
      { senderCurrency: currency },
      { receiverCurrency: currency }
    ];
  }
  
  // Status filter
  if (status && status !== 'all') {
    query.status = status;
  }
  
  // Date range filter
  if (fromDate || toDate) {
    query.transactionDate = {};
    if (fromDate) {
      query.transactionDate.$gte = new Date(fromDate);
    }
    if (toDate) {
      query.transactionDate.$lte = new Date(toDate);
    }
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
  const totalFees = transactions.reduce((sum, t) => sum + t.totalFees, 0);
  
  res.status(200).json({
    success: true,
    data: formattedTransactions,
    summary: {
      totalTransactions: total,
      totalSenderAmount,
      totalReceiverAmount,
      totalFees,
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
    senderEmail,
    senderPhone,
    senderCurrency,
    senderAmount,
    senderCountry,
    senderState,
    senderCity,
    senderAddress,
    receiverEmail,
    receiverPhone,
    receiverCurrency,
    receiverCountry,
    receiverState,
    receiverCity,
    receiverAddress,
    commission,
    fee,
    tax,
    exchangeRate,
    status,
    notes,
    transactionDate
  } = req.body;
  
  // Update fields
  if (name) transaction.name = name;
  if (senderEmail) transaction.senderEmail = senderEmail;
  if (senderPhone) transaction.senderPhone = senderPhone;
  if (senderCurrency) transaction.senderCurrency = senderCurrency;
  if (senderAmount) transaction.senderAmount = parseFloat(senderAmount);
  if (senderCountry) transaction.senderCountry = senderCountry;
  if (senderState !== undefined) transaction.senderState = senderState;
  if (senderCity !== undefined) transaction.senderCity = senderCity;
  if (senderAddress) transaction.senderAddress = senderAddress;
  if (receiverEmail) transaction.receiverEmail = receiverEmail;
  if (receiverPhone) transaction.receiverPhone = receiverPhone;
  if (receiverCurrency) transaction.receiverCurrency = receiverCurrency;
  if (receiverCountry) transaction.receiverCountry = receiverCountry;
  if (receiverState !== undefined) transaction.receiverState = receiverState;
  if (receiverCity !== undefined) transaction.receiverCity = receiverCity;
  if (receiverAddress) transaction.receiverAddress = receiverAddress;
  if (commission !== undefined) transaction.commission = parseFloat(commission);
  if (fee !== undefined) transaction.fee = parseFloat(fee);
  if (tax !== undefined) transaction.tax = parseFloat(tax);
  if (exchangeRate) transaction.exchangeRate = parseFloat(exchangeRate);
  if (status) transaction.status = status;
  if (notes !== undefined) transaction.notes = notes;
  if (transactionDate) transaction.transactionDate = transactionDate;
  
  // Recalculate receiver amount and fees
  const baseAmount = transaction.senderAmount * transaction.exchangeRate;
  transaction.totalFees = transaction.commission + transaction.fee + transaction.tax;
  transaction.receiverAmount = baseAmount - transaction.totalFees;
  
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
  
  // Status breakdown
  const statusCount = await CustomerTransaction.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  // Currency breakdown for sender
  const senderCurrencyBreakdown = await CustomerTransaction.aggregate([
    { $match: query },
    { $group: {
        _id: '$senderCurrency',
        total: { $sum: '$senderAmount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Currency breakdown for receiver
  const receiverCurrencyBreakdown = await CustomerTransaction.aggregate([
    { $match: query },
    { $group: {
        _id: '$receiverCurrency',
        total: { $sum: '$receiverAmount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Monthly trend (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const monthlyTrend = await CustomerTransaction.aggregate([
    { $match: { ...query, transactionDate: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: '$transactionDate' },
          month: { $month: '$transactionDate' }
        },
        totalSender: { $sum: '$senderAmount' },
        totalReceiver: { $sum: '$receiverAmount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
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
      statusBreakdown: statusCount.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      senderCurrencyBreakdown,
      receiverCurrencyBreakdown,
      monthlyTrend,
      topCustomers
    }
  });
});