import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 15000,
});

// ✅ Interceptor para añadir token en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url.includes("/auth/login")) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor para manejar errores estándar
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Token inválido o expirado");
    }
    return Promise.reject(error);
  }
);

export default api;
