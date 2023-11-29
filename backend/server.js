const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./Services/ConnectDBService");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoute");
const doctorRoute = require("./Routes/DoctorRoute");
const reviewRoute = require("./Routes/ReviewRoute");
const bookingRoute = require("./Routes/BookingRoute");
const contactRoute = require("./Routes/ContactRoute");
const faqRoute = require("./Routes/FaqRoute");
const medicineRoute = require("./Routes/MedicineRoute");
const invoiceRoute = require("./Routes/InvoiceRoute");

require("dotenv").config();

// middleware apply cors add all request
app.use(cors());
// middleware get info from by req.body
app.use(express.json());

// connect database
connectDB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/faqs", faqRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/invoices", invoiceRoute);

app.listen(process.env.PORT, function () {
   console.log(`Server listen on port ${process.env.PORT}`);
});
