import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginMessage from "../../../components/login/LoginMessage";
import LoginForm from "../../../components/login/LoginForm";
import LoginOAuthButtons from "../../../components/login/LoginOAuthButtons";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mensajes = [
    "Inicia sesión para continuar con EcoTruck",
    "Tu cuenta EcoTruck te espera",
    "Únete al cambio ecológico",
    "Conecta con tu cuenta y sigamos moviendo la ciudad limpia",
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
        "http://localhost:8080/api/auth/login",
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
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F8FA] font-inter">
      {/* Imagen izquierda (solo en desktop) */}
      <div className="hidden lg:flex w-1/2 justify-center items-center bg-white border-r border-gray-200">
        <img
          src="/img/register.png"
          alt="EcoTruck login visual"
          className="w-[65%] max-w-[420px] object-contain drop-shadow-lg"
        />
      </div>

      {/* Sección del formulario - ocupa toda la pantalla en móvil */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-10">
        <div className="w-full max-w-[400px] flex flex-col">
          {/* Logo */}
          <img
            src="/logos/LogoEcoTruck.svg"
            alt="EcoTruck"
            className="w-24 mx-auto mb-6"
          />

          {/* Mensaje animado */}
          <p className="text-center text-gray-600 text-sm font-medium mb-4 min-h-[32px]">
            <LoginMessage mensajes={mensajes} index={index} />
          </p>

          {/* Formulario */}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleLogin={handleLogin}
            error={error}
          />

          {/* Línea separadora */}
          <div className="flex items-center gap-2 my-5">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-gray-500 text-xs">o</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* OAuth Buttons */}
          <LoginOAuthButtons />

          {/* Footer */}
          <p className="text-[10px] text-gray-500 mt-4 text-center leading-tight">
            Al continuar, aceptas nuestras políticas y términos de uso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
