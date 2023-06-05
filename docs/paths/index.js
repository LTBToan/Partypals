const auth = require("./auth");
const post = require("./post");
const user = require("./user");
const calendar = require("./calendar");

module.exports = {
  paths: {
    ...auth,
    ...post,
    ...user,
    ...calendar,
  },
};
