import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import logo from "../../../assets/images/logo.JPG";

import {
   HiOutlineViewGrid,
   HiOutlineUsers,
   HiOutlineDocumentText,
   HiOutlineAnnotation,
   HiOutlineLogout,
   HiOutlineUserGroup,
   HiOutlinePhone,
   HiChevronRight,
   HiChevronLeft,
} from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

const sidebarLinks = [
   {
      label: "Dashboard",
      path: "/admin",
      icon: <HiOutlineViewGrid />,
   },
   {
      label: "Quản lý tài khoản",
      path: "/admin/users",
      icon: <HiOutlineUsers />,
   },
   {
      label: "Quản lý bác sĩ",
      path: "/admin/doctors",
      icon: <HiOutlineUserGroup />,
   },
   {
      label: "Quản lý thuốc",
      path: "/admin/medicines",
      icon: <GiMedicines />,
   },
   {
      label: "Đặt lịch",
      path: "/admin/booking",
      icon: <HiOutlineDocumentText />,
   },
   {
      label: "Liên hệ",
      path: "/admin/contacts",
      icon: <HiOutlinePhone />,
   },
   {
      label: "Thắc mắc",
      path: "/admin/faqs",
      icon: <HiOutlineAnnotation />,
   },
   {
      label: "Bình luận và Đánh giá",
      path: "/admin/reviews",
      icon: <FaRegCommentDots />,
   },
];

const linkClass =
   "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

function SidebarLink({ link, isOpen }) {
   const { pathname } = useLocation();

   return (
      <Link
         to={link.path}
         className={classNames(
            pathname === link.path
               ? "bg-neutral-700 text-white font-medium"
               : "text-neutral-400 font-medium",
            linkClass
         )}
      >
         <span className="text-xl">{link.icon}</span>
         <p className={`${isOpen ? "block" : "hidden"}`}>{link.label}</p>
      </Link>
   );
}

export default function Sidebar() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isOpen, setIsOpen] = useState(true);

   const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
   };

   return (
      <div
         className={`bg-neutral-900 p-3 flex flex-col relative ${
            isOpen ? "min-w-[250px]" : "w-16"
         }`}
      >
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-16 right-0 p-2 text-neutral-300 hover:text-white focus:outline-none"
         >
            {isOpen ? (
               <HiChevronRight size={35} />
            ) : (
               <HiChevronLeft size={35} />
            )}
         </button>
         <Link to="/" className="flex items-center gap-2 px-1 py-3">
            <div className="w-[40px] h-[40px]">
               <img src={logo} alt="" />
            </div>
            <span
               className={`text-neutral-200 text-lg font-medium uppercase ${
                  isOpen ? "block" : "hidden"
               }`}
            >
               Medical
            </span>
         </Link>
         <div className="py-8 flex flex-1 flex-col gap-0.5">
            {sidebarLinks.map((link, index) => (
               <SidebarLink key={index} link={link} isOpen={isOpen} />
            ))}
         </div>
         <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
            <div
               className={classNames(
                  linkClass,
                  "cursor-pointer text-red-500 font-medium"
               )}
               onClick={handleLogout}
            >
               <span className="text-xl">
                  <HiOutlineLogout />
               </span>
               <p className={`${isOpen ? "block" : "hidden"}`}>Đăng xuất</p>
            </div>
         </div>
      </div>
   );
}
