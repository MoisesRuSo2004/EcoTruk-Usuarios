import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol")?.toUpperCase().trim();

  console.log("Verificando acceso protegido...");
  console.log("Token:", token);
  console.log("Rol:", rol);

  if (!token) {
    console.warn("Acceso denegado: token no encontrado");
    return <Navigate to="/login" replace />;
  }

  if (rol !== "CIUDADANO") {
    console.warn("Acceso denegado: rol no autorizado");
    return <Navigate to="/login" replace />;
  }

  console.log("Acceso permitido: rol y token válidos");
  return <Outlet />;
}
