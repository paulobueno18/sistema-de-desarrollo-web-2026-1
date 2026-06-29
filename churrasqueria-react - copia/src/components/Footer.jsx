export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="text-2xl font-serif font-bold mb-2">
              El Rinconcito <span className="text-accent">del Patricio</span>
            </div>
            <p className="text-primary-200">La mejor parrilla en Puerto Maldonado</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-primary-200">
              <li><a href="#inicio" className="hover:text-accent transition">Inicio</a></li>
              <li><a href="#menu" className="hover:text-accent transition">Menú</a></li>
              <li><a href="#contacto" className="hover:text-accent transition">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Información</h4>
            <p className="text-primary-200 text-sm">
              © 2026 El Rinconcito del Patricio
              <br />
              UNAMAD – Ingeniería de Sistemas
              <br />
              Bueno Quiñones Paulo Cesar & Hurtado Quispe Mark Leonel
            </p>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>&copy; 2026 El Rinconcito del Patricio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
