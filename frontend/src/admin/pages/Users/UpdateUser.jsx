import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const UpdateUser = ({ idUser, closePopupUpdate, loadListUser }) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      phone: "",
      photo: "",
      gender: "Nam",
      role: "patient",
   });

   useEffect(() => {
      const getSingleUser = async () => {
         try {
            const res = await axios.get(`/api/users/${idUser}`);
            setFormData(res.data.data);
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu", { position: "top-right" });
         }
      };
      getSingleUser();
   }, [idUser]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleUpdateUser = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.put(`api/users/${idUser}`, formData);

         if (res.status === 200) {
            cogoToast.success("Cập nhật tài khoản thành công", {
               position: "top-right",
            });
            await loadListUser();
            closePopupUpdate();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <div className="w-[600px] p-4 bg-white rounded shadow-md">
         <h2 className="text-2xl font-bold mb-4 text-center text-primaryColor">
            Cập nhật tài khoản
         </h2>
         <form>
            <div className="mb-4">
               <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Họ và tên:
               </label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập vào họ và tên"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Email:
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập vào Email đăng nhập"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
               >
                  Mật khẩu:
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập vào mật khẩu"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4 flex items-center justify-between">
               <div>
                  <label className="block text-gray-700 font-bold mb-2">
                     Ngày sinh:
                  </label>
                  <input
                     type="date"
                     name="dateOfBirth"
                     value={formData.dateOfBirth}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
               <div>
                  <label className="block text-gray-700 font-bold mb-2">
                     Giới tính:
                  </label>
                  <select
                     name="gender"
                     value={formData.gender}
                     onChange={handleInputChange}
                     className="w-full px-3 py-2 border rounded-md"
                  >
                     <option value="Nam">Nam</option>
                     <option value="Nữ">Nữ</option>
                  </select>
               </div>
               <div>
                  <label className="block text-gray-700 font-bold mb-2">
                     Số điện thoại:
                  </label>
                  <input
                     type="text"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     placeholder="Nhập số điện thoại"
                     className="w-full px-3 py-2 border rounded-md"
                  />
               </div>
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
                  Ảnh đại diện:
               </label>
               <input
                  type="file"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
         </form>
         <div className="flex items-center gap-5">
            <button
               type="submit"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
               onClick={handleUpdateUser}
            >
               Cập nhật tài khoản
            </button>
            <button
               type="submit"
               className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
               onClick={() => closePopupUpdate()}
            >
               Hủy
            </button>
         </div>
      </div>
   );
};

export default UpdateUser;
