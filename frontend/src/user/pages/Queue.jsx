import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "../../config/axiosConfigCommon";
import logo from "../../assets/images/logo.JPG";

const Queue = () => {
   const [bookings, setBookings] = useState([]);

   useEffect(() => {
      const getAllBooking = async () => {
         const res = await axios.get(
            "api/doctors/appointments/user-appointments"
         );
         setBookings(res.data.data);
      };
      getAllBooking();
   }, []);

   return (
      <div className="px-5 bg-queue relative">
         <Link
            to="/doctors/profile/me"
            className="w-[60px] h-[60px] absolute top-3"
         >
            <img src={logo} alt="" />
         </Link>
         <h2 className="text-center p-5 text-[30px] uppercase font-bold">
            Danh sách bệnh nhân
         </h2>
         <div className="max-h-[550px] overflow-y-auto">
            {bookings.map((booking, index) => (
               <Link to={`/medicines/${booking.user._id}`} key={booking._id}>
                  <div
                     className={`mx-[100px] px-5 py-8 mb-3 border border-solid border-blue-600 shadow-md rounded-md ${
                        index === 0
                           ? "bg-[#0C4860] text-white"
                           : "bg-[#34748D]  text-gray-200"
                     }`}
                  >
                     <div className="flex gap-[400px] text-[20px] font-semibold">
                        <div>STT: {index + 1}</div>
                        <div>
                           <div>{booking.user.name}</div>
                           <div>
                              {format(
                                 new Date(booking.user.dateOfBirth),
                                 "dd/MM/yyyy"
                              )}
                           </div>
                        </div>
                        <div>
                           <div>{booking.doctor.name}</div>
                           <div>{booking.doctor.specialization}</div>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Queue;
