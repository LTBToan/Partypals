const fs = require("fs");
const _ = require("lodash");
const User = require("../models/users");
const Calendar = require("../models/calendar");
const Contact =  require("../models/contact");

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
    res.json(user);
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

exports.getContactByAdmin = async (req, res) => {
  const contact = await Contact.find({ userId: req.profile._id });
  res.status(200).json(contact);
};

exports.getAllContact = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const name = req.query.name || "";
  let totalItems;
  const Contacts = Contact.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Contact.find({ name: { $regex: name, $options: "i" } })
        .skip((currentPage - 1) * perPage) 
        .select(" name email title description status")
        .limit(perPage)
        .sort({ created: -1 });
    })
    .then((contacts) => {
      res.status(200).json({
        totalPage: Math.ceil(totalItems / perPage),
        totalItems,
        perPage,
        currentPage,
        list: contacts,
      });
    })
    .catch((err) => console.log(err));
};

exports.postContact = (req, res) => {
  let contact = new Contact(req.body);
  contact.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
  });
};

// exports.postContactByAdmin = (req, res) => {
//   let contact = new Contact(req.body);
//   contact.userId = req.profile._id;
//   contact.save((err, result) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json(result);
//   });
// };

exports.putContact = async (req, res, next) => {
  let contact = await Contact.findById(req.params.contactId);
  contact = _.extend(contact, req.body);
  contact.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(contact);
  });
};

exports.deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.contactId);
  contact.remove((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "contact deleted successfully",
    });
  });
};