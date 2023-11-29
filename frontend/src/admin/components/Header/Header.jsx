import { Menu } from "@headlessui/react";
import { HiOutlineSearch } from "react-icons/hi";

export default function Header() {
   const user = JSON.parse(localStorage.getItem("user"));

   return (
      <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
         <div className="relative">
            <HiOutlineSearch
               fontSize={20}
               className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
               type="text"
               placeholder="Tìm kiếm..."
               className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
            />
         </div>
         <div className="flex items-center gap-2 mr-5">
            <p>{user.name}</p>
            <Menu as="div" className="relative">
               <Menu.Button className="ml-2 bg-blue-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <img
                     src={user.photo}
                     alt={user.name}
                     className="w-10 h-10 rounded-full"
                  />
               </Menu.Button>
            </Menu>
         </div>
      </div>
   );
}
