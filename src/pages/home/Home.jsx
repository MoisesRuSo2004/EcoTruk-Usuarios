import React, { useState, useEffect } from "react";
import MapView from "../../components/mapview/MapView";
import FloatingButtons from "../../components/floatingbuttons/FloatingButtons";
import BottomSheet from "../../components/BottomSheet/PanelFlotante";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getRutasActivas } from "../../service/rutaService";
import { avanzarCamion } from "../../service/rutaService";
import CalendarioModal from "../../components/modal/CalendarioModal";
import NotificacionesModal from "../../components/modal/NotificacionesModal";

const estiloPorTipo = {
  primary:
    "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
  success:
    "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
  warning:
    "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
  info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
  light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
  dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
};

const Home = () => {
  const [currentPanel, setCurrentPanel] = useState("info");
  const [bottomSheetHeight, setBottomSheetHeight] = useState(80);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [ubicacionCamion, setUbicacionCamion] = useState(null);
  const [camionesActivos, setCamionesActivos] = useState([]);

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

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100 font-sans">
      {sidebarOpen && (
        <div className="absolute top-0 left-0 h-full w-64 z-40">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Mapa fullscreen detrás */}
      <div className="absolute inset-0 z-10">
        <MapView camionesActivos={camionesActivos} />
      </div>

      {/* Botones flotantes tipo Uber */}
      <FloatingButtons
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        setCurrentPanel={setCurrentPanel} // ✅ esto es clave
        bottomSheetHeight={bottomSheetHeight}
        onRecenter={() => console.log("Recentrar mapa")}
        // puedes agregar más props si lo necesitas
      />

      {/* Panel inferior deslizable */}
      <div
        className="absolute bottom-0 left-0 w-full bg-gray-800 rounded-t-2xl shadow-xl z-50 transition-all"
        style={{ height: `${bottomSheetHeight}px` }}
      >
        <BottomSheet
          currentPanel={currentPanel}
          onHeightChange={setBottomSheetHeight}
        />
      </div>
      {/* ✅ Aquí montamos el modal */}
      <CalendarioModal />
      <NotificacionesModal />
    </div>
  );
};

export default Home;
