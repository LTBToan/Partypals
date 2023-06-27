const express = require("express");
const controllersInvoice = require("../controllers/invoice");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get('/invoice', controllersInvoice.allInvoice);
router.get('/invoice/:invoiceID', controllersInvoice.getInvoiceById);
router.post('/invoice', requireSignIn, controllersInvoice.addInvoice);
router.delete('/invoice/:invoiceID', requireSignIn, checkRole(["admin"]), controllersInvoice.deleteInvoice);

module.exports = router;