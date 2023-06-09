const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const notificationSchema = new mongoose.Schema({
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
  userId: {
    type: ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Notification", notificationSchema);
