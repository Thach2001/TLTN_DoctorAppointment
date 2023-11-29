const Review = require("../Models/ReviewModel");
const Doctor = require("../Models/DoctorModel");

const getAllReviews = async (req, res) => {
   try {
      const doctorId = req.params.doctorId;
      const reviews = await Review.find({ doctor: doctorId });

      res.status(200).json({
         success: true,
         message: "Successful",
         data: reviews,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "Not found",
      });
   }
};

const getReviews = async (req, res) => {
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

      const reviews = await Review.find({
         reviewText: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Review.countDocuments({
         reviewText: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: reviews,
      };

      res.status(200).json(response);
   } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const createReview = async (req, res) => {
   if (!req.body.doctor) req.body.doctor = req.params.doctorId;
   if (!req.body.user) req.body.user = req.userId;

   const newReview = new Review(req.body);

   try {
      const savedReview = await newReview.save();

      await Doctor.findByIdAndUpdate(req.body.doctor, {
         $push: { reviews: savedReview._id },
      });

      res.status(200).json({
         success: true,
         message: "Review submitted",
         data: savedReview,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   getAllReviews,
   createReview,
   getReviews,
};
