const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Contact", contactSchema);
