const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout,
  paymentSuccess,
  submitPaymentProof,
  getPendingPayments,
  getAllPaymentProofs,
  approvePayment,
  denyPayment,
  getMyPaymentStatus,
  getAllUsers,
  deleteUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');
const { uploadUserPhoto, uploadPaymentScreenshot } = require('../middleware/upload');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, uploadUserPhoto, updateProfile);
router.put('/update-password', protect, updatePassword);
router.get('/logout', protect, logout);
router.post('/payment-success', protect, paymentSuccess);


// Payment Proof Routes
router.post('/submit-payment-proof', protect, uploadPaymentScreenshot ,submitPaymentProof);
router.get('/payment-proofs/pending', protect, getPendingPayments);
router.get('/payment-proofs', protect, getAllPaymentProofs);
router.post('/payment-proofs/:userId/approve', protect, approvePayment);
router.post('/payment-proofs/:userId/deny', protect, denyPayment);
router.get('/my-payment-status', protect, getMyPaymentStatus);

// User Management Routes (System Admin)
router.get('/admin-users', protect, getAllUsers);
router.delete('/users/:userId', protect, deleteUser);  // Add delete user route

module.exports = router; 