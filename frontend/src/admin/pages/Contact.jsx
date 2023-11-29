import { useEffect, useState } from "react";
import { format } from "date-fns";
import "tippy.js/dist/tippy.css";
import axios from "../../config/axiosConfigCommon";
import Layout from "../layout/Layout";
import {
   HiArrowNarrowDown,
   HiArrowNarrowUp,
   HiOutlineSearch,
} from "react-icons/hi";
import Pagination from "../../user/components/Pagination/Pagination";

const Contact = () => {
   const [contacts, setContacts] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   useEffect(() => {
      const getAllContact = async () => {
         const res = await axios.get(
            `api/contacts?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
         );

         setContacts(res.data);
      };

      getAllContact();
   }, [page, search, sort.order, sort.sort]);

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
         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Liên hệ</strong>
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

            {contacts.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
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
                              <th>Chủ đề</th>
                              <th>Lời nhắn</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("createdAt")}
                              >
                                 Ngày tạo
                                 {sort.sort === "createdAt" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {contacts.data &&
                              contacts.data.map((contact, index) => (
                                 <tr key={contact._id}>
                                    <td>
                                       #
                                       {index + 1 + (page - 1) * contacts.limit}
                                    </td>
                                    <td>{contact.email}</td>
                                    <td>{contact.topic}</td>
                                    <td>{contact.message}</td>
                                    <td>
                                       {format(
                                          new Date(contact.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
                  {contacts.total > contacts.limit && (
                     <Pagination
                        page={page}
                        limit={contacts.limit ? contacts.limit : 0}
                        total={contacts.total ? contacts.total : 0}
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

export default Contact;
