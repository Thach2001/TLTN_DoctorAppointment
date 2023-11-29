import { useEffect, useState } from "react";
import { format } from "date-fns";
import "tippy.js/dist/tippy.css";
import axios from "../../config/axiosConfigCommon";
import { getOrderStatus } from "../../lib/helpers";
import status from "../../lib/status";

const Booking = () => {
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      const getAllBooking = async () => {
         const res = await axios.get("api/booking");
         const bookingsData = res.data.bookings;

         const lastFiveBookings = bookingsData.slice(0, 5);

         setBookings(lastFiveBookings);
      };

      getAllBooking();
   }, []);

   return (
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
         <strong className="text-gray-700 font-medium">Đặt lịch gần đây</strong>
         <div className="border-x border-gray-200 rounded-sm mt-3">
            <table className="w-full text-gray-700">
               <thead>
                  <tr>
                     <th>STT</th>
                     <th>Họ và tên người đặt</th>
                     <th>Email người đặt</th>
                     <th>Họ và tên bác sĩ</th>
                     <th>Ngày đặt lịch</th>
                     <th>Thời gian</th>
                     <th>Triệu trứng</th>
                     <th>Giá (VNĐ/h)</th>
                     <th>Chuyên môn</th>
                     <th>SĐT</th>
                     <th>Trạng thái</th>
                  </tr>
               </thead>
               <tbody>
                  {bookings.map((booking, index) => (
                     <tr key={booking._id}>
                        <td>#{index + 1}</td>
                        <td>{booking.user.name}</td>
                        <td>{booking.user.email}</td>
                        <td>{booking.doctor.name}</td>
                        <td>
                           {format(
                              new Date(booking.appointmentDate),
                              "dd-MM-yyyy"
                           )}
                        </td>
                        <td>{booking.appointmentTime}</td>
                        <td>{booking.symptoms || "_"}</td>
                        <td>
                           {booking.ticketPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </td>
                        <td>{booking.doctor.specialization}</td>
                        <td>{booking.doctor.phone}</td>
                        <td>{getOrderStatus(status(booking.status))}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Booking;
