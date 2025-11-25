import React, { useState, useEffect } from "react";
import { Unplug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FcAdvertising } from "react-icons/fc";

const InfoPanel = ({ info }) => {
  const mensajes = [
    "📍 Activa tu ubicación para ver los camiones de recolección en tu zona.",
    "🌱 Tip: Usa bolsas biodegradables para la basura orgánica.",
    "🗓️ Horario de recolección: Lunes a sábado, 6:00 a.m. - 8:00 p.m.",
    "⚠️ Hoy no habrá recolección en la zona norte de Cartagena.",
    "📰 Más info sobre reciclaje: Gobierno local.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 4000); // cambia cada 4 segundos para mejor lectura
    return () => clearInterval(interval);
  }, []);

  const noticias = [
    {
      texto: "Más info sobre reciclaje en Cartagena.",
      enlace: "https://www.pacaribe.com/pacaribe-le-cumple-a-cartagena/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2024/11/Foto1-1024x682.jpeg",
    },
    {
      texto:
        "Pacaribe recolectó más de 150 mil toneladas de residuos en el primer semestre de 2025.",
      enlace:
        "https://www.pacaribe.com/entre-enero-y-junio-de-2025-recolectamos-mas-de-150-mil-toneladas-de-residuos-en-cartagena-fortaleciendo-nuestro-servicio-con-tecnologia-limpia-y-trabajo-comunitario/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2025/07/IMG_4725-1024x724.jpg",
    },
    {
      texto:
        "Pacaribe se articula con EPA Cartagena y el Distrito para modernizar la poda y el cuidado de los árboles.",
      enlace: "https://www.pacaribe.com/sala-de-prensa/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2025/08/FOTO-1-1024x682.jpeg",
    },
  ];

  // Estado desconectado
  if (!info) {
    return (
      <div className="text-gray-800 space-y-6 p-4">
        {/* Estado */}
        <div className="flex justify-center items-center gap-2">
          <Unplug size={35} className="text-red-600" />
          <p className="text-2xl font-bold">Estás desconectado</p>
        </div>

        {/* Mensaje animado */}
        <div className="h-10 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="text-lg text-gray-600 font-medium text-center"
            >
              {mensajes[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Noticias */}
        <div className="flex space-x-4 overflow-x-auto mt-4 pb-2">
          {noticias.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              {item.imagen && (
                <img
                  src={item.imagen}
                  alt="noticia"
                  className="w-full h-32 object-cover rounded-t-xl"
                />
              )}
              <div className="p-3">
                {item.enlace ? (
                  <a
                    href={item.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-700 hover:underline font-medium"
                  >
                    {item.texto}
                  </a>
                ) : (
                  <p className="text-sm text-gray-700">{item.texto}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Frase motivacional */}
        <div className="border-t border-gray-300 pt-3 text-center">
          <p className="italic text-gray-600 text-sm">
            🌱 “Reciclar es cuidar el planeta y tu comunidad”
          </p>
        </div>
      </div>
    );
  }

  // Estado conectado
  return (
    <div className="text-gray-800 space-y-4 p-4">
      {/* Ubicación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <p className="text-sm text-gray-500">Ubicación simulada</p>
        <p className="text-lg font-semibold text-green-700">
          {info.ubicacion.lat.toFixed(4)}, {info.ubicacion.lng.toFixed(4)}
        </p>
      </div>

      {/* Zona */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <p className="text-sm text-gray-500">Zona asignada</p>
        <p className="text-lg font-semibold text-green-700">{info.zona}</p>
      </div>

      {/* Camión asignado */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
        <p className="text-sm text-gray-500 mb-2">Camión asignado</p>
        <div className="space-y-1">
          <p>
            <span className="font-medium text-gray-700">Placa:</span>{" "}
            {info.camion?.placa || "Sin placa"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
