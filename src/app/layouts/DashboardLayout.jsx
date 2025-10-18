import { Outlet, Link, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Mi App</h2>
        <nav>
          <Link to="/users">Usuarios</Link>
          <Link to="/products">Productos</Link>
        </nav>
        <button onClick={logout}>Cerrar sesión</button>
      </aside>

      <main className="main-container">
        <Outlet /> {/* Aquí se renderizan los features */}
      </main>
    </div>
  );
}
