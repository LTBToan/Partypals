const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notifyId: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
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
module.exports = mongoose.model("Notification", notificationSchema);
