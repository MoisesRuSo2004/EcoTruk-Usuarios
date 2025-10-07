import React from "react";
import "../../index.css";

const CalendarioModal = () => {
  const abrirModal = () => {
    const modal = document.getElementById("modal_calendario");
    modal?.showModal();
  };

  return (
    <>
      <button className="btn btn-outline btn-success" onClick={abrirModal}>
        📅 Ver calendario de recolección
      </button>

      <dialog id="modal_calendario" className="modal">
        <div className="modal-box w-full max-w-4xl p-0 overflow-hidden relative">
          {/* ❌ Botón de cierre en la esquina */}
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </form>

          <div className="bg-base-200 px-6 py-4 border-b border-base-300">
            <h3 className="font-bold text-lg">Calendario de recolección</h3>
            <p className="text-sm text-base-content/70">
              Consulta los días en que pasa el camión por tu zona
            </p>
          </div>

          <iframe
            src="https://calendar.google.com/calendar/embed?src=e6bc1fa011d1a91b5a0f27628c5f56b0b3ae9c293dea64a665541ecbca7421b0%40group.calendar.google.com&ctz=America%2FBogota&bgcolor=%23161b22&color=%233fb950"
            title="Calendario de recolección"
            frameBorder="0"
            scrolling="no"
            style={{
              width: "100%",
              height: "600px",
              filter: "invert(1) hue-rotate(180deg)",
              borderRadius: "0 0 8px 8px",
            }}
          ></iframe>
        </div>
      </dialog>
    </>
  );
};

export default CalendarioModal;
