const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { expressJwt } = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const { sendEmail } = require("../helpers");
const axios = require("axios");
dotenv.config();

const CLIENT_ID = "fac8f66eb69598dd2c8b";
const CLIENT_SECRET = "d9db2ad94b6bd486ef3330810d9d3cc4e6edd8ad";

exports.signUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      message: "Email is taken!",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup success! Please login." });
};

exports.verifyEmail = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email in request body" });
  const { email, code } = req.body;
  const emailData = {
    from: "noreply@dragon-cute.com",
    to: email,
    subject: "Password Reset Instructions",
    html: `<p>hi, ${email}</p><p>code: ${code}</p>`,
  };
  sendEmail(emailData);
  res.status(200).json({
    message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
  });
};


exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "User with that email does not exist. Please signup.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: "Email and password do not match",
      });
    }
    const token = jwt.sign(
      { _id: user._id, roleId: user.roleId },
      process.env.JWT_SECRET
    );
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, photo, name, email, roleId } = user;
    return res.json({ token, user: { _id, photo, email, name, roleId } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "SignOut success!" });
};

exports.requireSignIn = () => {
  return expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });
}
