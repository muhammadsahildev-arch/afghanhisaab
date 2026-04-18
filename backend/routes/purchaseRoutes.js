const express = require('express');
const {
  // Suppliers
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
  // Purchase Orders
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrder,
  receiveStock,
  updateOrderStatus
} = require('../controllers/purchaseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// ==================== SUPPLIER ROUTES ====================
router.route('/purchases/suppliers')
  .get(getSuppliers)
  .post(createSupplier);

router.route('/purchases/suppliers/:id')
  .get(getSupplier)
  .put(updateSupplier)
  .delete(deleteSupplier);

// ==================== PURCHASE ORDER ROUTES ====================
router.route('/purchases/orders')
  .get(getPurchaseOrders)
  .post(createPurchaseOrder);

router.route('/purchases/orders/:id')
  .get(getPurchaseOrder);

router.post('/purchases/orders/:id/receive', receiveStock);
router.put('/purchases/orders/:id/status', updateOrderStatus);

module.exports = router;