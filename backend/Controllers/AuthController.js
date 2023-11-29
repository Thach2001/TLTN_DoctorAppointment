const User = require("../Models/UserModel");
const Doctor = require("../Models/DoctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
   return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
         expiresIn: "15d",
      }
   );
};

const register = async (req, res) => {
   const {
      email,
      password,
      name,
      dateOfBirth,
      phone,
      role,
      photo,
      gender,
      specialization,
   } = req.body;

   try {
      let user = null;

      if (role === "patient") {
         user = await User.findOne({ email });
      } else if (role === "doctor") {
         user = await Doctor.findOne({ email });
      }

      // check if user exist
      if (user) {
         return res.status(400).json({ message: "User already exist" });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      if (role === "patient") {
         user = new User({
            name,
            email,
            password: hashPassword,
            photo,
            dateOfBirth,
            phone,
            gender,
            role,
         });
      }

      if (role === "doctor") {
         user = new Doctor({
            name,
            email,
            password: hashPassword,
            specialization,
            photo,
            dateOfBirth,
            phone,
            gender,
            role,
         });
      }

      await user.save();

      res.status(200).json({
         success: true,
         message: "User successfully created",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error, Try again",
      });
   }
};

const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      let user = null;

      const patient = await User.findOne({ email });
      const doctor = await Doctor.findOne({ email });

      if (patient) {
         user = patient;
      }
      if (doctor) {
         user = doctor;
      }

      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
         return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      // So sánh mật khẩu
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(400).json({
            status: false,
            message: "Thông tin đăng nhập không hợp lệ",
         });
      }

      // Tạo mã thông báo
      const token = generateToken(user);

      const { password: userPassword, role, appointments, ...rest } = user._doc;

      res.status(200).json({
         status: true,
         message: "Đăng nhập thành công",
         token,
         data: { ...rest },
         role,
      });
   } catch (error) {
      console.error(error);
      return res
         .status(500)
         .json({ status: false, message: "Đăng nhập thất bại" });
   }
};

module.exports = {
   register,
   login,
};
