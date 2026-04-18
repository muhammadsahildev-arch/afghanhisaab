const express = require('express');
const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats
} = require('../controllers/customerTransactionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats route
router.get('/customer-transactions/stats', getTransactionStats);

// Main CRUD routes
router.route('/customer-transactions')
  .get(getTransactions)
  .post(createTransaction);

router.route('/customer-transactions/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;