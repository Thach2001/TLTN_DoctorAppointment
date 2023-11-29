import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function GoToTopButton() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (window.pageYOffset > 800) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      });
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return (
      <div>
         {isVisible && (
            <button
               onClick={scrollToTop}
               className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-full shadow-md cursor-pointer"
            >
               <FaArrowUp />
            </button>
         )}
      </div>
   );
}

export default GoToTopButton;
