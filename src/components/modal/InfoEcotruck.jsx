import React from "react";
import "../../index.css";

const InfoEcoTruckModal = () => {
  const abrirModal = () => {
    document.getElementById("modal_info_ecotruck")?.showModal();
  };

  return (
    <>
      <button
        className="btn btn-outline text-sky-600 border-sky-500 hover:bg-sky-500 hover:text-white transition"
        onClick={abrirModal}
      >
        ℹ️ Información EcoTruck
      </button>

      <dialog id="modal_info_ecotruck" className="modal">
        <div className="modal-box w-full max-w-md p-0 overflow-hidden relative bg-[#f9fafb] text-[#0F172A] rounded-xl shadow-lg">
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] text-xl transition"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </form>

          {/* 🧾 Encabezado */}
          <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#e5e7eb]">
            <h3 className="font-bold text-2xl">¿Qué es EcoTruck?</h3>
          </div>

          {/* 📄 Contenido */}
          <div className="px-6 py-6 space-y-4 bg-[#f9fafb]">
            <p className="text-sm text-[#374151] leading-relaxed">
              <strong>EcoTruck</strong> es una plataforma digital que integra
              sostenibilidad y logística inteligente para mejorar la gestión de
              residuos en la ciudad. Su objetivo es ofrecer trazabilidad,
              notificaciones automáticas y una experiencia clara para los
              ciudadanos.
            </p>
            <p className="text-sm text-[#374151] leading-relaxed">
              Con EcoTruck puedes recibir alertas sobre la recolección en tu
              zona, reportar incidencias ambientales y contribuir a un sistema
              más eficiente y transparente.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InfoEcoTruckModal;
