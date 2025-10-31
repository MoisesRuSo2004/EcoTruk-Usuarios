import React, { useState, useEffect } from "react";
import InicioPerfil from "../components/perfil/InicioPerfil";
import InformacionPersonal from "../components/perfil/InformacionPersonal";
import Seguridad from "../components/perfil/Seguridad";
import ProteccionDatos from "../components/perfil/ProteccionDatos";
import { getPerfilUsuario } from "../service/usuarioService"; // ✅ servicio que llama a /usuarios/perfil

const Perfil = () => {
  const [seccion, setSeccion] = useState("inicio");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Obtener datos reales del usuario
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

  // 🧭 Renderizar contenido según sección
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
            {["inicio", "info", "seguridad", "proteccion"].map((key) => (
              <button
                key={key}
                onClick={() => setSeccion(key)}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  seccion === key
                    ? "text-gray-700 bg-gray-200"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {key === "inicio" && "Inicio"}
                {key === "info" && "Información personal"}
                {key === "seguridad" && "Seguridad"}
                {key === "proteccion" && "Protección de datos"}
              </button>
            ))}
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-0 p-5">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
            {loading ? (
              <p className="text-gray-500">Cargando perfil...</p>
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
