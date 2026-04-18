const User = require('../models/User');
const Role = require('../models/Role');
const asyncHandler = require('../middleware/asyncHandler');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto'); 

// All permissions from frontend
const ALL_PERMISSIONS = [ 
  { id: 'pos', name: 'POS / Sales', module: 'Sales', icon: '🛒' },
  { id: 'inventory', name: 'Inventory Management', module: 'Inventory', icon: '📦' },
  { id: 'purchases', name: 'Purchase System', module: 'Purchases', icon: '🚚' },
  { id: 'warehouses', name: 'Warehouse Management', module: 'Warehouses', icon: '🏭' },
  { id: 'reports', name: 'Reports & Analytics', module: 'Reports', icon: '📊' },
  { id: 'customers', name: 'Managing Customers Record', module: 'finance', icon: '💰' },
  { id: 'backup', name: 'Daily Records', module: 'System', icon: '💾' },
  { id: 'ledger', name: 'Ledge Management', module: 'Admin', icon: '👤' },
];

// Helper function to format user for frontend
const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username || user.email.split('@')[0],
    email: user.email,
    fullName: user.profile.fullName,
    phone: user.profile.phone,
    role: user.role,
    status: user.status,
    lastLogin: user.lastLogin || '-',
    createdAt: user.createdAt,
    permissions: user.shopData?.permissions || []
  };
};

// Helper function to format role for frontend
const formatRole = (role) => {
  return {
    id: role._id,
    name: role.name,
    displayName: role.displayName,
    description: role.description || '',
    usersCount: role.usersCount || 0,
    permissions: role.permissions,
    color: role.color,
    isSystem: role.isSystem
  };
};

// @desc    Get all users for shop
// @route   GET /api/users
// @access  Private (shop_admin only)
exports.getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = '', role, status } = req.query;
  
  let query = { 
    'shopData.shopId': req.user._id, // Only users created by this shop_admin
    role: { $nin: ['system_admin', 'shop_admin'] } // Exclude admins
  };
  
  // Search filter
  if (search) {
    query.$or = [
      { 'profile.fullName': { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { username: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Role filter
  if (role && role !== 'all') {
    query.role = role;
  }
  
  // Status filter
  if (status && status !== 'all') {
    query.status = status;
  }
  
  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .select('-password -passwordResetToken -passwordResetExpires')
    .sort('-createdAt')
    .limit(limit * 1)
    .skip((page - 1) * limit);
  
  const formattedUsers = users.map(formatUser);
  
  res.status(200).json({
    success: true,
    data: formattedUsers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private (shop_admin only)
exports.getUserStats = asyncHandler(async (req, res) => {
  const query = { 
    'shopData.shopId': req.user._id,
    role: { $nin: ['system_admin', 'shop_admin'] }
  };
  
  const totalUsers = await User.countDocuments(query);
  const activeUsers = await User.countDocuments({ ...query, status: 'active' });
  const inactiveUsers = await User.countDocuments({ ...query, status: 'inactive' });
  
  // Get roles count
  const roles = await Role.find({ 
    $or: [
      { isSystem: true },
      { shopId: req.user._id }
    ]
  });
  
  res.status(200).json({
    success: true,
    data: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      rolesCount: roles.length,
      totalPermissions: ALL_PERMISSIONS.length
    }
  });
});

// @desc    Create new user (team member)
// @route   POST /api/users
// @access  Private (shop_admin only)
exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password, fullName, phone, role, status } = req.body;
  
  // Check if user exists
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });
  
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User with this email or username already exists'
    });
  }
  
  // Get role permissions
  let rolePermissions = [];
  let finalRole = role;
  
  // Check if it's a custom role
  const customRole = await Role.findOne({ 
    name: role, 
    shopId: req.user._id 
  });
  
  if (customRole) {
    rolePermissions = customRole.permissions;
    finalRole = customRole.name;
  } else {
    // Default role permissions based on frontend
    const defaultPermissions = {
      shop_manager: ['pos', 'inventory', 'reports', 'purchases', 'warehouses', 'expenses'],
      cashier: ['pos', 'backup']
    };
    rolePermissions = defaultPermissions[role] || ['pos'];
  }
  
  // Generate password if not provided
  const finalPassword = password || crypto.randomBytes(8).toString('hex');
  const isAutoGenerated = !password;
  
  // Create user
  const user = await User.create({
    username: username || email.split('@')[0],
    email,
    password: finalPassword,
    role: finalRole,
    status: status || 'active',
    profile: {
      fullName,
      phone
    },
    shopData: {
      shopId: req.user._id, // Link to shop_admin
      permissions: rolePermissions,
      createdBy: req.user._id
    },
    paymentStatus: 'not_required'
  });
  
  // Send email with credentials
  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #dc2626); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
          .credentials { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to Your Shop Dashboard!</h2>
          </div>
          <div class="content">
            <p>Dear ${fullName},</p>
            <p>Your account has been created by the shop administrator. Here are your login credentials:</p>
            <div class="credentials">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Password:</strong> ${finalPassword}</p>
            </div>
            <p><strong>Role:</strong> ${finalRole}</p>
            ${isAutoGenerated ? '<p><em>Please change your password after first login.</em></p>' : ''}
            <a href="${process.env.FRONTEND_URL}/login" class="button">Login to Dashboard</a>
            <p style="margin-top: 20px;">Best regards,<br>Your Shop Team</p>
          </div>
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail({
      email: user.email,
      subject: 'Your Account Has Been Created',
      html: emailHtml
    });
  } catch (error) {
    console.log('Email sending failed:', error.message);
  }
  
  res.status(201).json({
    success: true,
    data: formatUser(user),
    temporaryPassword: isAutoGenerated ? finalPassword : undefined
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (shop_admin only)
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if user belongs to same shop
  if (user.shopData?.shopId?.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Cannot update shop admin
  if (user.role === 'shop_admin') {
    return res.status(403).json({
      success: false,
      message: 'Cannot modify shop admin'
    });
  }
  
  // Update fields
  const { username, email, fullName, phone, role, status, password } = req.body;
  
  if (username) user.username = username;
  if (email) user.email = email;
  if (fullName) user.profile.fullName = fullName;
  if (phone) user.profile.phone = phone;
  if (status) user.status = status;
  
  // Update role and permissions if role changed
  if (role && role !== user.role) {
    user.role = role;
    
    // Update permissions based on new role
    const customRole = await Role.findOne({ 
      name: role, 
      shopId: req.user._id 
    });
    
    if (customRole) {
      user.shopData.permissions = customRole.permissions;
    } else {
      const defaultPermissions = {
        shop_manager: ['pos', 'inventory', 'reports', 'purchases', 'warehouses', 'expenses'],
        cashier: ['pos', 'backup']
      };
      user.shopData.permissions = defaultPermissions[role] || ['pos'];
    }
  }
  
  // Update password if provided
  if (password) {
    user.password = password;
  }
  
  await user.save();
  
  res.status(200).json({
    success: true,
    data: formatUser(user)
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (shop_admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if user belongs to same shop
  if (user.shopData?.shopId?.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Cannot delete shop admin
  if (user.role === 'shop_admin') {
    return res.status(403).json({
      success: false,
      message: 'Cannot delete shop admin'
    });
  }
  
  // Cannot delete self
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot delete your own account'
    });
  }
  
  await user.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Toggle user status
// @route   PATCH /api/users/:id/toggle-status
// @access  Private (shop_admin only)
exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if user belongs to same shop
  if (user.shopData?.shopId?.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Cannot toggle own status
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot change your own status'
    });
  }
  
  user.status = user.status === 'active' ? 'inactive' : 'active';
  await user.save();
  
  res.status(200).json({
    success: true,
    data: formatUser(user)
  });
});

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private (shop_admin only)
exports.getRoles = asyncHandler(async (req, res) => {
  const { search = '' } = req.query;
  
  let query = {
    $or: [
      { isSystem: true },
      { shopId: req.user._id }
    ]
  };
  
  // Search filter
  if (search) {
    query.$or.push(
      { displayName: { $regex: search, $options: 'i' } },
      { name: { $regex: search, $options: 'i' } }
    );
  }
  
  // Fixed: sort with object instead of string
  const roles = await Role.find(query).sort({ isSystem: -1, displayName: 1 });
  
  // Get system roles if not in database
  let allRoles = [...roles];
  
  // Check if system roles exist
  const systemRoleNames = ['shop_manager', 'cashier'];
  for (const roleName of systemRoleNames) {
    const exists = roles.some(r => r.name === roleName && r.isSystem);
    if (!exists) {
      // Add default system role
      const defaultRole = {
        _id: roleName,
        name: roleName,
        displayName: roleName === 'shop_manager' ? 'Manager' : 'Cashier',
        description: roleName === 'shop_manager' 
          ? 'Manage operations, view reports, manage inventory' 
          : 'Process sales, manage customers, view products',
        usersCount: await User.countDocuments({ 
          role: roleName, 
          'shopData.shopId': req.user._id 
        }),
        permissions: roleName === 'shop_manager' 
          ? ['pos', 'inventory', 'reports', 'purchases', 'warehouses', 'expenses']
          : ['pos', 'expenses'], // Fixed: changed 'backup' to 'expenses'
        color: roleName === 'shop_manager' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700',
        isSystem: true
      };
      allRoles.push(defaultRole);
    }
  }
  
  const formattedRoles = allRoles.map(role => ({
    id: role._id,
    name: role.name,
    displayName: role.displayName,
    description: role.description,
    usersCount: role.usersCount || 0,
    permissions: role.permissions,
    color: role.color,
    isSystem: role.isSystem
  }));
  
  res.status(200).json({
    success: true,
    data: formattedRoles
  });
});
// @desc    Create new role
// @route   POST /api/roles
// @access  Private (shop_admin only)
exports.createRole = asyncHandler(async (req, res) => {
  const { name, description, permissions } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Role name is required'
    });
  }
  
  // Check if role already exists for this shop
  const existingRole = await Role.findOne({
    name: name.toLowerCase(),
    shopId: req.user._id
  });
  
  if (existingRole) {
    return res.status(400).json({
      success: false,
      message: 'Role with this name already exists'
    });
  }
  
  const role = await Role.create({
    name: name.toLowerCase(),
    displayName: name,
    description: description || '',
    shopId: req.user._id,
    isSystem: false,
    permissions: permissions || [],
    color: 'bg-gray-100 text-gray-700',
    createdBy: req.user._id
  });
  
  res.status(201).json({
    success: true,
    data: formatRole(role)
  });
});

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private (shop_admin only)
exports.deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);
  
  if (!role) {
    return res.status(404).json({
      success: false,
      message: 'Role not found'
    });
  }
  
  // Check if role belongs to this shop
  if (!role.isSystem && role.shopId?.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }
  
  // Cannot delete system roles
  if (role.isSystem) {
    return res.status(403).json({
      success: false,
      message: 'Cannot delete system roles'
    });
  }
  
  // Check if users have this role
  const usersWithRole = await User.countDocuments({
    role: role.name,
    'shopData.shopId': req.user._id
  });
  
  if (usersWithRole > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete role. ${usersWithRole} user(s) currently have this role. Please reassign them first.`
    });
  }
  
  await role.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Role deleted successfully'
  });
});

// @desc    Get all permissions
// @route   GET /api/permissions
// @access  Private
exports.getPermissions = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: ALL_PERMISSIONS
  });
});