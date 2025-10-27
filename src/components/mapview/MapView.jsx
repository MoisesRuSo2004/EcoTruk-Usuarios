/* global google */
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import truckIcon from "../../assets/truck/truck.png";
import { getRutasVisualizacion } from "../../service/rutaService";
import ZonasDelimitadas from "./ZonasDelimitadas";
import Lottie from "lottie-react";
import ubicacionAnimada from "../../assets/animation/Dot loading.json";
import { createRoot } from "react-dom/client";

const MapView = ({
  ubicacionSimulada,
  ubicacionReal,
  mostrarZonas,
  setMapInstance,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const overlaysRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);
  const [rutasActivas, setRutasActivas] = useState([]);

  // 🗺️ Inicializa el mapa
  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyA4cpX2UWFERFOLEWasaZo8cePYke-G1W0",
      version: "weekly",
      libraries: ["geometry"],
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 10.391, lng: -75.4794 },
        zoom: 14,
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
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT,
        },
      });

      mapInstance.current = map;
      setMapInstance(map);
      setMapReady(true);
    });
  }, []);

  // 🔄 Cargar rutas activas
  useEffect(() => {
    getRutasVisualizacion()
      .then(setRutasActivas)
      .catch((err) => console.error("❌ Error al obtener rutas activas:", err));
  }, []);

  // 📍 Validar proximidad a rutas
  useEffect(() => {
    if (
      !ubicacionSimulada ||
      rutasActivas.length === 0 ||
      !window.google?.maps?.geometry?.spherical
    )
      return;

    const puntoUsuario = new google.maps.LatLng(
      ubicacionSimulada.lat,
      ubicacionSimulada.lng
    );

    for (const ruta of rutasActivas) {
      const puntos = ruta.puntosInterpolados || [];
      for (let i = 0; i < puntos.length - 1; i++) {
        const puntoA = new google.maps.LatLng(puntos[i].lat, puntos[i].lng);
        const puntoB = new google.maps.LatLng(
          puntos[i + 1].lat,
          puntos[i + 1].lng
        );

        const distancia = google.maps.geometry.spherical.computeDistanceBetween(
          puntoUsuario,
          google.maps.geometry.spherical.interpolate(puntoA, puntoB, 0.5)
        );

        if (distancia <= 100) {
          console.log("✅ Ruta cercana:", ruta.nombre);
          console.log("🚚 Camión asignado:", ruta.id);
          return;
        }
      }
    }

    console.log("⚠️ Ubicación fuera de rutas conocidas");
  }, [ubicacionSimulada, rutasActivas]);

  // 📍 Renderiza marcador animado con Lottie
  const renderizarUbicacionAnimada = (ubicacion) => {
    if (!mapInstance.current || !ubicacion) return;

    const overlayDiv = document.createElement("div");
    overlayDiv.style.position = "absolute";
    overlayDiv.style.transform = "translate(-50%, -50%)";
    overlayDiv.style.width = "60px";
    overlayDiv.style.height = "60px";
    overlayDiv.style.zIndex = "999";

    const container = document.createElement("div");
    overlayDiv.appendChild(container);

    const Overlay = class extends google.maps.OverlayView {
      onAdd() {
        const panes = this.getPanes();
        panes.overlayMouseTarget.appendChild(overlayDiv);
      }

      draw() {
        const projection = this.getProjection();
        const position = new google.maps.LatLng(ubicacion.lat, ubicacion.lng);
        const point = projection.fromLatLngToDivPixel(position);
        overlayDiv.style.left = `${point.x}px`;
        overlayDiv.style.top = `${point.y}px`;
      }

      onRemove() {
        overlayDiv.parentNode.removeChild(overlayDiv);
      }
    };

    const overlay = new Overlay();
    overlay.setMap(mapInstance.current);
    overlaysRef.current.push(overlay);

    createRoot(container).render(
      <Lottie animationData={ubicacionAnimada} loop={true} />
    );
  };

  // 🧪 Renderiza simulación
  useEffect(() => {
    if (ubicacionSimulada) {
      renderizarUbicacionAnimada(ubicacionSimulada);
      mapInstance.current?.panTo(ubicacionSimulada);
    }
  }, [ubicacionSimulada]);

  // 📍 Renderiza ubicación real
  useEffect(() => {
    if (ubicacionReal) {
      renderizarUbicacionAnimada(ubicacionReal);
      mapInstance.current?.panTo(ubicacionReal);
    }
  }, [ubicacionReal]);

  // 🚚 Renderiza camiones
  const renderizarCamiones = (camiones) => {
    if (!mapInstance.current) return;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    camiones.forEach((camion) => {
      const { ubicacionActual, nombre, id } = camion;
      if (
        !ubicacionActual ||
        typeof ubicacionActual.lat !== "number" ||
        typeof ubicacionActual.lng !== "number"
      )
        return;

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

      markersRef.current.push(marker);
    });
  };

  // 🔄 Actualiza camiones cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      getRutasVisualizacion()
        .then((camiones) => renderizarCamiones(camiones))
        .catch((err) => console.error("❌ Error al obtener rutas:", err));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div
        ref={mapRef}
        className="absolute top-0 left-0 w-full h-full z-10 bg-gray-900"
      />
      {mapReady && mostrarZonas && (
        <ZonasDelimitadas map={mapInstance.current} visible={mostrarZonas} />
      )}
    </div>
  );
};

export default MapView;
