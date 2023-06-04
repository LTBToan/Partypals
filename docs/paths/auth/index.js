const signIn = require("./signIn");
const signUp = require("./signUp");
const signOut = require("./signOut");
module.exports = {
  "/signIn": {
    ...signIn,
  },
  "/signUp": {
    ...signUp,
  },
  "/signOut": {
    ...signOut,
  },
};
