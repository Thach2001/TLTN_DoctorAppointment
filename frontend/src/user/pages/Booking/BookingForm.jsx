import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import HashLoader from "react-spinners/HashLoader";
import axios from "../../../config/axiosConfigCommon";

const BookingForm = ({ infoDoctor }) => {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);

   const infoUser = JSON.parse(localStorage.getItem("user"));

   const [formData, setFormData] = useState({
      user: infoUser._id,
      doctor: infoDoctor._id,
      ticketPrice: infoDoctor.ticketPrice,
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      symptoms: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await axios.post("api/booking/create", formData);

         if (res.status === 200) {
            setLoading(false);
            cogoToast.success("Cảm ơn bạn đã đặt lịch khám", {
               position: "top-right",
            });
            navigate("/doctors");
         }
      } catch (error) {
         setLoading(false);
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   const handleCancel = () => {
      navigate(`/doctors`);
   };

   return (
      <>
         <h1 className="text-2xl font-bold py-3 mb-5 text-center text-gray-50 bg-primaryColor rounded-md">
            Đặt lịch khám bệnh
         </h1>
         <div className="w-[1024px] p-4 bg-white rounded shadow-md">
            <form>
               <div className="mb-4 lg:flex lg:space-x-4">
                  <div className="lg:w-1/2">
                     <label className="block text-sm mb-1 font-medium text-gray-700">
                        Họ và tên:
                     </label>
                     <input
                        type="text"
                        name="user"
                        value={infoUser.name}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     />
                  </div>
                  <div className="lg:w-1/2">
                     <label className="block text-sm mb-1 font-medium text-gray-700">
                        Email:
                     </label>
                     <input
                        type="email"
                        name="email"
                        value={infoUser.email}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     />
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Bác sĩ:
                  </label>
                  <input
                     type="text"
                     name="doctor"
                     value={infoDoctor.name}
                     readOnly
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Chuyên môn:
                  </label>
                  <input
                     type="text"
                     name="specialization"
                     value={infoDoctor.specialization}
                     readOnly
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
               </div>
               <div className="mb-4 lg:flex lg:space-x-4">
                  <div className="lg:w-1/2">
                     <label className="block text-sm mb-1 font-medium text-gray-700">
                        Ngày khám:
                     </label>
                     <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        required
                     />
                  </div>
                  <div className="lg:w-1/2">
                     <label className="block text-sm mb-1 font-medium text-gray-700">
                        Giờ khám:
                     </label>
                     <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        required
                     >
                        {infoDoctor.timeSlots &&
                           infoDoctor.timeSlots.map((item, index) => (
                              <option value={item._id} key={index}>
                                 {item.time}
                              </option>
                           ))}
                     </select>
                  </div>
                  <div className="lg:w-1/2">
                     <label className="block text-sm mb-1 font-medium text-gray-700">
                        Giá:
                     </label>
                     <input
                        type="ticketPrice"
                        name="ticketPrice"
                        value={
                           infoDoctor.ticketPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
                        }
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        readOnly
                     />
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Triệu chứng:
                  </label>
                  <textarea
                     name="symptoms"
                     value={formData.symptoms}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     rows="4"
                     required
                  ></textarea>
               </div>
               <div>
                  <button
                     disabled={loading && true}
                     type="submit"
                     className="bg-blue-500 text-white font-medium px-4 py-2 mr-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                     onClick={handleSubmit}
                  >
                     {loading ? (
                        <HashLoader size={35} color="#ffffff" />
                     ) : (
                        "Đặt lịch"
                     )}
                  </button>
                  <button
                     type="submit"
                     className="bg-orange-600 text-white font-medium px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-blue-200"
                     onClick={handleCancel}
                  >
                     Hủy
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default BookingForm;
