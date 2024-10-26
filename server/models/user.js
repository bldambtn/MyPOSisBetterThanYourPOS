const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  organization: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+@.+\..+/, 'Must use a valid email address'] 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 5 
  },
  unixId: { 
    type: Number, 
    default: () => Math.floor(Date.now() / 1000), 
    unique: true 
  }
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
