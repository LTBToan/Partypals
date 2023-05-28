const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    trim: true,
    required: true,
  },
  accountID: {
    type: ObjectId,
    ref: "User",
  },
  categoryID: {
    type: ObjectId,
    ref: "Category",
  },
  productIDetailD: {
    type: ObjectId,
    ref: "ProductDetail",
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
module.exports = mongoose.model("Product", productSchema);
