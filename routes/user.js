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
  "/contact",
  requireSignIn,
  checkRole(["admin"]),
  controllersUser.getAllContact
);
router.post(
  "/contact",
  controllersUser.postContact
);
// router.put(
//   "/contact/:contactId",
//   requireSignIn,
//   checkRole(["admin"]),
//   controllersUser.putContact
// );
// router.delete(
//   "/contact/:contactId",
//   requireSignIn,
//   checkRole(["admin"]),
//   controllersUser.deleteContact
// );

router.param("userId",controllersUser.userByLogin);



module.exports = router;
