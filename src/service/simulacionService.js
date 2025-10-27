import api from "../service/api";

/**
 * Valida si una ubicación (lat, lng) cae dentro de una zona registrada.
 * @param {number} lat - Latitud de la ubicación simulada.
 * @param {number} lng - Longitud de la ubicación simulada.
 * @returns {Promise<Object>} - Datos de la zona y camión asignado.
 */
export const validarUbicacion = async (lat, lng) => {
  try {
    const response = await api.get("/simulacion/validar-ubicacion", {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { mensaje: "Ubicación fuera de zonas registradas" };
    }
    console.error("Error al validar ubicación:", error);
    throw error;
  }
};
