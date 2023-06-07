const express = require("express");
const controllersOrder = require("../controllers/category");
const router = express.Router();

router.get('/category', controllersOrder.allCategory);
router.get('/category/:categoryID', controllersOrder.getCategoryById);
router.post('/category', controllersOrder.addCategory);
router.put('/category/:categoryID', controllersOrder.updateCategory);
router.delete('/category/:categoryID', controllersOrder.deleteCategory);

module.exports = router;