import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/features/auth/authSlice";

const RoleGuard = ({ allowedRoles }) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // 1. Not logged in? Send to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Logged in but wrong role? Send to unauthorized/home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized? Render the child routes
  return <Outlet />;
};

export default RoleGuard;