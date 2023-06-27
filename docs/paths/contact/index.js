const getAllContact = require("./getAllContact");
const postContactByAdmin = require("./postContactByAdmin");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
module.exports = {
  "/contact": {
    ...getAllContact,
    ...postContact,
  },
  "/contact/{contactId}": {
    ...deleteContact,
  },
};
