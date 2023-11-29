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

const Review = () => {
   const [reviews, setReviews] = useState([]);
   const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   useEffect(() => {
      const getAllContact = async () => {
         const res = await axios.get(
            `api/reviews/getall?limit=6&page=${page}&sort=${sort.sort},${sort.order}&search=${search}`
         );

         setReviews(res.data);
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
                  placeholder="Tìm kiếm bình luận..."
                  className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[18rem] h-10 pl-11 pr-4 rounded-md"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>

            {reviews.total > 0 ? (
               <>
                  <div className="border-x border-gray-200 rounded-sm mt-3">
                     <table className="w-full text-gray-700">
                        <thead>
                           <tr>
                              <th>STT</th>
                              <th>Tên bệnh nhân</th>
                              <th>Tên bác sĩ</th>
                              <th>Chuyên môn</th>
                              <th
                                 className="flex items-center gap-2"
                                 onClick={() => handleSort("rating")}
                              >
                                 Số sao
                                 {sort.sort === "rating" && (
                                    <span>
                                       {sort.order === "asc" ? (
                                          <HiArrowNarrowUp />
                                       ) : (
                                          <HiArrowNarrowDown />
                                       )}
                                    </span>
                                 )}
                              </th>
                              <th>Bình luận</th>
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
                           {reviews.data &&
                              reviews.data.map((review, index) => (
                                 <tr key={review._id}>
                                    <td>
                                       #{index + 1 + (page - 1) * reviews.limit}
                                    </td>
                                    <td>{review.user.name}</td>
                                    <td>{review.doctor.name}</td>
                                    <td>{review.doctor.specialization}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.reviewText}</td>
                                    <td>
                                       {format(
                                          new Date(review.createdAt),
                                          "dd-MM-yyyy"
                                       )}
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
                  {reviews.total > reviews.limit && (
                     <Pagination
                        page={page}
                        limit={reviews.limit ? reviews.limit : 0}
                        total={reviews.total ? reviews.total : 0}
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

export default Review;
