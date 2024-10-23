const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  upc: {
    type: String,
    unique: true,
    sparse: true,
    index: true, // Index for better query performance
    description: "Universal Product Code (UPC), must be unique"
  },
  plu: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    description: "Price Look-Up code (PLU), must be unique"
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    index: true, // Add index for faster search
    description: "Name of the product"
  },
  weightPerItem: {
    type: Number,
    default: 0,
    description: "Weight of the product per item (default 0)"
  },
  salePrice: {
    type: Number,
    default: 0,
    index: true, // Index for filtering by price
    description: "Sale price of the product"
  },
  vendorPrice: {
    type: Number,
    default: 0,
    description: "Vendor price of the product"
  },
  inStock: {
    type: Number,
    default: 0,
    index: true, // Index for filtering by stock
    description: "Number of items in stock"
  },
  coo: {
    type: String,
    trim: true,
    description: "Country of origin (COO) code"
  },
  companyOfOrigin: {
    type: String,
    trim: true,
    description: "Full name of the company of origin"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    description: "Reference to the associated company (User)"
  }
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
});

module.exports = mongoose.model('Inventory', inventorySchema);
