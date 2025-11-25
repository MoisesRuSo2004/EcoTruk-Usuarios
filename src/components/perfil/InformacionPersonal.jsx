import React, { useState, useEffect } from "react";
import { User, Mail, Camera } from "lucide-react";
import {
  getPerfilUsuario,
  actualizarUsuario,
} from "../../service/usuarioService";

const InformacionPersonal = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", correo: "" });
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const perfil = await getPerfilUsuario();
        console.log("👤 Perfil cargado:", perfil); // 👈 log aquí
        setUsuario(perfil);
        setFormData({
          nombre: perfil.nombre || "",
          correo: perfil.correo || "",
        });
      } catch (err) {
        console.error("❌ Error al cargar perfil:", err);
        setMensaje("❌ No se pudo cargar el perfil");
      }
    };

    cargarPerfil();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagen(file);
    } else {
      setMensaje("❌ Solo se permiten archivos de imagen");
    }
  };

  const handleGuardar = async () => {
    if (guardando || !(usuario?.id || usuario?._id)) {
      console.warn("⏸ Guardado cancelado: ya está guardando o no hay usuario");
      return;
    }

    console.log("▶ Iniciando guardado de cambios...");
    setGuardando(true);
    setMensaje("");

    try {
      const form = new FormData();
      form.append("nombre", formData.nombre);
      form.append("correo", formData.correo);
      if (imagen) {
        console.log("📷 Imagen seleccionada:", imagen.name);
        form.append("imagen", imagen);
      }

      // ✅ ahora soporta tanto id como _id
      const id = usuario.id || usuario._id?.$oid || usuario._id;
      console.log("🆔 ID del usuario a actualizar:", id);

      const response = await actualizarUsuario(id, form);
      console.log("✅ Respuesta del servidor:", response);

      setMensaje("✅ Cambios guardados correctamente");
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
      setMensaje("❌ No se pudieron guardar los cambios");
    } finally {
      console.log("🏁 Finalizando guardado...");
      setGuardando(false);
    }
  };

  if (!usuario) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  return (
    <div className="p-6 md:p-10 w-full max-w-4xl mx-auto">
      {/* Título */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Información personal
      </h1>

      {/* Card principal */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md group cursor-pointer">
            {imagen ? (
              <img
                src={URL.createObjectURL(imagen)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : usuario.fotoPerfil ? (
              <img
                src={usuario.fotoPerfil}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            )}

            {/* Hover icono */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition grid place-items-center">
              <Camera className="text-white w-7 h-7" />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Cambiar foto de perfil
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-7">
          {/* Nombre */}
          <div>
            <label className="text-sm text-gray-600">Nombre completo</label>
            <div className="mt-1 flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-green-600 transition">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Correo */}
          <div>
            <label className="text-sm text-gray-600">Correo electrónico</label>
            <div className="mt-1 flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-green-600 transition">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Guardar */}
        <div className="mt-10">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className={`px-6 py-3 rounded-xl font-medium text-white shadow-md transition
              ${
                guardando
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-700 hover:bg-green-800"
              }`}
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>

          {mensaje && (
            <p
              className={`mt-3 text-sm ${
                mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformacionPersonal;
