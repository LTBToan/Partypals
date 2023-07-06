const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUserById");
const postCalendar = require("../calendar/postCalendar");
const putCalendar = require("../calendar/putCalendar");
const deleteCalendar = require("../calendar/deleteCalendar");
const updateUser = require("./updateUser");
const createUser = require("./createUser");
const getUserBySignedIn = require("./getUserBySignedIn");
module.exports = {
  "/users": {
    ...getAllUser,
  },

  "/user": {
    ...getUserBySignedIn,
  },

  "/user/create":{
    ...createUser,
  },

  "/user/{userId}": {
    ...getUserById,
    ...deleteUser,
    ...updateUser,
  },
};
