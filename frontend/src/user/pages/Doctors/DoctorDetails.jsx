import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../config/axiosConfigCommon";
import startIcon from "../../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import DoctorFeedback from "./Feedback";
import SidePanel from "./SidePanel";

const DoctorDetails = () => {
   const { _id } = useParams();

   const [tab, setTab] = useState("about");
   const [infoDoctor, setInfoDoctor] = useState({});

   const getSingleDoctor = useCallback(async () => {
      const res = await axios.get(`api/doctors/${_id}`);
      setInfoDoctor(res.data.data);
   }, [_id]);

   useEffect(() => {
      getSingleDoctor();
   }, [getSingleDoctor]);

   const loadSingleDoctor = async () => {
      getSingleDoctor();
   };

   return (
      <section>
         <div className="container">
            <div className="max-w-[-1170px] px-5 mx-auto">
               <div className="grid md:grid-cols-3 gap-[50px]">
                  <div className="md:col-span-2">
                     <div className="flex items-center gap-5">
                        <figure className="max-w-[200px] max-h-[200px]">
                           <img
                              src={infoDoctor.photo}
                              alt=""
                              className="w-full"
                           />
                        </figure>

                        <div>
                           <h2 className="text-headingColor text-[22px] leading-9 font-bold mb-3">
                              {infoDoctor.name}
                           </h2>
                           <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                              {infoDoctor.specialization}
                           </span>
                           <div className="flex items-center gap-[6px] mt-3">
                              <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                 <img src={startIcon} alt="" />
                                 {infoDoctor.averageRating}
                              </span>
                              <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                                 ({infoDoctor.totalRating} đánh giá)
                              </span>
                           </div>
                           <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                              {infoDoctor.bio}
                           </p>
                        </div>
                     </div>

                     <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                        <button
                           onClick={() => setTab("about")}
                           className={` ${
                              tab === "about" &&
                              "border-b border-solid border-primaryColor"
                           } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                        >
                           Giới thiệu
                        </button>
                        <button
                           onClick={() => setTab("feedback")}
                           className={` ${
                              tab === "feedback" &&
                              "border-b border-solid border-primaryColor"
                           } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                        >
                           Phản hồi
                        </button>
                     </div>

                     <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                        {tab === "about" && (
                           <DoctorAbout infoDoctor={infoDoctor} />
                        )}
                        {tab === "feedback" && (
                           <DoctorFeedback
                              loadSingleDoctor={loadSingleDoctor}
                           />
                        )}
                     </div>
                  </div>

                  <div>
                     <SidePanel infoDoctor={infoDoctor} />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default DoctorDetails;
