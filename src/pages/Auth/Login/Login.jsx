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
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        correo: email,
        password,
      });

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
    <div className="h-screen w-full flex bg-white font-inter overflow-hidden">

      {/* Imagen izquierda */}
      <div className="hidden lg:flex w-1/2 bg-[#E6FFF2] justify-center items-center px-4">
        <img
          src="/img/register.png"
          alt="Decoración EcoTruck"
          className="w-[62%] max-w-[380px] object-contain drop-shadow-md"
        />
      </div>

      {/* Formulario derecha (más pequeño aún) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-4">
        <div className="w-full max-w-[350px] sm:max-w-[320px] bg-white rounded-lg p-5 border border-gray-200 shadow-[0_6px_18px_rgba(0,0,0,0.05)] flex flex-col items-center">

          {/* Logo más pequeño */}
          <img
            src="/logos/LogoEcoTruck.svg"
            alt="EcoTruck"
            className="w-20 sm:w-24 mb-3"
          />

          {/* Mensaje animado más compacto */}
          <p className="text-center text-[#256F54] text-[12px] sm:text-[13.5px] font-medium leading-tight mb-4 min-h-[32px] max-w-[230px]">
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

          {/* Separador */}
          <div className="flex items-center gap-2 my-3 w-full">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-gray-500 text-[11px] font-medium">o</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* OAuth Buttons */}
          <LoginOAuthButtons />

          {/* Política */}
          <p className="text-[9.5px] text-gray-500 mt-3 text-center leading-tight">
            Al continuar, aceptas nuestras políticas y términos de uso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
