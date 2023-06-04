const express = require("express");
const controllersAuth = require("../controllers/auth");
const controllersUser = require("../controllers/user");
const validator = require("../validator");
const router = express.Router();

router.post("/signIn", controllersAuth.signIn);
router.post("/signUp", controllersAuth.signUp);
router.post("/signOut", controllersAuth.signOut);
router.param("login", controllersUser.userByLogin);
router.put("/verify-email", controllersAuth.verifyEmail);
router.param("login", controllersUser.userByLogin);
module.exports = router;
