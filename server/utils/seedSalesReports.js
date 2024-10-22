// scripts/seedSalesReports.js
const mongoose = require('mongoose');
const SalesReport = require('../models/SalesReports'); 

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
});

const seedData = [
  {
    date: new Date('2024-10-01'),
    product: 'Product A',
    category: 'Category 1',
    quantitySold: 100,
    totalRevenue: 1500.0,
  },
  {
    date: new Date('2024-10-02'),
    product: 'Product B',
    category: 'Category 2',
    quantitySold: 200,
    totalRevenue: 3000.0,
  },
  // Add more sample data as needed
];

const seedDatabase = async () => {
  try {
    await SalesReport.deleteMany({});
    await SalesReport.insertMany(seedData);
    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
