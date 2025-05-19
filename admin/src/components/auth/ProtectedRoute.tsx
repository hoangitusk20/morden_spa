import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../redux/features/authSlice";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, render the child routes
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
