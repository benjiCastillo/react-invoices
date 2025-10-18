import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1  items-center justify-center bg-gray-100">
        <Outlet /> {/* Renderiza las páginas del login/registro */}
      </main>
    </div>
  );
}
