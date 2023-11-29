import React from "react";

function Popup({ isOpen, onClose, children }) {
   if (!isOpen) {
      return null;
   }

   const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
         <div
            className="absolute inset-0 bg-gray-800 opacity-50"
            onClick={handleOverlayClick}
         ></div>
         <div className="z-50 bg-white p-6 rounded-lg shadow-md">
            {children}
         </div>
      </div>
   );
}

export default Popup;
