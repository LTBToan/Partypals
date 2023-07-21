const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  category: {
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
  fullDescription: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: String,
    trim: true,
    required: true,
  },
  discount: {
    type: String,
    trim: true,
  },
  offerEnd: {
    type: String,
    trim: true,
  },
  new: {
    type: Boolean,
    default: false,
    required: true,
  },
  rating: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
