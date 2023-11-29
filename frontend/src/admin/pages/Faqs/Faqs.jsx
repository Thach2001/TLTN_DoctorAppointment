import { useCallback, useEffect, useState } from "react";
import {
   HiPlusCircle,
   HiPencilAlt,
   HiTrash,
   HiOutlineSearch,
} from "react-icons/hi";
import { format } from "date-fns";
import cogoToast from "cogo-toast";
import swal from "sweetalert";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Layout from "../../layout/Layout";
import axios from "../../../config/axiosConfigCommon";
import Popup from "../../../components/Popup";
import AddFaq from "./AddFaq";
import UpdateFaq from "./UpdateFaq";
import Pagination from "../../../user/components/Pagination/Pagination";

const Faqs = () => {
   const [faqs, setFaqs] = useState([]);
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   const getAllFaq = useCallback(async () => {
      const res = await axios.get(
         `api/faqs?limit=4&page=${page}&search=${search}`
      );
      setFaqs(res.data);
   }, [page, search]);

   useEffect(() => {
      getAllFaq();
   }, [getAllFaq]);

   const loadListFaq = async () => {
      await getAllFaq();
   };

   // Thêm câu hỏi
   const [isPopupOpenAdd, setIsPopupOpenAdd] = useState(false);

   const openPopupAdd = () => {
      setIsPopupOpenAdd(true);
   };

   const closePopupAdd = () => {
      setIsPopupOpenAdd(false);
   };

   // Cập nhật câu hỏi
   const [isPopupOpenUpdate, setIsPopupOpenUpdate] = useState(false);
   const [faqId, setFaqId] = useState("");

   const openPopupUpdate = (faqId) => {
      setFaqId(faqId);
      setIsPopupOpenUpdate(true);
   };

   const closePopupUpdate = () => {
      setIsPopupOpenUpdate(false);
   };

   // Xóa câu hỏi
   const handleDeleteUser = async (faqId) => {
      try {
         const res = await axios.delete(`api/faqs/${faqId}`);

         if (res.status === 200) {
            swal({
               title: "Bạn chắc chắn muốn xóa thắc mắc này",
               text: "Sau khi xóa, bạn sẽ không thể khôi phục!",
               icon: "warning",
               buttons: true,
               dangerMode: true,
            }).then(async (willDelete) => {
               if (willDelete) {
                  swal("Thắc mắc đã được xóa", {
                     icon: "success",
                  });
                  await loadListFaq();
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

   return (
      <Layout>
         {isPopupOpenAdd && (
            <Popup isOpen={isPopupOpenAdd} onClose={closePopupAdd}>
               <AddFaq
                  closePopupAdd={closePopupAdd}
                  loadListFaq={loadListFaq}
               />
            </Popup>
         )}

         {isPopupOpenUpdate && (
            <Popup isOpen={isPopupOpenUpdate} onClose={closePopupUpdate}>
               <UpdateFaq
                  faqId={faqId}
                  closePopupUpdate={closePopupUpdate}
                  loadListFaq={loadListFaq}
               />
            </Popup>
         )}

         <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">
               Quản lý thắc mắc
            </strong>
            <div className="flex justify-between">
               <div className="relative my-3">
                  <HiOutlineSearch
                     fontSize={20}
                     className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
                  />
                  <input
                     type="search"
                     placeholder="Tìm kiếm câu hỏi..."
                     className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[18rem] h-10 pl-11 pr-4 rounded-md"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <Tippy content="Thêm thắc mắc" placement="bottom">
                  <button
                     className="text-green-700 text-2xl mr-[80px]"
                     onClick={openPopupAdd}
                  >
                     <HiPlusCircle />
                  </button>
               </Tippy>
            </div>

            {faqs.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th>Câu hỏi</th>
                              <th>Trả lời</th>
                              <th className="w-[10%]">Ngày tạo</th>
                              <th>Xử lý</th>
                           </tr>
                        </thead>
                        <tbody>
                           {faqs.data &&
                              faqs.data.map((faq, index) => (
                                 <tr key={faq._id}>
                                    <td>
                                       #{index + 1 + (page - 1) * faqs.limit}
                                    </td>

                                    <td>{faq.question}</td>
                                    <td>{faq.answer}</td>

                                    <td>
                                       {format(
                                          new Date(faq.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                    <td>
                                       <div className="flex items-center gap-5">
                                          <Tippy
                                             content="Cập nhật thắc mắc"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-blue-700"
                                                onClick={() =>
                                                   openPopupUpdate(faq._id)
                                                }
                                             >
                                                <HiPencilAlt />
                                             </button>
                                          </Tippy>
                                          <Tippy
                                             content="Xóa thắc mắc"
                                             placement="bottom"
                                          >
                                             <button
                                                className="text-xl text-red-700"
                                                onClick={() =>
                                                   handleDeleteUser(faq._id)
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
                  {faqs.total > faqs.limit && (
                     <Pagination
                        page={page}
                        limit={faqs.limit ? faqs.limit : 0}
                        total={faqs.total ? faqs.total : 0}
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

export default Faqs;
