// src/service/usuarioService.js
import api from "./api";
import axios from "axios";

/**
 * Obtener cabeceras con token almacenado (localStorage o sessionStorage)
 */
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token") || null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Manejo centralizado de errores para las funciones del servicio
 */
const parseAxiosError = (error) => {
  if (axios.isCancel(error)) {
    return { message: "Petición cancelada", isCancelled: true };
  }
  if (error.response) {
    return {
      message:
        error.response.data?.message ||
        error.response.statusText ||
        "Error en la respuesta del servidor",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return { message: "No se recibió respuesta del servidor", request: true };
  } else {
    return { message: error.message || "Error desconocido" };
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
export const getPerfilUsuario = async (cancelToken) => {
  try {
    const response = await api.get("/usuarios/perfil", {
      headers: getAuthHeaders(),
      timeout: 10000,
      cancelToken,
    });
    return response.data;
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("❌ Error al obtener perfil:", parsed);
    const err = new Error(parsed.message);
    err.meta = parsed;
    throw err;
  }
};

/**
 * Actualizar perfil del usuario (PATCH)
 * datosActualizados puede ser FormData (subida de avatar) o JSON
 */
export const actualizarUsuario = async (id, datosActualizados, cancelToken) => {
  const esFormData = datosActualizados instanceof FormData;
  try {
    const response = await api.patch(
      `/usuarios/${id}/perfil`, // 👈 ahora PATCH
      datosActualizados,
      {
        headers: {
          ...getAuthHeaders(),
          ...(esFormData ? { "Content-Type": "multipart/form-data" } : {}),
        },
        timeout: 15000,
        cancelToken,
      }
    );
    return response.data;
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("❌ Error al actualizar usuario:", parsed);
    const err = new Error(parsed.message);
    err.meta = parsed;
    throw err;
  }
};
