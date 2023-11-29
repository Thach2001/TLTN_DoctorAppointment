import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
   AiFillYoutube,
   AiFillGithub,
   AiOutlineInstagram,
} from "react-icons/ai";
import logo from "../../../assets/images/logo.JPG";

const socialLinks = [
   {
      path: "https://www.youtobe.com",
      icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
   },
   {
      path: "https://www.youtobe.com",
      icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
   },
   {
      path: "https://www.youtobe.com",
      icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
   },
   {
      path: "https://www.youtobe.com",
      icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
   },
];

const quickLinks01 = [
   { path: "/", display: "Trang chủ" },
   { path: "/services", display: "Dịch vụ" },
   { path: "/doctors", display: "Bác sĩ" },
   { path: "/faq", display: "Thắc mắc" },
   { path: "/contact", display: "Liên hệ" },
];

const quickLinks02 = [
   { path: "/doctors", display: "Tìm bác sĩ" },
   { path: "/booking", display: "Đặt lịch khám" },
   { path: "/contact", display: "Ý kiến" },
];

const quickLinks03 = [
   { path: "/contact", display: "Đóng góp" },
   { path: "/contact", display: "Liên hệ" },
];

const Footer = () => {
   return (
      <footer className="py-5 bg-teal-100">
         <div className="container">
            <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[20px]">
               <div>
                  <div className="w-[60px] h-[60px]">
                     <img src={logo} alt="" />
                  </div>

                  <div className="flex items-center gap-3 mt-10">
                     {socialLinks.map((link, index) => (
                        <Link
                           to={link.path}
                           key={index}
                           className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                        >
                           {link.icon}
                        </Link>
                     ))}
                  </div>
                  <p className="text-[16px] leading-7 text-textColor mt-4 font-semibold">
                     Võ Văn Thạch B1910449
                  </p>
               </div>

               <div>
                  <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                     Các liên kết
                  </h2>

                  <ul>
                     {quickLinks01.map((item, index) => (
                        <li key={index} className="mb-4">
                           <Link
                              to={item.path}
                              className="text-[16px] leading-7 text-textColor font-semibold hover:text-primaryColor"
                           >
                              {item.display}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                     Bạn muốn:
                  </h2>

                  <ul>
                     {quickLinks02.map((item, index) => (
                        <li key={index} className="mb-4">
                           <Link
                              to={item.path}
                              className="text-[16px] leading-7 text-textColor font-semibold hover:text-primaryColor"
                           >
                              {item.display}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                     Hỗ trợ
                  </h2>

                  <ul>
                     {quickLinks03.map((item, index) => (
                        <li key={index} className="mb-4">
                           <Link
                              to={item.path}
                              className="text-[16px] leading-7 text-textColor font-semibold hover:text-primaryColor"
                           >
                              {item.display}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
