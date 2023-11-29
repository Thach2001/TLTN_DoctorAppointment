import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import Tippy from "@tippyjs/react";
import { HiCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import cogoToast from "cogo-toast";
import axios from "../../../../config/axiosConfigCommon";
import { getOrderStatus } from "../../../../lib/helpers";
import status from "../../../../lib/status";
import Pagination from "../../../components/Pagination/Pagination";

const UserBooking = () => {
   const [appointments, setAppointments] = useState([]);
   const [page, setPage] = useState(1);

   const getAllAppointment = useCallback(async () => {
      const res = await axios.get(
         `api/doctors/appointments/user-appointments?page=${page}`
      );
      setAppointments(res.data);
   }, [page]);

   useEffect(() => {
      getAllAppointment();
   }, [getAllAppointment]);

   const loadListBooking = async () => {
      await getAllAppointment();
   };

   const handleCheckBooking = async (bookingId) => {
      try {
         const res = await axios.put(`api/booking/${bookingId}`, {
            status: "approved",
         });

         if (res.status === 200) {
            await loadListBooking();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   const handleCancelBooking = async (bookingId) => {
      try {
         const res = await axios.put(`api/booking/${bookingId}`, {
            status: "cancelled",
         });

         if (res.status === 200) {
            await loadListBooking();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <div>
         {appointments.total > 0 ? (
            <>
               <div className="border-x border-gray-200 rounded-sm mt-5 shadow-md">
                  <table className="w-full text-gray-700">
                     <thead>
                        <tr>
                           <th>STT</th>
                           <th>Bệnh nhân</th>
                           <th>Ngày đặt lịch</th>
                           <th>Thời gian</th>
                           <th>Triệu trứng</th>
                           <th>Giá (VNĐ/h)</th>
                           <th>Trạng thái</th>
                           <th>Đồng ý/Từ chối</th>
                        </tr>
                     </thead>
                     <tbody>
                        {appointments.data &&
                           appointments.data.map((appointment, index) => (
                              <tr key={appointment._id}>
                                 <td>
                                    #
                                    {index +
                                       1 +
                                       (page - 1) * appointments.limit}
                                 </td>
                                 <td>{appointment.user.name}</td>
                                 <td>
                                    {format(
                                       new Date(appointment.appointmentDate),
                                       "dd-MM-yyyy"
                                    )}
                                 </td>
                                 <td>{appointment.appointmentTime}</td>
                                 <td>{appointment.symptoms || "_"}</td>
                                 <td>
                                    {appointment.ticketPrice
                                       .toString()
                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                 </td>
                                 <td>
                                    {getOrderStatus(status(appointment.status))}
                                 </td>
                                 <td>
                                    <div className="flex items-center gap-2">
                                       <>
                                          <Tippy
                                             content="Đồng ý đặt lịch"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-green-700"
                                                onClick={() =>
                                                   handleCheckBooking(
                                                      appointment._id
                                                   )
                                                }
                                             >
                                                <HiCheckCircle />
                                             </button>
                                          </Tippy>
                                          <Tippy
                                             content="Từ chối đặt lịch"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-red-700"
                                                onClick={() =>
                                                   handleCancelBooking(
                                                      appointment._id
                                                   )
                                                }
                                             >
                                                <HiOutlineXCircle />
                                             </button>
                                          </Tippy>
                                       </>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                     </tbody>
                  </table>
               </div>
               {appointments.total > appointments.limit && (
                  <Pagination
                     page={page}
                     limit={appointments.limit ? appointments.limit : 0}
                     total={appointments.total ? appointments.total : 0}
                     setPage={(page) => setPage(page)}
                  />
               )}
            </>
         ) : (
            <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
               Bạn chưa có đơn đặt lịch nào
            </h2>
         )}
      </div>
   );
};

export default UserBooking;
