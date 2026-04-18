const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Main CRUD routes
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.route('/products/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);


module.exports = router;