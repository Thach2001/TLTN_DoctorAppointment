import { useEffect, useState } from "react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";
import axios from "../../config/axiosConfigCommon";

export default function TransactionChart() {
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      const getAllBooking = async () => {
         const res = await axios.get("api/booking");
         setBookings(res.data.bookings);
      };
      getAllBooking();
   }, []);

   // Hàm để tính số lượng đặt lịch theo tháng
   const countBookingsByMonth = () => {
      return bookings.reduce((accumulator, booking) => {
         const appointmentDate = new Date(booking.appointmentDate);
         const monthKey = `${appointmentDate.getFullYear()}-${
            appointmentDate.getMonth() + 1
         }`;

         if (accumulator[monthKey]) {
            accumulator[monthKey]++;
         } else {
            accumulator[monthKey] = 1;
         }

         return accumulator;
      }, {});
   };

   // Gọi hàm để lấy số lượng đặt lịch theo tháng
   const bookingsByMonth = countBookingsByMonth();

   // Chuyển đổi object thành mảng và sắp xếp theo thứ tự tháng
   const chartData = Object.keys(bookingsByMonth)
      .map((month) => ({
         name: `Tháng ${month.split("-")[1]}`,
         Lượt: bookingsByMonth[month],
      }))
      .sort((a, b) => {
         const monthA = parseInt(a.name.split(" ")[1]);
         const monthB = parseInt(b.name.split(" ")[1]);
         return monthA - monthB;
      });

   return (
      <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
         <strong className="text-gray-700 font-medium">
            Khách hàng đặt lịch theo tháng
         </strong>
         <div className="mt-3 w-full flex-1 text-xs">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                     top: 20,
                     right: 10,
                     left: -10,
                     bottom: 0,
                  }}
               >
                  <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Lượt" fill="#0ea5e9" />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
}
