import { motion } from "motion/react";

const ConfirmModal = ({ open, title = "¿Quieres desconectarte?", message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.12 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">ℹ️</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-gray-700 mb-4">{message || "Al desconectarte, tu ubicación dejará de mostrarse en el mapa. Puedes volver a conectar cuando quieras."}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-white border border-gray-200 hover:bg-gray-50 text-gray-800"
            onClick={onCancel}
          >
            Mantenerme conectado
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Sí, desconectar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
