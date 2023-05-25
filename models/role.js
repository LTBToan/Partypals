const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    trim: true,
    required: true,
  },
  roleName: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Role", roleSchema);
