const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUserById");
const updateUser = require("./updateUser");
const createUser = require("./createUser");
module.exports = {
  "/users": {
    ...getAllUser,
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
