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
    // Validación de número de operación (solo números, entre 6 y 10 dígitos)
    const esNumeroValido = /^\d{6,10}$/.test(numeroOperacion)
    
    if (!pagoConfirmado) {
      alert("Por favor, confirma que realizaste el pago.")
      return
    }
    if (!esNumeroValido) {
      alert("Por favor, ingresa un número de operación válido de 6 a 10 dígitos.")
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
      `⚠️ *IMPORTANTE:* El pedido NO se preparará hasta verificar este número en nuestra cuenta bancaria. Por favor, envía tu captura de pantalla.`
    )

    window.open(`https://wa.me/${telefonoRestaurante}?text=${mensaje}`, '_blank')
    clearCart()
    onClose()
    setMostrarQR(false)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        
        <div className="flex items-center justify-between p-6 border-b border-stone-800">
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
            {mostrarQR ? 'Verificación de Pago' : 'Tu Pedido'}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors text-2xl">✕</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {mostrarQR ? (
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-xl">
                <img src="/qr-yape.png" alt="QR de Pago" className="w-56 h-56" />
              </div>
              
              <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 w-full space-y-4 text-left">
                <div>
                  <label className="block text-stone-400 text-xs font-bold uppercase mb-2">Nro. de operación (Yape/Plin)</label>
                  <input 
                    type="number" 
                    placeholder="Ej: 123456789"
                    value={numeroOperacion}
                    onChange={(e) => setNumeroOperacion(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-lg p-3 text-white outline-none focus:border-accent"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={pagoConfirmado} onChange={(e) => setPagoConfirmado(e.target.checked)} className="w-5 h-5 accent-accent" />
                  <span className="text-sm text-stone-300">
                    Confirmo que realicé el pago de <strong>S/ {totalFinal.toFixed(2)}</strong> y enviaré el comprobante por WhatsApp para la validación manual.
                  </span>
                </label>
              </div>

              <div className="w-full flex gap-3">
                <button onClick={() => setMostrarQR(false)} className="w-1/3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-4 rounded-xl transition">Volver</button>
                <button 
                  onClick={finalizarPorWhatsApp}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition"
                >
                  Enviar pedido 🚀
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-stone-950/40 p-1 border border-stone-800 rounded-xl grid grid-cols-2 gap-1">
                <button onClick={() => setTipoEntrega('local')} className={`py-2 text-xs font-bold uppercase rounded-lg ${tipoEntrega === 'local' ? 'bg-stone-800' : ''}`}>🍽️ En Local</button>
                <button onClick={() => setTipoEntrega('llevar')} className={`py-2 text-xs font-bold uppercase rounded-lg ${tipoEntrega === 'llevar' ? 'bg-accent' : ''}`}>📦 Para Llevar</button>
              </div>
              <div className="space-y-3">
                {cart.map((item, idx) => <CartItem key={idx} item={item} index={idx} />)}
              </div>
            </div>
          )}
        </div>

        {!mostrarQR && cart.length > 0 && (
          <div className="border-t border-stone-800 bg-stone-950/50 p-6">
            <button onClick={handleCheckout} className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl">Confirmar Pedido 🥩</button>
          </div>
        )}
      </div>
    </div>
  )
};