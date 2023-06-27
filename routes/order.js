const express = require("express");
const controllersOrder = require("../controllers/order");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/order', controllersOrder.allOrder);
router.get('/order/:orderID', controllersOrder.getOrderById);
router.post('/order', requireSignIn, checkRole(["user"]), controllersOrder.addOrder);
router.put('/order/:orderID', requireSignIn, checkRole(["user"]), controllersOrder.updateOrder);
router.delete('/order/:orderID', requireSignIn, checkRole(["user"]), controllersOrder.deleteOrder);

module.exports = router;