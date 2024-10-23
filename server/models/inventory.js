const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  upc: {
    type: String,
    unique: true,
    sparse: true,
    index: true, // Index for better query performance
    minlength: 12,  // Typically UPCs are 12 digits long
    maxlength: 12
  },
  plu: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,  // PLUs are generally 4 to 5 digits
    maxlength: 5
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    index: true // Add index for faster search
  },
  weightPerItem: {
    type: Number,
    default: 0,
    min: 0,  // Ensure weight is non-negative
  },
  salePrice: {
    type: Number,
    default: 0,
    index: true, // Index for filtering by price
    min: 0,  // Ensure price is non-negative
  },
  vendorPrice: {
    type: Number,
    default: 0,
    min: 0,  // Ensure vendor price is non-negative
  },
  inStock: {
    type: Number,
    default: 0,
    index: true, // Index for filtering by stock
    min: 0,  // Ensure inStock is non-negative
  },
  coo: {
    type: String,
    trim: true
  },
  companyOfOrigin: {
    type: String,
    trim: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
});

module.exports = mongoose.model('Inventory', inventorySchema);
