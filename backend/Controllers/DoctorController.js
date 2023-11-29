const Doctor = require("../Models/DoctorModel");
const Booking = require("../Models/BookingModel");

const updateDoctor = async (req, res) => {
   const id = req.params.id;

   try {
      const updateDoctor = await Doctor.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateDoctor,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteDoctor = async (req, res) => {
   const id = req.params.id;

   try {
      await Doctor.findByIdAndDelete(id);

      res.status(200).json({
         success: true,
         message: "Successfully deleted",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to delete",
      });
   }
};

const getSingleDoctor = async (req, res) => {
   const id = req.params.id;

   try {
      const doctor = await Doctor.findById(id)
         .populate("reviews")
         .select("-password");

      res.status(200).json({
         success: true,
         message: "Doctor found",
         data: doctor,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No doctor found",
      });
   }
};

const getAllDoctor = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 0;
   const search = req.query.search || "";

   try {
      let sort = req.query.sort || "totalRating";
      let specialization = req.query.specialization || "All";

      const specializationOptions = [
         "Sức khỏe tâm thần",
         "Da liễu",
         "Dị ứng",
         "Hiếm muộn",
         "Nhi khoa",
         "Tiêu hóa",
         "Tim mạch",
      ];

      specialization === "All"
         ? (specialization = [...specializationOptions])
         : (specialization = req.query.specialization.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
         sortBy[sort[0]] = sort[1];
      } else {
         sortBy[sort[0]] = "desc";
      }

      const doctors = await Doctor.find({
         name: { $regex: search, $options: "i" },
      })
         .where("specialization")
         .in([...specialization])
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Doctor.countDocuments({
         specialization: { $in: [...specialization] },
         name: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         specializations: specializationOptions,
         data: doctors,
      };

      res.status(200).json(response);
   } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getUserAppointments = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 4;

   try {
      let sort = req.query.sort || "status";

      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
         sortBy[sort[0]] = sort[1];
      } else {
         sortBy[sort[0]] = "desc";
      }

      const bookings = await Booking.find({
         doctor: req.userId,
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Booking.countDocuments({
         doctor: req.userId,
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: bookings,
      };

      res.status(200).json(response);
   } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

module.exports = {
   updateDoctor,
   deleteDoctor,
   getSingleDoctor,
   getAllDoctor,
   getUserAppointments,
};
