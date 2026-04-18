const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create directories if they don't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
const usersDir = path.join(uploadsDir, 'users');
const paymentsDir = path.join(uploadsDir, 'payments');

// Create directories synchronously
[uploadsDir, usersDir, paymentsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Configure storage for user photos
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, usersDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'user-' + uniqueSuffix + ext);
  }
});

// Configure storage for payment screenshots
const paymentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paymentsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'payment-' + uniqueSuffix + ext);
  }
});

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Create multer instances
const uploadUserPhoto = multer({
  storage: userStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter
});

const uploadPaymentScreenshot = multer({
  storage: paymentStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: imageFilter
});

// Export middleware
module.exports = {
  uploadUserPhoto: uploadUserPhoto.single('photo'),
  uploadPaymentScreenshot: uploadPaymentScreenshot.single('screenshot')
};