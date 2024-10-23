const itemSchema = new Schema({
  upc: {
    type: String,
    unique: true,
    sparse: true,
    index: true // Index for better query performance
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
    trim: true,
    index: true // Add index
  },
  weightPerItem: {
    type: Number,
    default: 0
  },
  salePrice: {
    type: Number,
    default: 0,
    index: true // Add index
  },
  vendorPrice: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Number,
    default: 0,
    index: true // Add index
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
