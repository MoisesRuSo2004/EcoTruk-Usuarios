import React from "react";

const ProteccionDatos = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Protección de datos
      </h2>
      <p className="text-gray-600 text-sm mb-4">
        En EcoTruck protegemos tu información de acuerdo con las normas
        internacionales de privacidad. Puedes revisar nuestras políticas,
        solicitar tus datos o eliminar tu cuenta cuando desees.
      </p>
      <button className="bg-[#2E8B00] text-white px-4 py-2 rounded-md hover:bg-[#267400] transition">
        Ver políticas de privacidad
      </button>
    </div>
  );
};

export default ProteccionDatos;
