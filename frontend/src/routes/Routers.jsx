import Home from "../user/pages/Home";
import About from "../user/pages/About";
import Services from "../user/pages/Services";
import Login from "../user/pages/Login";
import Signup from "../user/pages/Signup";
import Contact from "../user/pages/Contact";
import Doctors from "../user/pages/Doctors/Doctors";
import DoctorDetails from "../user/pages/Doctors/DoctorDetails";
import Booking from "../user/pages/Booking/Booking";
import Faq from "../user/pages/Faq";
import UserAccount from "../user/pages/Accounts/UserAccount/UserAccount";
import DoctorAccount from "../user/pages/Accounts/DoctorAccount/DoctorAccount";
import Queue from "../user/pages/Queue";
import Medicine from "../user/pages/Doctors/Medicine";

import Dashboard from "../admin/pages/Dashboard";
import AdminUsers from "../admin/pages/Users/Users";
import AdminDoctors from "../admin/pages/Doctors/Doctors";
import AdminMedicines from "../admin/pages/Medicines/Medicine";
import AdminBooking from "../admin/pages/Booking";
import AdminContact from "../admin/pages/Contact";
import AdminReview from "../admin/pages/Review";
import AdminFaq from "../admin/pages/Faqs/Faqs";

import NotFound from "../user/pages/NotFound";

const publicRoutes = [
   { path: "/", component: Home },
   { path: "/about", component: About },
   { path: "/services", component: Services },
   { path: "/login", component: Login },
   { path: "/register", component: Signup },
   { path: "/contact", component: Contact },
   { path: "/doctors", component: Doctors },
   { path: "/doctors/detail/:_id", component: DoctorDetails },
   { path: "/booking", component: Booking },
   { path: "/faq", component: Faq },
   { path: "/users/profile/me", component: UserAccount },
   { path: "/doctors/profile/me", component: DoctorAccount },

   { path: "/admin", component: Dashboard, layout: null },
   { path: "/admin/users", component: AdminUsers, layout: null },
   { path: "/admin/doctors", component: AdminDoctors, layout: null },
   { path: "/admin/medicines", component: AdminMedicines, layout: null },
   { path: "/admin/booking", component: AdminBooking, layout: null },
   { path: "/admin/contacts", component: AdminContact, layout: null },
   { path: "/admin/reviews", component: AdminReview, layout: null },
   { path: "/admin/faqs", component: AdminFaq, layout: null },
   { path: "/queue", component: Queue, layout: null },
   {
      path: "/medicines/:userId",
      component: Medicine,
      layout: null,
   },

   { path: "*", component: NotFound },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
