import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartModal from './components/CartModal'
import DishModal from './components/DishModal'

function App() {
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

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Hero />
          <Menu onDishClick={handleOpenDish} />
          <Contact />
        </main>

        <Footer />

        {/* Modales */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {selectedDish && (
          <DishModal 
            dish={selectedDish} 
            isOpen={isDishOpen} 
            onClose={handleCloseDish} 
          />
        )}
      </div>
    </CartProvider>
  )
}

export default App
