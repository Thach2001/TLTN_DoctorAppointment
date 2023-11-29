const Contact = require("../Models/ContactModel");

const getAllContact = async (req, res) => {
   const page = parseInt(req.query.page) - 1 || 0;
   const limit = parseInt(req.query.limit) || 8;
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

      const contacts = await Contact.find({
         email: { $regex: search, $options: "i" },
      })
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

      const total = await Contact.countDocuments({
         email: { $regex: search, $options: "i" },
      });

      const response = {
         error: false,
         total,
         page: page + 1,
         limit,
         data: contacts,
      };

      res.status(200).json(response);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
   }
};

const createContact = async (req, res) => {
   const { email, topic, message } = req.body;
   try {
      const contact = new Contact({
         email,
         topic,
         message,
      });

      await contact.save();

      res.status(200).json({ contact });
   } catch (error) {
      res.status(500).json({ error });
   }
};

module.exports = {
   getAllContact,
   createContact,
};
