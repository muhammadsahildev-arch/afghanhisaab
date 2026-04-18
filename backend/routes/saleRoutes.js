const express = require('express');
const {
  createSale,
  getSales,
  getSale,
  getDailySummary,
  refundSale  // Add this
} = require('../controllers/saleController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Daily summary route
router.get('/sales/daily-summary', getDailySummary);

// Refund route
router.post('/sales/:id/refund', refundSale);

// Main CRUD routes
router.route('/sales')
  .get(getSales)
  .post(createSale);

router.route('/sales/:id')
  .get(getSale);

module.exports = router;