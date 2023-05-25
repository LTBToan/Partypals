const mongoose = require("mongoose");

const productDetailSchema = new mongoose.Schema({
  productIDetailD: {
    type: String,
    trim: true,
    required: true,
  },
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  quantity: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("ProductDetail", productDetailSchema);
