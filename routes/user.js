const express = require("express");
const controllersUser = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const router = express.Router();

router.get("/users",controllersUser.allUsers);
router.get("/user/:userId",controllersUser.hasAuthorization,controllersUser.getUser);
router.put("/user/:userId", requireSignIn, controllersUser.updateUser);
router.delete("/user/:userId", requireSignIn, controllersUser.deleteUser);
router.param("userId",controllersUser.userByLogin);

module.exports = router;
