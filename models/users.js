const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    default: null,
  },
  username:{
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    default: "active",
  },
  image: {
    type: String,
    trim: true,
    default: null,
  },
  tax:{
    type: String,
    trim: true,
    default: null,
  },
  calendar: [
    {
      dateTime: String,
      local: String,
      description: String,
      userId: { type: ObjectId, ref: "User" },
    },
  ],
  salt: String,
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: Date,
  role: {
    type: [String],
    default: ["user"],
  },
});
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};
module.exports = mongoose.model("Users", userSchema);
