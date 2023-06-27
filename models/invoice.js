const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderDetailID: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref:"OrderDetail",
    required: true,
  },
  paymentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    trim: true,
  },
});
module.exports = mongoose.model("Invoice", invoiceSchema);
