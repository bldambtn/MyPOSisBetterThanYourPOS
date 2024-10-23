const mongoose = require('mongoose');
const { Schema } = mongoose;

const inventorySchema = new Schema({
  upc: {
    type: String,
    unique: true,
<<<<<<< HEAD
    sparse: true 
=======
    sparse: true,
    index: true, // Index for better query performance
    minlength: 12,  // Typically UPCs are 12 digits long
    maxlength: 12
>>>>>>> ebd03cb49531f9237c786328c75ea80492ef97ff
  },
  plu: {
    type: String,
    required: true,
    unique: true,
<<<<<<< HEAD
    trim: true
=======
    trim: true,
    minlength: 4,  // PLUs are generally 4 to 5 digits
    maxlength: 5
>>>>>>> ebd03cb49531f9237c786328c75ea80492ef97ff
  },
  productName: {
    type: String,
    required: true,
<<<<<<< HEAD
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
=======
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
>>>>>>> ebd03cb49531f9237c786328c75ea80492ef97ff
  },
  coo: {
    type: String,
    trim: true
  },
  companyOfOrigin: {
    type: String,
<<<<<<< HEAD
    trim: true 
=======
    trim: true
>>>>>>> ebd03cb49531f9237c786328c75ea80492ef97ff
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
<<<<<<< HEAD
});

// Create the Inventory model
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
=======
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
});

module.exports = mongoose.model('Inventory', inventorySchema);

>>>>>>> ebd03cb49531f9237c786328c75ea80492ef97ff
