import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
   HiPlusCircle,
   HiTrash,
   HiViewList,
   HiOutlineSearch,
} from "react-icons/hi";
import axios from "../../../config/axiosConfigCommon";
import cogoToast from "cogo-toast";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { format } from "date-fns";
import Pagination from "../../components/Pagination/Pagination";

const Medicine = () => {
   const navigate = useNavigate();
   const { userId } = useParams();

   const [patient, setPatient] = useState([]);
   const [medicines, setMedicines] = useState([]);
   const [invoices, setInvoices] = useState([]);
   const [nextAppointmentDate, setNextAppointmentDate] = useState("");
   const [diagnosis, setDiagnosis] = useState("");
   const [totalAmount, setTotalAmount] = useState(0);
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");

   useEffect(() => {
      const total = invoices.reduce((total, invoice) => {
         return total + invoice.price * invoice.quantity;
      }, 0);

      setTotalAmount(total);
   }, [invoices]);

   useEffect(() => {
      const getSingleUser = async () => {
         const res = await axios.get(`api/users/${userId}`);
         setPatient(res.data.data);
      };
      getSingleUser();
   }, [userId]);

   useEffect(() => {
      const getAllMedicine = async () => {
         const res = await axios.get(
            `api/medicines?limit=5&page=${page}&search=${search}`
         );
         setMedicines(res.data);
      };
      getAllMedicine();
   }, [page, search]);

   const handleAddMedicineToInvoice = (medicine) => {
      const existingInvoice = invoices.find(
         (invoice) => invoice._id === medicine._id
      );

      if (existingInvoice) {
         const updatedInvoices = invoices.map((invoice) => {
            if (invoice._id === existingInvoice._id) {
               return { ...invoice, quantity: invoice.quantity + 1 };
            }
            return invoice;
         });
         setInvoices(updatedInvoices);
      } else {
         setInvoices([...invoices, { ...medicine, quantity: 1 }]);
      }
   };

   const updateQuantity = (index, newQuantity) => {
      const updatedInvoices = [...invoices];

      updatedInvoices[index].quantity = newQuantity;

      setInvoices(updatedInvoices);
   };

   const updateUsage = (index, newUsage) => {
      const updatedInvoices = [...invoices];

      updatedInvoices[index].usage = newUsage;

      setInvoices(updatedInvoices);
   };

   const handleSaveInvoice = async () => {
      const formData = {
         user: userId,
         medicines: invoices.map((medicine) => ({
            medicine: medicine._id,
            quantity: parseInt(medicine.quantity, 10),
            usage: medicine.usage,
         })),
         totalAmount: totalAmount,
         diagnosis: diagnosis,
         nextAppointmentDate: nextAppointmentDate,
      };

      try {
         const res = await axios.post("api/invoices/create", formData);

         if (res.status === 200) {
            cogoToast.success("Lưu hóa đơn thành công", {
               position: "top-right",
            });
         }

         setInvoices([]);
         setDiagnosis("");
         setNextAppointmentDate("");
         setTotalAmount("");

         navigate("/queue");
      } catch (error) {
         cogoToast.error("Đã xảy ra lỗi. Vui lòng thử lại sau", {
            position: "top-right",
         });
      }
   };

   // Xóa thuốc cho bệnh nhân
   const handleRemoveInvoice = (index) => {
      const updatedInvoices = [...invoices];
      updatedInvoices.splice(index, 1); // Xóa phần tử tại vị trí index

      setInvoices(updatedInvoices);
   };

   return (
      <div className="p-10 bg-gray-100">
         <div className="flex gap-10">
            <Link to={"/queue"}>
               <button
                  className="flex items-center text-green-700 font-semibold
            text-[16px] p-3 border border-dotted border-blue-700 rounded-md"
               >
                  <HiViewList />
                  <h1 className="ml-1 uppercase">Danh sách bệnh nhân</h1>
               </button>
            </Link>

            <div className="w-[70%] border border-solid rounded-md px-10 py-3 bg-cyan-100">
               <h2 className="uppercase text-lg font-semibold text-blue-700 text-center mb-3">
                  Thông tin bệnh nhân
               </h2>
               <div>
                  <div className="flex justify-between">
                     <div>
                        <div className="mb-3">
                           Họ và tên:{" "}
                           <span className="font-medium">{patient.name}</span>
                        </div>

                        <div>
                           Chuẩn đoán:
                           <input
                              type="search"
                              className="ml-3 px-2 rounded-sm focus:outline-none focus:border-gray-400"
                              onChange={(e) => setDiagnosis(e.target.value)}
                           />
                        </div>
                     </div>
                     <div>
                        <div className="mb-3">
                           Ngày sinh:{" "}
                           <span className="font-medium">
                              {patient.dateOfBirth
                                 ? format(
                                      new Date(patient.dateOfBirth),
                                      "dd/MM/yyyy"
                                   )
                                 : "-"}
                           </span>
                        </div>
                        <div>
                           Tái khám:
                           <input
                              type="date"
                              className="ml-3 rounded-sm focus:outline-none focus:border-gray-400"
                              onChange={(e) =>
                                 setNextAppointmentDate(e.target.value)
                              }
                           />
                        </div>
                     </div>
                     <div>
                        Giới tính:{" "}
                        <span className="font-medium">{patient.gender}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex justify-between gap-5 mt-10">
            <div className="border border-solid border-blue-300 bg-cyan-200 rounded-sm p-2 w-[40%]">
               <div className="flex justify-between items-center mb-3 gap-5">
                  <h2 className="uppercase text-lg font-semibold text-blue-700">
                     Danh sách thuốc
                  </h2>
                  <div className="flex items-center">
                     <div className="relative my-3">
                        <HiOutlineSearch
                           fontSize={20}
                           className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
                        />
                        <input
                           type="search"
                           placeholder="Tìm kiếm..."
                           className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[15rem] h-10 pl-11 pr-4 rounded-md"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>
                  </div>
               </div>

               {medicines.total > 0 ? (
                  <>
                     <table className="w-full border-x border-gray-200 rounded-sm mt-3 shadow-md">
                        <thead>
                           <tr className="bg-blue-200">
                              <th>STT</th>
                              <th>Tên thuốc</th>
                              <th>Giá (VNĐ)</th>
                              <th>Thao tác</th>
                           </tr>
                        </thead>
                        <tbody>
                           {medicines.medicines &&
                              medicines.medicines.map((medicine, index) => (
                                 <tr
                                    className="mb-5 bg-white hover:bg-blue-100"
                                    key={medicine._id}
                                 >
                                    <td>
                                       #
                                       {index +
                                          1 +
                                          (page - 1) * medicines.limit}
                                    </td>
                                    <td>
                                       {medicine.name} {medicine.dosage}
                                    </td>
                                    <td>
                                       {medicine.price
                                          .toString()
                                          .replace(
                                             /\B(?=(\d{3})+(?!\d))/g,
                                             ","
                                          )}
                                    </td>
                                    <td>
                                       <Tippy
                                          content="Thêm thuốc"
                                          placement="bottom"
                                       >
                                          <button
                                             className="text-green-700 text-2xl"
                                             onClick={() =>
                                                handleAddMedicineToInvoice(
                                                   medicine
                                                )
                                             }
                                          >
                                             <HiPlusCircle />
                                          </button>
                                       </Tippy>
                                    </td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
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
                  <p className="px-10 py-5 font-medium">
                     Không có kết quả tìm kiếm
                  </p>
               )}
            </div>

            <div className="border border-solid border-blue-300 bg-cyan-200 rounded-sm p-5 w-[60%]">
               <h2 className="uppercase text-lg font-semibold text-blue-700 text-center">
                  Thuốc cho bệnh nhân
               </h2>

               <table className="w-full border-x border-gray-200 rounded-sm mt-3 shadow-md">
                  <thead>
                     <tr className="bg-blue-200">
                        <th>STT</th>
                        <th>Tên thuốc</th>
                        <th>Giá (VNĐ)</th>
                        <th>Số lượng</th>
                        <th>Cách dùng</th>
                        <th>Thao tác</th>
                     </tr>
                  </thead>
                  <tbody>
                     {invoices.map((invoice, index) => (
                        <tr
                           className="mb-5 bg-white hover:bg-blue-100"
                           key={invoice._id}
                        >
                           <td>#{index + 1}</td>
                           <td>
                              {invoice.name} {invoice.dosage}
                           </td>
                           <td>
                              {invoice.price
                                 .toString()
                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                           </td>
                           <td>
                              <input
                                 type="number"
                                 value={invoice.quantity}
                                 onChange={(e) =>
                                    updateQuantity(index, e.target.value)
                                 }
                                 className="w-20 px-1 py-1 text-center border border-gray-400 rounded-sm"
                              />
                           </td>
                           <td>
                              <input
                                 type="text"
                                 value={invoice.usage}
                                 onChange={(e) =>
                                    updateUsage(index, e.target.value)
                                 }
                                 className="w-50 px-1 py-1 text-center border border-gray-400 rounded-sm"
                              />
                           </td>
                           <td>
                              <Tippy content="Xóa thuốc" placement="bottom">
                                 <button
                                    className="text-red-700 text-2xl"
                                    onClick={() => handleRemoveInvoice(index)}
                                 >
                                    <HiTrash />
                                 </button>
                              </Tippy>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <p className="text-end mt-5 text-[18px] font-medium">
            Thành tiền:
            <span className="text-red-500 px-1">
               {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
            VNĐ
         </p>

         <div className="text-end mt-5 font-medium">
            <button
               className="bg-blue-700 text-white px-4 py-2 rounded-md"
               onClick={handleSaveInvoice}
            >
               Lưu hóa đơn
            </button>
         </div>
      </div>
   );
};

export default Medicine;
