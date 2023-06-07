const express = require("express");
const controllersOrder = require("../controllers/category");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/category', controllersOrder.allCategory);
router.get('/category/:categoryID', controllersOrder.getCategoryById);
router.post('/category',requireSignIn,checkRole(["admin"]) , controllersOrder.addCategory);
router.put('/category/:categoryID',requireSignIn,checkRole(["admin"]) , controllersOrder.updateCategory);
router.delete('/category/:categoryID',requireSignIn,checkRole(["admin"]) , controllersOrder.deleteCategory);

module.exports = router;