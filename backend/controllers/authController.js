const User = require('../models/User');
const Role = require('../models/Role');
const crypto = require('crypto');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  generateToken.setTokenCookie(res, token);

  res.status(statusCode).json({
    success: true,
    user: user.getProfile()
  });
};

// @desc    Register user (customer or shop_admin)
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const {
    fullName, email, phone, password, agreeTerms,
    dateOfBirth, gender, addressLine1, addressLine2, city, state,
    postalCode, country, occupation, companyName, annualIncome,
    purposeOfAccount, currencyPreference, newsletterSubscribed,
    smsAlerts, agreeMarketing
  } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user without shopData first
  const user = await User.create({
    email,
    password,
    role: 'shop_admin',
    status: 'active',
    paymentStatus: 'approved',
    paymentExpiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days (3 months)
    profile: {
      fullName,
      phone
    },
    customerData: {
      dateOfBirth,
      gender,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      occupation,
      companyName,
      annualIncome,
      purposeOfAccount,
      currencyPreference,
      newsletterSubscribed,
      smsAlerts,
      agreeMarketing
    }
  });

  // Now update shopData with the user's own _id
  user.shopData = {
    shopId: user._id, // Use the generated _id
    permissions: ['all']
  };
  
  await user.save();

  // Send welcome email
  try {
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #dc2626); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .trial-box { background: #e8f5e9; border-left: 4px solid #059669; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to Watan Hisaab!</h2>
          </div>
          <div class="content">
            <p>Dear ${fullName},</p>
            <p>Thank you for registering with Watan Hisaab. Your account has been created successfully.</p>
            <div class="trial-box">
              <h3>🎉 3 Months Free Trial!</h3>
              <p>Your account is active with a <strong>3-month free trial period</strong>.</p>
              <p><strong>Trial Expiry Date:</strong> ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
            <p>Best regards,<br>Watan Hisaab Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Watan Hisaab - 3 Months Free Trial!',
      html: welcomeHtml
    });
  } catch (error) {
    console.log('Email sending failed:', error.message);
  }

  sendTokenResponse(user, 201, res);
});

// @desc    Login user (ONE LOGIN FOR ALL ROLES)
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check account status
  if (user.status === 'suspended') {
    return res.status(403).json({
      success: false,
      message: 'Your account has been suspended'
    });
  }

 

  if (user.status === 'inactive') {
    return res.status(403).json({
      success: false,
      message: 'Your account is inactive. Please contact your administrator.'
    });
  }

 

  await user.updateLastLogin(req.ip, req.headers['user-agent']);
  sendTokenResponse(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user.getProfile()
  });
});

// @desc    Update profile
// @route   PUT /api/auth/profile
// @access  Private
// @desc    Update profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Update profile fields
  if (req.body.fullName) {
    user.profile.fullName = req.body.fullName;
  }
  if (req.body.phone) {
    user.profile.phone = req.body.phone;
  }

  // Update customer data fields for ALL users (not just customers)
  // Since shop_admin also has customerData
  const customerFields = [
    'dateOfBirth', 'gender', 'addressLine1', 'addressLine2', 'city', 
    'state', 'postalCode', 'country', 'occupation', 'companyName', 
    'annualIncome', 'purposeOfAccount', 'currencyPreference', 
    'newsletterSubscribed', 'smsAlerts', 'agreeMarketing'
  ];

  customerFields.forEach(field => {
    if (req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== '') {
      user.customerData[field] = req.body[field];
    }
  });

  // Handle file upload (photo)
  if (req.file) {
    user.profile.photo = req.file.filename;
  }

  await user.save();

  res.status(200).json({
    success: true,
    user: user.getProfile()
  });
});

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset link has been sent'
    });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password. This link expires in 10 minutes.</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(500).json({
      success: false,
      message: 'Email could not be sent'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Password reset email sent'
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetPasswordToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    });
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Upgrade customer to shop_admin after payment
// @route   POST /api/auth/payment-success
// @access  Private
exports.paymentSuccess = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if already upgraded
  if (user.role === 'shop_admin') {
    return res.status(400).json({
      success: false,
      message: 'Account is already activated'
    });
  }
  
  // Update user to shop_admin
  user.role = 'shop_admin';
  user.status = 'active';
  user.paymentStatus = 'approved';
  user.paymentExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
  user.shopData = {
    shopId: user._id, // shop_admin's own ID as shop reference
    permissions: ['all']
  };
  
  await user.save();
  
  // Send welcome email for shop admin
  const welcomeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #059669, #dc2626); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .button { background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Welcome to Your Shop Dashboard!</h2>
        </div>
        <div class="content">
          <p>Dear ${user.profile.fullName},</p>
          <p>Congratulations! Your payment has been successfully processed.</p>
          <p>Your shop account is now active. You can now:</p>
          <ul>
            <li>Access your shop dashboard</li>
            <li>Create team members (cashiers, managers)</li>
            <li>Manage your shop settings</li>
            <li>Track transactions and reports</li>
          </ul>
          <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
          <p style="margin-top: 20px;">Best regards,<br>Currency Exchange Team</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  try {
    await sendEmail({
      email: user.email,
      subject: 'Welcome to Your Shop Dashboard!',
      html: welcomeHtml
    });
  } catch (error) {
    console.log('Email sending failed:', error.message);
  }
  
  sendTokenResponse(user, 200, res);
});

































//--------new----

// ==================== PAYMENT PROOF APIs ====================

// @desc    Submit payment proof (Customer)
// @route   POST /api/auth/submit-payment-proof
// @access  Private (Customer only)
exports.submitPaymentProof = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if user is customer
  if (user.role !== 'customer') {
    return res.status(403).json({
      success: false,
      message: 'Only customers can submit payment proof'
    });
  }
  
  // Check if already submitted and pending
  if (user.paymentProof && user.paymentProof.status === 'pending') {
    return res.status(400).json({
      success: false,
      message: 'You already have a pending payment request. Please wait for approval.'
    });
  }
  
  // Check if already approved
  if (user.paymentStatus === 'approved') {
    return res.status(400).json({
      success: false,
      message: 'Your account is already activated. No payment needed.'
    });
  }
  
  const { country, amount, currency, transactionReference } = req.body;
  
  // Handle file upload (screenshot)
  let screenshotUrl = null;
  if (req.file) {
    // Store only the relative path (not absolute)
    screenshotUrl = req.file.path.replace(/\\/g, '/').split('backend/')[1] || req.file.path;
    // This will give something like: 'uploads/payments/payment-xxx.jpg'
  }
  
  if (!screenshotUrl) {
    return res.status(400).json({
      success: false,
      message: 'Payment screenshot is required'
    });
  }
  
  if (!transactionReference) {
    return res.status(400).json({
      success: false,
      message: 'Transaction reference number is required'
    });
  }
  
  // Save payment proof
  user.paymentProof = {
    country,
    amount: parseFloat(amount.toString().replace(/,/g, '')),
    currency,
    transactionReference,
    screenshot: screenshotUrl, // Store relative path
    submittedAt: new Date(),
    status: 'pending'
  };
  
  // Update user status to show payment submitted
  user.paymentStatus = 'submitted';
  
  await user.save();
  
  // Notify admin
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@osmanexchange.com';
    await sendEmail({
      email: adminEmail,
      subject: 'New Payment Proof Submitted',
      html: `
        <h2>New Payment Proof Submitted</h2>
        <p><strong>User:</strong> ${user.profile.fullName} (${user.email})</p>
        <p><strong>Amount:</strong> ${amount} ${currency}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Transaction Reference:</strong> ${transactionReference}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        <p>Please login to the admin panel to review and approve this payment.</p>
      `
    });
  } catch (error) {
    console.log('Admin notification email failed:', error.message);
  }
  
  res.status(200).json({
    success: true,
    message: 'Payment proof submitted successfully. Admin will review and activate your account within 24-48 hours.',
    paymentProof: user.paymentProof
  });
});

// @desc    Get all pending payment proofs (System Admin)
// @route   GET /api/auth/payment-proofs/pending
// @access  Private (System Admin only)
exports.getPendingPayments = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }
  
  const pendingPayments = await User.find({
    'paymentProof.status': 'pending',
    role: 'customer'
  }).select('profile email customerData paymentProof createdAt');
  
  // Format response
  const formattedPayments = pendingPayments.map(user => ({
    id: user._id,
    userId: user._id,
    userName: user.profile.fullName,
    userEmail: user.email,
    userPhone: user.profile.phone,
    country: user.paymentProof.country,
    amount: user.paymentProof.amount,
    currency: user.paymentProof.currency,
    transactionReference: user.paymentProof.transactionReference,
    screenshot: user.paymentProof.screenshot,
    status: user.paymentProof.status,
    submittedAt: user.paymentProof.submittedAt,
    userData: {
      address: user.customerData?.addressLine1,
      city: user.customerData?.city,
      country: user.customerData?.country
    }
  }));
  
  res.status(200).json({
    success: true,
    count: formattedPayments.length,
    payments: formattedPayments
  });
});

// @desc    Get all payment proofs (with filters) - System Admin
// @route   GET /api/auth/payment-proofs
// @access  Private (System Admin only)
exports.getAllPaymentProofs = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }
  
  const { status, page = 1, limit = 10 } = req.query;
  
  let query = {  paymentProof: { $exists: true } };
  
  if (status) {
    query['paymentProof.status'] = status;
  }
  
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const payments = await User.find(query)
    .select('profile email customerData paymentProof createdAt')
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ 'paymentProof.submittedAt': -1 });
  
  const total = await User.countDocuments(query);
  
  const formattedPayments = payments.map(user => ({
    id: user._id,
    userId: user._id,
    userName: user.profile.fullName,
    userEmail: user.email,
    userPhone: user.profile.phone,
    country: user.paymentProof.country,
    amount: user.paymentProof.amount,
    currency: user.paymentProof.currency,
    transactionReference: user.paymentProof.transactionReference,
    screenshot: user.paymentProof.screenshot,
    status: user.paymentProof.status,
    submittedAt: user.paymentProof.submittedAt,
    reviewedBy: user.paymentProof.reviewedBy,
    reviewedAt: user.paymentProof.reviewedAt,
    notes: user.paymentProof.notes
  }));
  
  res.status(200).json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    payments: formattedPayments
  });
});

// @desc    Approve payment proof (System Admin)
// @route   POST /api/auth/payment-proofs/:userId/approve
// @access  Private (System Admin only)
exports.approvePayment = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }
  
  const { userId } = req.params;
  const { notes } = req.body;
  
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if payment proof exists and is pending
  if (!user.paymentProof || user.paymentProof.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'No pending payment proof found for this user'
    });
  }
  
  // Update payment proof status
  user.paymentProof.status = 'approved';
  user.paymentProof.reviewedBy = req.user.profile.fullName || 'System Admin';
  user.paymentProof.reviewedAt = new Date();
  user.paymentProof.notes = notes || 'Payment approved. Account activated.';
  
  // Upgrade user to shop_admin
  user.role = 'shop_admin';
  user.status = 'active';
  user.paymentStatus = 'approved';
  user.paymentExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
  user.shopData = {
    shopId: user._id,
    permissions: ['all']
  };
  
  await user.save();
  
  // Send welcome email to user
  try {
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669, #dc2626); color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .button { background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Payment Approved! Welcome to Your Shop Dashboard!</h2>
          </div>
          <div class="content">
            <p>Dear ${user.profile.fullName},</p>
            <p>Congratulations! Your payment has been verified and approved.</p>
            <p>Your account is now active. You can now:</p>
            <ul>
              <li>Access your shop dashboard</li>
              <li>Create team members (cashiers, managers)</li>
              <li>Manage your shop settings</li>
              <li>Track transactions and reports</li>
            </ul>
            <p><strong>Account Validity:</strong> ${new Date(user.paymentExpiry).toLocaleDateString()}</p>
            <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
            <p style="margin-top: 20px;">Best regards,<br>Currency Exchange Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail({
      email: user.email,
      subject: 'Payment Approved! Welcome to Currency Exchange!',
      html: welcomeHtml
    });
  } catch (error) {
    console.log('Welcome email sending failed:', error.message);
  }
  
  res.status(200).json({
    success: true,
    message: 'Payment approved successfully. User account activated.',
    user: user.getProfile()
  });
});

// @desc    Deny payment proof (System Admin)
// @route   POST /api/auth/payment-proofs/:userId/deny
// @access  Private (System Admin only)
exports.denyPayment = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }
  
  const { userId } = req.params;
  const { notes } = req.body;
  
  if (!notes) {
    return res.status(400).json({
      success: false,
      message: 'Please provide reason for denial'
    });
  }
  
  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  // Check if payment proof exists and is pending
  if (!user.paymentProof || user.paymentProof.status !== 'pending') {
    return res.status(400).json({
      success: false,
      message: 'No pending payment proof found for this user'
    });
  }
  
  // Update payment proof status
  user.paymentProof.status = 'denied';
  user.paymentProof.reviewedBy = req.user.profile.fullName || 'System Admin';
  user.paymentProof.reviewedAt = new Date();
  user.paymentProof.notes = notes;
  
  // Reset payment status to pending so user can resubmit
  user.paymentStatus = 'pending';
  
  await user.save();
  
  // Send email to user with denial reason
  try {
    const denialHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Payment Verification Failed</h2>
          </div>
          <div class="content">
            <p>Dear ${user.profile.fullName},</p>
            <p>We have reviewed your payment proof and unfortunately, it could not be verified.</p>
            <p><strong>Reason:</strong> ${notes}</p>
            <p>Please submit a new payment proof with the correct details.</p>
            <p>If you have any questions, please contact our support team.</p>
            <p>Best regards,<br>Currency Exchange Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail({
      email: user.email,
      subject: 'Payment Verification Failed - Please Resubmit',
      html: denialHtml
    });
  } catch (error) {
    console.log('Denial email sending failed:', error.message);
  }
  
  res.status(200).json({
    success: true,
    message: 'Payment denied. User has been notified.',
    paymentProof: user.paymentProof
  });
});

// @desc    Get user's own payment status (Customer)
// @route   GET /api/auth/my-payment-status
// @access  Private
exports.getMyPaymentStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('paymentStatus paymentProof role status');
  
  res.status(200).json({
    success: true,
    paymentStatus: user.paymentStatus,
    paymentProof: user.paymentProof || null,
    accountStatus: user.status,
    role: user.role
  });
});

// @desc    Get all users (System Admin)
// @route   GET /api/auth/users
// @access  Private (System Admin only)
exports.getAllUsers = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Filters
  const filters = {};
  
  if (req.query.status) {
    filters.status = req.query.status;
  }
  
  if (req.query.role) {
    filters.role = req.query.role;
  }
  
  if (req.query.search) {
    filters.$or = [
      { 'profile.fullName': { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { 'profile.phone': { $regex: req.query.search, $options: 'i' } },
      { username: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Sorting
  const sortField = req.query.sortBy || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  const sort = { [sortField]: sortOrder };

  // Get users with pagination
  const users = await User.find(filters)
    .select('-password -passwordResetToken -passwordResetExpires')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Get total count
  const total = await User.countDocuments(filters);

  // Format users for frontend
  const formattedUsers = users.map(user => ({
    id: user._id,
    fullName: user.profile.fullName,
    email: user.email,
    phone: user.profile.phone,
    username: user.username,
    dateOfBirth: user.customerData?.dateOfBirth,
    gender: user.customerData?.gender,
    addressLine1: user.customerData?.addressLine1,
    addressLine2: user.customerData?.addressLine2,
    city: user.customerData?.city,
    state: user.customerData?.state,
    postalCode: user.customerData?.postalCode,
    country: user.customerData?.country,
    occupation: user.customerData?.occupation,
    companyName: user.customerData?.companyName,
    annualIncome: user.customerData?.annualIncome,
    purposeOfAccount: user.customerData?.purposeOfAccount,
    currencyPreference: user.customerData?.currencyPreference,
    newsletterSubscribed: user.customerData?.newsletterSubscribed,
    smsAlerts: user.customerData?.smsAlerts,
    agreeMarketing: user.customerData?.agreeMarketing,
    status: user.status,
    role: user.role,
    paymentStatus: user.paymentStatus,
    paymentExpiry: user.paymentExpiry,
    joinedDate: user.createdAt,
    lastLogin: user.lastLogin,
    loginCount: user.loginCount,
    totalTransactions: user.totalTransactions,
    totalVolume: user.totalVolume,
    photo: user.profile.photo,
    permissions: user.role === 'system_admin' 
      ? user.adminData?.permissions 
      : user.shopData?.permissions
  }));

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    users: formattedUsers
  });
});


// @desc    Delete user (System Admin)
// @route   DELETE /api/auth/users/:userId
// @access  Private (System Admin only)
exports.deleteUser = asyncHandler(async (req, res) => {
  // Check if user is system_admin
  if (req.user.role !== 'system_admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. System admin only.'
    });
  }

  const { userId } = req.params;

  // Find user to delete
  const userToDelete = await User.findById(userId);

  if (!userToDelete) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Prevent deleting yourself
  if (userToDelete._id.toString() === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'You cannot delete your own account'
    });
  }

  // Prevent deleting system_admin if there's only one
  if (userToDelete.role === 'system_admin') {
    const systemAdminCount = await User.countDocuments({ role: 'system_admin' });
    if (systemAdminCount === 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the only system admin account'
      });
    }
  }

  // Delete the user
  await User.findByIdAndDelete(userId);

  // Send email notification (optional)
  try {
    const deletionHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Account Deleted</h2>
          </div>
          <div class="content">
            <p>Dear ${userToDelete.profile.fullName},</p>
            <p>Your account has been deleted from the Currency Exchange system.</p>
            <p>If you believe this was a mistake, please contact our support team.</p>
            <p>Best regards,<br>Currency Exchange Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await sendEmail({
      email: userToDelete.email,
      subject: 'Account Deleted - Currency Exchange',
      html: deletionHtml
    });
  } catch (error) {
    console.log('Deletion email sending failed:', error.message);
  }

  res.status(200).json({
    success: true,
    message: `User ${userToDelete.profile.fullName} deleted successfully`
  });
});