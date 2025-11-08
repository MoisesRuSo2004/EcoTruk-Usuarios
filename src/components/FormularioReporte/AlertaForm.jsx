import React, { useState } from "react";

const tipoLabels = {
  basura: "Basura no recogida",
  critico: "Punto crítico de basura",
  ruta: "Retraso o incumplimiento de ruta",
  ambiental: "Problema ambiental"
};

const AlertaForm = ({ tipo = "basura", onBack }) => {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setTimeout(() => setEnviando(false), 2000); // Simulación
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-[#0d1117] rounded-xl text-[#e6edf3] font-inter shadow-lg transition-all duration-300"
    >
      {/* Botón de volver */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver"
          className="self-start p-1 text-[#58a6ff] rounded hover:bg-[#1c2a3a] hover:text-[#79c0ff] transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L3.707 7.5H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </button>
      )}

      {/* Encabezado */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-bold text-[#f0f6fc]">REPORTE</h1>
        <h2 className="text-sm font-medium text-[#c9d1d9] uppercase">
          {tipoLabels[tipo] || "Alerta Ciudadana"}
        </h2>
      </div>

      <input type="hidden" name="tipo" value={tipo} />

      {/* Campos */}
      <div className="flex flex-col gap-1">
        <label htmlFor="direccion" className="text-sm font-medium text-left">
          Ubicación (Dirección):
        </label>
        <input
          id="direccion"
          type="text"
          placeholder="Ej: Calle 10 # 25-30"
          required
          className="bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/30 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="descripcion" className="text-sm font-medium text-left">
          Descripción del Problema:
        </label>
        <textarea
          id="descripcion"
          rows="3"
          placeholder="Explica qué pasó..."
          required
          className="bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/30 transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="evidencia" className="text-sm font-medium text-left">
          Evidencia Fotográfica:
        </label>
        <input
          id="evidencia"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="bg-[#161b22] border border-dashed border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] cursor-pointer focus:outline-none focus:border-[#58a6ff] transition"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="impacto" className="text-sm font-medium text-left">
          Impacto Percibido:
        </label>
        <select
          id="impacto"
          required
          className="bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/30 transition"
        >
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="primeraVez" className="text-sm font-medium text-left">
          ¿Es la primera vez?
        </label>
        <select
          id="primeraVez"
          required
          className="bg-[#161b22] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/30 transition"
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={enviando}
        className={`bg-[#238636] text-white px-4 py-3 rounded-md font-semibold text-sm transition duration-200 ${
          enviando
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#2ea043] hover:scale-[1.02]"
        }`}
      >
        {enviando ? "Enviando..." : "Enviar Reporte"}
      </button>
    </form>
  );
};

export default AlertaForm;
