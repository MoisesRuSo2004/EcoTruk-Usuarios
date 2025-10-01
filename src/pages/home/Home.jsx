import React, { useState, useEffect } from "react";
import MapView from "../../components/mapview/MapView";
import FloatingButtons from "../../components/floatingbuttons/FloatingButtons";
import BottomSheet from "../../components/BottomSheet/PanelFlotante";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getRutasActivas } from "../../service/rutaService";

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
        setCamionesActivos(response.data);
      } catch (err) {
        console.error("❌ Error al obtener camiones activos:", err);
      }
    };

    fetchCamiones();
    const interval = setInterval(fetchCamiones, 3000); // actualiza cada 3 segundos
    return () => clearInterval(interval);
  }, []);

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
    </div>
  );
};

export default Home;
