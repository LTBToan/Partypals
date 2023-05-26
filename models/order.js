const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    trim: true,
    required: true,
  },
  accountID: {
    type: ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  shippingAddress: {
    type: String,
    trim: true,
    required: true,
  },
  total: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  deposit: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema);
