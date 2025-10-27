import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import ProtectedRoute from "../src/components/Protected/ProtectedRoute";
import Perfil from "./pages/Perfil";

function App() {
  return (
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
        {/* Agrega más rutas protegidas aquí si las necesitas */}
      </Route>
    </Routes>
  );
}

export default App;
