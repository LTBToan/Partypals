const mongoose = require("mongoose");

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
});
module.exports = mongoose.model("Calendar", calendarSchema);
