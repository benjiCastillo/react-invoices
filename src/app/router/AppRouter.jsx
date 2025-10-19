import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Importar las rutas modulares
import { authRoutes } from "../../features/auth/routes";
import { userRoutes } from "../../features/users/routes";
import { ordersRoutes } from "../../features/orders/routes";
import { useAuthStore } from "../../app/store/UseAuthStore";

export default function AppRouter() {
  const access_token = useAuthStore((state) => state.access_token);
  const isAuth = !!access_token;
  console.log(isAuth);
  return (
    <Routes>
      <Route element={<PublicRoute isAuth={isAuth} />}>
        <Route element={<AuthLayout />}>
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>

      <Route element={<ProtectedRoute isAuth={isAuth} />}>
        <Route element={<DashboardLayout />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {ordersRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
    
  );
}
