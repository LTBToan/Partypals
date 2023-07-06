const allVariations = require("./allVariations");
const getVariationById = require("./getVariationById");
const addVariation = require("./addVariation");
const updateVariation = require("./updateVariation");
const deleteVariation = require("./deleteVariation");

module.exports = {
  "/variation": {
    ...allVariations,
    ...addVariation,
  },
  "/variation/{variationID}": {
    ...getVariationById,
    ...updateVariation,
    ...deleteVariation,
  },
};
