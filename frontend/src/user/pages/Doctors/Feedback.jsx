import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import axios from "../../../config/axiosConfigCommon";

const Feedback = ({ loadSingleDoctor }) => {
   const { _id } = useParams();

   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
   const [reviews, setReviews] = useState([]);

   const getAllReview = useCallback(async () => {
      const res = await axios.get(`api/doctors/${_id}/reviews`);
      const reviewsData = res.data.data;

      reviewsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setReviews(reviewsData);
   }, [_id]);

   useEffect(() => {
      getAllReview();
   }, [getAllReview]);

   const loadReview = async () => {
      getAllReview();
   };

   return (
      <>
         {reviews.length > 0 && (
            <div className="mb-[20px]">
               <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
                  Tất cả các đánh giá ({reviews.length})
               </h4>

               {reviews.map((review) => (
                  <div
                     className="flex justify-between gap-10 mb-[30px]"
                     key={review._id}
                  >
                     <div className="flex gap-3">
                        <figure className="w-10 h-10 rounded-full">
                           <img
                              src={review.user.photo}
                              alt="avatar_patient"
                              className="w-full"
                           />
                        </figure>
                        <div>
                           <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                              {review.user.name}
                           </h5>
                           <p className="text-[14px] leading-6 text-textColor">
                              {format(new Date(review.createdAt), "dd/MM/yyyy")}
                           </p>
                           <p className="text__para mt-3 font-medium text-[15px]">
                              {review.reviewText}
                           </p>
                        </div>
                     </div>

                     <div className="flex gap-1">
                        {[...Array(review.rating).keys()].map((_, index) => (
                           <AiFillStar key={index} color="#F9A74D" />
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         )}

         {!showFeedbackForm && (
            <div className="text-center mb-5">
               <button
                  className="btn"
                  onClick={() => setShowFeedbackForm(!showFeedbackForm)}
               >
                  Cho đánh giá
               </button>
            </div>
         )}

         {showFeedbackForm && (
            <FeedbackForm
               idDoctor={_id}
               loadReview={loadReview}
               loadSingleDoctor={loadSingleDoctor}
            />
         )}
      </>
   );
};

export default Feedback;
