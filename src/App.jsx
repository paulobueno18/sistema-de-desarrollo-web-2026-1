import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartModal from './components/CartModal'
import DishModal from './components/DishModal'

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDishOpen, setIsDishOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  const handleOpenDish = (dish) => {
    setSelectedDish(dish)
    setIsDishOpen(true)
  }

  const handleCloseDish = () => {
    setIsDishOpen(false)
    setSelectedDish(null)
  }

  const { getItemCount } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} route="client" cartCount={getItemCount()} />

      <main className="flex-grow">
        <Hero />
        <Menu onDishClick={handleOpenDish} />
        <Contact />
      </main>

      <Footer />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          isOpen={isDishOpen}
          onClose={handleCloseDish}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
