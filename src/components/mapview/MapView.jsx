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
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [rutasActivas, setRutasActivas] = useState([]);
  const [infoRuta, setInfoRuta] = useState({ distancia: "", tiempo: "" });
  const [camionesActivos, setCamionesActivos] = useState([]);

  // 🗺️ Inicializa el mapa
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

    if (!apiKey) {
      console.error("❌ No se encontró la API Key de Google Maps");
      return;
    }

    const loader = new Loader({
      apiKey,
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

      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true, // 👈 elimina íconos automáticos
        polylineOptions: {
          strokeColor: "#007BFF", // azul elegante
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });
      directionsRendererRef.current.setMap(map);
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

  // 🛣️ Trazar ruta entre camión y usuario
  const trazarRuta = (origen, destino) => {
    if (
      !origen ||
      !destino ||
      !directionsServiceRef.current ||
      !directionsRendererRef.current
    )
      return;

    directionsServiceRef.current.route(
      {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRendererRef.current.setDirections(result);
          const leg = result.routes[0].legs[0];
          setInfoRuta({
            distancia: leg.distance.text,
            tiempo: leg.duration.text,
          });
          console.log("🛣️ Distancia:", leg.distance.text);
          console.log("⏱️ Tiempo estimado:", leg.duration.text);
        } else {
          console.error("❌ Error al calcular ruta:", status);
        }
      }
    );
  };

  // 🔁 Actualiza ruta entre camión y usuario
  useEffect(() => {
    const ubicacionCamion = camionesActivos[0]?.ubicacionActual;

    const ubicacionValida =
      ubicacionCamion &&
      typeof ubicacionCamion.lat === "number" &&
      typeof ubicacionCamion.lng === "number";

    if (!ubicacionSimulada || !ubicacionValida || !mapInstance.current) {
      // 🧹 Limpiar ruta si no hay ubicación válida
      if (directionsRendererRef.current) {
        directionsRendererRef.current.setDirections({ routes: [] });
      }
      setInfoRuta({ distancia: "", tiempo: "" });
      return;
    }

    trazarRuta(ubicacionCamion, ubicacionSimulada);
  }, [ubicacionSimulada, camionesActivos]);

  // 🔄 Actualiza camiones cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      getRutasVisualizacion()
        .then((camiones) => {
          setCamionesActivos(camiones);
          renderizarCamiones(camiones);
        })
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

      {infoRuta.distancia && infoRuta.tiempo && (
        <div className="absolute top-2/3 left-4 transform -translate-y-1/2 bg-white shadow-lg px-6 py-4 rounded-lg z-[9999] text-gray-800 text-sm font-medium">
          🚛 Camión a{" "}
          <span className="text-blue-600">{infoRuta.distancia}</span> — llega en{" "}
          <span className="text-green-600">{infoRuta.tiempo}</span>
        </div>
      )}
    </div>
  );
};
export default MapView;
