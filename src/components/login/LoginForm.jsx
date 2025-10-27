import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  error,
}) => (
  <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
    <input
      type="text"
      placeholder="Ingresa Tu Correo"
      className="w-full px-4 py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-black outline-none text-gray-800"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"
        className="w-full px-4 py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-black outline-none text-gray-800 pr-10"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>

    {error && <div className="text-red-600 text-sm text-center">{error}</div>}

    <button
      type="submit"
      className="w-full bg-[#2E8B00] text-white py-3 rounded-md font-medium hover:opacity-90 transition shadow-[0_4px_10px_rgba(46,139,0,0.3)]"
    >
      Continuar
    </button>
  </form>
);

export default LoginForm;
