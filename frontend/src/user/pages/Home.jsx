import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

import heroImg from "../../assets/images/hero-img.jpg";

import icon01 from "../../assets/images/icon01.png";
import icon03 from "../../assets/images/icon03.png";
import featureImg from "../../assets/images/doctor-img.jpg";
import ServiceList from "../components/Services/ServiceList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
   return (
      <>
         <section className="hero__section pt-[60px] 2xl:h-[800px]">
            <div className="container">
               <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                  <div>
                     <div className="lg:w-[570px]">
                        <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[50px] md:leading-[70px]">
                           Chúng tôi mong muốn bệnh nhân sống khỏe mạnh và sống
                           lâu hơn.
                        </h1>
                        <p className="text__para">
                           Sức khỏe là một phần quan trọng của cuộc sống <br />
                           Nếu bạn gặp bất kỳ vấn đề nào về sức khỏe
                        </p>
                        <Link to="/booking">
                           <button className="btn">Đặt lịch ngay</button>
                        </Link>
                     </div>

                     <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                        <div>
                           <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                              15+
                           </h2>
                           <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                           <p className="text_para">Năm kinh nghiệm</p>
                        </div>
                        <div>
                           <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                              10+
                           </h2>
                           <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                           <p className="text_para">Bác sĩ</p>
                        </div>
                        <div>
                           <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                              20+
                           </h2>
                           <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                           <p className="text_para">
                              Sự hài lòng của bệnh nhân
                           </p>
                        </div>
                     </div>
                  </div>

                  <div>
                     <img src={heroImg} alt="" className="w-full" />
                  </div>
               </div>
            </div>
         </section>

         <section>
            <div className="container">
               <div className="lg:w-[470px] mx-auto">
                  <h2 className="heading text-center">
                     Cung cấp dịch vụ y tế tốt nhất
                  </h2>
                  <p className="text__para text-center">
                     Hệ thống y tế cung cấp dịch vụ chăm sóc sức khỏe chuyên
                     nghiệp, chưa từng có.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                  <div className="py-[30px] px-5">
                     <div className="flex items-center justify-center">
                        <img src={icon01} alt="" />
                     </div>

                     <div className="mt-[30px]">
                        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                           Tìm kiếm bác sĩ
                        </h2>
                        <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                           Tìm kiếm, lọc và sắp xếp bác sĩ.
                        </p>

                        <Link
                           to="/doctors"
                           className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                        >
                           <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                     </div>
                  </div>
                  <div className="py-[30px] px-5">
                     <div className="flex items-center justify-center">
                        <img src={icon03} alt="" />
                     </div>

                     <div className="mt-[30px]">
                        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                           Đặt lịch khám bệnh
                        </h2>
                        <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                           Nhanh chóng, tiện lợi, không tốn thời gian của khách
                           hàng.
                        </p>

                        <Link
                           to="/doctors"
                           className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                        >
                           <BsArrowRight className="group-hover:text-white w-6 h-5" />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section>
            <div className="container">
               <div className="xl:w-[550px] mx-auto">
                  <h2 className="heading text-center">
                     Dịch vụ y tế của chúng tôi
                  </h2>
               </div>

               <ServiceList />
            </div>
         </section>

         <section>
            <div className="container">
               <div className="flex items-center justify-between flex-col lg:flex-row">
                  <div className="xl:w-[670px]">
                     <h2 className="heading">Nhận điều trị bất cứ lúc nào.</h2>

                     <ul className="pl-4">
                        <li className="text__para">
                           1. Lên lịch hẹn trực tiếp.
                        </li>
                        <li className="text__para">2. Tìm kiếm bác sĩ.</li>
                        <li className="text__para">
                           3. Đặt lịch khám với thời gian phù hợp của bạn
                        </li>
                     </ul>
                     <Link to="/doctors">
                        <button className="btn">Xem thêm</button>
                     </Link>
                  </div>

                  <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
                     <img src={featureImg} alt="" className="w-3/4" />
                     <div className="w-[150px] lg:w-[200px] bg-gray-100 absolute bottom-[50px] left-0 md:bottom-[100px] md:left-12 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[20px] rounded-[10px]">
                        <div className="w-[60px] lg:w-[80px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-2 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                           Giám đốc
                        </div>
                        <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] mt-3 font-[700] text-headingColor">
                           Ngô Mộng Hùng
                        </h4>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <section>
            <div className="container">
               <h2 className=" heading xl:w-[470px] mx-auto text-center">
                  Phản hồi của bệnh nhân
               </h2>
               <Testimonial />
            </div>
         </section>
      </>
   );
};

export default Home;
