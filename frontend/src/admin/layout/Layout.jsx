import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
   return (
      <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
         <Sidebar />
         <div className="flex flex-col flex-1">
            <Header />
            <div className="flex-1 p-4 min-h-0 overflow-auto">{children}</div>
         </div>
      </div>
   );
};

export default Layout;
