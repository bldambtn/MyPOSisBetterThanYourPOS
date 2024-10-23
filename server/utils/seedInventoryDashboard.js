// server/utils/seedInventoryDashboard.js

const mongoose = require('mongoose');
const Inventory = require('../models/inventory');

// MongoDB connection string
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/inventoryDB'; //

// Sample inventory data to be inserted
const inventorySeed = [
  {
    upc: '123456789',
    plu: 'A123',
    productName: 'Product A',
    weightPerItem: 1.2,
    salePrice: 19.99,
    vendorPrice: 14.99,
    inStock: 100,
    coo: 'USA',
    companyOfOrigin: 'Company A',
    company: mongoose.Types.ObjectId('5f50c31b6f00b2b3d4d3b73c')  // Example ObjectId for company
  },
  {
    upc: '987654321',
    plu: 'B123',
    productName: 'Product B',
    weightPerItem: 0.8,
    salePrice: 24.99,
    vendorPrice: 18.99,
    inStock: 50,
    coo: 'Canada',
    companyOfOrigin: 'Company B',
    company: mongoose.Types.ObjectId('5f50c31b6f00b2b3d4d3b73d')
  },
  {
    upc: '111222333',
    plu: 'C123',
    productName: 'Product C',
    weightPerItem: 1.5,
    salePrice: 29.99,
    vendorPrice: 20.99,
    inStock: 200,
    coo: 'Mexico',
    companyOfOrigin: 'Company C',
    company: mongoose.Types.ObjectId('5f50c31b6f00b2b3d4d3b73e')
  }
];

// Function to seed the database
async function seedInventory() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    await Inventory.deleteMany({});
    console.log('Existing inventory data cleared');

    await Inventory.insertMany(inventorySeed);
    console.log('Sample inventory data inserted successfully');

    // Close the database connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding inventory data:', error);
    mongoose.connection.close();
  }
}

seedInventory();

//NOTICE
//How to Run the Seed Script:
//node server/utils/seedInventoryDashboard.js
