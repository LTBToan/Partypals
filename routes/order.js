const express = require("express");
const controllersOrder = require("../controllers/order");
const router = express.Router();

router.get('/order', controllersOrder.allOrder);
router.get('/order/:orderID', controllersOrder.getOrderById);
router.post('/order', controllersOrder.addOrder);
router.put('/order/:orderID', controllersOrder.updateOrder);
router.delete('/order/:orderID', controllersOrder.deleteOrder);

module.exports = router;