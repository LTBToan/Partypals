const express = require("express");
const controllersOrderDetail = require("../controllers/orderDetail");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/orderDetail', controllersOrderDetail.allOrderDetail);
router.get('/orderDetail/:orderDetailID', controllersOrderDetail.getOrderDetailById);
router.post('/orderDetail', requireSignIn, checkRole(["user"]), controllersOrderDetail.createOrderDetail);
router.put('/orderDetail/:orderDetailID', requireSignIn, checkRole(["user"]), controllersOrderDetail.updateOrderDetail);
router.delete('/orderDetail/:orderDetailID', requireSignIn, checkRole(["user"]), controllersOrderDetail.deleteOrderDetail);

module.exports = router;