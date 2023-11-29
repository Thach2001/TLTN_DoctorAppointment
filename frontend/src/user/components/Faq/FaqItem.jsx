import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ faq }) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleAccordion = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div
         className={`${
            isOpen ? "border-primaryColor" : "border-[#D9DCE2]"
         } p-2 lg:p-3 rounded-[12px] border border-solid mb-4 cursor-pointer`}
      >
         <div
            className="flex items-center justify-between gap-5"
            onClick={toggleAccordion}
         >
            <h4
               className={`${
                  isOpen ? "text-primaryColor" : "text-headingColor"
               } text-[12px] leading-7 lg:text-[18px] lg:leading-8`}
            >
               {faq.question}
            </h4>
            <div
               className={`${
                  isOpen && "bg-primaryColor text-white border-none"
               } w-7 h-7 lg:w-8 lg:h-8 border border-solid border-[#141F21] rounded flex items-center justify-center`}
            >
               {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
            </div>
         </div>

         {isOpen && (
            <div className="mt-4">
               <p className="text-[10px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                  {faq.answer}
               </p>
            </div>
         )}
      </div>
   );
};

export default FaqItem;
