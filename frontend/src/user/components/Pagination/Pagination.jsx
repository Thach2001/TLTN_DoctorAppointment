import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const Pagination = ({ page, total, limit, setPage }) => {
   const totalPages = Math.ceil(total / limit);

   const onClick = (newPage) => {
      setPage(newPage);
   };

   return (
      <div className="mt-10 flex items-center justify-center space-x-2">
         <button
            className={`${
               page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100"
            } rounded-full w-8 h-8 flex items-center justify-center border border-solid border-primaryColor`}
            onClick={() => onClick(page - 1)}
            disabled={page === 1}
         >
            <HiChevronDoubleLeft />
         </button>
         {Array.from({ length: totalPages }, (_, index) => (
            <button
               className={`${
                  page === index + 1
                     ? "bg-primaryColor text-white font-normal"
                     : "bg-gray-100"
               } rounded-full font-medium text-lg w-8 h-8 flex items-center justify-center border border-solid border-primaryColor`}
               key={index}
               onClick={() => onClick(index + 1)}
            >
               {index + 1}
            </button>
         ))}
         <button
            className={`${
               page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-100"
            } rounded-full w-8 h-8 flex items-center justify-center border border-solid border-primaryColor`}
            onClick={() => onClick(page + 1)}
            disabled={page === totalPages}
         >
            <HiChevronDoubleRight />
         </button>
      </div>
   );
};

export default Pagination;
