const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const asyncHandler = require('../middleware/asyncHandler');

// Helper function to format product for frontend
const formatProduct = (product) => {
  return {
    id: product._id,
    name: product.name,
    sku: product.sku,
    barcode: product.barcode,
    category: product.category,
    brand: product.brand,
    unitPrice: product.unitPrice,
    purchasePrice: product.purchasePrice,
    currentStock: product.currentStock,
    reorderLevel: product.reorderLevel,
    status: product.status,
    description: product.description,
    currency: product.currency,
    warehouseStock: product.warehouseStock || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    barcode,
    category,
    brand,
    unitPrice,
    purchasePrice,
    reorderLevel,
    description,
    currency
  } = req.body;

  const existingProduct = await Product.findOne({ sku, shopId: req.user.shopData.shopId });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: 'Product with this SKU already exists'
    });
  }

  const product = await Product.create({
    name,
    sku: sku.toUpperCase(),
    barcode,
    category,
    brand,
    unitPrice: parseFloat(unitPrice),
    purchasePrice: parseFloat(purchasePrice) || 0,
    reorderLevel: parseInt(reorderLevel) || 10,
    description,
    currency: currency || 'USD',
    currentStock: 0,
    warehouseStock: [],
    status: 'Out of Stock',
    shopId: req.user.shopData.shopId,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: formatProduct(product)
  });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', category, status } = req.query;
  
  let query = { shopId: req.user.shopData.shopId };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { sku: { $regex: search, $options: 'i' } },
      { barcode: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (category && category !== 'all') {
    query.category = category;
  }
  
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedProducts = products.map(product => formatProduct(product));
  
  const totalProducts = await Product.countDocuments(query);
  const allProducts = await Product.find(query);
  const lowStockCount = allProducts.filter(p => p.currentStock <= p.reorderLevel && p.currentStock > 0).length;
  const criticalStockCount = allProducts.filter(p => p.currentStock === 0).length;
  
  const totalValue = await Product.aggregate([
    { $match: query },
    { $group: { _id: null, total: { $sum: { $multiply: ['$currentStock', '$unitPrice'] } } } }
  ]);
  
  res.status(200).json({
    success: true,
    data: formattedProducts,
    stats: {
      totalProducts,
      lowStockCount,
      criticalStockCount,
      totalValue: totalValue[0]?.total || 0
    },
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (product.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Populate warehouse names for the response
  const warehouseStockWithNames = await Promise.all(
    (product.warehouseStock || []).map(async (stock) => {
      const warehouse = await Warehouse.findById(stock.warehouseId);
      return {
        warehouseId: stock.warehouseId,
        warehouseName: warehouse ? warehouse.name : 'Unknown',
        quantity: stock.quantity
      };
    })
  );
  
  res.status(200).json({
    success: true,
    data: {
      ...formatProduct(product),
      warehouseStock: warehouseStockWithNames
    }
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (product.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  const {
    name,
    sku,
    barcode,
    category,
    brand,
    unitPrice,
    purchasePrice,
    reorderLevel,
    description,
    currency  
  } = req.body;
  
  if (name) product.name = name;
  if (sku) product.sku = sku.toUpperCase();
  if (barcode !== undefined) product.barcode = barcode;
  if (category) product.category = category;
  if (brand) product.brand = brand;
  if (unitPrice) product.unitPrice = parseFloat(unitPrice);
  if (purchasePrice !== undefined) product.purchasePrice = parseFloat(purchasePrice);
  if (reorderLevel) product.reorderLevel = parseInt(reorderLevel);
  if (description !== undefined) product.description = description;
  if (currency) product.currency = currency;

  await product.save();
  
  res.status(200).json({
    success: true,
    data: formatProduct(product)
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (product.shopId.toString() !== req.user.shopData.shopId.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  if (product.currentStock > 0) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete product with existing stock. Please transfer or sell remaining stock first.'
    });
  }
  
  await product.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});