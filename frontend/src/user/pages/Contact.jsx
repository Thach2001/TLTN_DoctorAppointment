import { useState } from "react";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const Contact = () => {
   const [formData, setFormData] = useState({
      email: "",
      topic: "",
      message: "",
   });

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmitContact = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post("api/contacts/create", formData);

         if (res.status === 200) {
            cogoToast.success("Cảm ơn bạn đã liên hệ", {
               position: "top-right",
            });
            setFormData({ email: "", topic: "", message: "" });
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <section>
         <div className="px-4 mx-auto max-w-screen-md">
            <h2 className="heading text-center">Liên hệ với chúng tôi</h2>
            <p className="text__para mb-4 lg:mb-8 font-light text-center">
               Nếu bạn có bất kỳ thắc mắc nào? Hãy gửi phản hồi về cho chúng
               tôi.
            </p>
            <form className="space-y-4" onSubmit={handleSubmitContact}>
               <div>
                  <label className="form__label">Email của bạn</label>
                  <input
                     type="email"
                     name="email"
                     placeholder="example@gmail.com"
                     className="form__input mt-1"
                     value={formData.email}
                     onChange={handleInputChange}
                  />
               </div>
               <div>
                  <label className="form__label">Chủ đề</label>
                  <input
                     type="text"
                     name="topic"
                     placeholder="Hãy cho chúng tôi biết làm thế nào để giúp đỡ cho bạn"
                     className="form__input mt-1"
                     value={formData.topic}
                     onChange={handleInputChange}
                  />
               </div>
               <div className="sm:col-span-2">
                  <label className="form__label">Lời nhắn của bạn</label>
                  <textarea
                     rows="6"
                     type="text"
                     name="message"
                     placeholder="Để lại một bình luận..."
                     className="form__input mt-1"
                     value={formData.message}
                     onChange={handleInputChange}
                  />
               </div>
               <button type="submit" className="btn rounded sm:w-fit">
                  Gửi
               </button>
            </form>
         </div>
      </section>
   );
};

export default Contact;
