/* global google */
import { useEffect, useRef, useState } from "react";
import { cargarZonas } from "../../data/zonas/zonasLoader";

const ZonasDelimitadas = ({ map, visible }) => {
  const poligonosRef = useRef([]);
  const zonasRef = useRef([]);
  const [zonasCargadas, setZonasCargadas] = useState(false); // ✅ nuevo estado

  // ✅ Cargar zonas una sola vez
  useEffect(() => {
    cargarZonas()
      .then((zonas) => {
        zonasRef.current = zonas;
        setZonasCargadas(true); // ✅ activa cuando ya están listas
      })
      .catch((err) => console.error("❌ Error al cargar zonas:", err));
  }, []);

  // ✅ Activar o desactivar zonas según `visible`
  useEffect(() => {
    // 🔴 Siempre limpiar antes
    poligonosRef.current.forEach((poly) => poly.setMap(null));
    poligonosRef.current = [];

    if (!map || !visible || !zonasCargadas) return;

    zonasRef.current.forEach((zona) => {
      const coords = zona.geojson.features[0].geometry.coordinates[0].map(
        ([lng, lat]) => ({ lat, lng })
      );

      const poligono = new google.maps.Polygon({
        paths: coords,
        strokeColor: zona.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: zona.color,
        fillOpacity: 0.2,
        map,
      });

      poligonosRef.current.push(poligono);
    });
  }, [visible, map, zonasCargadas]); // ✅ incluye zonasCargadas

  return null;
};

export default ZonasDelimitadas;
