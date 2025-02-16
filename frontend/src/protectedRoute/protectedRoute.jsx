import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";
import { useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getCurrentUser();
        if (res.status !== 200) navigate("/login", { replace: true });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
  }, [navigate]);

  return element;
};

export default ProtectedRoute;
