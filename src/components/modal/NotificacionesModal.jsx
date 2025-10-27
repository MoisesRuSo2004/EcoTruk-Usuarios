import React, { useState } from "react";
import "../../index.css";

const NotificacionesModal = () => {
  const abrirModal = () => {
    document.getElementById("modal_notificaciones")?.showModal();
  };

  const notificaciones = [
    {
      id: 1,
      tipo: "Urgente",
      zona: "Barrio San José",
      mensaje: "Camión retrasado por mantenimiento. Nueva hora: 9:30 AM.",
      fecha: "Hoy · 7:45 AM",
    },
    {
      id: 2,
      tipo: "Informativo",
      zona: "Zona Norte",
      mensaje: "Recolección de reciclaje programada para mañana a las 6:00 AM.",
      fecha: "Ayer · 4:15 PM",
    },
    {
      id: 3,
      tipo: "Sistema",
      zona: "General",
      mensaje: "Tu perfil fue actualizado correctamente.",
      fecha: "Hace 2 días · 10:00 AM",
    },
    // Simula más notificaciones si quieres probar paginación
  ];

  const tipos = ["Todas", "Urgente", "Informativo", "Sistema"];
  const [filtro, setFiltro] = useState("Todas");
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const filtradas =
    filtro === "Todas"
      ? notificaciones
      : notificaciones.filter((n) => n.tipo === filtro);

  const totalPaginas = Math.ceil(filtradas.length / porPagina);
  const visibles = filtradas.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  return (
    <>
      <button
        className="btn btn-outline text-yellow-600 border-yellow-500 hover:bg-yellow-500 hover:text-white transition"
        onClick={abrirModal}
      >
        🔔 Ver notificaciones
      </button>

      <dialog id="modal_notificaciones" className="modal">
        <div className="modal-box w-full max-w-3xl p-0 overflow-hidden relative bg-[#f5f6f7] text-[#0F172A] rounded-xl shadow-lg">
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] text-xl transition"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </form>

          {/* 🧾 Encabezado */}
          <div className="px-6 py-4 border-b border-[#e6e7e8] bg-[#e6e7e8]">
            <h3 className="font-bold text-3xl">Notificaciones del sistema</h3>
            <p className="text-lg text-[#475569]">
              Últimos eventos relevantes en tu zona
            </p>
          </div>

          {/* 🔍 Filtro */}
          <div className="px-6 py-3 flex gap-2 flex-wrap">
            {tipos.map((tipo) => (
              <button
                key={tipo}
                onClick={() => {
                  setFiltro(tipo);
                  setPagina(1);
                }}
                className={`px-3 py-1 rounded-full text-sm border ${
                  filtro === tipo
                    ? "bg-primary text-white border-primary"
                    : "border-[#e2e8f0] text-[#0F172A] hover:bg-[#e6e7e8]"
                } transition`}
              >
                {tipo}
              </button>
            ))}
          </div>

          {/* 🔔 Lista */}
          <div className="px-6 py-4 max-h-[500px] overflow-y-auto space-y-4 bg-[#f5f6f7]">
            {visibles.length === 0 ? (
              <p className="text-sm text-[#64748B]">
                No hay notificaciones para este filtro.
              </p>
            ) : (
              visibles.map((n) => (
                <div
                  key={n.id}
                  className="border border-[#e2e8f0] rounded-xl p-4 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-sky-600">
                      {n.tipo}
                    </span>
                    <span className="text-xs text-[#64748B]">{n.fecha}</span>
                  </div>
                  <p className="text-sm text-[#0F172A]">
                    <strong>{n.zona}:</strong> {n.mensaje}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* 📄 Paginador */}
          {totalPaginas > 1 && (
            <div className="px-6 py-3 flex justify-center gap-2 bg-[#e6e7e8] border-t border-[#e2e8f0]">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPagina(i + 1)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    pagina === i + 1
                      ? "bg-primary text-white border-primary"
                      : "border-[#e2e8f0] text-[#0F172A] hover:bg-[#f5f6f7]"
                  } transition`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default NotificacionesModal;
