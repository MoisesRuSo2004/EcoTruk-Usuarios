import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Enviando login con:", { correo: email, password });

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          correo: email,
          password,
        }
      );

      const { token, rol } = response.data || {};
      console.log("Respuesta del backend:", response.data);

      if (!token || !rol) {
        console.warn("Token o rol inválido:", response.data);
        setError("Respuesta inválida del servidor.");
        return;
      }

      const normalizedRol = rol.toUpperCase().trim();
      console.log("Rol recibido:", normalizedRol);

      localStorage.setItem("token", token);
      localStorage.setItem("rol", normalizedRol);

      if (normalizedRol === "CIUDADANO") {
        console.log("Redirigiendo a /home");
        navigate("/home");
      } else {
        console.warn("Rol no autorizado:", normalizedRol);
        setError("Acceso denegado: esta aplicación es solo para ciudadanos.");
      }
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3BBE7A] to-[#153307] flex flex-col items-center font-inter px-6 relative">
      {/* Encabezado */}
      <div className="text-center mt-10 mb-2">
        <h2 className="text-white text-3xl font-extrabold">Hello.</h2>
        <h2 className="text-white text-3xl font-extrabold">
          Create Your Account
        </h2>
      </div>

      {/* Imagen */}
      <div className="flex justify-center mb-6">
        <img src="/img/register.png" alt="Leaves" className="w-40 h-40" />
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 z-40 -mb-2"
      >
        <h2 className="text-2xl text-gray-800 text-center mb-2">Bienvenido!</h2>

        <div className="mb-4">
          <input
            type="email"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none text-sm text-gray-800 placeholder-gray-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none text-sm text-gray-800 placeholder-gray-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
            className="mr-2 accent-green-600"
          />
          <label className="text-sm text-gray-600">Recordarme</label>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-600 transition"
        >
          Iniciar Sesión
        </button>

        <div className="flex justify-center gap-6 mt-6">
          <button className="p-3 bg-white rounded-full shadow hover:shadow-md transition">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="p-3 bg-white rounded-full shadow hover:shadow-md transition">
            <FaTwitter className="text-sky-500" />
          </button>
        </div>
      </form>

      {/* Enlace para registrarse */}
      <div className="mt-6 text-center">
        <p className="text-sm text-white">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-300 hover:underline font-medium"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
