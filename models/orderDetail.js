const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  deposit: {
    type: String,
    trim: true,
    required: true,
  },
  shipPrice: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  total: {
    type: Number,
    trim: true,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
