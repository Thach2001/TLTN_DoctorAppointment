import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
   const token = localStorage.getItem("Token");
   const role = localStorage.getItem("Role");

   const isAllowed = allowedRoles.includes(role);

   const accessibleRoute =
      token && isAllowed ? children : <Navigate to="/login" replace={true} />;

   return accessibleRoute;
};

export default ProtectedRoute;
