const Invoice = require("../Models/InvoiceModel");
const User = require("../Models/UserModel");

const createInvoice = async (req, res) => {
   const newInvoice = new Invoice(req.body);

   try {
      const savedInvoice = await newInvoice.save();

      await User.findByIdAndUpdate(req.body.user, {
         $push: { invoices: savedInvoice._id },
      });

      res.status(200).json({
         success: true,
         message: "Invoice submitted",
         data: savedInvoice,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getAllInvoice = async (req, res) => {
   try {
      const invoices = await Invoice.find({}).populate("medicines.medicine");
      res.status(200).json({
         success: true,
         message: "Successful",
         data: invoices,
      });
   } catch (error) {
      res.status(400).json({ error: "Không thể lấy danh sách hóa đơn" });
   }
};

const getInvoiceUser = async (req, res) => {
   try {
      const userId = req.params.id;
      const invoice = await Invoice.find({ user: userId }).populate(
         "medicines.medicine"
      );

      res.status(200).json({
         success: true,
         message: "Successful",
         data: invoice,
      });
   } catch (error) {
      console.error(error);
      res.status(404).json({
         success: false,
         message: "Not found",
      });
   }
};

module.exports = {
   createInvoice,
   getAllInvoice,
   getInvoiceUser,
};
