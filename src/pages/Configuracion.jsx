import { useState } from "react";
import { Bell, User, Moon, Globe, Shield } from "lucide-react";

export default function Configuracion() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);
  const [idioma, setIdioma] = useState("es");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        modoOscuro ? "bg-[#0e1a14] text-[#eaf4eb]" : "bg-[#f4fdf6] text-[#1b4332]"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1
          className={`text-3xl font-bold text-center mb-10 ${
            modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]"
          }`}
        >
          ⚙️ Configuración
        </h1>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Perfil */}
          <div
            className={`rounded-2xl p-6 shadow-lg transition-all ${
              modoOscuro
                ? "bg-[#1b4332]/60 hover:bg-[#1b4332]/80"
                : "bg-white hover:bg-[#e9f8ee]"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <User className="text-[#52b788]" size={30} />
              <h2
                className={`text-lg font-semibold ${
                  modoOscuro ? "text-[#d8f3dc]" : "text-[#1b4332]"
                }`}
              >
                Perfil
              </h2>
            </div>
            <p
              className={`text-sm mb-4 ${
                modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]/70"
              }`}
            >
              Consulta y actualiza tu información personal.
            </p>
            <button className="bg-[#40916c] hover:bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm transition-all">
              Editar perfil
            </button>
          </div>

          {/* Notificaciones */}
          <div
            className={`rounded-2xl p-6 shadow-lg transition-all ${
              modoOscuro
                ? "bg-[#1b4332]/60 hover:bg-[#1b4332]/80"
                : "bg-white hover:bg-[#e9f8ee]"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <Bell className="text-[#52b788]" size={30} />
              <h2
                className={`text-lg font-semibold ${
                  modoOscuro ? "text-[#d8f3dc]" : "text-[#1b4332]"
                }`}
              >
                Notificaciones
              </h2>
            </div>
            <p
              className={`text-sm mb-4 ${
                modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]/70"
              }`}
            >
              Recibe alertas sobre recolecciones y novedades.
            </p>
            <button
              onClick={() => setNotificaciones(!notificaciones)}
              className={`w-full py-2 rounded-xl text-sm font-medium transition-all ${
                notificaciones
                  ? "bg-[#40916c] text-white hover:bg-[#2d6a4f]"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              {notificaciones ? "Activadas" : "Desactivadas"}
            </button>
          </div>

          {/* Modo visual */}
          <div
            className={`rounded-2xl p-6 shadow-lg transition-all ${
              modoOscuro
                ? "bg-[#1b4332]/60 hover:bg-[#1b4332]/80"
                : "bg-white hover:bg-[#e9f8ee]"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <Moon className="text-[#52b788]" size={30} />
              <h2
                className={`text-lg font-semibold ${
                  modoOscuro ? "text-[#d8f3dc]" : "text-[#1b4332]"
                }`}
              >
                Modo visual
              </h2>
            </div>
            <p
              className={`text-sm mb-4 ${
                modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]/70"
              }`}
            >
              Cambia entre modo claro u oscuro.
            </p>
            <button
              onClick={() => setModoOscuro(!modoOscuro)}
              className="w-full py-2 rounded-xl bg-[#40916c] text-white hover:bg-[#2d6a4f] text-sm font-medium transition-all"
            >
              {modoOscuro ? "Modo Oscuro" : "Modo Claro"}
            </button>
          </div>

          {/* Idioma */}
          <div
            className={`rounded-2xl p-6 shadow-lg transition-all ${
              modoOscuro
                ? "bg-[#1b4332]/60 hover:bg-[#1b4332]/80"
                : "bg-white hover:bg-[#e9f8ee]"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <Globe className="text-[#52b788]" size={30} />
              <h2
                className={`text-lg font-semibold ${
                  modoOscuro ? "text-[#d8f3dc]" : "text-[#1b4332]"
                }`}
              >
                Idioma
              </h2>
            </div>
            <p
              className={`text-sm mb-4 ${
                modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]/70"
              }`}
            >
              Selecciona el idioma de la aplicación.
            </p>
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded-xl px-3 py-2 text-sm"
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>

          {/* Privacidad */}
          <div
            className={`rounded-2xl p-6 shadow-lg transition-all sm:col-span-2 ${
              modoOscuro
                ? "bg-[#1b4332]/60 hover:bg-[#1b4332]/80"
                : "bg-white hover:bg-[#e9f8ee]"
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <Shield className="text-[#52b788]" size={30} />
              <h2
                className={`text-lg font-semibold ${
                  modoOscuro ? "text-[#d8f3dc]" : "text-[#1b4332]"
                }`}
              >
                Privacidad y seguridad
              </h2>
            </div>
            <p
              className={`text-sm mb-4 ${
                modoOscuro ? "text-[#b7efc5]" : "text-[#2d6a4f]/70"
              }`}
            >
              Gestiona tu contraseña o elimina tu cuenta si lo deseas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-[#40916c] hover:bg-[#2d6a4f] text-white px-4 py-2 rounded-xl text-sm transition-all">
                Cambiar contraseña
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm transition-all">
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-10 text-[#74c69d] opacity-80">
          © {new Date().getFullYear()} EcoTruk — Todos los derechos reservados
        </p>
      </div>
    </div>
  );
}
