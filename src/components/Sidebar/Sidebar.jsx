import React, { useState, useEffect } from "react";
import { MapPin, User, Settings, Calendar, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../index.css";

const Sidebar = ({ onClose }) => {
  const [activeItem, setActiveItem] = useState("tracking");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.sub);
      } catch (err) {
        console.error("Error al decodificar token:", err);
      }
    }
  }, []);

  const menuItems = [
    { id: "calendar", icon: <Calendar size={18} />, label: "Calendario" },
    {
      id: "notifications",
      icon: <Bell size={18} />,
      label: "Notificaciones",
      //path: "/notificaciones",
    },
    {
      id: "profile",
      icon: <User size={18} />,
      label: "Perfil",
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
    if (item.id === "calendar") {
      document.getElementById("modal_calendario")?.showModal();
      return;
    }
    if (item.id === "notifications") {
      document.getElementById("modal_notificaciones")?.showModal();
      return;
    }

    if (item.path) navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  return (
    <aside className="h-[520px] w-72 bg-[#1E293B] text-slate-100 flex flex-col rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
      <div className="p-5 flex flex-col items-center relative bg-[#0F172A]">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-600 to-sky-400 flex items-center justify-center text-white font-semibold text-lg mb-3 shadow-inner">
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </div>

        <h6 className="text-sm font-semibold text-white">
          {userName || "Usuario"}
        </h6>
        <small className="text-xs text-slate-400">Ciudadano</small>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
          ${
            activeItem === item.id
              ? "bg-gradient-to-r from-sky-600 to-sky-400 text-white shadow-md"
              : "hover:bg-[#334155] text-slate-300 hover:text-white"
          }`}
          >
            <span
              className={`transition-transform ${
                activeItem === item.id
                  ? "scale-110 text-white"
                  : "text-slate-400"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-[#0F172A]">
        <button
          onClick={handleLogout}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
