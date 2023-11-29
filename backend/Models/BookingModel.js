const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
   {
      doctor: {
         type: mongoose.Types.ObjectId,
         ref: "Doctor",
         required: true,
      },
      user: {
         type: mongoose.Types.ObjectId,
         ref: "User",
         required: true,
      },
      ticketPrice: { type: Number, required: true },
      appointmentDate: {
         type: Date,
         required: true,
      },
      appointmentTime: {
         type: String,
         required: true,
      },
      symptoms: {
         type: String,
      },
      status: {
         type: String,
         enum: ["pending", "approved", "cancelled"],
         default: "pending",
      },
   },
   { timestamps: true }
);

BookingSchema.pre(/^find/, function (next) {
   this.populate({
      path: "user",
      select: "name email dateOfBirth gender",
   });

   this.populate({
      path: "doctor",
      select: "name phone specialization",
   });

   next();
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
