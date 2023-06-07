const allCategory = require("./allCategory");
const getCategoryById = require("./getCategoryById");
const addCategory = require("./addCategory");
const updateCategory = require("./updateCategory");
const deleteCategory = require("./deleteCategory");

module.exports = {
  "/category": {
    ...allCategory,
    ...addCategory,
  },
  "/category/{categoryID}": {
    ...updateCategory,
    ...deleteCategory,
    ...getCategoryById
  },
};