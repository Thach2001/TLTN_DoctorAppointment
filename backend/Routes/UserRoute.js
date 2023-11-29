const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router.get(
   "/:id",
   authenticate,
   restrict(["patient", "doctor", "admin"]),
   userController.getSingleUser
);
router.get(
   "/",
   authenticate,
   restrict(["patient", "doctor", "admin"]),
   userController.getAllUser
);
router.put(
   "/:id",
   authenticate,
   restrict(["patient", "admin"]),
   userController.updateUser
);
router.delete(
   "/:id",
   authenticate,
   restrict(["patient", "admin"]),
   userController.deleteUser
);
router.get(
   "/appointments/user-appointments",
   authenticate,
   // restrict(["patient"]),
   userController.getUserAppointments
);

module.exports = router;
