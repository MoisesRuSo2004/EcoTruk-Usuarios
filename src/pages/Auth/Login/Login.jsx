import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mensajes = [
    "Inicia sesión para continuar con EcoTruck, Tu ciudad te necesita. Entra y súmate al movimiento",
    "Tu cuenta EcoTruck Gestiona, mejora y transforma: accede ahora espera",
    "Únete al cambio ¡Hagamos una Cartagena más limpia juntos!",
    "Conecta y movamos la EcoTruck no se detiene. Tú tampoco. limpia",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://ecotruck-dkfvh6e5brhqc6h5.brazilsouth-01.azurewebsites.net/api/auth/login",
        {
          correo: email,
          password,
        }
      );

      const { token, rol } = response.data || {};
      if (!token || !rol) {
        setError("Respuesta inválida del servidor.");
        return;
      }

      const normalizedRol = rol.toUpperCase().trim();
      localStorage.setItem("token", token);
      localStorage.setItem("rol", normalizedRol);

      if (normalizedRol === "CIUDADANO") navigate("/home");
      else setError("Acceso denegado.");
    } catch {
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F6F9] font-inter">
      {/* Imagen izquierda (solo desktop) */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-white border-r border-gray-200 p-6">
        <img
          src="/img/register.png"
          alt="EcoTruck"
          className="w-[60%] max-w-[420px] object-contain drop-shadow-lg"
        />
      </div>

      {/* Sección derecha */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10">
        <div className="w-full max-w-[400px] bg-white p-8 shadow-md rounded-2xl border border-gray-100">
          {/* Logo */}
          <img
            src="/logos/LogoEcoTruck.svg"
            alt="EcoTruck"
            className="w-32 mx-auto mb-6"
          />

          {/* Mensaje dinámico */}
          <p className="text-center text-gray-600 text-sm font-medium mb-4 min-h-[32px] transition-all duration-700 ease-in-out">
            {mensajes[index]}
          </p>

          /* Form */
          <form onSubmit={handleLogin}>
            <label className="block text-sm text-gray-600 mb-1 text-left">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="correo@ejemplo.com"
            />

            <label className="block text-sm text-gray-600 mb-1 text-left">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-medium"
            >
              Iniciar sesión
            </button>
          </form>
          <p className="text-[10px] text-gray-500 mt-4 text-center leading-tight">
            Al continuar, aceptas nuestras políticas y términos de uso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
