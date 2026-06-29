import { useState } from 'react'
import { useCart } from '../context/CartContext'
import CartItem from './CartItem'

export default function CartModal({ isOpen, onClose }) {
  const { cart, getTotal, clearCart } = useCart()
  
  const [tipoEntrega, setTipoEntrega] = useState('local') 
  const [mostrarQR, setMostrarQR] = useState(false)
  const [pagoConfirmado, setPagoConfirmado] = useState(false)
  const [numeroOperacion, setNumeroOperacion] = useState('')

  if (!isOpen) return null

  const esPlato = (name) => {
    const palabrasBebida = ['bebida', 'refresco', 'chicha', 'cocona', 'gaseosa', 'cerveza', 'agua']
    return !palabrasBebida.some(palabra => name.toLowerCase().includes(palabra))
  }

  const cantidadPlatos = cart.reduce((acc, item) => acc + (esPlato(item.name) ? item.qty : 0), 0)
  const recargoEnvase = tipoEntrega === 'llevar' ? cantidadPlatos * 2 : 0
  const totalFinal = getTotal() + recargoEnvase

  const handleCheckout = () => {
    if (cart.length === 0) return
    setMostrarQR(true)
  }

  const finalizarPorWhatsApp = () => {
    const esNumeroValido = /^\d{6,10}$/.test(numeroOperacion)
    
    if (!pagoConfirmado) {
      alert("Por favor, confirma que realizaste el pago.")
      return
    }
    if (!esNumeroValido) {
      alert("Por favor, ingresa un número de operación válido (6 a 10 dígitos).")
      return
    }

    const telefonoRestaurante = "51993018321"
    const listaPlatos = cart.map(item => {
      const extraText = (tipoEntrega === 'llevar' && esPlato(item.name)) ? ' (+S/ 2.00 envase)' : ''
      return `   • ${item.qty}x ${item.name} (${item.size || 'Regular'})${extraText}`
    }).join('\n')

    const mensaje = encodeURIComponent(
      `🛒 *PEDIDO PENDIENTE DE VALIDACIÓN*\n\n` +
      `🛵 *Tipo:* ${tipoEntrega === 'llevar' ? 'Para Llevar' : 'En Local'}\n\n` +
      `📝 *Detalle:*\n${listaPlatos}\n\n` +
      `💰 *Total a pagar:* S/ ${totalFinal.toFixed(2)}\n` +
      `🔢 *Nro. Operación:* ${numeroOperacion}\n\n` +
      `⚠️ *IMPORTANTE:* El pedido NO se preparará hasta verificar este número.`
    )

    window.open(`https://wa.me/${telefonoRestaurante}?text=${mensaje}`, '_blank')
    clearCart()
    onClose()
    setMostrarQR(false)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-3 backdrop-blur-sm">
      {/* Contenedor responsivo con altura máxima controlada */}
      <div className="bg-stone-900 border border-stone-800 w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">
            {mostrarQR ? 'Verificación de Pago' : 'Tu Pedido'}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-2xl">✕</button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-6">
          {mostrarQR ? (
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Contenedor del QR visualmente destacado */}
              <div className="bg-white p-3 rounded-xl shadow-lg border-4 border-stone-800">
                <img src="/qr-yape.png" alt="QR de Pago" className="w-48 h-48 sm:w-56 sm:h-56 object-contain" />
              </div>
              
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-full text-left space-y-4">
                <div>
                  <label className="block text-stone-400 text-[10px] font-bold uppercase mb-1">Nro. de operación (Yape/Plin)</label>
                  <input 
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej: 123456789"
                    value={numeroOperacion}
                    onChange={(e) => setNumeroOperacion(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-white outline-none focus:border-amber-500"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={pagoConfirmado} onChange={(e) => setPagoConfirmado(e.target.checked)} className="mt-1 w-5 h-5 accent-amber-500" />
                  <span className="text-xs text-stone-300 leading-tight">
                    Confirmo que realicé el pago de <strong>S/ {totalFinal.toFixed(2)}</strong> y enviaré comprobante por WhatsApp.
                  </span>
                </label>
              </div>

              <div className="w-full flex gap-3">
                <button onClick={() => setMostrarQR(false)} className="flex-1 bg-stone-800 hover:bg-stone-700 py-3 rounded-xl font-bold transition">Volver</button>
                <button onClick={finalizarPorWhatsApp} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold transition">Enviar pedido 🚀</button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-stone-950 p-1 rounded-lg grid grid-cols-2 gap-1 border border-stone-800">
                <button onClick={() => setTipoEntrega('local')} className={`py-2 text-[10px] font-bold uppercase rounded-md ${tipoEntrega === 'local' ? 'bg-stone-800' : ''}`}>🍽️ En Local</button>
                <button onClick={() => setTipoEntrega('llevar')} className={`py-2 text-[10px] font-bold uppercase rounded-md ${tipoEntrega === 'llevar' ? 'bg-amber-600' : ''}`}>📦 Para Llevar</button>
              </div>
              {cart.length > 0 ? (
                cart.map((item, idx) => <CartItem key={idx} item={item} index={idx} />)
              ) : (
                <p className="text-center text-stone-500 py-10">Tu carrito está vacío.</p>
              )}
            </div>
          )}
        </div>

        {!mostrarQR && cart.length > 0 && (
          <div className="border-t border-stone-800 bg-stone-900 p-5">
            <button onClick={handleCheckout} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-all">Confirmar Pedido 🥩</button>
          </div>
        )}
      </div>
    </div>
  )
};