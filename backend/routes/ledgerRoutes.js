const express = require('express');
const {
  createLedgerEntry,
  getLedgerEntries,
  getLedgerEntry,
  updateLedgerEntry,
  deleteLedgerEntry,
  getLedgerStats
} = require('../controllers/ledgerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats route
router.get('/ledger/stats', getLedgerStats);

// Main CRUD routes
router.route('/ledger')
  .get(getLedgerEntries)
  .post(createLedgerEntry);

router.route('/ledger/:id')
  .get(getLedgerEntry)
  .put(updateLedgerEntry)
  .delete(deleteLedgerEntry);

module.exports = router;