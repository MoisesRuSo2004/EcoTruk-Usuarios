import React from "react";
import { User, Shield, Lock, BadgeCheck, CalendarDays } from "lucide-react";
import Lottie from "lottie-react";
import seguridadAnimacion from "../../assets/animation/Pin-code.json";

const InicioPerfil = ({ usuario, setSeccion }) => {
  return (
    <>
      {/* Perfil */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
          <User className="text-gray-500 w-12 h-12" />
        </div>
        <h1 className="text-gray-800 text-2xl font-medium mt-4">
          {usuario.nombre}
        </h1>
        <p className="text-gray-600 font-medium">{usuario.correo}</p>
        <p className="text-sm text-gray-500 mt-1">
          Rol: <span className="font-semibold">{usuario.rol}</span> | Estado:{" "}
          <span
            className={`font-semibold ${
              usuario.estado === "ACTIVO" ? "text-green-600" : "text-red-600"
            }`}
          >
            {usuario.estado}
          </span>
        </p>
        <p className="text-sm text-gray-500">
          Registrado el{" "}
          {new Date(usuario.fechaRegistro).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Botones de secciones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setSeccion("info")}
          className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition"
        >
          <User className="text-gray-700 mb-1" />
          <span className="text-sm font-medium text-gray-800">
            Información personal
          </span>
        </button>
        <button
          onClick={() => setSeccion("seguridad")}
          className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition"
        >
          <Shield className="text-gray-700 mb-1" />
          <span className="text-sm font-medium text-gray-800">Seguridad</span>
        </button>
        <button
          onClick={() => setSeccion("proteccion")}
          className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition"
        >
          <Lock className="text-gray-700 mb-1" />
          <span className="text-sm font-medium text-gray-800">
            Protección de datos
          </span>
        </button>
      </div>

      {/* Tip de Seguridad */}
      <div className="border rounded-xl p-6 bg-gray-50 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-sm">
          <Lottie
            animationData={seguridadAnimacion}
            loop={true}
            className="w-25 h-25"
          />
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-gray-900 text-lg mb-2">
            Tip de seguridad
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Mantén tu cuenta segura usando una contraseña fuerte, evitando
            compartir tu información personal y verificando siempre la fuente de
            los mensajes o enlaces que recibes.
          </p>
        </div>
      </div>
    </>
  );
};

export default InicioPerfil;
