import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import logo from "../../../assets/images/logo.JPG";

const navLinks = [
   {
      path: "/",
      display: "Trang chủ",
   },
   {
      path: "/about",
      display: "Giới thiệu",
   },
   {
      path: "/services",
      display: "Dịch vụ",
   },
   {
      path: "/doctors",
      display: "Bác sĩ",
   },
   {
      path: "/booking",
      display: "Đặt lịch",
   },
   {
      path: "/faq",
      display: "Thắc mắc",
   },
   {
      path: "/contact",
      display: "Liên hệ",
   },
];

const Header = () => {
   const headerRef = useRef(null);
   const menuRef = useRef(null);

   const { user, token, role } = useSelector((state) => state.auth);

   const handleStickyHeader = () => {
      window.addEventListener("scroll", () => {
         if (
            headerRef.current &&
            (document.body.scrollTop > 80 ||
               document.documentElement.scrollTop > 80)
         ) {
            headerRef.current.classList.add("sticky__header");
         } else if (headerRef.current) {
            headerRef.current.classList.remove("sticky__header");
         }
      });
   };

   useEffect(() => {
      handleStickyHeader();
      return () => {
         window.removeEventListener("scroll", handleStickyHeader);
      };
   }, []);

   const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

   return (
      <header className="header flex items-center" ref={headerRef}>
         <div className="container">
            <div className="flex items-center justify-between">
               <div className="w-[60px] h-[60px]">
                  <img src={logo} alt="" />
               </div>

               <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                  <ul className="menu flex items-center gap-[2.7rem]">
                     {navLinks.map((link, index) => (
                        <li key={index}>
                           <NavLink
                              to={link.path}
                              className={(navClass) =>
                                 navClass.isActive
                                    ? "text-slate-100 text-[19px] leading-7 font-medium px-[10px] py-1 bg-primaryColor rounded-2xl"
                                    : "text-textColor text-[19px] leading-7 font-medium hover:text-primaryColor"
                              }
                           >
                              {link.display}
                           </NavLink>
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="flex items-center gap-4">
                  {token && user ? (
                     <div>
                        <Link
                           to={`${
                              role === "doctor"
                                 ? "/doctors/profile/me"
                                 : "/users/profile/me"
                           }`}
                        >
                           <figure className="w-[45px] h-[45px] rounded-full border-2 border-solid border-primaryColor cursor-pointer">
                              <img
                                 src={user?.photo}
                                 alt=""
                                 className="w-full rounded-full"
                              />
                           </figure>
                        </Link>
                     </div>
                  ) : (
                     <Link to="/login">
                        <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                           Đăng nhập
                        </button>
                     </Link>
                  )}

                  <span className="md:hidden" onClick={toggleMenu}>
                     <BiMenu className="w-6 h-6 cursor-pointer" />
                  </span>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
