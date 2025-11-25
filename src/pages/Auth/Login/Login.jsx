import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mensajes = [
    "Transformando rutas en ciudades más limpias",
    "Tu gestión inteligente comienza aquí",
    "Tecnología que impulsa el cambio real",
    "Conectando vehículos, mejorando tu ciudad",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % mensajes.length),
      3500
    );
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://ecotruck-dkfvh6e5brhqc6h5.brazilsouth-01.azurewebsites.net/api/auth/login",
        { correo: email, password }
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F4F6F9] font-poppins">
      
      {/* Imagen izquierda */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-white border-r border-gray-200 p-6">
        <img
          src="/img/register.png"
          alt="EcoTruck"
          className="w-[60%] max-w-[420px] object-contain drop-shadow-md"
        />
      </div>

      {/* Formulario */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10">
        <motion.div
          whileHover={{ translateY: -2, boxShadow: "0 12px 25px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
        >
          {/* Logo */}
          <img
            src="/logos/LogoEcoTruck.svg"
            alt="EcoTruck"
            className="w-36 mx-auto mb-6"
          />

          {/* Mensaje dinámico con animación */}
          <div className="h-[32px] mb-4 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="text-center text-gray-600 text-sm font-medium"
              >
                {mensajes[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <label className="block text-sm text-gray-600 mb-1 text-left">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
              placeholder="correo@ejemplo.com"
            />


            {/* Password */}
            <label className="block text-sm text-gray-600 mb-1 text-left">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
               className="w-full p-3 border rounded-lg mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
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

            {/* Error */}
            {error && (
              <p className="text-red-500 text-xs mb-3 text-center">{error}</p>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-medium"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Enlace a registro */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>

          <p className="text-[10px] text-gray-500 mt-4 text-center leading-tight">
            Al continuar, aceptas nuestras políticas y términos de uso.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
