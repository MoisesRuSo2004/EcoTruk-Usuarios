import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    open: true, // Abre el navegador automáticamente en desarrollo
  },
  build: {
    outDir: "dist", // Carpeta de salida para Azure
    assetsDir: "assets", // Carpeta para imágenes, fuentes, etc.
    sourcemap: false, // Desactiva mapas de fuente en producción
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Importaciones absolutas
    },
  },
  define: {
    "process.env": {}, // Evita errores si alguna lib usa process.env
  },
});
