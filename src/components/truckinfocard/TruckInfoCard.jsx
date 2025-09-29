import React from "react";
import "./TruckInfoCard.css";

const TruckInfoCard = () => {
  return (
    <div className="truck-info-card shadow-lg p-3">
      <h6 className="text-success fw-bold">EN SERVICIO</h6>
      <p className="mb-1">
        Camión: <strong>M-502</strong>
      </p>
      <p className="text-muted mb-2">
        Arturo Prat 3-26, Los Andes, Valparaíso Región, Chile
      </p>
      <div className="progress" style={{ height: "8px" }}>
        <div className="progress-bar bg-success" style={{ width: "32%" }}></div>
      </div>
      <small className="text-muted">Obteniendo posición del camión (32%)</small>
    </div>
  );
};

export default TruckInfoCard;
