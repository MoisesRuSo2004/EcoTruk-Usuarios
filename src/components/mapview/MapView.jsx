/* global google */
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import truckIcon from "../../assets/truck/truck.png";
import ubicacionIcon from "../../../public/ubicacion.svg";
import { getRutasVisualizacion } from "../../service/rutaService";

const darkStyle = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#e2e8f0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#334155" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e3b59" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#14532d" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#22c55e" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
];

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const [mapType, setMapType] = useState("roadmap");

  // 🔄 Actualiza camiones cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      getRutasVisualizacion()
        .then((camiones) => renderizarCamiones(camiones))
        .catch((err) => console.error("❌ Error al obtener rutas:", err));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🗺️ Inicializa el mapa
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA4cpX2UWFERFOLEWasaZo8cePYke-G1W0",
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 10.391, lng: -75.4794 },
        zoom: 14,
        styles: darkStyle,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: {
            north: 10.55,
            south: 10.3,
            west: -75.6,
            east: -75.4,
          },
          strictBounds: true,
        },
      });

      mapInstance.current = map;

      new google.maps.Marker({
        position: { lat: 10.391, lng: -75.4794 },
        map,
        icon: {
          url: ubicacionIcon,
          scaledSize: new google.maps.Size(50, 60),
        },
      });
    });
  }, []);

  // 🚚 Renderiza camiones y detecta movimiento
  const renderizarCamiones = (camiones) => {
    if (!mapInstance.current) {
      console.warn("⚠️ mapInstance no está listo");
      return;
    }

    console.log("🔄 Actualizando camiones en el mapa...");

    // Limpia anteriores
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    camiones.forEach((camion, index) => {
      const { ubicacionActual, nombre, id } = camion;

      if (
        !ubicacionActual ||
        typeof ubicacionActual.lat !== "number" ||
        typeof ubicacionActual.lng !== "number"
      ) {
        console.warn(
          `⚠️ Coordenadas inválidas para camión ${nombre || id}:`,
          ubicacionActual
        );
        return;
      }

      // Crear nuevo marcador
      const marker = new google.maps.Marker({
        position: ubicacionActual,
        map: mapInstance.current,
        icon: {
          url: truckIcon,
          scaledSize: new google.maps.Size(60, 60),
          anchor: new google.maps.Point(30, 30),
        },
        title: nombre || `Camión ${id}`,
        label: {
          text: nombre || `Camión ${id}`,
          color: "#ffffff",
          fontSize: "12px",
          fontWeight: "bold",
        },
      });

      // Detectar si el camión se movió
      const prevMarker = markersRef.current[index];
      const prevPos = prevMarker?.getPosition?.();
      const moved =
        !prevPos ||
        Math.abs(prevPos.lat() - ubicacionActual.lat) > 0.00001 ||
        Math.abs(prevPos.lng() - ubicacionActual.lng) > 0.00001;

      if (moved) {
        console.log(
          `🚚 Camión ${nombre || id} se movió a (${ubicacionActual.lat}, ${
            ubicacionActual.lng
          })`
        );
      } else {
        console.log(`🧍 Camión ${nombre || id} no se ha movido`);
      }

      markersRef.current.push(marker);
    });
  };

  const zoomIn = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom() + 1);
    }
  };

  const zoomOut = () => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapInstance.current.getZoom() - 1);
    }
  };

  const toggleMapType = () => {
    if (mapInstance.current) {
      const newType = mapType === "roadmap" ? "satellite" : "roadmap";
      mapInstance.current.setMapTypeId(newType);
      setMapType(newType);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div
        ref={mapRef}
        className="absolute top-0 left-0 w-full h-full z-10 bg-gray-900"
      />
    </div>
  );
};

export default MapView;
