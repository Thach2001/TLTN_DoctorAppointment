import { useState } from "react";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const AddFaq = ({ closePopupAdd, loadListFaq }) => {
   const [formData, setFormData] = useState({
      question: "",
      answer: "",
   });

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleAddFaq = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post("api/faqs/create", formData);

         if (res.status === 200) {
            cogoToast.success("Tạo thắc mắc thành công", {
               position: "top-right",
            });
            await loadListFaq();
            closePopupAdd();
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
            Thêm thắc mắc
         </h2>
         <form>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
                  Câu hỏi
               </label>
               <textarea
                  rows={3}
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Nhập vào câu hỏi"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 font-bold mb-2">
                  Trả lời
               </label>
               <textarea
                  rows={3}
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="Nhập vào câu trả lời"
                  className="w-full px-3 py-2 border rounded-md"
               />
            </div>
         </form>
         <div className="flex items-center gap-5">
            <button
               type="submit"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
               onClick={handleAddFaq}
            >
               Thêm thắc mắc
            </button>
            <button
               type="submit"
               className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
               onClick={() => closePopupAdd()}
            >
               Hủy
            </button>
         </div>
      </div>
   );
};

export default AddFaq;
