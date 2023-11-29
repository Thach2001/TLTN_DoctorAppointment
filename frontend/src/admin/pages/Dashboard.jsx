import DashboardHeader from "../components/DashboardHeader";
import TransactionChart from "../components/TransactionChart";
import RecentOrders from "../components/RecentOrders";
import GenderPieChart from "../components/GenderPieChart";
import Layout from "../layout/Layout";

export default function Dashboard() {
   return (
      <Layout>
         <div className="flex flex-col gap-4">
            <DashboardHeader />
            <div className="flex flex-row gap-4 w-full">
               <TransactionChart />
               <GenderPieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
               <RecentOrders />
            </div>
         </div>
      </Layout>
   );
}
