import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ProtectedRoute from "../src/components/Protected/ProtectedRoute";
import Perfil from "./pages/Perfil";
import Configuracion from "./pages/Configuracion";

// 👉 Importa react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* Sistema de rutas */}
      <Routes>
        {/* Redirección raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Route>
      </Routes>

      {/* Contenedor global de notificaciones */}
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}

export default App;
