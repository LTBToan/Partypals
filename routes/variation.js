const express = require("express");
const controllersVariation = require("../controllers/variation");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/variation', controllersVariation.allVariations);
router.get('/variation/:variationID', controllersVariation.getVariationById);
router.post('/variation', requireSignIn, checkRole(["company"]), controllersVariation.addVariation);
router.put('/variation/:variationID', requireSignIn, checkRole(["company"]), controllersVariation.updateVariation);
router.delete('/variation/:variationID', requireSignIn, checkRole(["company"]), controllersVariation.deleteVariation);

module.exports = router;