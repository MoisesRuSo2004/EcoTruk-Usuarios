import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, rol } = await login(form);

      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      if (rol === "ROLE_ADMIN") {
        navigate("/home");
      } else if (rol === "ROLE_CONDUCTOR") {
        navigate("/asignacion-rutas");
      } else {
        navigate("/perfil");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales inválidas o usuario no autorizado.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="input"
      />
      <button type="submit" className="btn btn-primary">
        Iniciar sesión
      </button>
    </form>
  );
}
