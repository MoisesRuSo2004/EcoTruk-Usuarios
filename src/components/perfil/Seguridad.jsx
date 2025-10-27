import React from "react";
import {
  Lock,
  Smartphone,
  KeyRound,
  ShieldCheck,
  Phone,
  Globe,
  ExternalLink,
  Monitor,
  ChevronRight,
} from "lucide-react";

const Seguridad = () => {
  return (
    <div className="p-5 w-full ">
      {/* Título */}
      <h1 className="text-3xl  font-bold text-gray-900 mb-3 ">Seguridad</h1>

      {/* Sección 1: Iniciar sesión */}
      <div className="space-y-6  text-gray-800">
        <div className="border-b pb-4">
          <h2 className="text-2xl font-bold mb-2">
            Iniciar sesión en EcoTruck
          </h2>
          <p className="text-sm text-gray-600">
            Gestiona cómo accedes a tu cuenta y mantén tu información protegida.
          </p>
        </div>

        {/* Contraseña */}
        <div className="border-b pb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Contraseña</p>
            <p className="text-base font-medium">
              Actualiza tu contraseña regularmente.
            </p>
          </div>
          <ChevronRight className="text-gray-400 w-5 h-5" />
        </div>

        {/* Teléfono de recuperación */}

        {/* Actividad de inicio de sesión */}
        <div className="pt-6">
          <p className="text-2xl text-gray-900 mb-2 font-bold">
            Actividad de inicio de sesión
          </p>
          <p className="text-base font-medium mb-4">
            Iniciaste sesión en estos dispositivos en los últimos 30 días.
          </p>

          <div className="space-y-3">
            <div className="flex justify-between justify-items-start border p-3 rounded-md">
              <div>
                <p className="font-medium">Chrome en Windows</p>
                <p className="text-sm text-gray-500">
                  Tu sesión actual · Cartagena, Colombia
                </p>
              </div>
              <Monitor className="text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seguridad;
