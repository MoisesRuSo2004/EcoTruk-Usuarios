import { Menu, AlertTriangle, Crosshair, MapIcon } from "lucide-react";
import React from "react";
import * as motion from "motion/react-client";

const FloatingButtons = ({
  setCurrentPanel,
  onRecenter,
  bottomSheetHeight,
  onToggleSidebar,
  onSimularUbicacion,
  onToggleZonas,
  mostrarZonas,
}) => {
  const handleConectar = () => {
    onSimularUbicacion();
  };

  // 🎬 Configuración base de animación (más sutil)
  const baseAnim = {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 0.35,
      ease: "easeOut",
      scale: { type: "spring", visualDuration: 0.3, bounce: 0.25 },
    },
  };

  // ⚡ Configuración de botones flotantes en cascada
  const botonesFlotantes = [
    {
      id: "avisos",
      icon: <AlertTriangle className="w-6 h-6 text-green-900" />,
      color: "hover:bg-[#e6e7e8]",
      onClick: () => setCurrentPanel("avisos"),
    },
    {
      id: "recentrar",
      icon: <Crosshair className="w-6 h-6 text-green-900" />,
      color: "hover:bg-[#e6e7e8]",
      onClick: onRecenter,
    },
    {
      id: "zonas",
      icon: <MapIcon className="w-6 h-6 text-green-900" />,
      color: "hover:bg-[#e6e7e8]",
      onClick: onToggleZonas,
    },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 font-inter">
      {/* 🟢 Botón de menú */}
      <button
        className="fixed top-5 left-5 w-[55px] h-[55px] rounded-full bg-[#f5f6f7] text-green-900 flex items-center justify-center shadow-lg hover:bg-[#e6e7e8] transition pointer-events-auto z-50"
        aria-label="Abrir menú"
        onClick={onToggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 🧭 Indicador principal */}
      <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-surface w-[150px] h-[50px] px-4 py-1 rounded-full shadow-md flex items-center justify-center border border-primary/30">
          <span className="text-[22px] font-semibold text-text">
            <span className="text-text">1</span>
            <span className="text-text-secondary mx-1">|</span>
            <span className="text-primary">12</span>
          </span>
        </div>
      </div>

      {/* 🔢 Subcontador */}
      <div className="absolute top-[85px] left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-surface w-[70px] h-[35px] px-4 py-1 rounded-full shadow-sm flex items-center justify-center border border-primary/20">
          <span className="text-[16px] font-semibold text-text">
            <span>0</span>
            <span className="text-text-secondary mx-1">|</span>
            <span className="text-primary">0</span>
          </span>
        </div>
      </div>

      {/* 🎯 Botones flotantes (derecha, con cascada) */}
      <div className="fixed right-4 bottom-44 flex flex-col gap-5 pointer-events-auto z-40">
        {botonesFlotantes.map((btn, i) => (
          <motion.button
            key={btn.id}
            {...baseAnim}
            transition={{
              ...baseAnim.transition,
              delay: 0.15 + i * 0.1, // ⏱️ Cascada sutil
            }}
            className={`w-[55px] h-[55px] rounded-full ${
              btn.id === "zonas" && mostrarZonas
                ? "bg-[#e6e7e8]"
                : "bg-[#f5f6f7]"
            } text-white flex items-center justify-center shadow-lg ${
              btn.color
            } transition`}
            onClick={btn.onClick}
            aria-label={btn.id}
          >
            {btn.icon}
          </motion.button>
        ))}
      </div>

      {/* 🟢 Botón principal (Conectar) */}
    </div>
  );
};

export default FloatingButtons;
