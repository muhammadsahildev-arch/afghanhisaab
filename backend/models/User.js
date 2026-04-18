const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Authentication
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    required: true,
    default: 'customer'
  },
  
  // Common Profile Fields
  profile: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null
    }
  },

  // Customer Specific Data
  customerData: {
    dateOfBirth: Date,
    gender: {
      type: String,
    },
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    occupation: String,
    companyName: String,
    annualIncome: {
      type: String,
    },
    purposeOfAccount: {
      type: String,
      default: 'personal'
    },
    currencyPreference: {
      type: String,
      default: 'USD'
    },
    newsletterSubscribed: {
      type: Boolean,
      default: false
    },
    smsAlerts: {
      type: Boolean,
      default: false
    },
    agreeMarketing: {
      type: Boolean,
      default: false
    }
  },

  // Shop Users Data (for team members)
  shopData: {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the shop_admin who created them
      required: function() {
        return ['shop_manager', 'cashier'].includes(this.role);
      }
    },
    permissions: [{
      type: String,
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },

  // Admin Specific Data
  adminData: {
    permissions: {
      type: [String],
      default: ['all']
    },
    adminLevel: {
      type: String,
      enum: ['super-admin', 'admin', 'moderator'],
      default: 'admin'
    },
    lastLogin: Date,
    loginHistory: [{
      timestamp: Date,
      ipAddress: String,
      userAgent: String
    }]
  },

  // Add this inside your userSchema definition
paymentProof: {
  country: String,
  amount: Number,
  currency: String,
  transactionReference: String,
  screenshot: String,
  submittedAt: Date,
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: null
  },
  reviewedBy: String,
  reviewedAt: Date,
  notes: String
},

  // Account Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'suspended'],
    default: function() {
      return this.role === 'customer' ? 'pending' : 'active';
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending',  'submitted','approved', 'expired', 'not_required'],
    default: function() {
      return this.role === 'customer' ? 'pending' : 'not_required';
    }
  },
  paymentExpiry: Date,
  
  // Statistics
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  totalTransactions: {
    type: Number,
    default: 0
  },
  totalVolume: {
    type: Number,
    default: 0
  },
  
  // Reset Password
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate username automatically if not provided
userSchema.pre('save', async function(next) {
  if (!this.username && this.email) {
    let baseUsername = this.email.split('@')[0];
    let username = baseUsername;
    let counter = 1;
    
    while (await mongoose.model('User').findOne({ username, _id: { $ne: this._id } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }
    this.username = username;
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = async function(ipAddress = '', userAgent = '') {
  this.lastLogin = new Date();
  this.loginCount += 1;
  
  if (this.role === 'system_admin') {
    if (!this.adminData.loginHistory) {
      this.adminData.loginHistory = [];
    }
    this.adminData.loginHistory.unshift({
      timestamp: new Date(),
      ipAddress,
      userAgent
    });
    
    if (this.adminData.loginHistory.length > 10) {
      this.adminData.loginHistory = this.adminData.loginHistory.slice(0, 10);
    }
  }
  
  return await this.save();
};


// Get user profile - UPDATE THIS METHOD
userSchema.methods.getProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  
  // Get user profile
userSchema.methods.getProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

  
  // For shop_admin, ensure their own ID is available
  if (userObject.role === 'shop_admin' && userObject._id) {
    if (!userObject.shopData) {
      userObject.shopData = {};
    }
    // For consistency, set shopData.shopId to their own ID
    if (!userObject.shopData.shopId) {
      userObject.shopData.shopId = userObject._id.toString();
    }
  }
  
  return userObject;
};

// Check if user has permission
userSchema.methods.hasPermission = function(permission) {
  if (this.role === 'system_admin') return true;
  if (this.role === 'shop_admin') return true;
  
  const permissions = this.shopData?.permissions || [];
  return permissions.includes(permission) || permissions.includes('all');
};

module.exports = mongoose.model('User', userSchema);