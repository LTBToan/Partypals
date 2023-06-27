const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Contact", contactSchema);
