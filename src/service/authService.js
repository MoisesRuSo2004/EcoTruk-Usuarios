import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Intentando login con:", form);

    try {
      const response = await login(form);
      console.log("Respuesta cruda del backend:", response);

      const { token, rol } = response || {};

      if (!token || !rol) {
        console.warn("Token o rol faltante en la respuesta:", response);
        setError("Respuesta inválida del servidor.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      const normalizedRol = rol.toUpperCase().trim();
      console.log("Rol normalizado:", normalizedRol);

      if (normalizedRol === "ROLE_ADMIN") {
        console.log("Redirigiendo a /home");
        navigate("/home");
      } else if (normalizedRol === "ROLE_CONDUCTOR") {
        console.log("Redirigiendo a /asignacion-rutas");
        navigate("/asignacion-rutas");
      } else {
        console.log("Redirigiendo a /perfil");
        navigate("/perfil");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        console.warn("Respuesta del backend con error:", error.response.data);
        setError(
          error.response.data?.mensaje ||
            "Credenciales inválidas o usuario no autorizado."
        );
      } else {
        setError("Error de conexión con el servidor.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        required
        className="input w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="input w-full px-4 py-2 border rounded"
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
