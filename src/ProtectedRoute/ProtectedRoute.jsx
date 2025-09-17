// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = !!sessionStorage.getItem("token"); // adjust as needed
    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
