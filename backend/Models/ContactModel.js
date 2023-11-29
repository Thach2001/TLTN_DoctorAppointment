const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      topic: { type: String, required: true },
      message: { type: String, required: true },
   },
   { timestamps: true }
);

// compiler
const ContactModel = mongoose.model("Contact", ContactSchema);

module.exports = ContactModel;
