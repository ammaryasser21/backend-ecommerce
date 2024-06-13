const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  it_isNew: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isOneSale: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  reviews: [{
    id: Number,
    userName: String,
    rating: Number,
    message: String
  }]
});

module.exports = mongoose.model("Product", productSchema);
