import React, { useState, useRef, useEffect } from "react";
import "./BottomSheet.css";
import InfoPanel from "../Panels/InfoPanel";
import AvisosPanel from "../Panels/AvisosPanel";

const BottomSheet = ({ currentPanel, onHeightChange }) => {
  const minHeight = 80; // cerrado
  const maxHeight = window.innerHeight * 0.6; // 60% de pantalla

  const [height, setHeight] = useState(minHeight);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  // 🔔 Avisar al padre cada vez que cambia la altura
  useEffect(() => {
    if (onHeightChange) onHeightChange(height);
  }, [height]);

  const renderContent = () => {
    switch (currentPanel) {
      case "avisos":
        return <AvisosPanel />;
      default:
        return <InfoPanel />;
    }
  };

  // ⬆️⬇️ Toggle con click
  const handleToggle = () => {
    setHeight(height === minHeight ? maxHeight : minHeight);
  };

  // 👉 Arrastre empieza
  const handleDragStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight.current = height;
  };

  // 👉 Arrastre en movimiento
  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const diff = startY.current - clientY;
    let newHeight = startHeight.current + diff;

    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;

    setHeight(newHeight);
  };

  // 👉 Arrastre termina (snap automático)
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (height > maxHeight / 2) {
      setHeight(maxHeight); // se abre más
    } else {
      setHeight(minHeight); // baja
    }
  };

  return (
    <div
      className="bottom-sheet"
      style={{ height: `${height}px` }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="drag-handle"
        onClick={handleToggle}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      ></div>
      <div className="sheet-content">{renderContent()}</div>
    </div>
  );
};

export default BottomSheet;
