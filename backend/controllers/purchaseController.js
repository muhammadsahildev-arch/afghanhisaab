const Supplier = require('../models/Supplier');
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format supplier
const formatSupplier = (supplier) => {
  return {
    id: supplier._id,
    name: supplier.name,
    company: supplier.company,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    taxNumber: supplier.taxNumber,
    discount: supplier.discount,
    currency: supplier.currency,
    totalPurchases: supplier.totalPurchases,
    outstandingBalance: supplier.outstandingBalance,
    status: supplier.status,
    createdAt: supplier.createdAt,
    lastOrder: supplier.lastOrder
  };
};

// Helper function to format purchase order
const formatPurchaseOrder = (order) => {
  return {
    id: order._id,
    orderNumber: order.orderNumber,
    supplierId: order.supplierId,
    supplierName: order.supplierName,
    orderDate: order.orderDate,
    expectedDate: order.expectedDate,
    currency: order.currency,
    status: order.status,
    totalAmount: order.totalAmount,
    discount: order.discount,
    paidAmount: order.paidAmount,
    items: order.items,
    notes: order.notes,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt
  };
};

// ==================== SUPPLIERS ====================

// @desc    Create new supplier
// @route   POST /api/purchases/suppliers
// @access  Private
exports.createSupplier = asyncHandler(async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    address,
    taxNumber,
    discount,
    currency
  } = req.body;

  const supplier = await Supplier.create({
    name,
    company,
    email,
    phone,
    address,
    taxNumber,
    discount: parseFloat(discount) || 0,
    currency: currency || 'USD',
    totalPurchases: 0,
    outstandingBalance: 0,
    status: 'Active',
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: formatSupplier(supplier)
  });
});

// @desc    Update supplier
// @route   PUT /api/purchases/suppliers/:id
// @access  Private
exports.updateSupplier = asyncHandler(async (req, res) => {
  let supplier = await Supplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Supplier not found'
    });
  }
  
  if (supplier.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const {
    name,
    company,
    email,
    phone,
    address,
    taxNumber,
    discount,
    currency,
    status
  } = req.body;
  
  if (name) supplier.name = name;
  if (company) supplier.company = company;
  if (email) supplier.email = email;
  if (phone) supplier.phone = phone;
  if (address !== undefined) supplier.address = address;
  if (taxNumber !== undefined) supplier.taxNumber = taxNumber;
  if (discount !== undefined) supplier.discount = parseFloat(discount);
  if (currency) supplier.currency = currency;
  if (status) supplier.status = status;
  
  await supplier.save();
  
  res.status(200).json({
    success: true,
    data: formatSupplier(supplier)
  });
});

// @desc    Get all suppliers
// @route   GET /api/purchases/suppliers
// @access  Private
exports.getSuppliers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await Supplier.countDocuments(query);
  const suppliers = await Supplier.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedSuppliers = suppliers.map(formatSupplier);
  
  const totalSuppliers = await Supplier.countDocuments(query);
  const activeSuppliers = await Supplier.countDocuments({ ...query, status: 'Active' });
  const totalPurchases = await Supplier.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$totalPurchases' } } }
  ]);
  const outstandingBalance = await Supplier.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$outstandingBalance' } } }
  ]);
  
  res.status(200).json({
    success: true,
    data: formattedSuppliers,
    stats: {
      totalSuppliers,
      activeSuppliers,
      totalPurchases: totalPurchases[0]?.total || 0,
      outstandingBalance: outstandingBalance[0]?.total || 0
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single supplier
// @route   GET /api/purchases/suppliers/:id
// @access  Private
exports.getSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Supplier not found'
    });
  }
  
  if (supplier.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const orders = await PurchaseOrder.find({ supplierId: supplier._id, shopId: req.user.shopData.shopId })
    .sort({ orderDate: -1 })
    .limit(10);
  
  res.status(200).json({
    success: true,
    data: {
      ...formatSupplier(supplier),
      recentOrders: orders.map(formatPurchaseOrder)
    }
  });
});

// @desc    Delete supplier
// @route   DELETE /api/purchases/suppliers/:id
// @access  Private
exports.deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Supplier not found'
    });
  }
  
  if (supplier.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const activeOrders = await PurchaseOrder.countDocuments({ 
    supplierId: supplier._id,
    status: { $in: ['Pending', 'Processing', 'Partially Received'] }
  });
  
  if (activeOrders > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete supplier with ${activeOrders} active orders. Please complete or cancel these orders first.`
    });
  }
  
  await supplier.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Supplier deleted successfully'
  });
});

// ==================== PURCHASE ORDERS ====================

// @desc    Create purchase order
// @route   POST /api/purchases/orders
// @access  Private
exports.createPurchaseOrder = asyncHandler(async (req, res) => {
  const {
    supplierId,
    orderDate,
    expectedDate,
    items,
    discount,
    notes,
    currency
  } = req.body;
  
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) {
    return res.status(404).json({
      success: false,
      message: 'Supplier not found'
    });
  }
  
  if (supplier.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  let totalAmount = 0;
  const orderItems = [];
  
  for (const item of items) {
    let product;
    if (item.productId) {
      product = await Product.findById(item.productId);
    } else if (item.sku) {
      product = await Product.findOne({ sku: item.sku, shopId: req.user.shopData.shopId });
    }
    
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product with ${item.productId ? 'ID' : 'SKU'} ${item.productId || item.sku} not found.`
      });
    }
    
    const itemTotal = item.quantity * item.unitPrice;
    totalAmount += itemTotal;
    
    orderItems.push({
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: itemTotal,
      warehouseId: item.warehouseId,
      expectedDeliveryDate: item.expectedDeliveryDate,
      expiryDate: item.expiryDate,
      location: item.location,
      rack: item.rack
    });
  }
  
  const discountPercent = parseFloat(discount) || 0;
  const discountAmount = totalAmount * (discountPercent / 100);
  const finalTotal = totalAmount - discountAmount;
  
  const orderCurrency = currency || supplier.currency || 'USD';
  
  const order = await PurchaseOrder.create({
    supplierId,
    supplierName: supplier.name,
    orderDate: orderDate || Date.now(),
    expectedDate,
    currency: orderCurrency,
    status: 'Processing',
    totalAmount: finalTotal,
    discount: discountPercent,
    paidAmount: 0,
    items: orderItems,
    notes,
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });
  
  res.status(201).json({
    success: true,
    data: formatPurchaseOrder(order)
  });
});

// @desc    Get all purchase orders
// @route   GET /api/purchases/orders
// @access  Private
exports.getPurchaseOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: 'i' } },
      { supplierName: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await PurchaseOrder.countDocuments(query);
  const orders = await PurchaseOrder.find(query)
    .sort({ orderDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedOrders = orders.map(formatPurchaseOrder);
  
  const totalOrders = await PurchaseOrder.countDocuments(query);
  const deliveredOrders = await PurchaseOrder.countDocuments({ ...query, status: 'Delivered' });
  const totalAmount = await PurchaseOrder.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
  ]);
  const processingOrders = await PurchaseOrder.countDocuments({ ...query, status: 'Processing' });
  
  res.status(200).json({
    success: true,
    data: formattedOrders,
    stats: {
      totalOrders,
      deliveredOrders,
      totalAmount: totalAmount[0]?.total || 0,
      processingOrders
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single purchase order
// @route   GET /api/purchases/orders/:id
// @access  Private
exports.getPurchaseOrder = asyncHandler(async (req, res) => {
  const order = await PurchaseOrder.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Purchase order not found'
    });
  }
  
  if (order.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  res.status(200).json({
    success: true,
    data: formatPurchaseOrder(order)
  });
});

// @desc    Receive stock from purchase order
// @route   POST /api/purchases/orders/:id/receive
// @access  Private
exports.receiveStock = asyncHandler(async (req, res) => {
  const order = await PurchaseOrder.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Purchase order not found'
    });
  }
  
  if (order.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  if (order.status !== 'Processing') {
    return res.status(400).json({
      success: false,
      message: 'Order is not in processing state'
    });
  }
  
  const results = {
    products: [],
    warehouses: []
  };
  
  let totalUnitsAdded = 0;
  
  // Process each item in the order
  for (const item of order.items) {
    console.log(`Processing item: ${item.productName}, Quantity: ${item.quantity}`);
    
    // 1. Find product
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product ${item.productName} not found`
      });
    }
    
    console.log(`Product found: ${product.name}, Current stock: ${product.currentStock}`);
    
    // 2. Find warehouse
    const warehouse = await Warehouse.findById(item.warehouseId);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: `Warehouse not found for product ${item.productName}`
      });
    }
    
    console.log(`Warehouse found: ${warehouse.name}, Current stock: ${warehouse.currentStock}`);
    
    const quantity = parseInt(item.quantity);
    
    // 3. Update product total stock
    const oldProductStock = product.currentStock;
    product.currentStock += quantity;
    
    // 4. Update product warehouseStock array
    if (!product.warehouseStock) {
      product.warehouseStock = [];
    }
    
    const warehouseStockIndex = product.warehouseStock.findIndex(
      ws => ws.warehouseId && ws.warehouseId.toString() === item.warehouseId.toString()
    );
    
    if (warehouseStockIndex > -1) {
      // Update existing warehouse entry
      product.warehouseStock[warehouseStockIndex].quantity += quantity;
      console.log(`Updated ${product.name} stock in ${warehouse.name}: +${quantity} (Total: ${product.warehouseStock[warehouseStockIndex].quantity})`);
    } else {
      // Add new warehouse entry
      product.warehouseStock.push({
        warehouseId: item.warehouseId,
        warehouseName: warehouse.name,
        quantity: quantity
      });
      console.log(`Added ${product.name} to ${warehouse.name} with ${quantity} units`);
    }
    
    // Save product
    await product.save();
    console.log(`Product saved. New total stock: ${product.currentStock}`);
    
    // 5. Update warehouse total stock
    const oldWarehouseStock = warehouse.currentStock;
    warehouse.currentStock += quantity;
    await warehouse.save();
    console.log(`Warehouse saved. New total stock: ${warehouse.currentStock}`);
    
    totalUnitsAdded += quantity;
    
    // Track results
    results.products.push({
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      oldStock: oldProductStock,
      newStock: product.currentStock,
      added: quantity,
      unitPrice: item.unitPrice,
      warehouseId: item.warehouseId,
      warehouseName: warehouse.name
    });
    
    results.warehouses.push({
      warehouseId: warehouse._id,
      warehouseName: warehouse.name,
      oldStock: oldWarehouseStock,
      newStock: warehouse.currentStock,
      added: quantity
    });
  }
  
  // Update order status to Delivered
  order.status = 'Delivered';
  order.paidAmount = order.totalAmount;
  await order.save();
  
  // Update supplier total purchases
  await Supplier.findByIdAndUpdate(order.supplierId, {
    $inc: { totalPurchases: order.totalAmount },
    $set: { lastOrder: new Date() }
  });
  
  console.log(`Stock received successfully! Added ${totalUnitsAdded} units.`);
  
  res.status(200).json({
    success: true,
    message: `Stock received successfully! Added ${totalUnitsAdded} units.`,
    data: {
      orderNumber: order.orderNumber,
      totalUnitsAdded,
      products: results.products,
      warehouses: results.warehouses,
      summary: {
        productsCount: results.products.length,
        warehousesCount: results.warehouses.length,
        totalValue: order.totalAmount
      }
    }
  });
});

// @desc    Update purchase order status
// @route   PUT /api/purchases/orders/:id/status
// @access  Private
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await PurchaseOrder.findById(req.params.id);
  
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Purchase order not found'
    });
  }
  
  if (order.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const status = req.body.status || req.body;
  
  const validStatuses = ['Pending', 'Processing', 'Partially Received', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status'
    });
  }
  
  order.status = status;
  await order.save();
  
  res.status(200).json({
    success: true,
    data: {
      id: order._id,
      orderNumber: order.orderNumber,
      status: order.status
    }
  });
});