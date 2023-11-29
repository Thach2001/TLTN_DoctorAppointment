import { useState } from "react";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const AddMedicine = ({ closePopupAdd, loadListMedicine }) => {
   const [formData, setFormData] = useState({
      name: "",
      dosage: "",
      price: "",
      manufacturer: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleAddMedicine = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post("api/medicines/create", formData);

         if (res.status === 200) {
            cogoToast.success("Thuốc mới đã được thêm", {
               position: "top-right",
            });
            await loadListMedicine();
            closePopupAdd();
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <div className="w-[600px] p-2 bg-white rounded shadow-md">
         <h2 className="text-2xl font-bold mb-4 text-center">Thêm thuốc</h2>
         <form>
            <div className="mb-2">
               <label className="block text-gray-700 font-bold mb-2">
                  Tên:
               </label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-2">
               <label className="block text-gray-700 font-bold mb-2">
                  Trọng lượng:
               </label>
               <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-2">
               <label className="block text-gray-700 font-bold mb-2">
                  Giá:
               </label>
               <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-2">
               <label className="block text-gray-700 font-bold mb-2">
                  Nhà sản xuất:
               </label>
               <textarea
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  rows="4"
               />
            </div>
            <div className="text-center">
               <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={handleAddMedicine}
               >
                  Thêm thuốc
               </button>
            </div>
            <div className="text-center mt-2">
               <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  onClick={() => closePopupAdd()}
               >
                  Hủy
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddMedicine;
