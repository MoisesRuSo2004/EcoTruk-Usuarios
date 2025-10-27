import React, { useState } from "react";
// Importamos los componentes de cada sección
import InicioPerfil from "../components/perfil/InicioPerfil";
import InformacionPersonal from "../components/perfil/InformacionPersonal";
import Seguridad from "../components/perfil/Seguridad";
import ProteccionDatos from "../components/perfil/ProteccionDatos";

import { User, Shield, Lock, Mail, Calendar } from "lucide-react";
import Lottie from "lottie-react";
import seguridadAnimacion from "../assets/animation/Pin-code.json"; // tu animación Lottie

const Perfil = () => {
  const [seccion, setSeccion] = useState("inicio");

  const usuario = {
    nombre: "Daniel Jose",
    correo: "daniel@gmail.com",
    rol: "CIUDADANO",
    estado: "ACTIVO",
    fechaRegistro: "2025-09-30",
  };

  const renderContenido = () => {
    switch (seccion) {
      case "inicio":
        return <InicioPerfil usuario={usuario} setSeccion={setSeccion} />;
      case "info":
        return <InformacionPersonal usuario={usuario} />;
      case "seguridad":
        return <Seguridad />;
      case "proteccion":
        return <ProteccionDatos />;
      default:
        return <InicioPerfil usuario={usuario} setSeccion={setSeccion} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans flex flex-col">
      {/* NAVBAR SUPERIOR */}
      <header className="bg-black text-white flex items-center justify-between px-8 py-4 shadow-md">
        <h1 className="text-lg p-0 font-semibold tracking-wide">
          Cuenta EcoTruck
        </h1>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className="w-44 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-1 text-left text-base">
            <button
              onClick={() => setSeccion("inicio")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                seccion === "inicio"
                  ? "text-gray-700 bg-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setSeccion("info")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                seccion === "info"
                  ? "text-gray-700 bg-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Información personal
            </button>
            <button
              onClick={() => setSeccion("seguridad")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                seccion === "seguridad"
                  ? "text-gray-700 bg-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Seguridad
            </button>
            <button
              onClick={() => setSeccion("proteccion")}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                seccion === "proteccion"
                  ? "text-gray-700 bg-gray-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Protección de datos
            </button>
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-0 p-5">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {renderContenido()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Perfil;
