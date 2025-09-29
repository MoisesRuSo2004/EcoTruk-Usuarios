import React, { useState } from "react";
import MapView from "../../components/mapview/MapView";
import FloatingButtons from "../../components/floatingbuttons/FloatingButtons";
import BottomSheet from "../../components/BottomSheet/PanelFlotante";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
  const [currentPanel, setCurrentPanel] = useState("info");
  const [bottomSheetHeight, setBottomSheetHeight] = useState(80);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-gray-100 font-sans">
      {sidebarOpen && (
        <div className="absolute top-0 left-0 h-full w-64 z-40">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Mapa fullscreen detrás */}
      <div className="absolute inset-0 z-10">
        <MapView />
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
