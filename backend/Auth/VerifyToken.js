const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Doctor = require("../Models/DoctorModel");

const authenticate = async (req, res, next) => {
   const authToken = req.headers.authorization;

   if (!authToken || !authToken.startsWith("Bearer")) {
      return res
         .status(401)
         .json({ success: false, message: "No token, authorization denied" });
   }

   try {
      const token = authToken.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      if (!decoded.id || !decoded.role) {
         return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
      }

      req.userId = decoded.id;
      req.role = decoded.role;

      next();
   } catch (error) {
      if (error.name === "TokenExpiredError") {
         return res
            .status(401)
            .json({ success: false, message: "Token is expired" });
      }

      return res.status(401).json({ success: false, message: "Invalid token" });
   }
};

const restrict = (roles) => async (req, res, next) => {
   try {
      const userId = req.userId;

      let user;

      const patient = await User.findById(userId);
      const doctor = await Doctor.findById(userId);

      if (patient) {
         user = patient;
      }
      if (doctor) {
         user = doctor;
      }
      if (!roles.includes(user.role)) {
         return res
            .status(401)
            .json({ success: false, message: "You're not authorized" });
      }

      next();
   } catch (error) {}
};

module.exports = {
   authenticate,
   restrict,
};
