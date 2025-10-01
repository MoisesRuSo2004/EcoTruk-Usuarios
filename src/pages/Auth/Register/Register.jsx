import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isEmailValid = email.includes("@") && email.length >= 6;
  const isPasswordValid = password.length >= 6;
  const isFormValid =
    name && isEmailValid && isPasswordValid && password === confirm && accepted;

  const handleSubmit = async () => {
    setError("");

    if (!name || !email || !password || !confirm) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!email.includes("@") || email.length < 6) {
      setError("Correo inválido. Debe contener '@' y tener formato válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!accepted) {
      setError("Debes aceptar los términos.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/registrar",
        {
          nombre: name,
          correo: email,
          password,
          rol: "ROLE_CIUDADANO",
          estado: "ACTIVO",
          fechaRegistro: new Date().toISOString().split("T")[0], // formato YYYY-MM-DD
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      const rawError = err.response?.data;

      if (typeof rawError === "string" && rawError.includes("correo")) {
        setError("Este correo ya está registrado.");
      } else {
        setError("Error al conectar con el servidor.");
      }

      console.error("Error completo:", rawError);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#3BBE7A] to-[#153307] p-4">
      {/* Imagen */}
      <div className="flex justify-center mt-6">
        <img
          src="../../../public/img/register.png"
          alt="Leaves"
          className="w-52 h-52"
        />
      </div>

      {/* Formulario */}
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-lg p-12 h-1/2 mt-auto">
        <h2 className="text-2xl font text-gray-800 text-center mb-4">
          Registrarse
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-3 outline-none text-sm mb-4"
          placeholder="Nombre completo"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-3 outline-none text-sm mb-4"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-3 outline-none text-sm mb-4"
          placeholder="Password"
        />

        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-3 outline-none text-sm mb-4"
          placeholder="Confirm Password"
        />

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mr-2 accent-green-600"
          />
          <label className="text-sm text-gray-600">
            Acepto los términos y condiciones
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-600 transition"
        >
          Registrarme
        </button>

        {/* Enlace a login */}
        <p className="text-sm text-gray-600 text-center mt-6">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-500 hover:underline font-medium"
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}
