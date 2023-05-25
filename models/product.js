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
});
module.exports = mongoose.model("Product", productSchema);
