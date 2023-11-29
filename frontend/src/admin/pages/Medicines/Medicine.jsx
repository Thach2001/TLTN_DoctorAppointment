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
import swal from "sweetalert";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Layout from "../../layout/Layout";
import axios from "../../../config/axiosConfigCommon";
import Popup from "../../../components/Popup";
import AddMedicine from "./AddMedicine";
import UpdateMedicine from "./UpdateMedicine";
import Pagination from "../../../user/components/Pagination/Pagination";

const Medicine = () => {
   const [medicines, setMedicines] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");
   console.log(medicines);

   const getAllMedicine = useCallback(async () => {
      const res = await axios.get(
         `api/medicines?limit=8&page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setMedicines(res.data);
   }, [page, sort.sort, sort.order, search]);

   useEffect(() => {
      getAllMedicine();
   }, [getAllMedicine]);

   const loadListMedicine = async () => {
      await getAllMedicine();
   };

   // Thêm thuốc
   const [isPopupOpenAdd, setIsPopupOpenAdd] = useState(false);

   const openPopupAdd = () => {
      setIsPopupOpenAdd(true);
   };

   const closePopupAdd = () => {
      setIsPopupOpenAdd(false);
   };

   // Cập nhật thuốc
   const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
   const [idMedicine, setIdMedicine] = useState("");

   const openPopupUpdate = (idMedicine) => {
      setIdMedicine(idMedicine);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   // Xóa thuốc
   const handleDeleteMedicine = async (idMedicine) => {
      try {
         const res = await axios.delete(`api/medicines/${idMedicine}`);

         if (res.status === 200) {
            swal({
               title: "Bạn chắc chắn muốn xóa thuốc này",
               text: "Sau khi xóa, bạn sẽ không thể khôi phục!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
            }).then(async (willDelete) => {
               if (willDelete) {
                  swal("Thuốc đã được xóa", {
                     icon: "success",
                  });
                  await loadListMedicine();
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
               <AddMedicine
                  closePopupAdd={closePopupAdd}
                  loadListMedicine={loadListMedicine}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateMedicine
                  idMedicine={idMedicine}
                  closePopupUpdate={closePopupUpdate}
                  loadListMedicine={loadListMedicine}
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

            {medicines.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("name")}
                              >
                                 Tên
                                 {sort.sort === "name" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Trọng lượng</th>
                              <th>Giá</th>
                              <th>Nhà sản xuất</th>
                              <th>Ngày tạo</th>
                              <th>Xử lý</th>
                           </tr>
                        </thead>
                        <tbody>
                           {medicines.medicines &&
                              medicines.medicines.map((medicine, index) => (
                                 <tr key={medicine._id}>
                                    <td>
                                       #
                                       {index +
                                          1 +
                                          (page - 1) * medicines.limit}
                                    </td>
                                    <td>{medicine.name}</td>
                                    <td>{medicine.dosage}</td>
                                    <td>{medicine.price}</td>
                                    <td>{medicine.manufacturer}</td>
                                    <td>
                                       {format(
                                          new Date(medicine.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>
                                       <div className="flex items-center gap-5">
                                          <Tippy
                                             content="Cập nhật thuốc"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-blue-700"
                                                onClick={() =>
                                                   openPopupUpdate(medicine._id)
                                                }
                                             >
                                                <HiPencilAlt />
                                             </button>
                                          </Tippy>
                                          <Tippy
                                             content="Xóa thuốc"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-red-700"
                                                onClick={() =>
                                                   handleDeleteMedicine(
                                                      medicine._id
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
                  {medicines.total > medicines.limit && (
                     <Pagination
                        page={page}
                        limit={medicines.limit ? medicines.limit : 0}
                        total={medicines.total ? medicines.total : 0}
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

export default Medicine;
