const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUserById");
const postCalendar = require("../calendar/postCalendar");
const putCalendar = require("../calendar/putCalendar");
const deleteCalendar = require("../calendar/deleteCalendar");
const updateUser = require("./updateUser");
module.exports = {
  "/users": {
    ...getAllUser,
  },
  "/user/{userId}": {
    ...getUserById,
    ...deleteUser,
    ...updateUser,
  },
};
