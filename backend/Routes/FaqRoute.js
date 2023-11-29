const express = require("express");
const router = express.Router();
const faqController = require("../Controllers/FaqController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router.get("/", faqController.getAllFaq);
router.get("/:id", faqController.getSingleFaq);
router.post(
   "/create",
   authenticate,
   restrict(["patient"]),
   faqController.createFaq
);
router.put(
   "/:id",
   authenticate,
   // restrict(["patient"]),
   faqController.updateFaq
);
router.delete(
   "/:id",
   authenticate,
   // restrict(["patient"]),
   faqController.deleteFaq
);

module.exports = router;
