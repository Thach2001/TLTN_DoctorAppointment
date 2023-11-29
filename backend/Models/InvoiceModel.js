const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   medicines: [
      {
         medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine",
            required: true,
         },
         quantity: { type: Number, required: true },
         usage: { type: String, required: true },
      },
   ],
   totalAmount: { type: Number, required: true },
   diagnosis: { type: String, required: true },
   nextAppointmentDate: { type: Date },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;
