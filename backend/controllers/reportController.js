const Sale = require('../models/Sale');
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get sales report
// @route   GET /api/reports/sales
// @access  Private
exports.getSalesReport = asyncHandler(async (req, res) => {
  const { period = 'daily', fromDate, toDate } = req.query;
  
  let startDate, endDate;
  const now = new Date();
  
  switch(period) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'yearly':
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'custom':
      startDate = new Date(fromDate);
      endDate = new Date(toDate);
      break;
    default:
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
  }
  
  const sales = await Sale.find({
    shopId: req.user.shopData.shopId,
    saleDate: { $gte: startDate, $lte: endDate },
    status: 'completed'
  });
  
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
  const totalOrders = sales.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Group by date
  const groupedData = {};
  sales.forEach(sale => {
    const dateKey = sale.saleDate.toISOString().split('T')[0];
    if (!groupedData[dateKey]) {
      groupedData[dateKey] = { sales: 0, orders: 0 };
    }
    groupedData[dateKey].sales += sale.total;
    groupedData[dateKey].orders += 1;
  });
  
  const chartData = Object.entries(groupedData).map(([date, data]) => ({
    date,
    sales: data.sales,
    orders: data.orders
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Calculate growth
  const previousPeriodStart = new Date(startDate);
  const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  previousPeriodStart.setDate(previousPeriodStart.getDate() - daysDiff);
  
  const previousPeriodSales = await Sale.aggregate([
    { $match: { 
        shopId: req.user.shopData.shopId,
        saleDate: { $gte: previousPeriodStart, $lt: startDate },
        status: 'completed'
      }
    },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
  
  const previousTotal = previousPeriodSales[0]?.total || 0;
  const growth = previousTotal > 0 ? ((totalSales - previousTotal) / previousTotal) * 100 : 0;
  
  res.status(200).json({
    success: true,
    data: {
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalSales,
      totalOrders,
      avgOrderValue,
      growth,
      chartData
    }
  });
});




// @desc    Get discount report
// @route   GET /api/reports/discounts
// @access  Private
exports.getDiscountReport = asyncHandler(async (req, res) => {
  const { period = 'monthly', fromDate, toDate } = req.query;
  
  let startDate, endDate;
  const now = new Date();
  
  switch(period) {
    case 'daily':
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'weekly':
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    case 'monthly':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
      break;
    default:
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 999);
  }
  
  const sales = await Sale.find({
    shopId: req.user.shopData.shopId,
    saleDate: { $gte: startDate, $lte: endDate },
    status: 'completed'
  });
  
  const totalDiscount = sales.reduce((sum, s) => sum + (s.discountAmount || 0), 0);
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const discountRate = totalRevenue > 0 ? (totalDiscount / (totalRevenue + totalDiscount)) * 100 : 0;
  
  // Discount by type
  const billDiscount = sales.reduce((sum, s) => sum + (s.discountAmount || 0), 0);
  const itemDiscount = sales.reduce((sum, s) => {
    const itemDisc = s.items.reduce((itemSum, item) => {
      const discountAmount = (item.total * (item.discount || 0)) / 100;
      return itemSum + discountAmount;
    }, 0);
    return sum + itemDisc;
  }, 0);
  
  const byType = [
    { type: 'Bill Discount', amount: billDiscount, count: sales.filter(s => s.discount > 0).length },
    { type: 'Item Discount', amount: itemDiscount, count: sales.flatMap(s => s.items.filter(i => i.discount > 0)).length }
  ];
  
  // Top discounted products
  const productDiscounts = {};
  for (const sale of sales) {
    for (const item of sale.items) {
      if (item.discount > 0) {
        if (!productDiscounts[item.productName]) {
          productDiscounts[item.productName] = {
            name: item.productName,
            discount: 0,
            sales: 0
          };
        }
        const itemDiscountAmount = (item.total * item.discount) / 100;
        productDiscounts[item.productName].discount += itemDiscountAmount;
        productDiscounts[item.productName].sales += item.quantity;
      }
    }
  }
  
  const topProducts = Object.values(productDiscounts)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 5);
  
  res.status(200).json({
    success: true,
    data: {
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalDiscount,
      discountRate,
      byType,
      topProducts
    }
  });
});



