// scripts/seedSalesReports.js
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory'); 

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
});

const seedData = [
  {
    upc: '',
    plu: '4046',
    productName: 'Sm Avocado',
    weightPerItem: 0.2,
    salePrice: 1.25,
    vendorPrice: 0.50,
    inStock: 100,
    coo: 'Mexico',
    company: 'Jeremy Co',
  },
  {
    upc: '',
    plu: '4225',
    productName: 'Lg Avocado',
    weightPerItem: 0.4,
    salePrice: 2.00,
    vendorPrice: 1.00,
    inStock: 100,
    coo: 'Mexico',
    company: 'Jeremy Co',
  },

];

const seedDatabase = async () => {
  try {
    await Inventory.deleteMany({});
    await Inventory.insertMany(seedData);
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
