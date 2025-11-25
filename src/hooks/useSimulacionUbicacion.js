import { useState } from "react";
import { validarUbicacion } from "../service/simulacionService"; // 👈 usa el servicio real

export const useSimulacionUbicacion = () => {
  const [info, setInfo] = useState(null);

  // Coordenadas fijas dentro de Bocagrande (zona 1)
  const getUbicacionBocagrande = () => {
    return {
      lat: 10.400482916891715, // dentro del polígono que insertaste
      lng: -75.55751804496515,
    };
  };

  const simularConexion = async () => {
    const coords = getUbicacionBocagrande();

    try {
      const resultado = await validarUbicacion(coords.lat, coords.lng);

      setInfo({
        ubicacion: coords,
        zona: resultado.zona || "Zona desconocida",
        camionId: resultado.camionId || "Sin asignar",
        estadoZona: resultado.estadoZona || "Desconocido",
        mensaje: resultado.mensaje || null,
        camion: resultado.camion || null,
      });
    } catch (error) {
      console.error("❌ Error al validar ubicación:", error);
      setInfo({
        ubicacion: coords,
        zona: null,
        camionId: null,
        estadoZona: null,
        mensaje: "Error al conectar con el servidor",
      });
    }
  };

  const validarYSetUbicacion = async (lat, lng) => {
    try {
      const resultado = await validarUbicacion(lat, lng);
      setInfo({
        ubicacion: { lat, lng },
        zona: resultado.zona || "Zona desconocida",
        camionId: resultado.camionId || "Sin asignar",
        estadoZona: resultado.estadoZona || "Desconocido",
        mensaje: resultado.mensaje || null,
        camion: resultado.camion || null,
      });
      return { ok: true, resultado };
    } catch (error) {
      console.error("❌ Error al validar ubicaci\u00f3n:", error);
      setInfo({
        ubicacion: { lat, lng },
        zona: null,
        camionId: null,
        estadoZona: null,
        mensaje: "Error al conectar con el servidor",
      });
      return { ok: false, error };
    }
  };

  const desconectar = () => {
    // Limpia la info de simulación (desmarca la ubicación)
    setInfo(null);
  };

  return { info, simularConexion, validarYSetUbicacion, desconectar };
};
