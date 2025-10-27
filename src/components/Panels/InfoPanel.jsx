import React, { useState, useEffect } from "react";
import { Unplug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FcAdvertising } from "react-icons/fc";

const InfoPanel = ({ info }) => {
  const mensajes = [
    "Activa tu ubicación para ver los camiones de recolección en tu zona.",
    "🌱 Tip: Coloca la basura orgánica en bolsas biodegradables.",
    "🗓️ Horario de recolección: Lunes a sábado, 6:00 a.m. - 8:00 p.m.",
    "⚠️ Hoy no habrá recolección en la zona norte de Cartagena",
    "📰 Más info sobre reciclaje: Gobierno local",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length);
    }, 3000); // Cambia de mensaje cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  // Noticias y tips estáticos de Cartagena
  const noticias = [
    {
      texto: " Más info sobre reciclaje en Cartagena.",
      enlace: "https://www.pacaribe.com/pacaribe-le-cumple-a-cartagena/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2024/11/Foto1-1024x682.jpeg",
    },
    {
      texto:
        " Pacaribe recolectó más de 150 mil toneladas de residuos en el primer semestre de 2025.",
      enlace:
        "https://www.pacaribe.com/entre-enero-y-junio-de-2025-recolectamos-mas-de-150-mil-toneladas-de-residuos-en-cartagena-fortaleciendo-nuestro-servicio-con-tecnologia-limpia-y-trabajo-comunitario/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2025/07/IMG_4725-1024x724.jpg",
    },
    {
      texto:
        " Pacaribe se articula con EPA Cartagena y el Distrito para modernizar la poda y el cuidado de los árboles.",
      enlace: "https://www.pacaribe.com/sala-de-prensa/",
      imagen:
        "https://www.pacaribe.com/wp-content/uploads/2025/08/FOTO-1-1024x682.jpeg",
    },
  ];

  if (!info) {
    return (
      <div className="text-surface-dark space-y-4 p-2 pt-0">
        {/* Estado desconectado */}
        <div className="flex justify-center">
          <p className="text-3xl font-semibold flex items-center gap-2">
            <div className="text-red-600">
              <Unplug size={35} />
            </div>
            Estás <strong>desconectado</strong>
          </p>
        </div>

        {/* Mensaje animado tipo carrusel */}
        <div className="h-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="text-surface-light text-xl"
            >
              {mensajes[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Noticias en cards pequeñas, horizontales */}
        <div className="flex space-x-3 overflow-x-auto mt-4 pb-2">
          {noticias.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 border border-surface-light rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow bg-[#e6e7e8]"
            >
              {item.imagen && (
                <img
                  src={item.imagen}
                  alt="noticia"
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
              )}
              {item.enlace ? (
                <a
                  href={item.enlace}
                  target="_blank"
                  className="underline hover:text-green-900 text-surface-light text-sm"
                >
                  {item.texto}
                </a>
              ) : (
                <p className="text-surface-light text-sm">{item.texto}</p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-surface-light pt-3 text-sm space-y-1">
          <p className="italic text-surface-light">
            🌱 “Reciclar es cuidar el planeta y tu comunidad”
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-surface-dark space-y-2">
      <p>
        <strong className="text-primary-dark">Ubicación simulada:</strong>{" "}
        {info.ubicacion.lat.toFixed(4)}, {info.ubicacion.lng.toFixed(4)}
      </p>
      <p>
        <strong className="text-primary-dark">Zona asignada:</strong>{" "}
        {info.zona}
      </p>
      <p>
        <strong className="text-primary-dark">Camión asignado:</strong>
      </p>
      <ul className="list-disc list-inside ml-4 text-surface-dark">
        <li>
          <strong>Nombre:</strong> {info.camion?.nombre || "Sin nombre"}
        </li>
        <li>
          <strong>Estado:</strong> {info.camion?.estado || "Desconocido"}
        </li>
        <li>
          <strong>Placa:</strong> {info.camion?.placa || "Sin placa"}
        </li>
      </ul>
    </div>
  );
};

export default InfoPanel;
