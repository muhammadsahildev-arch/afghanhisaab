const DailyRecord = require('../models/DailyRecord');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format daily record for frontend
const formatDailyRecord = (record) => {
  // Get day name
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[new Date(record.date).getDay()];
  
  return {
    id: record._id,
    date: record.date.toISOString().split('T')[0],
    day: dayName,
    incomeEntries: record.incomeEntries.map(entry => ({
      id: entry._id,
      description: entry.description,
      amount: entry.amount,
      currency: entry.currency,
      personName: entry.personName
    })),
    spendEntries: record.spendEntries.map(entry => ({
      id: entry._id,
      description: entry.description,
      amount: entry.amount,
      currency: entry.currency,
      personName: entry.personName
    })),
    totalIncome: record.totalIncome,
    totalSpend: record.totalSpend,
    netBalance: record.netBalance,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
};

// @desc    Create new daily record
// @route   POST /api/daily-records
// @access  Private
exports.createDailyRecord = asyncHandler(async (req, res) => {
  const { date, incomeEntries, spendEntries } = req.body;
  
  // Validate that at least one entry exists
  if ((!incomeEntries || incomeEntries.length === 0) && 
      (!spendEntries || spendEntries.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'At least one income or spend entry is required'
    });
  }
  
  // Create daily record
  const dailyRecord = await DailyRecord.create({
    date: date || Date.now(),
    incomeEntries: incomeEntries || [],
    spendEntries: spendEntries || [],
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });
  
  res.status(201).json({
    success: true,
    data: formatDailyRecord(dailyRecord)
  });
});

// @desc    Get all daily records
// @route   GET /api/daily-records
// @access  Private
exports.getDailyRecords = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', fromDate, toDate } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  // Search filter (search in income and spend entries)
  if (search) {
    query.$or = [
      { 'incomeEntries.description': { $regex: search, $options: 'i' } },
      { 'incomeEntries.personName': { $regex: search, $options: 'i' } },
      { 'spendEntries.description': { $regex: search, $options: 'i' } },
      { 'spendEntries.personName': { $regex: search, $options: 'i' } }
    ];
  }
  
  // Date range filter
  if (fromDate || toDate) {
    query.date = {};
    if (fromDate) {
      query.date.$gte = new Date(fromDate);
    }
    if (toDate) {
      query.date.$lte = new Date(toDate);
    }
  }
  
  const total = await DailyRecord.countDocuments(query);
  const records = await DailyRecord.find(query)
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedRecords = records.map(formatDailyRecord);
  
  // Calculate summary statistics
  const totalIncome = records.reduce((sum, r) => sum + r.totalIncome, 0);
  const totalSpend = records.reduce((sum, r) => sum + r.totalSpend, 0);
  const totalBalance = records.reduce((sum, r) => sum + r.netBalance, 0);
  
  res.status(200).json({
    success: true,
    data: formattedRecords,
    summary: {
      totalRecords: total,
      totalIncome,
      totalSpend,
      totalBalance,
      filteredCount: formattedRecords.length
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single daily record
// @route   GET /api/daily-records/:id
// @access  Private
exports.getDailyRecord = asyncHandler(async (req, res) => {
  const record = await DailyRecord.findById(req.params.id);
  
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Daily record not found'
    });
  }
  
  // Check if record belongs to user
  if (record.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  res.status(200).json({
    success: true,
    data: formatDailyRecord(record)
  });
});

// @desc    Update daily record
// @route   PUT /api/daily-records/:id
// @access  Private
exports.updateDailyRecord = asyncHandler(async (req, res) => {
  let record = await DailyRecord.findById(req.params.id);
  
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Daily record not found'
    });
  }
  
  // Check if record belongs to user
  if (record.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const { date, incomeEntries, spendEntries } = req.body;
  
  // Update fields
  if (date) record.date = date;
  if (incomeEntries) record.incomeEntries = incomeEntries;
  if (spendEntries) record.spendEntries = spendEntries;
  
  await record.save();
  
  res.status(200).json({
    success: true,
    data: formatDailyRecord(record)
  });
});

// @desc    Delete daily record
// @route   DELETE /api/daily-records/:id
// @access  Private
exports.deleteDailyRecord = asyncHandler(async (req, res) => {
  const record = await DailyRecord.findById(req.params.id);
  
  if (!record) {
    return res.status(404).json({
      success: false,
      message: 'Daily record not found'
    });
  }
  
  // Check if record belongs to user
  if (record.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  await record.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Daily record deleted successfully'
  });
});

// @desc    Get daily record statistics
// @route   GET /api/daily-records/stats
// @access  Private
exports.getDailyRecordStats = asyncHandler(async (req, res) => {
  const query = { shopId: req.user.shopData.shopId };
  
  const totalRecords = await DailyRecord.countDocuments(query);
  
  const totalIncome = await DailyRecord.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$totalIncome' } } }
  ]);
  
  const totalSpend = await DailyRecord.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$totalSpend' } } }
  ]);
  
  const totalBalance = await DailyRecord.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$netBalance' } } }
  ]);
  
  // Get last 7 days trend
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const dayRecords = await DailyRecord.find({
      shopId: req.user.shopData.shopId,
      date: { $gte: date, $lt: nextDate }
    });
    
    const dayIncome = dayRecords.reduce((sum, r) => sum + r.totalIncome, 0);
    const daySpend = dayRecords.reduce((sum, r) => sum + r.totalSpend, 0);
    
    last7Days.push({
      date: date.toISOString().split('T')[0],
      income: dayIncome,
      spend: daySpend,
      balance: dayIncome - daySpend
    });
  }
  
  // Get currency breakdown for income
  const currencyBreakdownIncome = await DailyRecord.aggregate([
    { $match: query },
    { $unwind: '$incomeEntries' },
    { $group: {
        _id: '$incomeEntries.currency',
        total: { $sum: '$incomeEntries.amount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  // Get currency breakdown for spend
  const currencyBreakdownSpend = await DailyRecord.aggregate([
    { $match: query },
    { $unwind: '$spendEntries' },
    { $group: {
        _id: '$spendEntries.currency',
        total: { $sum: '$spendEntries.amount' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalRecords,
      totalIncome: totalIncome[0]?.total || 0,
      totalSpend: totalSpend[0]?.total || 0,
      totalBalance: totalBalance[0]?.total || 0,
      last7DaysTrend: last7Days,
      currencyBreakdown: {
        income: currencyBreakdownIncome,
        spend: currencyBreakdownSpend
      }
    }
  });
});