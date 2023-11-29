const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      dateOfBirth: { type: Date },
      phone: { type: String },
      photo: { type: String },
      role: {
         type: String,
         enum: ["patient", "doctor", "admin"],
         default: "patient",
      },
      gender: { type: String, enum: ["Nam", "Nữ"] },
      // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
      // medicines: [{ type: mongoose.Types.ObjectId, ref: "Medicine" }],
      invoices: [{ type: mongoose.Types.ObjectId, ref: "Invoice" }],
   },
   { timestamps: true }
);

// compiler
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
