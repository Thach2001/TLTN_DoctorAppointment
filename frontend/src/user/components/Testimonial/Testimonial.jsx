import { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import axios from "../../../config/axiosConfigCommon";

const Testimonial = () => {
   const [reviews, setReviews] = useState([]);
   console.log(reviews);

   useEffect(() => {
      const getAllReview = async () => {
         const res = await axios.get("api/reviews/getall");
         const reviewsData = res.data.data;

         reviewsData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
         );

         setReviews(reviewsData);
      };
      getAllReview();
   }, []);

   return (
      <div className="mt-[10px] lg:mt-[30px]">
         <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={15}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            breakpoints={{
               640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
               },
               780: {
                  slidesPerView: 3,
                  spaceBetween: 20,
               },
               1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
               },
            }}
         >
            {reviews.map((review) => (
               <SwiperSlide key={review._id}>
                  <div className="cursor-pointer py-[30px] px-5 bg-slate-200 mb-10 border border-solid border-primaryColor rounded">
                     <div className="flex items-center gap-[13px]">
                        <img
                           src={review.user.photo}
                           alt=""
                           className="w-12 h-12 rounded-full"
                        />
                        <div>
                           <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                              {review.user.name}
                           </h4>
                           <div className="flex items-center gap-[2px]">
                              {[...Array(review.rating).keys()].map(
                                 (_, index) => (
                                    <HiStar key={index} color="#F9A74D" />
                                 )
                              )}
                           </div>
                        </div>
                     </div>

                     <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                        {review.reviewText}
                     </p>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default Testimonial;
