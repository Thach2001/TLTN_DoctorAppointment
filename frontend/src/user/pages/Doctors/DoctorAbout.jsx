const DoctorAbout = ({ infoDoctor }) => {
   return (
      <div>
         <div>
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
               Giới thiệu về
               <span className="text-irisBlueColor font-bold text-[24px] leading-9">
                  {infoDoctor.name}
               </span>
            </h3>

            <ul className="list-disc">
               {infoDoctor &&
                  infoDoctor.about &&
                  infoDoctor.about.map((item, index) => (
                     <li className="text__para ml-5" key={index}>
                        {item.title}
                     </li>
                  ))}
            </ul>
         </div>

         <div className="mt-12">
            <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
               Học vấn
            </h3>
            <ul className="mt-12">
               {infoDoctor &&
                  infoDoctor.qualifications &&
                  infoDoctor.qualifications.map((item, index) => (
                     <li
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
                        key={index}
                     >
                        <div>
                           <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                              {item.date}
                           </span>
                        </div>
                        <p className="text-[16px] leading-6 font-medium text-textColor">
                           {item.title}
                        </p>
                     </li>
                  ))}
            </ul>
         </div>

         <div className="mt-12">
            <h3 className="text-[20px] leading-6 text-headingColor font-semibold">
               Kinh nghiệm
            </h3>
            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
               {infoDoctor &&
                  infoDoctor.experiences &&
                  infoDoctor.experiences.map((item, index) => (
                     <li className="p-4 rounded bg-[#fff9ea]" key={index}>
                        <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                           {item.date}
                        </span>
                        <p className="text-[14px] leading-5 font-medium text-textColor">
                           {item.title}
                        </p>
                     </li>
                  ))}
            </ul>
         </div>
      </div>
   );
};

export default DoctorAbout;
