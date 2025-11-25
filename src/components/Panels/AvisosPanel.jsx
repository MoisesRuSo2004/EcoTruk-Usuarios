import React from "react";

const AvisosPanel = () => {
  const opciones = [
    {
      id: 1,
      titulo: "Basura no recogida",
      img: "/alertas/basura_no_recogida.svg",
    },
    {
      id: 2,
      titulo: "Punto crítico de basura",
      img: "/alertas/punto_critico_de_basura.svg",
    },
    {
      id: 3,
      titulo: "Retraso o incumplimiento de ruta",
      img: "/alertas/retraso_ruta.svg",
    },
    {
      id: 4,
      titulo: "Problema ambiental",
      img: "/alertas/problema_ambiental.svg",
    },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center", color: "#333" }}>
      <h4 style={{ marginBottom: "1.5rem", fontWeight: "600", fontSize: "1.2rem" }}>
        ¿Qué quieres avisar?
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {opciones.map((op) => (
          <div
            key={op.id}
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1.2rem",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#eef6ff";
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f9f9f9";
              e.currentTarget.style.borderColor = "#ddd";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={op.img}
              alt={op.titulo}
              style={{
                width: "60px",
                height: "60px",
                marginBottom: "0.8rem",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontSize: "0.95rem",
                fontWeight: "500",
                textAlign: "center",
                color: "#222",
              }}
            >
              {op.titulo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvisosPanel;
