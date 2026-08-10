import { useEffect, useState } from 'react';
import { getOrders, getReservations, loginAdmin } from '../services/api';
import AdminMenuEditor from './AdminMenuEditor';
import { ADMIN_ORDERS, ADMIN_RESERVATIONS } from '../data/admin';

export default function AdminPanel() {
  const [email, setEmail] = useState('admin@churrasqueria.com');
  const [password, setPassword] = useState('admin123');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(email, password);
      setToken(data.token);
      setMessage('Inicio de sesión correcto');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const loadData = async () => {
    if (!token) return;
    try {
      const [ordersData, reservationsData] = await Promise.all([
        getOrders(token),
        getReservations(token),
      ]);
      setOrders(ordersData);
      setReservations(reservationsData);
    } catch (error) {
      setMessage('No se pudo cargar datos del servidor. Usando información local.');
      setOrders(ADMIN_ORDERS);
      setReservations(ADMIN_RESERVATIONS);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  return (
    <section id="admin" className="bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.15),_transparent_50%)] py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">Panel empresarial</p>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Gestión de pedidos y reservas</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">
              Vista profesional para supervisar la operación, controlar solicitudes y mantener una comunicación ordenada con los clientes.
            </p>
          </div>
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            Acceso seguro
          </div>
        </div>

        {!token ? (
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-stone-800 bg-stone-950/70 p-8 shadow-2xl shadow-black/15">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">Bienvenido</p>
              <h3 className="mt-3 font-serif text-2xl font-bold text-white">Administración centralizada</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-400">
                Ingrese con credenciales autorizadas para revisar pedidos, confirmar reservas y mantener el servicio alineado con la propuesta del negocio.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 rounded-3xl border border-stone-800 bg-stone-950/80 p-8 shadow-2xl shadow-black/20">
              <input className="w-full rounded-2xl border border-stone-800 bg-stone-900 p-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
              <input className="w-full rounded-2xl border border-stone-800 bg-stone-900 p-3 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
              <button className="w-full rounded-2xl bg-amber-600 py-3 font-bold text-white transition hover:bg-amber-500">Ingresar al panel</button>
              {message && <p className="text-sm text-amber-300">{message}</p>}
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Sesión activa</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-white">Panel operativo en línea</h3>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                  {message || 'Conectado'}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-4">
                  <p className="text-sm text-stone-400">Pedidos registrados</p>
                  <p className="mt-2 text-3xl font-bold text-white">{orders.length}</p>
                </div>
                <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-4">
                  <p className="text-sm text-stone-400">Reservas activas</p>
                  <p className="mt-2 text-3xl font-bold text-white">{reservations.length}</p>
                </div>
                <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-4">
                  <p className="text-sm text-stone-400">Estado</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-300">Operativo</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/20">
              <h3 className="mb-4 font-serif text-xl font-bold text-white">Pedidos</h3>
              {orders.length === 0 ? <p className="text-sm text-stone-400">No hay pedidos registrados por el momento.</p> : orders.map((order) => (
                <div key={order.id} className="border-b border-stone-800 py-3 last:border-b-0">
                  <p className="font-semibold text-white"><strong>{order.customer}</strong> • {order.status}</p>
                  <p className="mt-1 text-sm text-stone-400">{order.items}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/20">
                <h3 className="mb-4 font-serif text-xl font-bold text-white">Reservas</h3>
                {reservations.length === 0 ? <p className="text-sm text-stone-400">No hay reservas registradas por el momento.</p> : reservations.map((reservation) => (
                  <div key={reservation.id} className="border-b border-stone-800 py-3 last:border-b-0">
                    <p className="font-semibold text-white"><strong>{reservation.name}</strong> • {reservation.date} {reservation.time}</p>
                    <p className="mt-1 text-sm text-stone-400">{reservation.guests} personas</p>
                  </div>
                ))}
              </div>
              <AdminMenuEditor token={token} />
            </div>
          </div>
          </div>
        )}
      </div>
    </section>
  );
}
