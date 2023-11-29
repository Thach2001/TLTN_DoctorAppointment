const Medicine = require("../Models/MedicineModel");

const getAllMedicine = async (req, res) => {
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

      const medicines = await Medicine.find({
         name: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Medicine.countDocuments({
         status: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         medicines,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const getSingleMedicine = async (req, res) => {
   try {
      const medicine = await Medicine.findById(req.params.id);

      if (!medicine) {
         res.status(404).json({ message: "Medicine not found" });
      }
      res.status(200).json({ medicine });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const createMedicine = async (req, res) => {
   const { name, dosage, manufacturer, price } = req.body;

   try {
      const medicine = new Medicine({
         name,
         dosage,
         manufacturer,
         price,
      });
      await medicine.save();
      res.status(200).json({ medicine });
   } catch (error) {
      res.status(500).json({ error });
   }
};

const updateMedicine = async (req, res) => {
   const id = req.params.id;

   try {
      const updateMedicine = await Medicine.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: "Successfully updated",
         data: updateMedicine,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Failed to update",
      });
   }
};

const deleteMedicine = async (req, res) => {
   try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
         res.status(404).json({ message: "Medicine not found" });
      }

      await medicine.remove();

      res.status(200).json({ message: "Medicine deleted successfully" });
   } catch (error) {
      res.status(500).json({ error });
   }
};

module.exports = {
   getAllMedicine,
   getSingleMedicine,
   createMedicine,
   updateMedicine,
   deleteMedicine,
};
