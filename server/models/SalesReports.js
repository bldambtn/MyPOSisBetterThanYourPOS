const mongoose = require('mongoose');

const salesReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  product: { type: String, required: true },
  category: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
});

const SalesReport = mongoose.model('SalesReport', salesReportSchema);
module.exports = SalesReport;
