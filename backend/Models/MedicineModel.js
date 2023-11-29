const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      manufacturer: { type: String, required: true },
      price: { type: Number, require: true },
   },
   { timestamps: true }
);

// compiler
const MedicineModel = mongoose.model("Medicine", MedicineSchema);

module.exports = MedicineModel;
