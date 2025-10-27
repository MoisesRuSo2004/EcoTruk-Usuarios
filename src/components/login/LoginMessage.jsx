import { motion, AnimatePresence } from "framer-motion";

const LoginMessage = ({ mensajes, index }) => (
  <div className="h-10 mb-8 overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.p
        key={index}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.8 }}
        className="text-gray-800 text-2xl font-medium"
      >
        {mensajes[index]}
      </motion.p>
    </AnimatePresence>
  </div>
);

export default LoginMessage;
