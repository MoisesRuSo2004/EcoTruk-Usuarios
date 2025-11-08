import React, { useState, useEffect } from "react";
import {
  MapPin,
  User,
  Settings,
  Calendar,
  LogOut,
  Bell,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../index.css";
import { motion } from "framer-motion";

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

  // ✅ Aquí debe estar menuItems
  const menuItems = [
    { id: "calendar", icon: <Calendar size={18} />, label: "Calendario" },
    { id: "notifications", icon: <Bell size={18} />, label: "Notificaciones" },
    {
      id: "profile",
      icon: <User size={18} />,
      label: "Mi Cuenta",
      path: "/perfil",
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      label: "Configuración",
      path: "/configuracion",
    },
  ];

  const navVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        opacity: { duration: 0.3 },
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        opacity: { duration: 0.2 },
      },
    },
  };

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
    <aside className="h-full w-full min-w-[280px] max-w-[320px] bg-[#f5f6f7] text-[#0F172A] flex flex-col rounded-2xl shadow-xl overflow-hidden transition-all duration-300 font-inter">
      {/* 🧑 Encabezado */}
      <div className="p-5 flex flex-col items-center relative bg-[#e6e7e8] shrink-0">
        <button
          className="absolute top-3 right-3 text-[#94A3B8] hover:text-[#0F172A] transition"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold text-lg mb-3 shadow-inner shrink-0">
          {userName ? userName.charAt(0).toUpperCase() : "U"}
        </div>

        <h6 className="text-sm font-semibold whitespace-nowrap">{userName || "Usuario"}</h6>
        <small className="text-xs text-[#94A3B8] whitespace-nowrap">Ciudadano</small>
      </div>

      {/* 📋 Menú */}
      <motion.ul
        initial="closed"
        animate="open"
        variants={navVariants}
        className="flex-1 overflow-y-auto py-3 px-3 space-y-2"
      >
        {menuItems.map((item) => (
          <motion.li
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={() => handleItemClick(item)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeItem === item.id
                  ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                  : "hover:bg-[#e6e7e8] text-[#0F172A]"
              }`}
            >
              <span
                className={`transition-transform shrink-0 ${
                  activeItem === item.id
                    ? "scale-110 text-white"
                    : "text-[#0F172A]"
                }`}
              >
                {item.icon}
              </span>
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {/* 🔒 Logout */}
      <div className="p-4 bg-[#e6e7e8] shrink-0">
        <button
          onClick={handleLogout}
          className="w-full bg-[#008543] hover:bg-[#145A32] text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
        >
          <LogOut size={16} className="shrink-0" />
          <span className="whitespace-nowrap">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;