import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Outlet /> {/* Renderiza las páginas del login/registro */}
    </main>
  );
}
