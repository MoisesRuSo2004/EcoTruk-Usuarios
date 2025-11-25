/* global google */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AlertaProximidad = ({ ubicacionCamion, ubicacionUsuario }) => {
  const [ultimaDistancia, setUltimaDistancia] = useState(null);
  const [contadorNotificaciones, setContadorNotificaciones] = useState(0);

  // 👉 función para llamar al backend
  const notifyBackend = async (distanceKm, etaMin) => {
    try {
      await fetch("http://localhost:8080/notify/proximity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "573226706385", // tu número validado en WhatsApp Cloud API
          distanceKm,
          etaMin,
        }),
      });
    } catch (e) {
      console.error("❌ Error al enviar notificación al backend:", e.message);
    }
  };

  useEffect(() => {
    if (!ubicacionCamion || !ubicacionUsuario || !window.google?.maps?.geometry)
      return;

    const puntoCamion = new google.maps.LatLng(
      ubicacionCamion.lat,
      ubicacionCamion.lng
    );
    const puntoUsuario = new google.maps.LatLng(
      ubicacionUsuario.lat,
      ubicacionUsuario.lng
    );

    // Distancia en metros
    const distancia = google.maps.geometry.spherical.computeDistanceBetween(
      puntoCamion,
      puntoUsuario
    );
    const distanciaKm = distancia / 1000;

    // Estimación simple de ETA (ejemplo: 30 km/h)
    const velocidadKmH = 30;
    const etaMin = (distanciaKm / velocidadKmH) * 60;

    // 🚨 Primera alerta si entra en rango de 2 km
    if (distanciaKm <= 2 && ultimaDistancia === null) {
      toast.info("🚚 El camión está cerca, prepárate!");
      setUltimaDistancia(distanciaKm);
      setContadorNotificaciones(1);

      // 👉 dispara al backend
      notifyBackend(distanciaKm, etaMin);
    }

    // 🔁 Recordatorio cada 500m menos, máximo 3 notificaciones
    if (
      ultimaDistancia !== null &&
      distanciaKm <= ultimaDistancia - 0.5 &&
      contadorNotificaciones < 3
    ) {
      toast.info(`📍 El camión está a ~${distanciaKm.toFixed(1)} km`);
      setUltimaDistancia(distanciaKm);
      setContadorNotificaciones((prev) => prev + 1);

      // 👉 dispara al backend
      notifyBackend(distanciaKm, etaMin);
    }
  }, [
    ubicacionCamion,
    ubicacionUsuario,
    ultimaDistancia,
    contadorNotificaciones,
  ]);

  return null; // No renderiza nada visible, solo dispara la alerta
};

export default AlertaProximidad;
