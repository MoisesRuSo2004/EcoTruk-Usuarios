/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta EcoTruck
        primary: {
          DEFAULT: "#2ECC71", // Verde principal
          dark: "#27AE60", // Hover / activo
          light: "#A3E635", // Verde lima de acento
        },
        surface: {
          DEFAULT: "#1E293B", // Fondo de componentes
          dark: "#0F172A", // Fondo del mapa o global oscuro
        },
        text: {
          DEFAULT: "#E2E8F0", // Texto principal (blanco suave)
          secondary: "#94A3B8", // Texto secundario / inactivo
        },
        error: "#F87171",
        success: "#A3E635",
      },

      // 🧠 Tipografía
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
      },

      // 🌟 Sombras personalizadas
      boxShadow: {
        glow: "0 4px 12px rgba(46, 204, 113, 0.3)",
        glowHover: "0 6px 16px rgba(39, 174, 96, 0.4)",
      },

      // 🎨 Bordes redondeados
      borderRadius: {
        xl: "12px",
      },
    },
  },

  // 🧩 Plugins
  plugins: [require("daisyui")],

  // 🧱 Configuración DaisyUI (modo oscuro por defecto)
  daisyui: {
    themes: [
      {
        ecotruck: {
          primary: "#2ECC71",
          "primary-focus": "#27AE60",
          "primary-content": "#FFFFFF",

          secondary: "#A3E635",
          accent: "#1ABC9C",
          neutral: "#1E293B",
          "base-100": "#0F172A",
          info: "#38BDF8",
          success: "#A3E635",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
    ],
    darkTheme: "ecotruck",
  },
};
