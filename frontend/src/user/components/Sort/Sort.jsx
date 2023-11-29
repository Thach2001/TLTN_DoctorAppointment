import { HiOutlineSwitchVertical } from "react-icons/hi";

const Sort = ({ sort, setSort }) => {
   const onSelectChange = ({ currentTarget: input }) => {
      setSort({ sort: input.value, order: sort.order });
   };

   const onArrowChange = () => {
      if (sort.order === "asc") {
         setSort({ sort: sort.sort, order: "desc" });
      } else {
         setSort({ sort: sort.sort, order: "asc" });
      }
   };

   return (
      <div>
         <h1 className="font-medium text-lg">Sắp xếp:</h1>
         <div className="flex items-center gap-2">
            <select
               className="font-normal text-sm"
               onChange={onSelectChange}
               defaultValue={sort.sort}
            >
               <option value="totalRating">Số sao</option>
            </select>
            <button className="text-lg" onClick={onArrowChange}>
               <HiOutlineSwitchVertical />
            </button>
         </div>
      </div>
   );
};

export default Sort;
