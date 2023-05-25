const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
  orderDetailID: {
    type: String,
    trim: true,
    required: true,
  },
  orderID: {
    type: ObjectId,
    ref: "Order",
  },
  productID: {
    type: ObjectId,
    ref: "Product",
  },
});
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
