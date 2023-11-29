import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import axios from "../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [formData, setFormData] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);

   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmitLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await axios.post("api/auth/login", formData);

         if (res.status === 200) {
            setLoading(false);

            localStorage.setItem("user", JSON.stringify(res.data.data));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            dispatch({
               type: "LOGIN_SUCCESS",
               payload: res.data,
            });

            cogoToast.success(
               `Chúc mừng ${res.data.data.name} đã đăng nhập thành công`,
               {
                  position: "top-right",
               }
            );

            if (res.data.role === "admin") {
               navigate("/admin");
            } else if (res.data.role === "doctor") {
               navigate("/doctors/profile/me");
            } else {
               navigate("/");
            }
         }
      } catch (e) {
         setLoading(false);
         cogoToast.error("Tên tài khoản hoặc mật khẩu không trùng khớp", {
            position: "top-right",
         });
      }
   };

   return (
      <section>
         <div className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
               <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                  Xin chào!{" "}
                  <span className="text-primaryColor">Chào mừng </span> trở lại
               </h3>

               <form className="px-5 lg:px-0" onSubmit={handleSubmitLogin}>
                  <div className="mb-5">
                     <input
                        type="email"
                        placeholder="Email của bạn"
                        name="email"
                        required
                        value={formData.email}
                        className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                        onChange={handleInputChange}
                     />
                  </div>

                  <div className="mb-5">
                     <input
                        type="password"
                        placeholder="Mật khẩu của bạn"
                        name="password"
                        required
                        value={formData.password}
                        className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                        onChange={handleInputChange}
                     />
                  </div>

                  <div className="mt-7">
                     <button
                        disabled={loading && true}
                        type="submit"
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                     >
                        {loading ? (
                           <HashLoader size={35} color="#ffffff" />
                        ) : (
                           "Đăng nhập"
                        )}
                     </button>
                  </div>

                  <p className="mt-5 text-textColor text-center">
                     Bạn chưa có tài khoản?
                     <Link
                        to="/register"
                        className="text-primaryColor font-medium ml-1"
                     >
                        Đăng ký
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </section>
   );
};

export default Login;
