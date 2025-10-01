import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol")?.toUpperCase();

  //console.log("Token guardado:", token);
  //console.log("Rol guardado:", rol);

  if (!token || rol !== "ROLE_CIUDADANO") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
