const express = require("express");
const router = express.Router();
const invoiceController = require("../Controllers/InvoiceController");
const { authenticate, restrict } = require("../Auth/VerifyToken");

router.get("/", invoiceController.getAllInvoice);
router.post("/create", invoiceController.createInvoice);
router.get("/:id", invoiceController.getInvoiceUser);

module.exports = router;
