const Faq = require("../Models/FaqModel");

const getAllFaq = async (req, res) => {
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

      const faqs = await Faq.find({
         question: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Faq.countDocuments({
         question: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: faqs,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getSingleFaq = async (req, res) => {
   const id = req.params.id;

   try {
      const faq = await Faq.findById(id);

      res.status(200).json({
         success: true,
         message: "Faq found",
         data: faq,
      });
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "No faq found",
      });
   }
};

const createFaq = async (req, res) => {
   const { question, answer, category } = req.body;

   try {
      const faq = new Faq({
         question,
         answer,
         category,
      });

      await faq.save();

      res.status(200).json({ faq });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateFaq = async (req, res) => {
   const id = req.params.id;

   try {
      const updateFaq = await Faq.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateFaq,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteFaq = async (req, res) => {
   const id = req.params.id;

   try {
      await Faq.findByIdAndDelete(id);

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

module.exports = {
   getAllFaq,
   getSingleFaq,
   createFaq,
   updateFaq,
   deleteFaq,
};
