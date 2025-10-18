import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

// Importar las rutas modulares
import { authRoutes } from "../../features/auth/routes";
import { userRoutes } from "../../features/users/routes";

export default function AppRouter() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Layout del login */}
      <Route element={<AuthLayout />}>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      {/* Layout principal (protegido) */}
      <Route element={<ProtectedRoute isAuth={isAuth} />}>
        <Route element={<DashboardLayout />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/users" replace />}  />
    </Routes>
  );
}
