const express = require("express");
const router = express.Router();
const medicineController = require("../Controllers/MedicineController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router.get("/:id", medicineController.getSingleMedicine);
router.get("/", medicineController.getAllMedicine);
router.post(
   "/create",
   authenticate,
   // restrict(["doctor"]),
   medicineController.createMedicine
);
router.put(
   "/:id",
   authenticate,
   // restrict(["doctor"]),
   medicineController.updateMedicine
);
router.delete(
   "/:id",
   authenticate,
   // restrict(["doctor"]),
   medicineController.deleteMedicine
);

module.exports = router;
