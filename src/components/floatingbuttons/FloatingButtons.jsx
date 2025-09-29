import { List, AlertTriangle, Crosshair } from "lucide-react";
import React, { useState } from "react";

const FloatingButtons = ({
  setCurrentPanel,
  onRecenter,
  bottomSheetHeight,
  onToggleSidebar,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 font-[exo]">
      {/* 🔝 Botón de menú fijo (arriba izquierda) */}
      <button
        className="fixed top-5 left-5 w-[55px] h-[55px] rounded-full bg-gray-800 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:bg-gray-700 transition pointer-events-auto z-50"
        aria-label="Abrir menú"
        onClick={onToggleSidebar}
      >
        <List className="w-6 h-6" />
      </button>

      {/* 🔝 Navbar fijo arriba */}
      <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-[#C4C4C4] w-[150px] h-[50px] px-4 py-1 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <span className="font-inter text-[25px] font-semibold">
            <span className="text-white">1</span>
            <span className="text-white mx-1">|</span>
            <span className="text-green-600">12</span>
          </span>
        </div>
      </div>
      {/* 🔝 cuadro fijo debajo del navbar */}
      <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-gray-700 w-[70px] h-[35px] px-4 py-1 rounded-m shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center">
          <span className="font-inter text-[17px] font-semibold">
            <span className="text-white">0</span>
            <span className="text-white mx-1">|</span>
            <span className="text-green-600">0</span>
          </span>
        </div>
      </div>

      {/* 🔽 Botones inferiores flotantes */}
      <div
        className="fixed right-4 bottom-24 flex flex-col gap-5 pointer-events-auto z-40"
        style={{
          transition: "transform 0.2s ease",
        }}
      >
        {/* Botón de avisos */}
        <button
          className="w-[55px] h-[55px] rounded-full bg-gray-800 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:bg-red-500 transition"
          onClick={() => setCurrentPanel("avisos")}
          aria-label="Mostrar avisos"
        >
          <AlertTriangle className="w-6 h-6" />
        </button>

        {/* Botón de recentrar mapa */}
        <button
          className="w-[55px] h-[55px] rounded-full bg-gray-800 text-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:bg-blue-500 transition"
          onClick={onRecenter}
          aria-label="Recentrar mapa"
        >
          <Crosshair className="w-6 h-6" />
        </button>
      </div>

      {/* Botón principal */}
      <button
        className="font-inter fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-4 rounded-full shadow-xl hover:bg-green-600 transition text-sm font-medium pointer-events-auto z-50 ring-2 ring-white"
        onClick={() => setCurrentPanel("info")}
        aria-label="Iniciar seguimiento"
      >
        Conectar
      </button>
    </div>
  );
};

export default FloatingButtons;
