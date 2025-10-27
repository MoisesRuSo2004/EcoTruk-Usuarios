import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../../components/login/LoginHeader.jsx";
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
    "¿Listo para continuar?",
    "Ingresa para empezar tu recorrido",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 4000);
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

      if (normalizedRol === "CIUDADANO") {
        navigate("/home");
      } else {
        setError("Acceso denegado: esta aplicación es solo para ciudadanos.");
      }
    } catch (err) {
      console.error("Error de inicio de sesión:", err);
      setError("Credenciales inválidas o error de conexión.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      <LoginHeader />
      <div className="flex flex-col flex-grow items-center justify-center px-6 text-center">
        <LoginMessage mensajes={mensajes} index={index} />
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
        {/* 🔹 Separador visual */}
        <div className="flex items-center gap-2 my-2 w-full max-w-sm mx-auto">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="text-gray-500 text-sm font-medium">o</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        <LoginOAuthButtons />
        <p className="text-xs text-gray-500 mt-8 text-center max-w-xs">
          Al continuar, aceptas recibir llamadas, incluso a través del marcador
          automático, WhatsApp o SMS, de la app de EcoTruck y de sus empresas
          afiliadas.
        </p>
      </div>
    </div>
  );
};

export default Login;
