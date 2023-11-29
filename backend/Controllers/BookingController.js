const Booking = require("../Models/BookingModel");
const emailService = require("../Services/EmailService");

const getAllBooking = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 0;
   const search = req.query.search || "";

   try {
      let sort = req.query.sort || "createdAt";

      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
         sortBy[sort[0]] = sort[1];
      } else {
         sortBy[sort[0]] = "desc";
      }

      const bookings = await Booking.find({
         status: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Booking.countDocuments({
         status: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         bookings,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getSingleBooking = async (req, res) => {
   try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
         res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json({ booking });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const createBooking = async (req, res) => {
   const {
      doctor,
      user,
      ticketPrice,
      appointmentDate,
      appointmentTime,
      symptoms,
   } = req.body;

   try {
      const booking = new Booking({
         doctor,
         user,
         ticketPrice,
         appointmentDate,
         appointmentTime,
         symptoms,
      });

      await booking.save();

      await emailService.sendSimpleEmail({
         receiverEmail: "vovanthach2001@gmail.com",
         appointmentTime: appointmentTime,
         appointmentDate: appointmentDate,
         ticketPrice: ticketPrice,
         symptoms: symptoms,
      });

      res.status(200).json({ booking });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateBooking = async (req, res) => {
   const id = req.params.id;

   try {
      const updateBooking = await Booking.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateBooking,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteBooking = async (req, res) => {
   try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
         res.status(404).json({ message: "Booking not found" });
      }

      await booking.remove();
      res.status(200).json({ message: "Booking deleted successfully" });
   } catch (error) {
      res.status(500).json({ error });
   }
};

module.exports = {
   getAllBooking,
   getSingleBooking,
   createBooking,
   updateBooking,
   deleteBooking,
};
