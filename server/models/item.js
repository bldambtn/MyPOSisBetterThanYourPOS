const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  upc: {
    type: String,
    unique: true,
  },
  plu: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  weightPerItem: {
    type: Number,
    default: 0,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  vendorPrice: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Number,
    default: 0,
  },
  coo: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
