const User = require("../Models/UserModel");
const Booking = require("../Models/BookingModel");

const updateUser = async (req, res) => {
   const id = req.params.id;

   try {
      const updateUser = await User.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateUser,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteUser = async (req, res) => {
   const id = req.params.id;

   try {
      await User.findByIdAndDelete(id);

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

const getSingleUser = async (req, res) => {
   const id = req.params.id;

   try {
      const user = await User.findById(id).select("-password");

      res.status(200).json({
         success: true,
         message: "User found",
         data: user,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No user found",
      });
   }
};

const getAllUser = async (req, res) => {
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
         sortBy[sort[0]] = "asc";
      }

      const users = await User.find({
         name: { $regex: search, $options: "i" },
         name: { $ne: "admin" },
      })
         .populate("invoices")
         .select("-password")
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await User.countDocuments({
         name: { $regex: search, $options: "i" },
         name: { $ne: "admin" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: users,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getUserAppointments = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 4;

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
         user: req.userId,
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Booking.countDocuments({
         user: req.userId,
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
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

module.exports = {
   updateUser,
   deleteUser,
   getSingleUser,
   getAllUser,
   getUserAppointments,
};
