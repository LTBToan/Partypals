const express = require("express");
const controllersProduct = require("../controllers/product");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/product', controllersProduct.allProducts);
router.get('/product', controllersProduct.getProductsByName);
router.get('/product/:ProductID', controllersProduct.getProductById);
router.post('/product',requireSignIn,checkRole(["company"]) , controllersProduct.addProduct);
router.put('/product/:productID',requireSignIn,checkRole(["company"]) , controllersProduct.updateProduct);
router.delete('/product/:productID',requireSignIn,checkRole(["company"]) , controllersProduct.deleteProduct);

module.exports = router;