const auth = require("./auth");
const post = require("./post");
const user = require("./user");
const calendar = require("./calendar");
const order = require("./order");
const category= require("./category");
const product = require("./product");


module.exports = {
  paths: {
    ...auth,
    ...post,
    ...user,
    ...calendar,
    ...product,
    ...order,
    ...category
  },
};
