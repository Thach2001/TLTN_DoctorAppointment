import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners/HashLoader";
import cogoToast from "cogo-toast";
import uploadImageToCloudinary from "../../../../utils/uploadCloudinary";
import axios from "../../../../config/axiosConfigCommon";

const Profile = () => {
   const user = useSelector((state) => state.auth.user);

   const [selectedFile, setSelectedFile] = useState(null);
   const [previewUrl, setPreviewUrl] = useState("");
   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      photo: "",
      gender: "Nam",
      role: "patient",
   });

   console.log(formData);

   useEffect(() => {
      const getSingleUser = async () => {
         try {
            const res = await axios.get(`/api/doctors/${user._id}`);
            setFormData(res.data.data);
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu", { position: "top-right" });
         }
      };
      getSingleUser();
   }, [user._id]);

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFileInputChange = async (e) => {
      const file = e.target.files[0];

      const data = await uploadImageToCloudinary(file);

      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
   };

   const handleSubmitSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await axios.put(`api/users/${user._id}`, formData);

         if (res.status === 200) {
            setLoading(false);
            cogoToast.success("Chúc mừng bạn cập nhật thành công", {
               position: "top-right",
            });
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <div className="w-[75%] mt-5">
         <form onSubmit={handleSubmitSignUp}>
            <div className="mb-5">
               <input
                  type="text"
                  placeholder="Họ và tên"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  onChange={handleInputChange}
               />
            </div>
            <div className="mb-5">
               <input
                  type="text"
                  placeholder="Email của bạn"
                  name="email"
                  required
                  value={formData.email}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  onChange={handleInputChange}
               />
            </div>
            <div className="mb-5">
               <input
                  type="password"
                  placeholder="Mật khẩu"
                  name="password"
                  value={formData.password}
                  className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  onChange={handleInputChange}
               />
            </div>
            <div className="mb-5 flex items-center justify-between">
               <label className="text-headingColor font-bold text-[16px] leading-7">
                  Bạn là một:
                  <select
                     name="role"
                     value={formData.role}
                     onChange={handleInputChange}
                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                     <option value="patient">Bệnh nhân</option>
                     <option value="doctor">Bác sĩ</option>
                  </select>
               </label>
               <label className="text-headingColor font-bold text-[16px] leading-7">
                  Giới tính:
                  <select
                     name="gender"
                     value={formData.gender}
                     onChange={handleInputChange}
                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                     <option value="Nam">Nam</option>
                     <option value="Nữ">Nữ</option>
                  </select>
               </label>
            </div>

            <div className="mb-5 flex items-center gap-3">
               {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                     <img
                        src={previewUrl}
                        alt=""
                        className="w-full rounded-full"
                     />
                  </figure>
               )}

               <div className="relative w-[130px] h-[50px]">
                  <input
                     type="file"
                     name="photo"
                     id="customFile"
                     accept=".jpg .png"
                     onChange={handleFileInputChange}
                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                     htmlFor="customFile"
                     className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                     Ảnh đại diện
                  </label>
               </div>
            </div>

            <div className="mt-7">
               <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
               >
                  {loading ? (
                     <HashLoader size={35} color="#ffffff" />
                  ) : (
                     "Cập nhật"
                  )}
               </button>
            </div>
         </form>
      </div>
   );
};

export default Profile;
