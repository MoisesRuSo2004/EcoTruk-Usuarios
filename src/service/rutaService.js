export const getRutasActivas = async () => {
  const response = await api.get("/rutas/activas");
  return response.data;
};

export const consultarEstadoRuta = async (id) => {
  const response = await api.get(`/rutas/estado/${id}`);
  return response.data;
};
