const getAllUser = require("./getAllUser");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUserById");
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
