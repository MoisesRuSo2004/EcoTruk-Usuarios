import React from "react";
import "../../index.css";

const NotificacionesModal = () => {
  const abrirModal = () => {
    const modal = document.getElementById("modal_notificaciones");
    modal?.showModal();
  };

  // Simulamos algunas notificaciones del sistema
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
  ];

  return (
    <>
      <button className="btn btn-outline btn-warning" onClick={abrirModal}>
        🔔 Ver notificaciones
      </button>

      <dialog id="modal_notificaciones" className="modal">
        <div className="modal-box w-full max-w-3xl p-0 overflow-hidden relative">
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
            <h3 className="font-bold text-lg">Notificaciones del sistema</h3>
            <p className="text-sm text-base-content/70">
              Últimos eventos relevantes en tu zona
            </p>
          </div>

          <div className="px-6 py-4 max-h-[500px] overflow-y-auto space-y-4 bg-base-100">
            {notificaciones.map((n) => (
              <div
                key={n.id}
                className="border border-base-300 rounded-xl p-4 bg-base-200 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-sky-500">
                    {n.tipo}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {n.fecha}
                  </span>
                </div>
                <p className="text-sm text-base-content">
                  <strong className="text-white">{n.zona}:</strong> {n.mensaje}
                </p>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NotificacionesModal;
