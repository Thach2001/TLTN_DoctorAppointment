import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import HashLoader from "react-spinners/HashLoader";
import axios from "../../../config/axiosConfigCommon";

const Booking = () => {
   const navigate = useNavigate();

   const [doctors, setDoctors] = useState([]);
   const [selectedDoctor, setSelectedDoctor] = useState("");
   const [singleDoctor, setSingleDoctor] = useState("");
   const [loading, setLoading] = useState(false);

   const user = JSON.parse(localStorage.getItem("user"));

   const [formData, setFormData] = useState({
      user: user._id,
      doctor: "",
      ticketPrice: "",
      appointmentDate: new Date().toISOString().split("T")[0],
      appointmentTime: "",
      symptoms: "",
   });

   useEffect(() => {
      const getAllDoctor = async () => {
         const res = await axios.get("api/doctors");
         setDoctors(res.data.data);
      };
      getAllDoctor();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleDoctorChange = async (e) => {
      const doctorId = e.target.value;

      setSelectedDoctor(doctorId);

      if (doctorId) {
         const getSingleDoctor = async () => {
            const res = await axios.get(`api/doctors/${doctorId}`);
            const doctorData = res.data.data;

            setFormData({
               ...formData,
               doctor: doctorId,
               ticketPrice: doctorData.ticketPrice,
            });

            setSingleDoctor(doctorData);
         };
         getSingleDoctor();
      }
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

   return (
      <section className="container">
         <h1 className="text-3xl font-bold mb-8 text-center">
            Đặt lịch khám bệnh
         </h1>
         <form>
            <div className="mb-4 lg:flex lg:space-x-4">
               <div className="lg:w-1/2">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Họ và tên:
                  </label>
                  <input
                     type="text"
                     name="user"
                     value={user.name}
                     readOnly
                     onChange={handleChange}
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
                     value={user.email}
                     readOnly
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
               </div>
            </div>
            <div className="mb-4 lg:flex lg:space-x-4">
               <div className="lg:w-1/2">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Bác sĩ:
                  </label>
                  <select
                     name="doctor"
                     value={selectedDoctor || ""}
                     onChange={handleDoctorChange}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     required
                  >
                     <option value="">Chọn bác sĩ</option>
                     {doctors.map((doctor) => (
                        <option value={doctor._id} key={doctor._id}>
                           {doctor.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="lg:w-1/2">
                  <label className="block text-sm mb-1 font-medium text-gray-700">
                     Chuyên môn:
                  </label>
                  <input
                     type="text"
                     name="specialization"
                     value={singleDoctor.specialization}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     readOnly
                  />
               </div>
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
                     {singleDoctor.timeSlots &&
                        singleDoctor.timeSlots.map((item) => (
                           <option value={item._id} key={item._id}>
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
                        formData.ticketPrice
                           .toString()
                           .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"
                     }
                     onChange={handleChange}
                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                     required
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
                  className="bg-blue-500 text-white px-4 py-2 mr-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={handleSubmit}
               >
                  {loading ? (
                     <HashLoader size={35} color="#ffffff" />
                  ) : (
                     "Đặt lịch"
                  )}
               </button>
            </div>
         </form>
      </section>
   );
};

export default Booking;
