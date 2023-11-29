import { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import axios from "../../../config/axiosConfigCommon";
import Pagination from "../../components/Pagination/Pagination";
import Specialization from "../../components/Specialization/Specialization";
import Sort from "../../components/Sort/Sort";

const Doctors = () => {
   const [doctors, setDoctors] = useState([]);
   const [sort, setSort] = useState({ sort: "averageRating", order: "desc" });
   const [filterSpecialization, setFilterSpecialization] = useState([]);
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   useEffect(() => {
      const getAllDoctor = async () => {
         const res = await axios.get(
            `api/doctors?limit=8&page=${page}&sort=${sort.sort},${
               sort.order
            }&specialization=${filterSpecialization.toString()}&search=${search}`
         );
         setDoctors(res.data);
      };
      getAllDoctor();
   }, [filterSpecialization, page, search, sort.order, sort.sort]);

   const handleSearch = (e) => {
      setSearch(e.target.value);
      setPage(1);
   };

   return (
      <section className="bg-neutral-100">
         <div className="max-w-[500px] mt-5 mx-auto bg-blue-500 bg-opacity-25 rounded-lg flex items-center justify-center">
            <input
               type="search"
               className="py-3 px-4 bg-transparent w-full focus:outline-none placeholder:text-textColor"
               placeholder="Tìm kiếm theo tên bác sĩ"
               value={search}
               onChange={handleSearch}
            />
            <button className="text-[18px] px-4 py-4 bg-blue-500 text-white rounded-r-lg">
               <HiSearch />
            </button>
         </div>

         {doctors.total > 0 ? (
            <section className="flex justify-center gap-10 my-10 bg-white py-10 px-5 rounded-sm border border-gray-200">
               <div>
                  <Specialization
                     filterSpecialization={filterSpecialization}
                     specializations={
                        doctors.specializations ? doctors.specializations : []
                     }
                     setFilterSpecialization={(specialization) =>
                        setFilterSpecialization(specialization)
                     }
                     setPage={setPage}
                  />
                  <div className="mt-10">
                     <Sort sort={sort} setSort={(sort) => setSort(sort)} />
                  </div>
               </div>

               <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                     {doctors.data &&
                        doctors.data.map((doctor) => (
                           <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                  </div>

                  {doctors.total > doctors.limit && (
                     <Pagination
                        page={page}
                        limit={doctors.limit ? doctors.limit : 0}
                        total={doctors.total ? doctors.total : 0}
                        setPage={(page) => setPage(page)}
                     />
                  )}
               </div>
            </section>
         ) : (
            <p className="my-[100px] text-2xl font-medium text-center">
               Không có kết quả tìm kiếm
            </p>
         )}

         <div className="container">
            <div className="heading text-center xl:w-[470px] mx-auto">
               <h2>Phản hồi của bệnh nhân</h2>
            </div>
            <Testimonial />
         </div>
      </section>
   );
};

export default Doctors;
