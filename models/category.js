const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    trim: true,
    required: true,
  },
  categoryName: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Category", categorySchema);
