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
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import Pagination from "../../../user/components/Pagination/Pagination";

const Users = () => {
   const [users, setUsers] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const getAllUser = useCallback(async () => {
      const res = await axios.get(
         `api/users?limit=4&page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
      );
      setUsers(res.data);
   }, [page, sort.sort, sort.order, search]);

   useEffect(() => {
      getAllUser();
   }, [getAllUser]);

   const loadListUser = async () => {
      await getAllUser();
   };

   // Thêm tài khoản
   const [isPopupOpenAdd, setIsPopupOpenAdd] = useState(false);

   const openPopupAdd = () => {
      setIsPopupOpenAdd(true);
   };

   const closePopupAdd = () => {
      setIsPopupOpenAdd(false);
   };

   // Cập nhật tài khoản
   const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
   const [idUser, setIdUser] = useState("");

   const openPopupUpdate = (idUser) => {
      setIdUser(idUser);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   // Xóa tài khoản
   const handleDeleteUser = async (idUser) => {
      try {
         const res = await axios.delete(`api/users/${idUser}`);

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
                  await loadListUser();
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
               <AddUser
                  closePopupAdd={closePopupAdd}
                  loadListUser={loadListUser}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateUser
                  idUser={idUser}
                  closePopupUpdate={closePopupUpdate}
                  loadListUser={loadListUser}
               />
            </Popup>
         )}

         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">
               Quản lý tài khoản
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
               <Tippy content="Thêm tài khoản" placement="bottom">
                  <button
                     className="text-green-700 text-2xl mr-[80px]"
                     onClick={openPopupAdd}
                  >
                     <HiPlusCircle />
                  </button>
               </Tippy>
            </div>

            {users.total > 0 ? (
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
                           {users.data &&
                              users.data.map((user, index) => (
                                 <tr key={user._id}>
                                    <td>
                                       #{index + 1 + (page - 1) * users.limit}
                                    </td>
                                    <td>
                                       <img
                                          src={user.photo}
                                          alt=""
                                          className="w-16 h-16 rounded-full"
                                       />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                       {format(
                                          new Date(user.dateOfBirth),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                       {format(
                                          new Date(user.createdAt),
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
                                                   openPopupUpdate(user._id)
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
                                                   handleDeleteUser(user._id)
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
                  {users.total > users.limit && (
                     <Pagination
                        page={page}
                        limit={users.limit ? users.limit : 0}
                        total={users.total ? users.total : 0}
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

export default Users;
