import React from "react";

const CalendarioModal = () => {
  const abrirModal = () => {
    const modal = document.getElementById("modal_calendario");
    modal?.showModal();
  };

  return (
    <>
      <button
        className="btn btn-outline text-primary border-primary hover:bg-primary hover:text-white transition"
        onClick={abrirModal}
      >
        📅 Ver calendario de recolección
      </button>

      <dialog id="modal_calendario" className="modal">
        <div className="modal-box w-full max-w-3xl p-0 overflow-hidden relative bg-[#f5f6f7] text-[#0F172A] rounded-xl shadow-lg">
          {/* ❌ Botón de cierre */}
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] text-xl transition"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </form>

          {/* 🧾 Encabezado */}
          <div className="px-6 py-4 border-b border-[#e6e7e8] bg-[#f5f6f7] ">
            <h3 className="font-bold text-3xl">Calendario de recolección</h3>
            <p className="text-lg text-[#475569]">
              Consulta los días en que pasa el camión por tu zona
            </p>
          </div>

          {/* 🗓️ Calendario embebido */}
          <iframe
            src="https://calendar.google.com/calendar/embed?src=e6bc1fa011d1a91b5a0f27628c5f56b0b3ae9c293dea64a665541ecbca7421b0%40group.calendar.google.com&ctz=America%2FBogota&bgcolor=%23ffffff&color=%233fb950"
            title="Calendario de recolección"
            frameBorder="0"
            scrolling="no"
            style={{
              width: "100%",
              height: "600px",
              borderRadius: "0 0 12px 12px",
              backgroundColor: "#ffffff",
            }}
          ></iframe>
        </div>
      </dialog>
    </>
  );
};

export default CalendarioModal;
