import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const LoginOAuthButtons = () => (
  <>
    <div className="flex items-center my-3">
      <hr className="flex-grow border-gray-300" />

      <hr className="flex-grow border-gray-300" />
    </div>

    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition"
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-800">
          Continuar con Google
        </span>
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition"
      >
        <FaApple className="text-xl text-gray-900" />
        <span className="text-sm font-medium text-gray-800">
          Continuar con Apple
        </span>
      </button>

      <p className="text-sm text-gray-600 mt-6">
        ¿No tienes cuenta?{" "}
        <a
          href="/register"
          className="text-[#2E8B00] font-medium hover:underline"
        >
          Regístrate aquí
        </a>
      </p>
    </div>
  </>
);

export default LoginOAuthButtons;
