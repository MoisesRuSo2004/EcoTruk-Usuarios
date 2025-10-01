import React, { useState, useEffect } from "react";
import { MapPin, User, Settings, Calendar, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ onClose }) => {
  const [activeItem, setActiveItem] = useState("tracking");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.sub);
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    }
  }, []);

  const menuItems = [
    {
      id: "tracking",
      icon: <MapPin size={18} />,
      label: "Seguimiento de Camiones",
      path: "/tracking",
    },
    {
      id: "calendar",
      icon: <Calendar size={18} />,
      label: "Calendario",
      path: "/calendario",
    },
    {
      id: "notifications",
      icon: <Bell size={18} />,
      label: "Notificaciones",
      path: "/notificaciones",
    },
    {
      id: "profile",
      icon: <User size={18} />,
      label: "Mi Perfil",
      path: "/perfil",
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      label: "Configuración",
      path: "/configuracion",
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.path) navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  {
    showLogoutModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-white rounded-xl shadow-xl p-6 w-[300px] text-center">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">
            ¿Cerrar sesión?
          </h4>
          <p className="text-sm text-gray-600 mb-6">
            Tu sesión se cerrará y volverás al inicio.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
            >
              <LogOut size={16} className="inline mr-1" />
              Salir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="h-[520px] w-70 bg-slate-800 text-slate-100 flex flex-col shadow-lg">
      {/* Header */}
      <div className="bg-slate-700 border-b border-slate-600 px-4 py-5 relative text-center">
        <button
          className="absolute top-4 right-4 text-slate-300 hover:text-white text-lg"
          aria-label="Cerrar sidebar"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <h6 className="text-base font-semibold">{userName}</h6>
          <small className="text-slate-400 text-sm">Ciudadano</small>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`w-full text-left px-5 py-3 flex items-center gap-3 text-sm transition ${
              activeItem === item.id
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            aria-current={activeItem === item.id ? "page" : undefined}
          >
            <span
              className={`${
                activeItem === item.id ? "opacity-100" : "opacity-80"
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="bg-slate-700 border-t border-slate-600 px-5 py-4 text-center">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            navigate("/login");
          }}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2 text-sm transition"
        >
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
