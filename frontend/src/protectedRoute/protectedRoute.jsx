import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const user = localStorage.getItem("userData"); // 🔹 Check if user is logged in

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
