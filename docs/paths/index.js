const auth = require("./auth");
const post = require("./post");
const user = require("./user");
const calendar = require("./calendar");
const notification = require("./notification");
const order = require("./order");
const category= require("./category");
const product = require("./product");
const contact = require("./contact");
const orderDetail = require("./orderDetail");
const variation = require("./variation");


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
    ...contact,
    ...orderDetail,
    ...variation,
  },
};
