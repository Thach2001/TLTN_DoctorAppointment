import { useEffect, useState } from "react";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const UpdateFaq = ({ faqId, closePopupUpdate, loadListFaq }) => {
   const [formData, setFormData] = useState({
      question: "",
      answer: "",
   });

   useEffect(() => {
      const getSingleFaq = async () => {
         try {
            const res = await axios.get(`/api/faqs/${faqId}`);
            setFormData(res.data.data);
         } catch (error) {
            cogoToast.error("Không thể lấy dữ liệu", { position: "top-right" });
         }
      };
      getSingleFaq();
   }, [faqId]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleUpdateFaq = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.put(`api/faqs/${faqId}`, formData);

         if (res.status === 200) {
            cogoToast.success("Cập nhật tài khoản thành công", {
               position: "top-right",
            });
            await loadListFaq();
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
               onClick={handleUpdateFaq}
            >
               Cập nhật thắc mắc
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

export default UpdateFaq;
