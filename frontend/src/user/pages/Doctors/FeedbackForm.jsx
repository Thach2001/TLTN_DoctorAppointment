import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const FeedbackForm = ({ idDoctor, loadReview, loadSingleDoctor }) => {
   const [rating, setRating] = useState(0);
   const [hover, setHover] = useState(0);
   const [reviewText, setReviewText] = useState("");

   const handleSubmitReview = async (e) => {
      e.preventDefault();

      try {
         const formData = { rating, reviewText };

         const res = await axios.post(
            `api/doctors/${idDoctor}/reviews`,
            formData
         );

         if (res.status === 200) {
            cogoToast.success(`Cảm ơn bạn đã đánh giá`, {
               position: "top-right",
            });
            loadReview();
            loadSingleDoctor();

            setRating(0);
            setHover(0);
            setReviewText("");
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   return (
      <form action="">
         <div>
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
               Bạn đánh giá trải nghiệm tổng thể như thế nào ?
            </h3>

            <div>
               {[...Array(5).keys()].map((_, index) => {
                  index += 1;

                  return (
                     <button
                        type="button"
                        key={index}
                        className={`${
                           index <= ((rating && hover) || hover)
                              ? "text-yellowColor"
                              : "text-gray-400"
                        } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                        onDoubleClick={() => {
                           setHover(0);
                           setRating(0);
                        }}
                     >
                        <span>
                           <AiFillStar />
                        </span>
                     </button>
                  );
               })}
            </div>
         </div>

         <div className="mt-[30px]">
            <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
               Góp ý phản hồi hoặc đề xuất của bạn*
            </h3>
            <textarea
               rows="5"
               value={reviewText}
               placeholder="Viết lời nhắn của bạn..."
               className="border boder-solid border-[#0066f34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
               onChange={(e) => setReviewText(e.target.value)}
            />
         </div>
         <button
            type="submit"
            className="btn mb-5"
            onClick={handleSubmitReview}
         >
            Gửi phản hồi
         </button>
      </form>
   );
};

export default FeedbackForm;
