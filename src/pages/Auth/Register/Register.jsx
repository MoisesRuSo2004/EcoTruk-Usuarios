import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

export default function SignUp() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#3BBE7A] to-[#153307] p-4">
      {/* Imagen de hojas siempre visible */}
      <div className="flex justify-center mt-6">
        <img
          src="../../../public/img/register.png"
          alt="Leaves"
          className="w-52 h-52"
        />
      </div>

      {/* Contenido dinámico */}
      {!showForm ? (
        <div className="w-full max-w-sm bg-transparent text-center mb-6">
          {/* Título */}
          <h2 className="text-white text-3xl font mb-6">Sign Up</h2>

          {/* Botón Facebook */}
          <button className="flex items-center justify-center gap-2 w-full bg-[#3b5998] text-white py-3 rounded-lg mb-4 shadow-md hover:opacity-90 transition">
            <FaFacebookF /> Continuar con Facebook
          </button>

          {/* Botón Email/Phone */}
          <button
            onClick={() => setShowForm(true)}
            className="w-full border border-green-300 text-green-200 py-3 rounded-lg mb-6 hover:bg-green-800/40 transition"
          >
            Usar Correo y Contraseña
          </button>

          {/* Opciones Google y Twitter */}
          <div className="flex justify-center gap-6 mb-6">
            <button className="p-3 bg-white rounded-full shadow-md hover:opacity-80 transition">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="p-3 bg-white rounded-full shadow-md hover:opacity-80 transition">
              <FaTwitter className="text-sky-500" />
            </button>
          </div>

          {/* Enlace de login */}
          <p className="text-sm text-gray-200">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-green-300 hover:underline">
              login
            </a>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-t-3xl shadow-lg p-12 h-1/2 mt-auto">
          <h2 className="text-2xl font text-gray-800 text-center mb-4">
            Sign Up
          </h2>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none text-sm"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none text-sm"
              placeholder="Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none text-sm"
              placeholder="Confirm Password"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center mb-6">
            <input type="checkbox" className="mr-2 accent-green-600" />
            <label className="text-sm text-gray-600">
              I accept the policy and terms
            </label>
          </div>

          {/* Botón */}
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-600 transition">
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
