import { Outlet, Link, useNavigate } from "react-router-dom";
import MenuDashboard from "../shared/dasboard/MenuDashboard";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <MenuDashboard />
      <main className="h-[calc(100dvh-51px)]">
        <Outlet /> {/* Aquí se renderizan los features */}
      </main>
    </div>
  );
}
