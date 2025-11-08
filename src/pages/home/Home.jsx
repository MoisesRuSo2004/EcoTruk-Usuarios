import React, { useState, useEffect } from "react";
import MapView from "../../components/mapview/MapView";
import FloatingButtons from "../../components/floatingbuttons/FloatingButtons";
import BottomSheet from "../../components/BottomSheet/PanelFlotante";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getRutasActivas } from "../../service/rutaService";
import { avanzarCamion } from "../../service/rutaService";
import CalendarioModal from "../../components/modal/CalendarioModal";
import NotificacionesModal from "../../components/modal/NotificacionesModal";
import { useSimulacionUbicacion } from "../../hooks/useSimulacionUbicacion";
import BotonConectar from "../../components/floatingbuttons/BotonConectar";
import ModalEcoTruck from "../../components/modal/ModalEcoTruck";

const Home = () => {
  const [currentPanel, setCurrentPanel] = useState("info");
  const [bottomSheetHeight, setBottomSheetHeight] = useState(80);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [ubicacionCamion, setUbicacionCamion] = useState(null);
  const [camionesActivos, setCamionesActivos] = useState([]);
  const { info, simularConexion } = useSimulacionUbicacion();
  const [mostrarModalUbicacion, setMostrarModalUbicacion] = useState(false);
  const [ubicacionReal, setUbicacionReal] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  {
    showLogoutModal && (
      <LogoutModal
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    );
  }

  const handleConectar = () => {
    setMostrarModalUbicacion(true);
  };

  const usarSimulacion = () => {
    simularConexion(); // ya lo tienes
    setCurrentPanel("info");
  };

  const usarUbicacionReal = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const ubicacion = { lat: latitude, lng: longitude };
        setUbicacionReal(ubicacion); // ✅ guarda ubicación
        setCurrentPanel("info");
      },
      (err) => {
        console.error("❌ Error al obtener ubicación:", err);
        alert("No se pudo obtener tu ubicación. Verifica permisos.");
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    const fetchCamiones = async () => {
      try {
        const response = await getRutasActivas();
        setCamionesActivos(response);
      } catch (err) {
        console.error("❌ Error al obtener camiones activos:", err);
      }
    };

    fetchCamiones();
    const interval = setInterval(fetchCamiones, 3000); // actualiza cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moverTodosLosCamiones = async () => {
      try {
        for (const camion of camionesActivos) {
          if (camion.id) {
            await avanzarCamion(camion.id);
          }
        }
      } catch (err) {
        console.error("❌ Error al mover camiones activos:", err);
      }
    };

    const interval = setInterval(moverTodosLosCamiones, 5000);
    return () => clearInterval(interval);
  }, [camionesActivos]);

  const recenterMapa = () => {
    const ubicacionActiva = ubicacionReal || info?.ubicacion;

    if (!mapInstance || !ubicacionActiva) {
      console.warn("No hay ubicación activa para recentrar");
      return;
    }

    mapInstance.panTo(ubicacionActiva);
    mapInstance.setZoom(15);
  };

  const [mostrarZonas, setMostrarZonas] = useState(false);

  const toggleZonas = () => {
    setMostrarZonas((prev) => !prev);
  };

  useEffect(() => {
    const modal = document.getElementById("modal_anuncio");
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100 font-sans">
      <dialog id="modal_anuncio" className="modal">
        <div className="modal-box max-w-1xl bg-[#f5f6f7] text-[#0F172A] rounded-xl shadow-lg p-0 overflow-hidden">
          <form method="dialog">
            <button
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#0F172A] text-xl"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </form>

          <div className="px-6 py-4 border-b border-[#e6e7e8] bg-[#f5f6f7]">
            <h3 className="font-bold text-lg">Anuncio</h3>
          </div>

          <div className="relative w-full" style={{ paddingTop: "141.41%" }}>
            <iframe
              loading="lazy"
              src="https://www.canva.com/design/DAG2qoDctI4/4lckaYCUenXw-bGfz99ZEA/view?embed"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "0 0 12px 12px",
              }}
              allowFullScreen
              title="Afiche EcoTruck"
            ></iframe>
          </div>
        </div>
      </dialog>

      {sidebarOpen && (
        <div className="absolute top-0 left-0 h-full w-64 z-[100]">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="absolute inset-0 z-10">
        <MapView
          camionesActivos={camionesActivos}
          ubicacionSimulada={info?.ubicacion} // 👈 pasa la ubicación simulada
          ubicacionReal={ubicacionReal} // ✅ nueva prop
          mostrarZonas={mostrarZonas}
          setMapInstance={setMapInstance} // ✅ nueva prop
        />
      </div>

      <FloatingButtons
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        setCurrentPanel={setCurrentPanel}
        bottomSheetHeight={bottomSheetHeight}
        onSimularUbicacion={handleConectar}
        onToggleZonas={toggleZonas}
        mostrarZonas={mostrarZonas} // ✅ esta línea es clave
        onRecenter={recenterMapa}
      />

      <BotonConectar onClick={handleConectar} />

      <div
        className="absolute bottom-0 left-0 w-full bg-gray-800 rounded-t-2xl shadow-xl z-50 transition-all"
        style={{ height: `${bottomSheetHeight}px` }}
      >
        <BottomSheet
          currentPanel={currentPanel}
          onHeightChange={setBottomSheetHeight}
          infoSimulada={info} // 👈 pasa la info simulada al panel
        />
      </div>
      <ModalEcoTruck
        open={mostrarModalUbicacion}
        setOpen={setMostrarModalUbicacion}
        onSimulacion={usarSimulacion}
        onUbicacionReal={usarUbicacionReal}
      />

      <CalendarioModal />
      <NotificacionesModal />
    </div>
  );
};

export default Home;
