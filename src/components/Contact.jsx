import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { createReservation } from '../services/api'

export default function Contact() {
  const { cart, getTotal } = useCart() // 🛠️ Jalamos el estado actual del carrito

  // 1. Estado para manejar el formulario de reservas
  const [reserva, setReserva] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: '20:00',
    personas: '2'
  })

  const [confirmado, setConfirmado] = useState(false)

  const handleChange = (e) => {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await createReservation({
        name: reserva.nombre,
        phone: reserva.telefono,
        date: reserva.fecha,
        time: reserva.hora,
        guests: Number(reserva.personas),
      })

      const telefonoRestaurante = "51993018321"
      const fechaFormateada = reserva.fecha ? reserva.fecha.split('-').reverse().join('/') : ''
      const totalPedido = getTotal()
      const adelantoCincuenta = totalPedido / 2
      const listaPlatos = cart.map(item => `   • ${item.qty}x ${item.name} (${item.size})`).join('\n')

      let detallePrecios = `⚠️ _No se seleccionaron platos previos en el carrito._`
      if (totalPedido > 0) {
        detallePrecios =
          `🥩 *Platos seleccionados:*\n${listaPlatos}\n\n` +
          `💰 *Total de la Orden:* S/ ${totalPedido.toFixed(2)}\n` +
          `💵 *Adelanto requerido (50%):* S/ ${adelantoCincuenta.toFixed(2)}`;
      }

      const mensaje = encodeURIComponent(
        `🔥 *¡Nueva Reserva con Pedido - El Rinconcito del Patricio!* 🔥\n\n` +
        `👤 *Nombre:* ${reserva.nombre}\n` +
        `📅 *Fecha:* ${fechaFormateada}\n` +
        `⏰ *Hora:* ${reserva.hora}\n` +
        `📱 *Teléfono:* ${reserva.telefono}\n` +
        `👥 *Invitados:* ${reserva.personas} personas\n\n` +
        `${detallePrecios}\n\n` +
        `📌 *Validación:* La reserva se confirmará enviando la captura del Yape/Plin por el 50% del adelanto a este número (993 018 321).`
      )

      const urlWhatsApp = `https://wa.me/${telefonoRestaurante}?text=${mensaje}`
      window.open(urlWhatsApp, '_blank')

      setConfirmado(true)
      setTimeout(() => setConfirmado(false), 8000)
    } catch (error) {
      alert(error.message)
    }
  }

  const contactInfo = [
    {
      icon: '📞',
      title: 'Llámanos',
      text: '993 018 321',
      href: 'tel:+51993018321'
    },
    {
      icon: '✉️',
      title: 'Escríbenos',
      text: 'cesarbueno677@gmail.com',
      href: 'mailto:cesarbueno677@gmail.com'
    },
    {
      icon: '📍',
      title: 'Encuéntranos',
      text: 'Av. Andrés Mallea con Psj. Iquique, Puerto Maldonado',
      href: '#'
    }
  ]

  // Variables para mostrar el adelanto calculado directamente en la web
  const totalEnCarrito = getTotal()
  const mitadEnCarrito = totalEnCarrito / 2

  return (
    <section id="contacto" className="border-t border-stone-800 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Atención premium
            </div>
            <h2 className="mb-4 font-serif text-3xl font-bold leading-tight tracking-wide sm:text-5xl">
              Reserva tu mesa
              <br />
              <span className="text-accent">con una experiencia sólida y elegante</span>
            </h2>
            <div className="mb-6 h-1 w-16 bg-accent"></div>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-stone-400 sm:text-base">
              Creamos una experiencia fluida para el cliente, con una operación organizada y una imagen profesional para la empresa.
            </p>

            <div className="grid max-w-md gap-4">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  className="flex items-center space-x-4 rounded-2xl border border-stone-800 bg-stone-950/40 p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-stone-800/40"
                >
                  <div className="rounded-xl border border-stone-800/60 bg-stone-900 p-2 text-2xl shadow-inner">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-stone-200">{info.title}</h4>
                    <p className="mt-0.5 text-xs text-stone-400">{info.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/25 backdrop-blur-sm md:p-8 lg:mt-0">
            <h3 className="mb-6 flex items-center gap-2 font-serif text-xl font-bold tracking-wide text-white sm:text-2xl">
              📅 Reserva virtual
            </h3>

            {confirmado ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-xl text-center">
                <p className="text-lg font-bold text-white">¡Reserva Enviada! 🎉</p>
                <p className="text-xs md:text-sm mt-2 text-stone-300 leading-relaxed">
                  Gracias <strong>{reserva.nombre}</strong>. Tu solicitud de mesa para <strong>{reserva.personas} personas</strong> se generó con éxito para el <strong>{reserva.fecha.split('-').reverse().join('/')}</strong>.
                </p>
                {totalEnCarrito > 0 && (
                  <p className="text-xs mt-2 text-amber-400">
                    Completa el adelanto del 50% (S/ {mitadEnCarrito.toFixed(2)}) vía WhatsApp para congelar tu cupo.
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Nombre Completo</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    required 
                    value={reserva.nombre} 
                    onChange={handleChange}
                    className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Ej. Paulo"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Fecha</label>
                    <input 
                      type="date" 
                      name="fecha" 
                      required 
                      value={reserva.fecha} 
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-accent transition-colors scheme-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Hora</label>
                    <input 
                      type="time" 
                      name="hora" 
                      required 
                      value={reserva.hora} 
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-white focus:outline-none focus:border-accent transition-colors scheme-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Teléfono móvil</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      required 
                      value={reserva.telefono} 
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-white placeholder-stone-600 focus:outline-none focus:border-accent transition-colors"
                      placeholder="993018321"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Número de Invitados</label>
                    <select 
                      name="personas" 
                      value={reserva.personas} 
                      onChange={handleChange}
                      className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="1" className="bg-stone-900">1 Persona</option>
                      <option value="2" className="bg-stone-900">2 Personas</option>
                      <option value="4" className="bg-stone-900">4 Personas</option>
                      <option value="6" className="bg-stone-900">6 Personas</option>
                      <option value="8+" className="bg-stone-900">Mesa Familiar (8+)</option>
                    </select>
                  </div>
                </div>

                {/* 🛠️ AVISO EN TIEMPO REAL DEL ADELANTO EN LA WEB */}
                {totalEnCarrito > 0 && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                    <p className="text-xs text-amber-400">
                      Monto de Adelanto requerido: <strong className="text-white">S/ {mitadEnCarrito.toFixed(2)}</strong> (50% de tu carrito actual).
                    </p>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="w-full mt-4 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-accent/10 transition-all duration-200 uppercase tracking-wider text-xs md:text-sm"
                >
                  Confirmar Mi Reserva 📅
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
};