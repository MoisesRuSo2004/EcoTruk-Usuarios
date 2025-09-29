/* global google */
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import truckIcon from "../../assets/truck/truck.png";
import ubicacionIcon from "../../../public/ubicacion.svg";

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
  const [mapType, setMapType] = useState("roadmap");

  useEffect(() => {
    console.log("🧭 MapView mounted");
    console.log("📦 mapRef.current:", mapRef.current);

    if (!mapRef.current) {
      console.error(
        "❌ mapRef.current is null. El contenedor del mapa no existe."
      );
      return;
    }

    const loader = new Loader({
      apiKey: "AIzaSyA4cpX2UWFERFOLEWasaZo8cePYke-G1W0",
      version: "weekly",
    });

    loader
      .load()
      .then(() => {
        console.log("✅ Google Maps API cargada");

        try {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 10.391, lng: -75.4794 }, // Cartagena centro
            zoom: 14,
            styles: darkStyle,
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,

            // 🔹 Restringir área visible al usuario
            restriction: {
              latLngBounds: {
                north: 10.55, // límite norte
                south: 10.3, // límite sur
                west: -75.6, // límite oeste
                east: -75.4, // límite este
              },
              strictBounds: true, // evita que el usuario salga de ese rectángulo
            },
          });

          mapInstance.current = map;
          console.log("🗺️ Mapa creado correctamente");

          new google.maps.Marker({
            position: { lat: 10.391, lng: -75.4794 },
            map,
            icon: {
              url: ubicacionIcon,
              scaledSize: new google.maps.Size(50, 60),
            },
          });

          console.log("📍 Marcador agregado");
        } catch (err) {
          console.error("❌ Error al crear el mapa:", err);
        }
      })
      .catch((err) => {
        console.error("❌ Error al cargar Google Maps API:", err);
      });
  }, []);

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
      {/* Mapa */}
      <div
        ref={mapRef}
        className="absolute top-0 left-0 w-full h-full z-10 bg-gray-900"
      />
    </div>
  );
};

export default MapView;
