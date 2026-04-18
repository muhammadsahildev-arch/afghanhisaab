const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return !this.isSystem;
    }
  },
  isSystem: { 
    type: Boolean,
    default: false
  },
  permissions: [{
    type: String,
  }],
  usersCount: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: 'bg-gray-100 text-gray-700'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Update users count when role is used
roleSchema.methods.updateUsersCount = async function() {
  const User = mongoose.model('User');
  const count = await User.countDocuments({ 
    role: this.name,
    'shopData.shopId': this.shopId
  });
  this.usersCount = count;
  await this.save();
  return count;
};

// Ensure unique role name per shop
roleSchema.index({ name: 1, shopId: 1 }, { unique: true });

module.exports = mongoose.model('Role', roleSchema);