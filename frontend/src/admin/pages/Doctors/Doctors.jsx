import { useCallback, useEffect, useState } from "react";
import {
   HiPlusCircle,
   HiPencilAlt,
   HiTrash,
   HiOutlineSearch,
   HiArrowNarrowUp,
   HiArrowNarrowDown,
} from "react-icons/hi";
import { format } from "date-fns";
import cogoToast from "cogo-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Layout from "../../layout/Layout";
import axios from "../../../config/axiosConfigCommon";
import Popup from "../../../components/Popup";
import AddDoctor from "./AddDoctor";
import UpdateDoctor from "./UpdateDoctor";
import Pagination from "../../../user/components/Pagination/Pagination";
import swal from "sweetalert";

const Doctors = () => {
   const [doctors, setDoctors] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "asc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const getAllDoctor = useCallback(async () => {
      const res = await axios.get(
         `api/doctors?limit=4&page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setDoctors(res.data);
   }, [page, sort.sort, sort.order, search]);

   useEffect(() => {
      getAllDoctor();
   }, [getAllDoctor]);

   const loadListDoctor = async () => {
      await getAllDoctor();
   };

   // Thêm bác sĩ
   const [isPopupOpenAdd, setIsPopupOpenAdd] = useState(false);

   const openPopupAdd = () => {
      setIsPopupOpenAdd(true);
   };

   const closePopupAdd = () => {
      setIsPopupOpenAdd(false);
   };

   // Cập nhật bác sĩ
   const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
   const [idDoctor, setIdDoctor] = useState("");

   const openPopupUpdate = (idDoctor) => {
      setIdDoctor(idDoctor);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   // Xóa bác sĩ
   const handleDeleteDoctor = async (idDoctor) => {
      try {
         const res = await axios.delete(`api/doctors/${idDoctor}`);

         if (res.status === 200) {
            swal({
               title: "Bạn chắc chắn muốn xóa tài khoản này",
               text: "Sau khi xóa, bạn sẽ không thể khôi phục!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
            }).then(async (willDelete) => {
               if (willDelete) {
                  swal("Tài khoản này đã được xóa", {
                     icon: "success",
                  });
                  await loadListDoctor();
               } else {
                  return;
               }
            });
         }
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   // Sắp xếp
   const handleSort = (column) => {
      if (sort.sort === column) {
         const newOrder = sort.order === "asc" ? "desc" : "asc";
         const newSort = { sort: column, order: newOrder };
         setSort(newSort);
      } else {
         const newSort = { sort: column, order: "desc" };
         setSort(newSort);
      }

      setPage(1);
   };

   return (
      <Layout>
         {isPopupOpenAdd && (
            <Popup isOpen={isPopupOpenAdd} onClose={closePopupAdd}>
               <AddDoctor
                  closePopupAdd={closePopupAdd}
                  loadListDoctor={loadListDoctor}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateDoctor
                  idDoctor={idDoctor}
                  closePopupUpdate={closePopupUpdate}
                  loadListDoctor={loadListDoctor}
               />
            </Popup>
         )}

         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">
               Quản lý bác sĩ
            </strong>
            <div className="flex justify-between">
               <div className="relative my-3">
                  <HiOutlineSearch
                     fontSize={20}
                     className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <input
                     type="search"
                     placeholder="Tìm kiếm..."
                     className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[18rem] h-10 pl-11 pr-4 rounded-md"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <Tippy content="Thêm bác sĩ" placement="bottom">
                  <button
                     className="text-green-700 text-2xl mr-[80px]"
                     onClick={openPopupAdd}
                  >
                     <HiPlusCircle />
                  </button>
               </Tippy>
            </div>

            {doctors.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th>Hình ảnh</th>
                              <th>Họ và tên</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("email")}
                              >
                                 Email
                                 {sort.sort === "email" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Chuyên môn</th>
                              <th>Ngày sinh</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("gender")}
                              >
                                 Giới tính
                                 {sort.sort === "gender" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>SĐT</th>
                              <th>Ngày tạo</th>
                              <th>Xử lý</th>
                           </tr>
                        </thead>
                        <tbody>
                           {doctors.data &&
                              doctors.data.map((doctor, index) => (
                                 <tr key={doctor._id}>
                                    <td>
                                       #{index + 1 + (page - 1) * doctors.limit}
                                    </td>
                                    <td>
                                       <img
                                          src={doctor.photo}
                                          alt=""
                                          className="w-16 h-16 rounded-full"
                                       />
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>
                                       {format(
                                          new Date(doctor.dateOfBirth),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>{doctor.gender}</td>
                                    <td>{doctor.phone}</td>
                                    <td>
                                       {format(
                                          new Date(doctor.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>
                                       <div className="flex items-center gap-5">
                                          <Tippy
                                             content="Cập nhật tài khoản"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-blue-700"
                                                onClick={() =>
                                                   openPopupUpdate(doctor._id)
                                                }
                                             >
                                                <HiPencilAlt />
                                             </button>
                                          </Tippy>
                                          <Tippy
                                             content="Xóa tài khoản"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-red-700"
                                                onClick={() =>
                                                   handleDeleteDoctor(
                                                      doctor._id
                                                   )
                                                }
                                             >
                                                <HiTrash />
                                             </button>
                                          </Tippy>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
                  {doctors.total > doctors.limit && (
                     <Pagination
                        page={page}
                        limit={doctors.limit ? doctors.limit : 0}
                        total={doctors.total ? doctors.total : 0}
                        setPage={(page) => setPage(page)}
                     />
                  )}
               </>
            ) : (
               <p className="px-10 py-5">Không có kết quả tìm kiếm</p>
            )}
         </div>
      </Layout>
   );
};

export default Doctors;
