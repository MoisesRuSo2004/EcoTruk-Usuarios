import React from "react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          ¿Cerrar sesión?
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Tu sesión se cerrará y volverás al inicio.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
