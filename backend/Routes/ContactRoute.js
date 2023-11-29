const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactController");
const { authenticate } = require("../Auth/VerifyToken");

router.get("/", contactController.getAllContact);
router.post("/create", authenticate, contactController.createContact);

module.exports = router;
