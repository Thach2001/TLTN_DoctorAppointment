import { Fragment, useEffect } from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   useLocation,
} from "react-router-dom";
import { publicRoutes } from "./routes/Routers";
import UserLayout from "./user/layout/Layout";
import GoToTopButton from "./components/GoToTopButton";

function ScrollToTop() {
   const { pathname } = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return null;
}

function App() {
   return (
      <Router>
         <ScrollToTop />
         <Routes>
            {publicRoutes.map((route, index) => {
               const Page = route.component;
               let Layout = UserLayout;

               if (route.layout) {
                  Layout = route.layout;
               } else if (route.layout === null) {
                  Layout = Fragment;
               }

               return (
                  <Route
                     key={index}
                     path={route.path}
                     element={
                        <Layout>
                           <Page />
                           <GoToTopButton />
                        </Layout>
                     }
                  />
               );
            })}
         </Routes>
      </Router>
   );
}

export default App;
