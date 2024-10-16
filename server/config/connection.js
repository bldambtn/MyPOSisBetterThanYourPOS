const mongoose = require('mongoose');

// Establish connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/programming-thoughts', {
});

const db = mongoose.connection;

// Log connection success or error
db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('✅ Connected to MongoDB!');
});

module.exports = db;
