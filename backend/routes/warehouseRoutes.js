const express = require('express');
const {
  createWarehouse,
  getWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
  transferStock,
  getTransfers
} = require('../controllers/warehouseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Transfer routes
router.post('/warehouses/transfer', transferStock);
router.get('/warehouses/transfers', getTransfers);

// Main CRUD routes
router.route('/warehouses')
  .get(getWarehouses)
  .post(createWarehouse);

router.route('/warehouses/:id')
  .get(getWarehouse)
  .put(updateWarehouse)
  .delete(deleteWarehouse);

module.exports = router;