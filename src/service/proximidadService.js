import api from "./api";

/**
 * Consulta si el camión está cerca del ciudadano usando coordenadas.
 */
export const verificarProximidad = async ({
  latCamion,
  lngCamion,
  latUsuario,
  lngUsuario,
}) => {
  console.log("📥 [verificarProximidad] Llamando API con:", {
    latCamion,
    lngCamion,
    latUsuario,
    lngUsuario,
  });

  try {
    const response = await api.get("/proximidad/verificar", {
      params: { latCamion, lngCamion, latUsuario, lngUsuario },
    });

    console.log("📤 [verificarProximidad] Respuesta recibida:", response.data);

    if (response?.data && typeof response.data.camionCerca === "boolean") {
      return response.data.camionCerca;
    }

    console.warn(
      "⚠️ [verificarProximidad] Estructura inesperada:",
      response.data
    );
    return false;
  } catch (error) {
    console.error("❌ [verificarProximidad] Error al consultar API:", error);
    return false;
  }
};
