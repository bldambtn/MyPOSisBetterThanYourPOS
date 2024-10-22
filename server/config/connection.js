const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('✅ Connected to MongoDB!');
});

module.exports = db;
