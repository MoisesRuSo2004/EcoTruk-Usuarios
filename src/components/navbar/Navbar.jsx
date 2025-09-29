import React from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/TRUCK.png"; // Usa tu logo aquí
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="navbar-ecotruck d-flex align-items-center justify-content-between px-3">
      <div className="d-flex align-items-center">
        <button
          className="btn text-white me-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
        >
          <FaBars size={24} />
        </button>
        <img src={logo} alt="Ecotruck" className="navbar-logo" />
      </div>
      <span className="navbar-title text-white fw-bold">Mapa de mi sector</span>
    </header>
  );
};

export default Navbar;
