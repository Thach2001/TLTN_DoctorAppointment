import { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "../../config/axiosConfigCommon";

const Invoice = ({ userId }) => {
   const [invoices, setInvoices] = useState([]);

   useEffect(() => {
      const getSingleInvoice = async () => {
         const res = await axios.get(`api/invoices/${userId}`);
         setInvoices(res.data.data);
      };
      getSingleInvoice();
   }, [userId]);

   return (
      <div>
         {invoices.length > 0 ? (
            <>
               <h1 className="text-2xl font-bold py-3 text-center text-gray-50 bg-primaryColor rounded-md">
                  Hóa đơn
               </h1>

               {invoices.map((invoice) => (
                  <div
                     className="w-[1024px] p-4 bg-white rounded shadow-md"
                     key={invoice._id}
                  >
                     <div className="text-[16px]">
                        <div className="flex justify-between mb-3">
                           <h2>
                              Chuẩn đoán:{" "}
                              <span className="font-semibold">
                                 {invoice.diagnosis}
                              </span>
                           </h2>
                           <h2>
                              Ngày tái khám:{" "}
                              <span className="font-semibold">
                                 {format(
                                    new Date(invoice.nextAppointmentDate),
                                    "dd-MM-yyyy"
                                 )}
                              </span>
                           </h2>
                        </div>
                        <h2>
                           Hóa đơn:{" "}
                           <span className="font-semibold text-red-500">
                              {invoice.totalAmount
                                 .toString()
                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                           </span>{" "}
                           VNĐ
                        </h2>
                     </div>

                     <table className="w-full border-x border-gray-200 rounded-sm mt-3 shadow-md">
                        <thead>
                           <tr className="bg-blue-200">
                              <th>STT</th>
                              <th>Tên thuốc</th>
                              <th>Giá (VNĐ)</th>
                              <th>Số lượng</th>
                              <th>Cách dùng</th>
                           </tr>
                        </thead>
                        <tbody>
                           {invoice.medicines &&
                              invoice.medicines.map((item, index) => (
                                 <tr
                                    className="mb-5 bg-white hover:bg-blue-100"
                                    key={item._id}
                                 >
                                    <td>#{index + 1}</td>
                                    <td>
                                       {item.medicine.name}{" "}
                                       {item.medicine.dosage}
                                    </td>
                                    <td>
                                       {item.medicine.price
                                          .toString()
                                          .replace(
                                             /\B(?=(\d{3})+(?!\d))/g,
                                             ","
                                          )}
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.usage}</td>
                                 </tr>
                              ))}
                        </tbody>
                     </table>
                  </div>
               ))}
            </>
         ) : (
            <p className="p-5 text-lg text-red-500">Chưa có hóa đơn</p>
         )}
      </div>
   );
};

export default Invoice;
