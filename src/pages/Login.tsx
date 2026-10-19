import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const STATIC_USER = "admin@pencilvania";
  const DEFAULT_PASSWORD = "Pencilvania2026!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username !== STATIC_USER) {
      setError("Username atau password salah.");
      return;
    }

    try {
      const isMatch = password === DEFAULT_PASSWORD;

      if (isMatch) {
        // Simpan status login ke localStorage
        localStorage.setItem("isLoggedIn", "true");
        // Redirect langsung ke halaman CMS Artikel
        navigate("/cms_artikel", { replace: true });
      } else {
        setError("Username atau password salah.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan sistem.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
        
        {/* Header Tema Pabrik Pensil */}
        <div className="bg-amber-900 px-8 py-6 text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-800 rounded-full opacity-50 pointer-events-none"></div>
          <h2 className="text-2xl font-bold text-amber-100 tracking-wide">
            Pencilvania Partner Portal
          </h2>
          <p className="text-amber-200 text-sm mt-1">
            Factory Supplier & Custom Merchandise System
          </p>
        </div>

        {/* Form Login */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@pencilvania"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition text-stone-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition text-stone-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Masuk ke Sistem
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-8 py-4 border-t border-stone-100 text-center text-xs text-stone-500">
          Pencilvania Factory Supplier Indonesia &copy; 2026
        </div>
      </div>
    </div>
  );
};

export default Login;