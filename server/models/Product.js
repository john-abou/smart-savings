const mongoose = require('mongoose');

const { Schema } = mongoose;

const priceHistorySchema = new Schema({
  date: { 
    type: Date,
    default: Date.now,
    required: true
    },
  price: {
    type: Number,
    required: true
  }
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  AmazonHistory: {
    link: String,
    priceHistory: [priceHistorySchema]
  },
  WalmartHistory: {
    link: String, 
    priceHistory: [priceHistorySchema]
  },
  LoblawsHistory: {
    link: String,
    priceHistory: [priceHistorySchema]
  }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;