const express = require("express");
const controllersUser = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get("/users", requireSignIn,checkRole(["admin"]), controllersUser.allUsers);
router.get("/user/:userId", requireSignIn,checkRole(["admin"]),controllersUser.getUser);
router.put("/user/:userId", requireSignIn, controllersUser.updateUser);
router.delete("/user/:userId", controllersUser.deleteUser);
router.param("userId",controllersUser.userByLogin);

module.exports = router;
