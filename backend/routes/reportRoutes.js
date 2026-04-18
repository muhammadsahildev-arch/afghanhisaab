const express = require('express');
const {
  getSalesReport,
  getDiscountReport,
  
} = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Report routes
router.get('/reports/sales', getSalesReport);
router.get('/reports/discounts', getDiscountReport);



module.exports = router;