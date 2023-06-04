const express = require("express");
const controllersUser = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const router = express.Router();

router.get("/users", controllersUser.allUsers);
router.get("/user/:userId", controllersUser.getUser);
router.put("/user/:userId", requireSignIn, controllersUser.updateUser);
router.delete("/user/:userId", requireSignIn, controllersUser.deleteUser);
router.put("/user/calendar", requireSignIn, controllersUser.postCalendar);
router.put("/user/calendar", requireSignIn, controllersUser.deleteCalendar);

router.param("userId", controllersUser.userByLogin);

module.exports = router;
