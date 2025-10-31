import api from "./api";

// 🔍 Obtener perfil del usuario autenticado
export const getPerfilUsuario = async () => {
  try {
    const response = await api.get("/usuarios/perfil");
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener perfil:", error);
    throw error;
  }
};

export const actualizarUsuario = async (id, datosActualizados) => {
  const esFormData = datosActualizados instanceof FormData;

  const response = await api.put(`/usuarios/${id}/perfil`, datosActualizados, {
    headers: esFormData ? { "Content-Type": "multipart/form-data" } : {},
  });

  return response.data;
};
