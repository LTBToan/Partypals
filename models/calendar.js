const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const calendarSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    trim: true,
    required: true,
  },
  local: {
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
module.exports = mongoose.model("Calendar", calendarSchema);
