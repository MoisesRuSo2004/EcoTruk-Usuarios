import { motion } from "motion/react";
import { Settings2, Info } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";


const BotonConectar = ({ onClick, setCurrentPanel, onDisconnect, isConnected }) => {
  const [loading, setLoading] = useState(false);
  // usar estado derivado si se provee
  const conectado = typeof isConnected !== "undefined" ? isConnected : undefined;

  const handleClick = () => {
    // Si ya está conectado, abrir modal de confirmación
    if (conectado) {
      setShowModal(true);
      return;
    }

    // inicio de conexión
    setLoading(true);
    if (typeof onClick === "function") onClick(); // dispara tu lógica de conexión

    // Simula tiempo de conexión (ej. 3 segundos)
    setTimeout(() => {
      setLoading(false);
      // si no hay estado derivado, actualizar local (retrocompatibilidad)
      if (typeof isConnected === "undefined") {
        // eslint-disable-next-line no-unused-expressions
        (function () {
          // mantener compatibilidad: actualizar estado interno si existiera
        })();
      }
      setCurrentPanel("info"); // 👈 cuando conecta, abre InfoPanel
    }, 3000);
  };

  const [showModal, setShowModal] = useState(false);

  const confirmDisconnect = () => {
    setShowModal(false);
    setConectado(false);
    if (typeof onDisconnect === "function") onDisconnect();
  };

  const cancelDisconnect = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[60]">
      <div className="bg-[#f5f6f7] border-t border-[#E0E0E0] px-6 py-4 pointer-events-auto shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between">
        {/* Botón de ajustes */}
        <button className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none">
          <Settings2 size={40} />
        </button>

  {/* Botón Conectar */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: conectado ? 1 : 1.05 }}
          whileTap={{ scale: conectado ? 1 : 0.95 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.4 },
          }}
          className={`w-80 max-w-md mx-auto text-white text-center py-3 rounded-full shadow-lg font-semibold text-base transition-all duration-200 ${
            conectado
              ? "bg-red-600 hover:bg-red-700"
              : "bg-[#008543] hover:bg-[#145A32]"
          }`}
          onClick={handleClick}
          aria-label="Conectar"
          disabled={loading}
        >
          {loading ? (
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.0 }}
            >
              <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Conectando...
            </motion.span>
          ) : conectado ? (
            "Desconectar"
          ) : (
            "Conectar"
          )}
        </motion.button>

        {/* Modal de confirmación */}
        <ConfirmModal
          open={showModal}
          title="Confirmar desconexión"
          message={null}
          onConfirm={confirmDisconnect}
          onCancel={cancelDisconnect}
        />

        {/* Botón de info */}
        <button
          className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none"
          onClick={() => setCurrentPanel("info")} // 👈 cambia al InfoPanel
        >
          <Info size={40} />
        </button>
      </div>
    </div>
  );
};

export default BotonConectar;
