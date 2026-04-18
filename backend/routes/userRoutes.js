const express = require('express');
const {
  getUsers,
  getUserStats,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getRoles,
  createRole,
  deleteRole,
  getPermissions
} = require('../controllers/userManagementController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes (only shop_admin and system_admin can access)
router.get('/users/stats', authorize('shop_admin', 'system_admin'), getUserStats);
router.get('/users', authorize('shop_admin', 'system_admin'), getUsers);
router.post('/users', authorize('shop_admin', 'system_admin'), createUser);
router.put('/users/:id', authorize('shop_admin', 'system_admin'), updateUser);
router.delete('/users/:id', authorize('shop_admin', 'system_admin'), deleteUser);
router.patch('/users/:id/toggle-status', authorize('shop_admin', 'system_admin'), toggleUserStatus);

// Role routes
router.get('/roles', authorize('shop_admin', 'system_admin'), getRoles);
router.post('/roles', authorize('shop_admin', 'system_admin'), createRole);
router.delete('/roles/:id', authorize('shop_admin', 'system_admin'), deleteRole);

// Permissions (any authenticated user)
router.get('/permissions', getPermissions);

module.exports = router;