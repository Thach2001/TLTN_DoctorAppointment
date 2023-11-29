const nodemailer = require("nodemailer");
const { format } = require("date-fns");
require("dotenv").config();

let sendSimpleEmail = async (dataSend) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.EMAIL_APP,
         pass: process.env.EMAIL_APP_PASSWORD,
      },
   });

   // send mail with defined transport object
   const info = await transporter.sendMail({
      from: '"Thach 👻" <vovanthach2001@gmail.com>', // sender address
      to: dataSend.receiverEmail, // list of receivers
      subject: "Thông tin đặt lịch khám bệnh", // Subject line
      html: `
      <h3>Xin chào!</h3>
      <p>Cảm ơn bạn đã đặt lịch khám bệnh từ MEDICAL</p>
      <p>Dưới đây là thông tin đặt lịch</p>
      <p>Ngày đặt lịch: <b>${format(
         new Date(dataSend.appointmentDate),
         "dd-MM-yyyy"
      )}</b></p>
      <p>Thời gian: <b>${dataSend.appointmentTime}</b></p>
      <p>Giá: <b>${dataSend.ticketPrice
         .toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</b> VNĐ</p>
      <p>Triệu chứng: <b>${dataSend.symptoms}</b></p>
      `,
   });
};

module.exports = {
   sendSimpleEmail,
};
