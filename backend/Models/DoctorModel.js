const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      dateOfBirth: { type: Date },
      phone: { type: String },
      photo: { type: String },
      ticketPrice: { type: Number },
      role: {
         type: String,
      },
      gender: { type: String, enum: ["Nam", "Nữ"] },

      // Chuyên môn
      specialization: { type: String },
      qualifications: {
         type: Array,
      },

      experiences: {
         type: Array,
      },

      bio: { type: String, maxLength: 50 },
      about: { type: Array },
      timeSlots: { type: Array },
      reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
      averageRating: {
         type: Number,
         default: 0,
      },
      totalRating: {
         type: Number,
         default: 0,
      },
      isApproved: {
         type: String,
         enum: ["pending", "approved", "cancelled"],
         default: "pending",
      },
      // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
   },
   { timestamps: true }
);

const DoctorModel = mongoose.model("Doctor", DoctorSchema);

module.exports = DoctorModel;
