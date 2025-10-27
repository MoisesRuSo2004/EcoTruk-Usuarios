import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginHeader from "../../../components/login/LoginHeader.jsx"; // ajusta la ruta si es necesario

export default function RegistroEcoTruck() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const esCorreoValido = correo.includes("@") && correo.length >= 6;
  const esPasswordValido = password.length >= 6;
  const formularioValido =
    nombre &&
    esCorreoValido &&
    esPasswordValido &&
    password === confirmar &&
    aceptado;

  const registrarUsuario = async () => {
    setError("");

    if (!formularioValido) {
      setError("Completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/registrar",
        {
          nombre,
          correo,
          password,
          rol: "ROLE_CIUDADANO",
          estado: "ACTIVO",
          fechaRegistro: new Date().toISOString().split("T")[0],
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      const raw = err.response?.data;
      if (typeof raw === "string" && raw.includes("correo")) {
        setError("Este correo ya está registrado.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#2E8B00] to-[#2E8B00] px-0 py-0 font-inter">
      {/* Navbar */}
      <LoginHeader />

      {/* Encabezado */}
      <div className="text-center mb-8 mt-5">
        <h1 className="text-white text-1xl font-bold">
          Hola, futuro ciudadano EcoTruck
        </h1>
        <p className="text-white text-lg mt-2">
          Regístrate para comenzar tu recorrido limpio
        </p>
      </div>

      {/* Formulario */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Crear cuenta
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre completo"
          className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-[#2ecc71] transition"
        />

        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo electrónico"
          className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-[#2ecc71] transition"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-[#2ecc71] transition"
        />

        <input
          type="password"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Confirmar contraseña"
          className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 mb-4 text-sm outline-none focus:ring-2 focus:ring-[#2ecc71] transition"
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={aceptado}
            onChange={(e) => setAceptado(e.target.checked)}
            className="mr-2 accent-green-600 w-5 h-5"
          />
          <label className="text-sm text-gray-600">
            Acepto los{" "}
            <a href="#" className="text-[#2ecc71] hover:underline font-medium">
              términos y condiciones
            </a>
          </label>
        </div>

        <button
          onClick={registrarUsuario}
          disabled={!formularioValido}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
            formularioValido
              ? "bg-[#2ecc71] text-white hover:bg-[#27ae60] shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Registrarme
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#2ecc71] hover:underline font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}
