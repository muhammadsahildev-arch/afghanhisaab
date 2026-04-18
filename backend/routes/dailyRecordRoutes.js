const express = require('express');
const {
  createDailyRecord,
  getDailyRecords,
  getDailyRecord,
  updateDailyRecord,
  deleteDailyRecord,
  getDailyRecordStats
} = require('../controllers/dailyRecordController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Stats route
router.get('/daily-records/stats', getDailyRecordStats);

// Main CRUD routes
router.route('/daily-records')
  .get(getDailyRecords)
  .post(createDailyRecord);

router.route('/daily-records/:id')
  .get(getDailyRecord)
  .put(updateDailyRecord)
  .delete(deleteDailyRecord);

module.exports = router;