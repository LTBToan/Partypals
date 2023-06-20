const fs = require("fs");
const _ = require("lodash");
const User = require("../models/users");
const Calendar = require("../models/calendar");
const Notification = require("../models/notification");

exports.userByLogin = (req, res, next, id) => {
  User.findById(id).exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = users;
    next();
  });
};

exports.allUsers = (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const name = req.query.name || "";
  let totalItems;
  const Users = User.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return User.find({ name: { $regex: name, $options: "i" } })
        .skip((currentPage - 1) * perPage) 
        .select("image name phone role address status tax")
        .limit(perPage)
        .sort({ created: -1 });
    })
    .then((users) => {
      res.status(200).json({
        totalPage: Math.ceil(totalItems / perPage),
        totalItems,
        perPage,
        currentPage,
        list: users,
      });
    })
    .catch((err) => console.log(err));
};

exports.getUser = (req, res) => {
  return res.json(req.profile);
};

exports.createUser = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      message: "Email is taken!",
    });
  const user = new User(req.body);
  await user.save();
  res.status(200).json({ message: "Create Success" });
};


exports.updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    const { _id, name, email, role } = user;
    res.json({ _id, email, name, role });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  user.status= req.query.status;
  if(req.query.status === undefined){
    return res.status(404).json({message:"User deleted failed"});
  }
  user.updated = Date.now();
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({ message: "User deleted successfully" });
  });
};

exports.getCalendar = async (req, res) => {
  const calendar = await Calendar.find({ userId: req.profile._id });
  res.status(200).json(calendar);
};

exports.postCalendar = (req, res) => {
  let calendar = new Calendar(req.body);
  calendar.userId = req.profile._id;
  calendar.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.putCalendar = async (req, res, next) => {
  let calendar = await Calendar.findById(req.params.calendarId);
  calendar = _.extend(calendar, req.body);
  calendar.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(calendar);
  });
};

exports.deleteCalendar = async (req, res) => {
  const calendar = await Calendar.findById(req.params.calendarId);
  calendar.remove((err, calendar) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "calendar deleted successfully",
    });
  });
};

exports.getNotification = async (req, res) => {
  const notification = await Notification.find({ userId: req.profile._id });
  res.status(200).json(notification);
};

exports.postNotification = (req, res) => {
  let notification = new Notification(req.body);
  notification.userId = req.profile._id;
  notification.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

exports.putNotification = async (req, res, next) => {
  let notification = await Notification.findById(req.params.notificationId);
  notification = _.extend(notification, req.body);
  notification.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(notification);
  });
};

exports.deleteNotification = async (req, res) => {
  const notification = await Notification.findById(req.params.notificationId);
  notification.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "notification deleted successfully",
    });
  });
};