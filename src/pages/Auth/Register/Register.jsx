import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegistroEcoTruck() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aceptado, setAceptado] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const esTelefonoValido = /^3\d{9}$/.test(telefono);
  const esCorreoValido = correo.includes("@") && correo.length >= 6;
  const esPasswordValido = password.length >= 6;

  const formularioValido =
    nombre &&
    esCorreoValido &&
    esPasswordValido &&
    password === confirmar &&
    esTelefonoValido &&
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
          telefono,
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
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4 font-inter">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">
          Crear cuenta
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Regístrate para continuar
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            placeholder="Confirmar contraseña"
            className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Número de teléfono (ej: 3001234567)"
            className="w-full bg-gray-100 text-gray-800 rounded-xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black transition"
          />

          {telefono && !esTelefonoValido && (
            <p className="text-red-500 text-xs">
              El número debe empezar por 3 y tener 10 dígitos.
            </p>
          )}
        </div>

        {/* Check */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            checked={aceptado}
            onChange={(e) => setAceptado(e.target.checked)}
            className="mr-2 w-5 h-5 accent-black"
          />
          <label className="text-sm text-gray-600">
            Acepto los{" "}
            <a href="#" className="text-black underline">
              términos y condiciones
            </a>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={registrarUsuario}
          disabled={!formularioValido}
          className={`w-full py-3 rounded-xl font-medium text-sm mt-6 transition-all duration-300 ${
            formularioValido
              ? "bg-black text-white hover:bg-gray-900 shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Registrarme
        </button>

        {/* Login redirect */}
        <p className="text-sm text-gray-600 text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-black font-medium underline"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
