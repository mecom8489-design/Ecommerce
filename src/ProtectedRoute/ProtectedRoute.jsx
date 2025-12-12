// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = !!localStorage.getItem("token"); 
    console.log("i am the one");// adjust as needed
    return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
