const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const initFolders = require('./utils/initFolders');

// Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`❌ Error: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// Load config
dotenv.config({ path: './config/config.env' });

// Initialize folders
initFolders();

// Connect to database
connectDatabase();

// Start server
const server = app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${process.env.PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`❌ Error: ${err.message}`);
  console.log('Shutting down due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});