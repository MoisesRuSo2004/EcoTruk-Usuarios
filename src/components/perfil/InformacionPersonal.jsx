import React, { useState, useEffect } from "react";
import { User, Mail } from "lucide-react";
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
    if (guardando || !usuario?._id) return;
    setGuardando(true);
    setMensaje("");

    try {
      const form = new FormData();
      form.append("nombre", formData.nombre);
      form.append("correo", formData.correo);
      if (imagen) form.append("imagen", imagen);

      const id = usuario._id?.$oid || usuario._id;
      await actualizarUsuario(id, form, true);
      setMensaje("✅ Cambios guardados correctamente");
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
      setMensaje("❌ No se pudieron guardar los cambios");
    } finally {
      setGuardando(false);
    }
  };

  if (!usuario) {
    return <p className="text-center text-gray-500">Cargando perfil...</p>;
  }

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Información personal
      </h1>

      {/* Avatar editable */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {imagen ? (
            <img
              src={URL.createObjectURL(imagen)}
              alt="preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : usuario.fotoPerfil ? (
            <img
              src={usuario.fotoPerfil}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User className="w-12 h-12 text-gray-500" />
          )}
        </div>
        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Cambiar foto de perfil
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="text-sm"
          />
        </div>
      </div>

      {/* Campos */}
      <div className="space-y-6 text-gray-800">
        <div className="border-b pb-4 flex justify-between items-center">
          <div className="w-full">
            <p className="text-sm text-gray-500">Nombre</p>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md text-gray-800"
            />
          </div>
          <User className="text-gray-400 w-4 h-4" />
        </div>

        <div className="border-b pb-4 flex justify-between items-center">
          <div className="w-full">
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md text-gray-800"
            />
          </div>
          <Mail className="text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Botón guardar */}
      <div className="mt-8">
        <button
          onClick={handleGuardar}
          disabled={guardando}
          className={`px-4 py-2 rounded transition ${
            guardando
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-800 text-white"
          }`}
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
        {mensaje && (
          <p
            className={`mt-2 text-sm ${
              mensaje.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default InformacionPersonal;
