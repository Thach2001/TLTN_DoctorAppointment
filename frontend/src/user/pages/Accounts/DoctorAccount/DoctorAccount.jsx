import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserBooking from "./UserBooking";
import Profile from "./Profile";

const DoctorAccount = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector((state) => state.auth.user);
   const role = useSelector((state) => state.auth.role);

   const [tab, setTab] = useState("bookings");

   const handleLogout = () => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
   };

   return (
      <section>
         <div className="w-[1400px] px-5 mx-auto">
            <div className="grid md:grid-cols-4">
               <div className="px-[40px] py-5 bg-cyan-200 rounded-md">
                  <div className="flex items-center justify-center">
                     <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                        <img
                           src={user.photo}
                           alt=""
                           className="w-full h-full rounded-full"
                        />
                     </figure>
                  </div>

                  <div className="text-center mt-4">
                     <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                        {user.name}
                     </h3>
                     <p className="text-textColor text-[15px] leading-6 font-medium">
                        {user.email}
                     </p>
                     <p className="text-textColor text-[15px] leading-6 font-medium">
                        {user.phone}
                     </p>
                  </div>

                  <div className="mt-[20px] md:mt-[50px]">
                     <button
                        className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                        onClick={handleLogout}
                     >
                        Đăng xuất
                     </button>
                  </div>
               </div>

               <div className="md:col-span-3 md:px-[30px]">
                  <div>
                     <button
                        className={`${
                           tab === "bookings" &&
                           "bg-primaryColor text-white font-normal"
                        } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                        onClick={() => setTab("bookings")}
                     >
                        Đơn đặt lịch
                     </button>

                     <button
                        className={`${
                           tab === "settings" &&
                           "bg-primaryColor text-white font-normal"
                        } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                        onClick={() => setTab("settings")}
                     >
                        Thiết lập hồ sơ
                     </button>

                     {role === "doctor" && (
                        <Link
                           to="/queue"
                           className=" p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor"
                        >
                           Danh sách khám bệnh
                        </Link>
                     )}
                  </div>
                  {tab === "bookings" && <UserBooking />}
                  {tab === "settings" && <Profile />}
               </div>
            </div>
         </div>
      </section>
   );
};

export default DoctorAccount;
