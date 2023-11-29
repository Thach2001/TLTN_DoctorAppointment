const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
   {
      question: {
         type: String,
         required: true,
      },
      answer: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

// compiler
const FaqModel = mongoose.model("Faq", FaqSchema);

module.exports = FaqModel;
