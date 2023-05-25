const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const contactSchema = new mongoose.Schema({
  contactId: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Contact", contactSchema);
