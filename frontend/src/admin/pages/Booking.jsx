import { useCallback, useEffect, useState } from "react";
import {
   HiCheckCircle,
   HiOutlineXCircle,
   HiOutlineSearch,
   HiArrowNarrowUp,
   HiArrowNarrowDown,
} from "react-icons/hi";
import { format } from "date-fns";
import cogoToast from "cogo-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "../../config/axiosConfigCommon";
import Layout from "../layout/Layout";
import { getOrderStatus } from "../../lib/helpers";
import status from "../../lib/status";
import Pagination from "../../user/components/Pagination/Pagination";
import Popup from "../../components/Popup";
import Invoice from "../../user/pages/Invoice";

const Booking = () => {
   const [bookings, setBookings] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const getAllBooking = useCallback(async () => {
      const res = await axios.get(
         `api/booking?limit=8&page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setBookings(res.data);
   }, [page, search, sort.order, sort.sort]);

   useEffect(() => {
      getAllBooking();
   }, [getAllBooking]);

   const loadListBooking = async () => {
      await getAllBooking();
   };

   console.log(bookings.bookings);

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

   // Sắp xếp
   const handleSort = (column) => {
      if (sort.sort === column) {
         const newOrder = sort.order === "asc" ? "desc" : "asc";
         const newSort = { sort: column, order: newOrder };
         setSort(newSort);
      } else {
         const newSort = { sort: column, order: "desc" };
         setSort(newSort);
      }

      setPage(1);
   };

   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [selectedUserId, setSelectedUserId] = useState(null);

   const openPopup = (userId) => {
      setSelectedUserId(userId);
      setIsPopupOpen(true);
   };

   const closePopup = () => {
      setIsPopupOpen(false);
   };

   return (
      <Layout>
         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <div className="text-gray-700 font-medium">Quản lý Đặt lịch</div>
            <div className="relative my-3">
               <HiOutlineSearch
                  fontSize={20}
                  className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
               />
               <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[18rem] h-10 pl-11 pr-4 rounded-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            {bookings.total > 0 ? (
               <>
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
                              <th>Chuyên môn</th>
                              <th>Hóa đơn</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("status")}
                              >
                                 Trạng thái
                                 {sort.sort === "status" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Y/N</th>
                           </tr>
                        </thead>
                        <tbody>
                           {bookings.bookings &&
                              bookings.bookings.map((booking, index) => (
                                 <tr key={booking._id}>
                                    <td>
                                       #
                                       {index + 1 + (page - 1) * bookings.limit}
                                    </td>
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
                                    <td>{booking.doctor.specialization}</td>
                                    <td>
                                       <button
                                          className="text-primaryColor underline"
                                          onClick={() =>
                                             openPopup(booking.user._id)
                                          }
                                       >
                                          Xem chi tiết
                                       </button>
                                       <Popup
                                          isOpen={isPopupOpen}
                                          onClose={closePopup}
                                       >
                                          <Invoice userId={selectedUserId} />
                                       </Popup>
                                    </td>
                                    <td className="text-center">
                                       {getOrderStatus(status(booking.status))}
                                    </td>

                                    <td>
                                       <div className="flex items-center gap-2">
                                          <Tippy
                                             content="Đồng ý Đặt lịch"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-green-700"
                                                onClick={() =>
                                                   handleCheckBooking(
                                                      booking._id
                                                   )
                                                }
                                             >
                                                <HiCheckCircle />
                                             </button>
                                          </Tippy>
                                          <Tippy
                                             content="Hủy đặt lịch"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-red-700"
                                                onClick={() =>
                                                   handleCancelBooking(
                                                      booking._id
                                                   )
                                                }
                                             >
                                                <HiOutlineXCircle />
                                             </button>
                                          </Tippy>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
                  {bookings.total > bookings.limit && (
                     <Pagination
                        page={page}
                        limit={bookings.limit ? bookings.limit : 0}
                        total={bookings.total ? bookings.total : 0}
                        setPage={(page) => setPage(page)}
                     />
                  )}
               </>
            ) : (
               <p className="px-10 py-5">Không có kết quả tìm kiếm</p>
            )}
         </div>
      </Layout>
   );
};

export default Booking;
