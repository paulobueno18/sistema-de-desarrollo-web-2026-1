import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-amber-100">
        <div className="text-center mb-6">
          <span className="text-4xl">🔥</span>
          <h2 className="text-2xl font-black text-amber-950 mt-2">Acceso Administrativo</h2>
          <p className="text-xs text-gray-500 mt-1">Ingresa tus datos para gestionar el menú</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-xs font-semibold mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:outline-amber-600"
              placeholder="admin@laestancia.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:outline-amber-600"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 rounded-xl shadow transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};