import { motion } from "motion/react";
import { Settings2, Info } from "lucide-react";

const BotonConectar = ({ onClick }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none z-[60]">
      {/* Contenedor inferior */}
      <div className="bg-[#f5f6f7] border-t border-[#E0E0E0] px-6 py-4 pointer-events-auto shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-center justify-between">
        {/* Botón de ajustes alineado a la izquierda */}
        <button className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none">
          <Settings2 size={40} />
        </button>

        {/* Botón Conectar centrado */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.4 },
          }}
          className="w-80 max-w-md mx-auto bg-[#008543] text-white text-center py-3 rounded-full shadow-lg font-semibold text-base hover:bg-[#145A32] transition-all duration-200"
          onClick={onClick}
          aria-label="Conectar"
        >
          Conectar
        </motion.button>

        {/* Botón de info alineado a la derecha */}
        <button className="p-2 flex items-center justify-center text-green-900 hover:text-green-700 focus:outline-none">
          <Info size={40} />
        </button>
      </div>
    </div>
  );
};

export default BotonConectar;
