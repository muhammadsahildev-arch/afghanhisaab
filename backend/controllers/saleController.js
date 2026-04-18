const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');  // ADD THIS
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format sale
const formatSale = (sale) => {
  return {
    id: sale._id,
    invoiceNumber: sale.invoiceNumber,
    customerName: sale.customerName,
    customerPhone: sale.customerPhone,
    customerEmail: sale.customerEmail,
    items: sale.items,
    subtotal: sale.subtotal,
    discount: sale.discount,
    discountAmount: sale.discountAmount,
    total: sale.total,
    paymentMethod: sale.paymentMethod,
    paymentStatus: sale.paymentStatus,
    status: sale.status,
    saleDate: sale.saleDate,
    createdAt: sale.createdAt
  };
};

// @desc    Create new sale (Batch-Free Version)
// @route   POST /api/sales
// @access  Private
exports.createSale = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    items,
    discount,
    paymentMethod,
    saleDate
  } = req.body;
  
  let subtotal = 0;
  const saleItems = [];
  
  // Process each item
  for (const item of items) {
    // Find product by ID or barcode
    let product;
    if (item.productId) {
      product = await Product.findById(item.productId);
    } else if (item.barcode) {
      product = await Product.findOne({ 
        barcode: item.barcode, 
        shopId: req.user.shopData.shopId 
      });
    }
    
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product not found`
      });
    }
    
    // Validate warehouse is specified
    if (!item.warehouseId) {
      return res.status(400).json({
        success: false,
        message: `Please select a warehouse for ${product.name}`
      });
    }
    
    // Find warehouse
    const warehouse = await Warehouse.findById(item.warehouseId);
    if (!warehouse || warehouse.shopId.toString() !== req.user.shopData.shopId.toString()) {
      return res.status(400).json({
        success: false,
        message: `Warehouse not found for ${product.name}`
      });
    }
    
    // Check stock in specific warehouse
    const warehouseStock = product.warehouseStock?.find(
      ws => ws.warehouseId.toString() === item.warehouseId
    );
    
    const availableInWarehouse = warehouseStock?.quantity || 0;
    
    if (availableInWarehouse < item.quantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for ${product.name} in ${warehouse.name}. Available: ${availableInWarehouse} units`
      });
    }
    
    // Calculate item total
    let itemTotal = item.quantity * product.unitPrice;
    
    // Apply item discount
    const itemDiscount = parseFloat(item.discount) || 0;
    if (itemDiscount > 0) {
      itemTotal = itemTotal * (1 - itemDiscount / 100);
    }
    
    // UPDATE: Deduct from product's warehouseStock array
    const warehouseStockIndex = product.warehouseStock.findIndex(
      ws => ws.warehouseId.toString() === item.warehouseId
    );
    
    if (warehouseStockIndex > -1) {
      product.warehouseStock[warehouseStockIndex].quantity -= item.quantity;
      
      // Remove from array if quantity becomes 0
      if (product.warehouseStock[warehouseStockIndex].quantity === 0) {
        product.warehouseStock.splice(warehouseStockIndex, 1);
      }
    }
    
    // UPDATE: Deduct from product total stock
    product.currentStock -= item.quantity;
    await product.save();
    
    // UPDATE: Deduct from warehouse total stock
    warehouse.currentStock -= item.quantity;
    await warehouse.save();
    
    saleItems.push({
      productId: product._id,
      warehouseId: item.warehouseId,
      warehouseName: warehouse.name,
      productName: product.name,
      sku: product.sku,
      quantity: item.quantity,
      unitPrice: product.unitPrice,
      discount: itemDiscount,
      total: itemTotal
    });
    
    subtotal += itemTotal;
  }
  
  // Apply bill discount
  const discountPercent = parseFloat(discount) || 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;
  
  // Create sale record
  const sale = await Sale.create({
    customerName: customerName || 'Walk-in Customer',
    customerPhone,
    customerEmail,
    items: saleItems,
    subtotal,
    discount: discountPercent,
    discountAmount,
    total,
    paymentMethod: paymentMethod || 'cash',
    paymentStatus: 'paid',
    status: 'completed',
    saleDate: saleDate || Date.now(),
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });
  
  res.status(201).json({
    success: true,
    message: 'Sale completed successfully',
    data: {
      id: sale._id,
      invoiceNumber: sale.invoiceNumber,
      customerName: sale.customerName,
      customerPhone: sale.customerPhone,
      customerEmail: sale.customerEmail,
      items: sale.items,
      subtotal: sale.subtotal,
      discount: sale.discount,
      discountAmount: sale.discountAmount,
      total: sale.total,
      paymentMethod: sale.paymentMethod,
      saleDate: sale.saleDate
    }
  });
});

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
exports.getSales = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', fromDate, toDate } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { invoiceNumber: { $regex: search, $options: 'i' } },
      { customerName: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (fromDate || toDate) {
    query.saleDate = {};
    if (fromDate) {
      query.saleDate.$gte = new Date(fromDate);
    }
    if (toDate) {
      query.saleDate.$lte = new Date(toDate);
    }
  }
  
  const total = await Sale.countDocuments(query);
  const sales = await Sale.find(query)
    .sort({ saleDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedSales = sales.map(formatSale);
  
  const totalSales = await Sale.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$total' } } }
  ]);
  const totalOrders = await Sale.countDocuments(query);
  const avgOrderValue = totalSales[0]?.total / totalOrders || 0;
  
  res.status(200).json({
    success: true,
    data: formattedSales,
    stats: {
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      avgOrderValue
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single sale
// @route   GET /api/sales/:id
// @access  Private
exports.getSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  
  if (!sale) {
    return res.status(404).json({
      success: false,
      message: 'Sale not found'
    });
  }
  
  if (sale.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  res.status(200).json({
    success: true,
    data: formatSale(sale)
  });
});

// @desc    Get daily sales summary
// @route   GET /api/sales/daily-summary
// @access  Private
exports.getDailySummary = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const targetDate = date ? new Date(date) : new Date();
  targetDate.setHours(0, 0, 0, 0);
  
  const nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);
  
  const sales = await Sale.find({
    shopId: req.user.shopData.shopId,
    saleDate: { $gte: targetDate, $lt: nextDate }
  });
  
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
  const totalOrders = sales.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  // Get top selling products
  const productSales = {};
  for (const sale of sales) {
    for (const item of sale.items) {
      if (!productSales[item.productName]) {
        productSales[item.productName] = {
          name: item.productName,
          quantity: 0,
          revenue: 0
        };
      }
      productSales[item.productName].quantity += item.quantity;
      productSales[item.productName].revenue += item.total;
    }
  }
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  res.status(200).json({
    success: true,
    data: {
      date: targetDate.toISOString().split('T')[0],
      totalSales,
      totalOrders,
      avgOrderValue,
      topProducts
    }
  });
});

// @desc    Refund sale (reverse stock)
// @route   POST /api/sales/:id/refund
// @access  Private
exports.refundSale = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id);
  
  if (!sale) {
    return res.status(404).json({
      success: false,
      message: 'Sale not found'
    });
  }
  
  if (sale.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  if (sale.status === 'refunded') {
    return res.status(400).json({
      success: false,
      message: 'Sale already refunded'
    });
  }
  
  // Reverse stock for each item
  for (const item of sale.items) {
    const product = await Product.findById(item.productId);
    const warehouse = await Warehouse.findById(item.warehouseId);
    
    if (product && warehouse) {
      // Add back to product total stock
      product.currentStock += item.quantity;
      
      // Add back to product warehouseStock
      const warehouseStockIndex = product.warehouseStock.findIndex(
        ws => ws.warehouseId.toString() === item.warehouseId.toString()
      );
      
      if (warehouseStockIndex > -1) {
        product.warehouseStock[warehouseStockIndex].quantity += item.quantity;
      } else {
        product.warehouseStock.push({
          warehouseId: item.warehouseId,
          warehouseName: item.warehouseName,
          quantity: item.quantity
        });
      }
      
      await product.save();
      
      // Add back to warehouse total stock
      warehouse.currentStock += item.quantity;
      await warehouse.save();
    }
  }
  
  // Update sale status
  sale.status = 'refunded';
  await sale.save();
  
  res.status(200).json({
    success: true,
    message: 'Sale refunded successfully',
    data: formatSale(sale)
  });
});