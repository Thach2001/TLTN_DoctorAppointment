import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import startIcon from "../../../assets/images/Star.png";

const DoctorCard = ({ doctor }) => {
   const { _id, name, averageRating, totalRating, photo, specialization } =
      doctor;

   return (
      <Link to={`detail/${_id}`}>
         <div className="min-w-[270px] p-2 lg:py-5 lg:px-3 bg-sky-100 hover:bg-sky-200 rounded-lg shadow-lg">
            <div className="flex justify-center items-center">
               <figure className="w-[100px] h-[100px] rounded-full border-1">
                  <img src={photo} alt="" className="w-full rounded-full" />
               </figure>
            </div>

            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5 text-center">
               {name}
            </h2>

            <div className="mt-2 lg:mt-4 flex items-center justify-between">
               <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialization}
               </span>

               <div className="flex items-center gap-[6px]">
                  <img src={startIcon} alt="" /> {averageRating}
               </div>
            </div>

            <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
               <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                  ({totalRating}) Đánh giá
               </h3>

               <div className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none">
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
               </div>
            </div>
         </div>
      </Link>
   );
};

export default DoctorCard;
