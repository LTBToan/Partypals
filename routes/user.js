const express = require("express");
const controllersUser = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");
const { checkRole } = require("../controllers/auth");
const router = express.Router();

router.get("/users", requireSignIn,checkRole(["admin"]), controllersUser.allUsers);
router.get("/user/:userId", requireSignIn,checkRole(["admin"]),controllersUser.getUser);
router.post("/user/create", requireSignIn,checkRole(["admin"]),controllersUser.createUser);
router.put("/user/:userId",controllersUser.updateUser);
router.delete("/user/:userId",requireSignIn,checkRole(["admin"]) ,controllersUser.deleteUser);
router.get(
  "/calendar/:userId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.getCalendar
);
router.post(
  "/calendar/:userId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.postCalendar
);
router.put(
  "/calendar/:calendarId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.putCalendar
);
router.delete(
  "/calendar/:calendarId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.deleteCalendar
);
router.get(
  "/notification/:userId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.getNotification
);
router.post(
  "/notification/:userId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.postNotification
);
router.put(
  "/notification/:notificationId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.putNotification
);
router.delete(
  "/notification/:notificationId",
  requireSignIn,
  checkRole(["user"]),
  controllersUser.deleteNotification
);
router.param("userId",controllersUser.userByLogin);

module.exports = router;
