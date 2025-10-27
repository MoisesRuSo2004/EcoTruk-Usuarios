import React from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

const InformacionPersonal = () => {
  const usuario = {
    nombre: "Daniel José",
    telefono: "+573226789456",
    correo: "daniel@gmail.com",
    idioma: "Español (Colombia)",
    verificado: true,
  };

  return (
    <div className="p-10 w-full">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Información personal
      </h1>

      {/* Encabezado con avatar */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-12 h-12 text-gray-500" />
        </div>
      </div>

      {/* Campos */}
      <div className="space-y-6 text-gray-800">
        {/* Nombre */}
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Nombre</p>
            <p className="text-base font-medium">{usuario.nombre}</p>
          </div>
          <User className="text-gray-400 w-4 h-4" />
        </div>

        {/* Teléfono */}
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Número de teléfono</p>
            <p className="text-base font-medium flex items-center gap-2">
              {usuario.telefono}
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
            </p>
          </div>
          <Phone className="text-gray-400 w-4 h-4" />
        </div>

        {/* Correo */}
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="text-base font-medium flex items-center gap-2">
              {usuario.correo}
              {usuario.verificado && (
                <CheckCircle className="w-4 h-4 text-green-600" />
              )}
            </p>
          </div>
          <Mail className="text-gray-400 w-4 h-4" />
        </div>

        {/* Idioma */}
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Idioma</p>
            <p className="text-base font-medium flex items-center gap-2">
              Actualizar el idioma del dispositivo
            </p>
          </div>
          <ExternalLink className="text-gray-400 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default InformacionPersonal;
