const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const expressJwt = require("express-jwt");
const crypto = require('crypto');
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const { sendEmail } = require("../helpers");
const { checkEmail } = require("../helpers");
const { generateRandomPassword } = require("../helpers");
const axios = require("axios");
dotenv.config();

const CLIENT_ID = "fac8f66eb69598dd2c8b";
const CLIENT_SECRET = "d9db2ad94b6bd486ef3330810d9d3cc4e6edd8ad";

exports.signUp = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username });
    const emailExists = await User.findOne({ email: req.body.email });
    // const emailValid = await checkEmail(req.body.email);


    // if (!emailValid) {
    //   return res.status(403).json({
    //     message: "Email does not exist!",
    //   });
    // }

    if (emailExists) {
      return res.status(403).json({
        message: "Email is taken!",
      });
    }

    if (userExists) {
      return res.status(403).json({
        message: "Username is taken!",
      });
    }
    
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.verifyEmail = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email in request body" });
  const { email } = req.body;
  const code = generateRandomPassword(8);
  console.log(code);
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "User with that email does not exist. Please signup.",
      });
    }
    const emailData = {
      from: "noreply@dragon-cute.com",
      to: email,
      subject: "Password Reset Instructions",
      html: `<p>hi, ${email}</p><p>code: ${code}</p>`,
    };
    user.password = code;
    user.updated = Date.now();
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
    });
    sendEmail(emailData);
    res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
    });
  });
};


exports.signIn = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "User with that username does not exist. Please signup.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: "Username and password do not match",
      });
    }
    if (user.status === 'inactive') {
      return res.status(401).json({
        message: "Your account is inactive",
      });
    }
    const token = jwt.sign(
      { _id: user._id, roleId: user.role },
      process.env.JWT_SECRET
    );
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, image, name, email, role, tax } = user;
    return res.json({ token, user: { _id, image, email, name, role, tax } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "SignOut success!" });
};

// exports.requireSignIn = () => {
//   return expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty: "auth",
//   });
// }

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
})

exports.checkRole = (roles) => (req, res, next) => {
  const { roleId } = req.auth;
  console.log(roleId);
  if (!roles.includes(roleId)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};
