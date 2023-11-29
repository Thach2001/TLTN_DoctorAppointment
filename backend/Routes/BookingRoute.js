const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router.get("/:id", bookingController.getSingleBooking);
router.get("/", bookingController.getAllBooking);
router.post(
   "/create",
   authenticate,
   restrict(["patient"]),
   bookingController.createBooking
);
router.put(
   "/:id",
   // authenticate,
   // restrict(["patient, doctor"]),
   bookingController.updateBooking
);
router.delete(
   "/:id",
   authenticate,
   restrict(["patient"]),
   bookingController.deleteBooking
);

module.exports = router;
