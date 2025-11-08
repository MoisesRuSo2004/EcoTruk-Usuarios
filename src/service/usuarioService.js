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
    // petición cancelada
    return { message: "Petición cancelada", isCancelled: true };
  }
  if (error.response) {
    // El servidor respondió con un status fuera de 2xx
    return {
      message:
        error.response.data?.message ||
        error.response.statusText ||
        "Error en la respuesta del servidor",
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // La petición fue hecha pero no hubo respuesta
    return { message: "No se recibió respuesta del servidor", request: true };
  } else {
    // Otro error
    return { message: error.message || "Error desconocido" };
  }
};

/**
 * Obtener perfil del usuario autenticado
 * opcional: pasar un cancelToken si quieres cancelar la petición al desmontar
 */
export const getPerfilUsuario = async (cancelToken) => {
  try {
    const response = await api.get("/usuarios/perfil", {
      headers: getAuthHeaders(),
      timeout: 10000, // 10s
      cancelToken,
    });
    return response.data;
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("❌ Error al obtener perfil:", parsed);
    // lanzamos un error estandar para que el componente lo maneje
    const err = new Error(parsed.message);
    err.meta = parsed;
    throw err;
  }
};

/**
 * Actualizar perfil del usuario
 * datosActualizados puede ser FormData (subida de avatar) o JSON
 */
export const actualizarUsuario = async (id, datosActualizados, cancelToken) => {
  const esFormData = datosActualizados instanceof FormData;
  try {
    const response = await api.put(`/usuarios/${id}/perfil`, datosActualizados, {
      headers: {
        ...getAuthHeaders(),
        ...(esFormData ? { "Content-Type": "multipart/form-data" } : {}),
      },
      timeout: 15000,
      cancelToken,
    });
    return response.data;
  } catch (error) {
    const parsed = parseAxiosError(error);
    console.error("❌ Error al actualizar usuario:", parsed);
    const err = new Error(parsed.message);
    err.meta = parsed;
    throw err;
  }
};
