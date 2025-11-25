export const cargarZonas = async () => {
  const zonas = [
    {
      nombre: "Zona 1: Bocagrande - Castillo Grande - Laguito",
      color: "#22c55e",
      camion: "Camión A",
      url: "/data/zonas/zona1.geojson",
    },
  ];

  const zonasConDatos = await Promise.all(
    zonas.map(async (zona) => {
      const res = await fetch(zona.url);
      const geojson = await res.json();
      return { ...zona, geojson };
    })
  );

  return zonasConDatos;
};
