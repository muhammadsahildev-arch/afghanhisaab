const Warehouse = require('../models/Warehouse');
const Product = require('../models/Product');
const StockTransfer = require('../models/StockTransfer');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format warehouse
const formatWarehouse = (warehouse) => {
  return {
    id: warehouse._id,
    name: warehouse.name,
    code: warehouse.code,
    location: warehouse.location,
    address: warehouse.address,
    manager: warehouse.manager,
    phone: warehouse.phone,
    capacity: warehouse.capacity,
    currentStock: warehouse.currentStock,
    status: warehouse.status,
    utilization: warehouse.utilization,
    createdAt: warehouse.createdAt,
    updatedAt: warehouse.updatedAt
  };
};

// @desc    Create new warehouse
// @route   POST /api/warehouses
// @access  Private
exports.createWarehouse = asyncHandler(async (req, res) => {
  const {
    name,
    code,
    location,
    address,
    manager,
    phone,
    capacity,
    description
  } = req.body;

  const existingWarehouse = await Warehouse.findOne({ code, shopId: req.user.shopData.shopId });
  if (existingWarehouse) {
    return res.status(400).json({
      success: false,
      message: 'Warehouse with this code already exists'
    });
  }

  const warehouse = await Warehouse.create({
    name,
    code: code.toUpperCase(),
    location,
    address,
    manager,
    phone,
    capacity: parseInt(capacity) || 1000,
    currentStock: 0,
    status: 'Active',
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: formatWarehouse(warehouse)
  });
});

// @desc    Get all warehouses with products
// @route   GET /api/warehouses
// @access  Private
exports.getWarehouses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { code: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { manager: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await Warehouse.countDocuments(query);
  const warehouses = await Warehouse.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  // Get products in each warehouse from product.warehouseStock
  const warehousesWithProducts = await Promise.all(warehouses.map(async (warehouse) => {
    const products = await Product.find({
      shopId: req.user.shopData.shopId,
      'warehouseStock.warehouseId': warehouse._id
    }).select('name sku warehouseStock');
    
    const formattedProducts = products.map(product => {
      const stock = product.warehouseStock.find(
        ws => ws.warehouseId.toString() === warehouse._id.toString()
      );
      return {
        productId: product._id,
        name: product.name,
        sku: product.sku,
        quantity: stock ? stock.quantity : 0
      };
    }).filter(p => p.quantity > 0);
    
    return {
      ...formatWarehouse(warehouse),
      products: formattedProducts.slice(0, 5)
    };
  }));
  
  const totalWarehouses = await Warehouse.countDocuments(query);
  const totalCapacity = await Warehouse.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$capacity' } } }
  ]);
  const totalStock = await Warehouse.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: '$currentStock' } } }
  ]);
  
  res.status(200).json({
    success: true,
    data: warehousesWithProducts,
    stats: {
      totalWarehouses,
      totalCapacity: totalCapacity[0]?.total || 0,
      totalStock: totalStock[0]?.total || 0,
      avgUtilization: totalStock[0]?.total && totalCapacity[0]?.total 
        ? (totalStock[0].total / totalCapacity[0].total) * 100 
        : 0
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single warehouse
// @route   GET /api/warehouses/:id
// @access  Private
exports.getWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);
  
  if (!warehouse) {
    return res.status(404).json({
      success: false,
      message: 'Warehouse not found'
    });
  }
  
  if (warehouse.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Get all products in this warehouse from product.warehouseStock
  const products = await Product.find({
    shopId: req.user.shopData.shopId,
    'warehouseStock.warehouseId': warehouse._id
  }).select('name sku unitPrice warehouseStock');
  
  const formattedProducts = products.map(product => {
    const stock = product.warehouseStock.find(
      ws => ws.warehouseId.toString() === warehouse._id.toString()
    );
    return {
      id: product._id,
      name: product.name,
      sku: product.sku,
      unitPrice: product.unitPrice,
      quantity: stock ? stock.quantity : 0
    };
  }).filter(p => p.quantity > 0);
  
  res.status(200).json({
    success: true,
    data: {
      ...formatWarehouse(warehouse),
      products: formattedProducts
    }
  });
});

// @desc    Update warehouse
// @route   PUT /api/warehouses/:id
// @access  Private
exports.updateWarehouse = asyncHandler(async (req, res) => {
  let warehouse = await Warehouse.findById(req.params.id);
  
  if (!warehouse) {
    return res.status(404).json({
      success: false,
      message: 'Warehouse not found'
    });
  }
  
  if (warehouse.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const {
    name,
    code,
    location,
    address,
    manager,
    phone,
    capacity,
    status
  } = req.body;
  
  if (name) warehouse.name = name;
  if (code) warehouse.code = code.toUpperCase();
  if (location) warehouse.location = location;
  if (address !== undefined) warehouse.address = address;
  if (manager) warehouse.manager = manager;
  if (phone) warehouse.phone = phone;
  if (capacity) warehouse.capacity = parseInt(capacity);
  if (status) warehouse.status = status;
  
  await warehouse.save();
  
  res.status(200).json({
    success: true,
    data: formatWarehouse(warehouse)
  });
});

// @desc    Delete warehouse
// @route   DELETE /api/warehouses/:id
// @access  Private
exports.deleteWarehouse = asyncHandler(async (req, res) => {
  const warehouse = await Warehouse.findById(req.params.id);
  
  if (!warehouse) {
    return res.status(404).json({
      success: false,
      message: 'Warehouse not found'
    });
  }
  
  if (warehouse.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  if (warehouse.currentStock > 0) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete warehouse with existing stock. Please transfer all stock first.'
    });
  }
  
  await warehouse.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Warehouse deleted successfully'
  });
});

// @desc    Transfer stock between warehouses
// @route   POST /api/warehouses/transfer
// @access  Private
exports.transferStock = asyncHandler(async (req, res) => {
  const {
    fromWarehouseId,
    toWarehouseId,
    productId,
    quantity,
    notes
  } = req.body;
  
  // Validate warehouses
  const fromWarehouse = await Warehouse.findById(fromWarehouseId);
  const toWarehouse = await Warehouse.findById(toWarehouseId);
  
  if (!fromWarehouse || !toWarehouse) {
    return res.status(404).json({
      success: false,
      message: 'Warehouse not found'
    });
  }
  
  if (fromWarehouse.shopId.toString() !== req.user.shopData.shopId.toString() ||
      toWarehouse.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Validate product
  const product = await Product.findById(productId);
  if (!product || product.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  const transferQty = parseInt(quantity);
  
  // Check if source warehouse has enough stock for this product
  const fromWarehouseStock = product.warehouseStock.find(
    ws => ws.warehouseId.toString() === fromWarehouseId
  );
  
  if (!fromWarehouseStock || fromWarehouseStock.quantity < transferQty) {
    return res.status(400).json({
      success: false,
      message: `Insufficient stock. Only ${fromWarehouseStock?.quantity || 0} units available in source warehouse for this product.`
    });
  }
  
  // Update product warehouse stock
  // 1. Reduce from source warehouse
  fromWarehouseStock.quantity -= transferQty;
  
  // Remove from array if quantity becomes 0
  if (fromWarehouseStock.quantity === 0) {
    product.warehouseStock = product.warehouseStock.filter(
      ws => ws.warehouseId.toString() !== fromWarehouseId
    );
  }
  
  // 2. Add to destination warehouse
  const toWarehouseStock = product.warehouseStock.find(
    ws => ws.warehouseId.toString() === toWarehouseId
  );
  
  if (toWarehouseStock) {
    toWarehouseStock.quantity += transferQty;
  } else {
    product.warehouseStock.push({
      warehouseId: toWarehouseId,
      warehouseName: toWarehouse.name,
      quantity: transferQty
    });
  }
  
  await product.save();
  
  // Update warehouse total stock counts
  fromWarehouse.currentStock -= transferQty;
  toWarehouse.currentStock += transferQty;
  await fromWarehouse.save();
  await toWarehouse.save();
  
  // Create transfer record
  const transfer = await StockTransfer.create({
    fromWarehouseId: fromWarehouse._id,
    fromWarehouseName: fromWarehouse.name,
    toWarehouseId: toWarehouse._id,
    toWarehouseName: toWarehouse.name,
    productId: product._id,
    productName: product.name,
    sku: product.sku,
    quantity: transferQty,
    status: 'Completed',
    notes,
    completedDate: new Date(),
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });
  
  res.status(200).json({
    success: true,
    message: `${transferQty} units of ${product.name} transferred from ${fromWarehouse.name} to ${toWarehouse.name}`,
    data: {
      transfer: {
        id: transfer._id,
        transferNumber: transfer.transferNumber,
        fromWarehouse: fromWarehouse.name,
        toWarehouse: toWarehouse.name,
        product: product.name,
        quantity: transferQty,
        status: 'Completed'
      },
      productStock: {
        totalStock: product.currentStock,
        fromWarehouseRemaining: fromWarehouseStock?.quantity || 0,
        toWarehouseNew: toWarehouseStock ? toWarehouseStock.quantity : transferQty
      }
    }
  });
});
// @desc    Get transfer history
// @route   GET /api/warehouses/transfers
// @access  Private
exports.getTransfers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', status } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { fromWarehouseName: { $regex: search, $options: 'i' } },
      { toWarehouseName: { $regex: search, $options: 'i' } },
      { productName: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await StockTransfer.countDocuments(query);
  const transfers = await StockTransfer.find(query)
    .sort({ transferDate: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  res.status(200).json({
    success: true,
    data: transfers.map(t => ({
      id: t._id,
      date: t.transferDate,
      fromWarehouse: t.fromWarehouseName,
      toWarehouse: t.toWarehouseName,
      product: t.productName,
      quantity: t.quantity,
      status: t.status,
      notes: t.notes
    })),
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});