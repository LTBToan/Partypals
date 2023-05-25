const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentID: {
    type: String,
    trim: true,
    required: true,
  },
  pDate: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  orderID: {
    type: String,
    trim: true,
    required: true,
  },
  customerID: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Payment", paymentSchema);
