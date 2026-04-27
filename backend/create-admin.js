const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb+srv://muhammad:password123123@cluster0.8lekzkp.mongodb.net/watanhisaab?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Check if admin already exists
    const existingAdmin = await usersCollection.findOne({ role: 'system_admin' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      await mongoose.disconnect();
      process.exit(0);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('Admin@123456', salt);
    
    // Admin data
    const adminData = {
      email: 'm.dawood.engr@gmail.com',
      password: hashedPassword,
      role: 'system_admin',
      profile: {
        fullName: 'System Admin',
        phone: '+1 234 567 8900',
        photo: null
      },
      status: 'active',
      paymentStatus: 'approved',
      adminData: {
        permissions: ['all'],
        adminLevel: 'super-admin'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Insert admin
    const result = await usersCollection.insertOne(adminData);
    
    console.log('\n✅ Admin created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin ID:', result.insertedId);
    console.log('Email: m.dawood.engr@gmail.com');
    console.log('Password: Admin@123456');
    console.log('Role: system_admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });