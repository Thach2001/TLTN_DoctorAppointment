import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../config/axiosConfigCommon";

const Queue = () => {
   const [bookings, setBookings] = useState([]);
   const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

   useEffect(() => {
      const getAllBooking = async () => {
         const res = await axios.get("api/booking");
         setBookings(res.data.bookings);
      };
      getAllBooking();
   }, []);

   const showNextPatient = () => {
      if (currentPatientIndex === bookings.length - 1) {
         setCurrentPatientIndex(0);
      } else {
         setCurrentPatientIndex(currentPatientIndex + 1);
      }
   };

   return (
      <div className="w-[1024px] bg-white rounded shadow-md relative">
         <h2 className="text-center text-[25px] mb-3 uppercase font-bold">
            Bệnh nhân tiếp theo
         </h2>
         <button
            onClick={showNextPatient}
            className="bg-blue-500 text-white p-2 rounded-md ml-3"
         >
            Next
         </button>
         <div className="max-h-[400px] overflow-y-auto">
            {bookings.map((booking, index) => (
               <Link to={`/medicines/${booking.user.name}`}>
                  <div
                     key={booking._id}
                     className={`p-5 mb-3 border border-solid border-blue-600 shadow-md rounded-md ${
                        index === currentPatientIndex
                           ? "bg-blue-700 text-white"
                           : "bg-teal-700 text-gray-300"
                     }`}
                  >
                     <div className="flex gap-[250px] text-[20px] font-semibold">
                        <div>STT: {index + 1}</div>
                        <div>
                           <div>{booking.user.name}</div>
                           <div>22/01/2001</div>
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
