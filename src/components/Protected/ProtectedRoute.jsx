import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  console.log("Token guardado:", token);
  console.log("Rol guardado:", rol);

  // Solo permite acceso si hay token y el rol es CIUDADANO
  if (!token || rol !== "ROLE_CIUDADANO") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
