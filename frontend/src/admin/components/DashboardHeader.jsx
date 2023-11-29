import { useEffect, useState } from "react";
import { IoPeople, IoGitNetworkSharp, IoDocumentText } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import axios from "../../config/axiosConfigCommon";

export default function DashboardHeader() {
   const [doctors, setDoctors] = useState([]);
   const [users, setUsers] = useState([]);
   const [bookings, setBookings] = useState([]);
   const [medicines, setMedicines] = useState([]);

   useEffect(() => {
      const getAllDoctor = async () => {
         const res = await axios.get("api/doctors");
         setDoctors(res.data);
      };
      getAllDoctor();
   }, []);

   useEffect(() => {
      const getAllUser = async () => {
         const res = await axios.get("api/users");
         setUsers(res.data);
      };
      getAllUser();
   }, []);

   useEffect(() => {
      const getAllBooking = async () => {
         const res = await axios.get("api/booking");
         setBookings(res.data);
      };
      getAllBooking();
   }, []);

   useEffect(() => {
      const getAllMedicine = async () => {
         const res = await axios.get("api/medicines");
         setMedicines(res.data);
      };
      getAllMedicine();
   }, []);

   return (
      <div className="flex gap-4">
         <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
               <IoGitNetworkSharp className="text-2xl text-white" />
            </div>
            <div className="pl-4">
               <span className="text-sm text-gray-500 font-light">
                  Tổng bác sĩ
               </span>
               <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                     {doctors.total}
                  </strong>
               </div>
            </div>
         </BoxWrapper>
         <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
               <IoPeople className="text-2xl text-white" />
            </div>
            <div className="pl-4">
               <span className="text-sm text-gray-500 font-light">
                  Tổng tài khoản
               </span>
               <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                     {users.total}
                  </strong>
               </div>
            </div>
         </BoxWrapper>
         <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
               <IoDocumentText className="text-2xl text-white" />
            </div>
            <div className="pl-4">
               <span className="text-sm text-gray-500 font-light">
                  Tổng đặt lịch
               </span>
               <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                     {bookings.total}
                  </strong>
               </div>
            </div>
         </BoxWrapper>
         <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
               <GiMedicines className="text-2xl text-white" />
            </div>
            <div className="pl-4">
               <span className="text-sm text-gray-500 font-light">
                  Tổng thuốc
               </span>
               <div className="flex items-center">
                  <strong className="text-xl text-gray-700 font-semibold">
                     {medicines.total}
                  </strong>
               </div>
            </div>
         </BoxWrapper>
      </div>
   );
}

function BoxWrapper({ children }) {
   return (
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
         {children}
      </div>
   );
}
