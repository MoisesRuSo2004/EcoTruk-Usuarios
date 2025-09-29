import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

export default function CalendarView() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        color: "#e6edf3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div>
        {/* Controles del calendario */}
        <div
          style={{
            backgroundColor: "#161b22",
            border: "1px solid #30363d",
            borderRadius: "8px 8px 0 0",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#8b949e",
                border: "1px solid #30363d",
                borderRadius: "4px",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#21262d";
                e.target.style.borderColor = "#58a6ff";
                e.target.style.color = "#e6edf3";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "#30363d";
                e.target.style.color = "#8b949e";
              }}
              onClick={() => navigate("/home")}
            >
              Volver
            </button>
          </div>
        </div>

        {/* Calendario embebido con tema dark */}
        <div
          style={{
            border: "1px solid #30363d",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            backgroundColor: "#161b22",
          }}
        >
          <iframe
            src="https://calendar.google.com/calendar/embed?src=e6bc1fa011d1a91b5a0f27628c5f56b0b3ae9c293dea64a665541ecbca7421b0%40group.calendar.google.com&ctz=America%2FBogota&bgcolor=%23161b22&color=%233fb950"
            title="Calendario de recolección"
            frameBorder="0"
            scrolling="no"
            style={{
              width: "100%",
              height: "600px",
              filter: "invert(1) hue-rotate(180deg)", // Aplica tema dark al iframe
              borderRadius: "0 0 8px 8px",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
