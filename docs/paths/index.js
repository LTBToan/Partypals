const auth = require("./auth");
const post = require("./post");
const user = require("./user");
const calendar = require("./calendar");
const notification = require("./notification");
const order = require("./order");
const category= require("./category");
const product = require("./product");
const invoice = require("./invoice");
const orderDetail = require("./orderDetail");

module.exports = {
  paths: {
    ...auth,
    ...post,
    ...user,
    ...calendar,
    ...notification,
    ...product,
    ...order,
    ...category,
    ...invoice,
    ...orderDetail,
  },
};
