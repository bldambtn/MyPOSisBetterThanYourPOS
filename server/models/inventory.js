const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  upc: {
    type: String,
  },
  plu: {
    type: String,
    required: true,
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
    type: String,
    ref: 'User',
  }
});

// Create the Inventory model
const Inventory = mongoose.model('Inventory', inventorySchema, 'inventories'); // third parameter ensures collection name


module.exports = Inventory;
