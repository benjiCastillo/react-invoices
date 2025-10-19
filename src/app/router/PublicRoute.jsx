// src/app/router/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute({ isAuth }) {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
