import { motion } from "motion/react";
import { Settings2, Info } from "lucide-react";
import { useState } from "react";

const BotonConectar = ({ onClick, setCurrentPanel }) => {
  const [loading, setLoading] = useState(false);
  const [conectado, setConectado] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onClick(); // dispara tu lógica de conexión

    // Simula tiempo de conexión (ej. 3 segundos)
    setTimeout(() => {
      setLoading(false);
      setConectado(true);
      setCurrentPanel("info"); // 👈 cuando conecta, abre InfoPanel
    }, 3000);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[60]">
      <div className="bg-[#f5f6f7] border-t border-[#E0E0E0] px-6 py-4 pointer-events-auto shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between">
        {/* Botón de ajustes */}
        <button className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none">
          <Settings2 size={40} />
        </button>

        {/* Botón Conectar */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: conectado ? 1 : 1.05 }}
          whileTap={{ scale: conectado ? 1 : 0.95 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.4 },
          }}
          className={`w-80 max-w-md mx-auto text-white text-center py-3 rounded-full shadow-lg font-semibold text-base transition-all duration-200 ${
            conectado
              ? "bg-green-700 hover:bg-green-800"
              : "bg-[#008543] hover:bg-[#145A32]"
          }`}
          onClick={handleClick}
          aria-label="Conectar"
          disabled={loading || conectado}
        >
          {loading ? (
            <motion.span
              className="flex items-center justify-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.0 }}
            >
              <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Conectando...
            </motion.span>
          ) : conectado ? (
            "Conectado"
          ) : (
            "Conectar"
          )}
        </motion.button>

        {/* Botón de info */}
        <button
          className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none"
          onClick={() => setCurrentPanel("info")} // 👈 cambia al InfoPanel
        >
          <Info size={40} />
        </button>
      </div>
    </div>
  );
};

export default BotonConectar;
