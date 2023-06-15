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
  checkRole(["admin", "user"]),
  controllersUser.getCalendar
);
router.post(
  "/calendar/:userId",
  requireSignIn,
  checkRole(["admin", "user"]),
  controllersUser.postCalendar
);
router.put(
  "/calendar/:calendarId",
  requireSignIn,
  checkRole(["admin", "user"]),
  controllersUser.putCalendar
);
router.delete(
  "/calendar/:calendarId",
  requireSignIn,
  checkRole(["admin", "user"]),
  controllersUser.deleteCalendar
);

router.get(
  "/contact/:userId",
  requireSignIn,
  checkRole(["admin"]),
  controllersUser.getContact
);
router.post(
  "/contact/:userId",
  controllersUser.postContact
);
router.put(
  "/contact/:contactId",
  requireSignIn,
  checkRole(["admin"]),
  controllersUser.putContact
);
router.delete(
  "/contact/:contactId",
  requireSignIn,
  checkRole(["admin"]),
  controllersUser.deleteContact
);
// router.get(
//   "/notification/:userId",
//   requireSignIn,
//   checkRole(["admin", "user"]),
//   controllersUser.getNotification
// );
// router.post(
//   "/notification/:userId",
//   requireSignIn,
//   checkRole(["admin", "user"]),
//   controllersUser.postNotification
// );
// router.put(
//   "/notification/:notificationId",
//   requireSignIn,
//   checkRole(["admin", "user"]),
//   controllersUser.putNotification
// );
// router.delete(
//   "/notification/:notificationId",
//   requireSignIn,
//   checkRole(["admin", "user"]),
//   controllersUser.deleteNotification
// );
// router.param("userId",controllersUser.userByLogin);



module.exports = router;
