const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceID: {
    type: String,
    trim: true,
    required: true,
  },
  orderID: {
    type: String,
    trim: true,
    required: true,
  },
  paymentID: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Invoice", invoiceSchema);
