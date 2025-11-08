import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InicioPerfil from "../components/perfil/InicioPerfil";
import InformacionPersonal from "../components/perfil/InformacionPersonal";
import Seguridad from "../components/perfil/Seguridad";
import ProteccionDatos from "../components/perfil/ProteccionDatos";
import { getPerfilUsuario } from "../service/usuarioService";

const Perfil = () => {
  const [seccion, setSeccion] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfilUsuario();
        setUsuario(data);
      } catch (err) {
        console.error("❌ Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    cargarPerfil();
  }, []);

  const renderContenido = () => {
    if (!usuario)
      return <p className="text-gray-500">No se pudo cargar el perfil.</p>;

    switch (seccion) {
      case "inicio":
        return <InicioPerfil usuario={usuario} setSeccion={setSeccion} />;
      case "info":
        return <InformacionPersonal usuario={usuario} />;
      case "seguridad":
        return <Seguridad usuario={usuario} />;
      case "proteccion":
        return <ProteccionDatos usuario={usuario} />;
      default:
        return <InicioPerfil usuario={usuario} setSeccion={setSeccion} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans flex flex-col">

      {/* HEADER */}
      <header className="bg-black text-white flex items-center justify-center px-6 py-4 shadow-md relative">

        {/* Botón Mobile/Modern */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 
                     flex items-center justify-center w-11 h-11
                     bg-white text-black rounded-full shadow-md
                     hover:bg-gray-100 hover:scale-105 active:scale-95 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-lg font-semibold tracking-wide">Cuenta EcoTruck</h1>

        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 
                     px-3 py-1.5 bg-white text-black rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside
          className={`${menuOpen ? "block" : "hidden"} md:block w-60 bg-white border-r border-gray-200 p-6`}
        >
          <nav className="space-y-2">
            {[
              { key: "inicio", label: "Inicio" },
              { key: "info", label: "Información personal" },
              { key: "seguridad", label: "Seguridad" },
              { key: "proteccion", label: "Protección de datos" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSeccion(item.key);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  seccion === item.key
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTENIDO */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
            {loading ? (
              <p className="text-gray-500 text-center">Cargando perfil...</p>
            ) : (
              renderContenido()
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Perfil;
