import api from "./api"; // ajusta la ruta si tu archivo api.js está en otro lugar

// 🔍 Obtener todas las rutas activas
export const getRutasActivas = async () => {
  try {
    const response = await api.get("/rutas/activas");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener rutas activas:", error);
    throw new Error("No se pudieron cargar las rutas activas.");
  }
};

// 📡 Consultar estado actual de una ruta
export const consultarEstadoRuta = async (id) => {
  try {
    const response = await api.get(`/rutas/estado/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al consultar estado de ruta ${id}:`, error);
    throw new Error("No se pudo consultar el estado de la ruta.");
  }
};

// 🚚 Avanzar el camión en la ruta
export const avanzarCamion = async (id) => {
  try {
    const response = await api.put(`/rutas/avanzar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al avanzar camión en ruta ${id}:`, error);
    throw new Error("No se pudo avanzar el camión.");
  }
};

// 👁️ Obtener rutas para visualización pública
export const getRutasVisualizacion = async () => {
  try {
    const response = await api.get("/rutas/visualizacion");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener rutas para visualización:", error);
    throw new Error("No se pudieron cargar las rutas de visualización.");
  }
};
