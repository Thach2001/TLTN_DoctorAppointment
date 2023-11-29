import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import Tippy from "@tippyjs/react";
import { HiOutlineXCircle } from "react-icons/hi";
import cogoToast from "cogo-toast";
import axios from "../../../../config/axiosConfigCommon";
import { getOrderStatus } from "../../../../lib/helpers";
import status from "../../../../lib/status";
import Pagination from "../../../components/Pagination/Pagination";
import Popup from "../../../../components/Popup";
import Invoice from "../../Invoice";
import swal from "sweetalert";

const UserBooking = () => {
   const [appointments, setAppointments] = useState([]);
   const [page, setPage] = useState(1);

   const getAllAppointment = useCallback(async () => {
      const res = await axios.get(
         `api/users/appointments/user-appointments?page=${page}`
      );
      setAppointments(res.data);
   }, [page]);

   useEffect(() => {
      getAllAppointment();
   }, [getAllAppointment]);

   const loadListBooking = async () => {
      await getAllAppointment();
   };

   const handleCancelBooking = async (bookingId) => {
      try {
         const res = await axios.put(`api/booking/${bookingId}`, {
            status: "cancelled",
         });

         if (res.status === 200) {
            swal({
               title: "Bạn có chắc chắn hủy lịch hẹn?",
               text: "Sau khi hủy, bạn sẽ không thể khôi phục!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
            }).then(async (willDelete) => {
               if (willDelete) {
                  swal("Hủy lịch hẹn thành công", {
                     icon: "success",
                  });
                  await loadListBooking();
               } else {
                  return;
               }
            });
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const openPopup = () => {
      setIsPopupOpen(true);
   };

   const closePopup = () => {
      setIsPopupOpen(false);
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
                           <th>Bác sĩ</th>
                           <th>Ngày đặt lịch</th>
                           <th>Thời gian</th>
                           <th>Triệu trứng</th>
                           <th>Giá (VNĐ)</th>
                           <th>SĐT</th>
                           <th>Hóa đơn</th>
                           <th>Trạng thái</th>
                           <th>Huỷ</th>
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
                                 <td>{appointment.doctor.name}</td>
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
                                 <td>{appointment.doctor.phone}</td>
                                 <td>
                                    <button
                                       className="text-primaryColor underline"
                                       onClick={openPopup}
                                    >
                                       Xem chi tiết
                                    </button>
                                    <Popup
                                       isOpen={isPopupOpen}
                                       onClose={closePopup}
                                    >
                                       <Invoice userId={appointment.user._id} />
                                    </Popup>
                                 </td>
                                 <td>
                                    {getOrderStatus(status(appointment.status))}
                                 </td>
                                 <td>
                                    {appointment.status === "pending" && (
                                       <Tippy
                                          content="Hủy đặt lịch"
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
                                    )}
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
