import React from "react";

const AvisosPanel = () => {
  const opciones = [
    {
      id: 1,
      titulo: "Basura no recogida",
      img: "../../../public/alertas/basura_no_recogida.svg",
    },
    {
      id: 2,
      titulo: "Punto crítico de basura",
      img: "../../../public/alertas/punto_critico_de_basura.svg",
    },
    {
      id: 3,
      titulo: "Retraso o incumplimiento de ruta",
      img: "../../../public/alertas/retraso_ruta.svg",
    },
    {
      id: 4,
      titulo: "Problema ambiental",
      img: "../../../public/alertas/problema_ambiental.svg",
    },
  ];

  return (
    <div style={{ padding: "10px", textAlign: "center", color: "#e6edf3" }}>
      <h4 style={{ marginBottom: "1.5rem", fontWeight: "normal" }}>
        ¿Qué quieres avisar?
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        {opciones.map((op) => (
          <div
            key={op.id}
            style={{
              backgroundColor: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "12px",
              padding: "1rem",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#21262d";
              e.currentTarget.style.borderColor = "#58a6ff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#161b22";
              e.currentTarget.style.borderColor = "#30363d";
            }}
          >
            <img
              src={op.img}
              alt={op.titulo}
              style={{
                width: "60px",
                height: "60px",
                marginBottom: "0.5rem",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: "normal",
                textAlign: "center",
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
