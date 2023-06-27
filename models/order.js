const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  shippingAddress: {
    type: String,
    trim: true,
    required: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  note: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Order", orderSchema);
