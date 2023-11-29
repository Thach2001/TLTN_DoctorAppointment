const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/DoctorController");
const { authenticate, restrict } = require("../Auth/VerifyToken");
const reviewRoute = require("./ReviewRoute");

// nested route
router.use("/:doctorId/reviews", reviewRoute);

router.get("/:id", doctorController.getSingleDoctor);
router.get("/", doctorController.getAllDoctor);
router.put(
   "/:id",
   authenticate,
   // restrict(["doctor"]),
   doctorController.updateDoctor
);
router.delete(
   "/:id",
   authenticate,
   // restrict(["doctor"]),
   doctorController.deleteDoctor
);
router.get(
   "/appointments/user-appointments",
   authenticate,
   // restrict(["doctor"]),
   doctorController.getUserAppointments
);

module.exports = router;
