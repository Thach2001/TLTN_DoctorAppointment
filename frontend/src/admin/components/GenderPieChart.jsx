import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import axios from "../../config/axiosConfigCommon";

export default function GenderPieChart() {
   const [users, setUsers] = useState([]);
   const [genderCount, setGenderCount] = useState({ nam: 0, nữ: 0 });

   const getAllUser = async () => {
      const res = await axios.get("api/users");
      setUsers(res.data.data);
   };

   useEffect(() => {
      getAllUser();
   }, []);

   useEffect(() => {
      const updatedGenderCount = { nam: 0, nữ: 0 };
      users.forEach((user) => {
         const gender = user.gender.toLowerCase();
         if (gender === "nam") {
            updatedGenderCount.nam += 1;
         } else if (gender === "nữ") {
            updatedGenderCount.nữ += 1;
         }
      });
      setGenderCount(updatedGenderCount);
   }, [users]);

   // Thư viện biểu đồ
   const data = [
      { name: "Nam", value: genderCount.nam },
      { name: "Nữ", value: genderCount.nữ },
   ];

   const RADIAN = Math.PI / 180;
   const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
   }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      );
   };

   return (
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
         <strong className="text-gray-700 font-medium">Hồ sơ khách hàng</strong>
         <div className="mt-3 w-full flex-1 text-xs">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart width={400} height={300}>
                  <Pie
                     data={data}
                     cx="50%"
                     cy="45%"
                     labelLine={false}
                     label={renderCustomizedLabel}
                     outerRadius={105}
                     fill="#8884d8"
                     dataKey="value"
                  >
                     {data.map((_, index) => (
                        <Cell
                           key={`cell-${index}`}
                           fill={COLORS[index % COLORS.length]}
                        />
                     ))}
                  </Pie>
                  <Legend />
               </PieChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
}
