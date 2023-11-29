import { useState } from "react";
import Popup from "../../../components/Popup";
import BookingForm from "../Booking/BookingForm";

const SidePanel = ({ infoDoctor }) => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const openPopup = () => {
      setIsPopupOpen(true);
   };

   const closePopup = () => {
      setIsPopupOpen(false);
   };

   return (
      <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
         <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">Giá</p>
            <span className="text-[16px] text-red-500 leading-7 lg:text-[22px] lg:leading-8 font-bold">
               {infoDoctor.ticketPrice &&
                  infoDoctor.ticketPrice
                     .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
               VNĐ
            </span>
         </div>

         <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
               Thời gian
            </p>

            <div className="mt-3 flex justify-between flex-wrap">
               {infoDoctor &&
                  infoDoctor.timeSlots &&
                  infoDoctor.timeSlots.map((item, index) => (
                     <p
                        className="text-[15px] leading-6 font-semibold border border-solid bg-orange-200 px-2 py-1 mb-3"
                        key={index}
                     >
                        {item.time}
                     </p>
                  ))}
            </div>
         </div>

         <div>
            <button className="btn px-2 w-full rounded-md" onClick={openPopup}>
               Đặt lịch hẹn
            </button>

            <Popup isOpen={isPopupOpen} onClose={closePopup}>
               <BookingForm infoDoctor={infoDoctor} />
            </Popup>
         </div>
      </div>
   );
};

export default SidePanel;
