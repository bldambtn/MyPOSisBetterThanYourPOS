const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  upc: {
    type: String,
    unique: true,
    sparse: true 
  },
  plu: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  weightPerItem: {
    type: Number,
    default: 0
  },
  salePrice: {
    type: Number,
    default: 0
  },
  vendorPrice: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Number,
    default: 0
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
});

// Create the Inventory model
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
