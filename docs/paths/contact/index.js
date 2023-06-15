const getContact = require("./getContact");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
module.exports = {
  "/contact/{userId}": {
    ...getContact,
    ...postContact,
  },
  "/contact/{contactId}": {
    ...deleteContact,
  },
};
