const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  unixId: {
    type: Number,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

companySchema.pre('save', async function (next) {
  if (this.isNew) {
    this.unixId = Math.floor(Date.now() / 1000);
  }
  next();
});

module.exports = mongoose.model('Company', companySchema);
