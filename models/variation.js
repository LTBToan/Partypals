const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
    required: true,
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
  stock: {
    type: Number,
    trim: true,
    required: true,
  },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("Variation", variationSchema);
