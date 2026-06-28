export default function Contact() {
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

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Información de contacto */}
          <div>
            <div className="section-label text-left">Estamos para atenderte</div>
            <h2 className="text-left text-3xl md:text-4xl font-serif font-bold mt-3 mb-4">
              Visítanos o
              <br />
              <span className="text-accent">Contáctanos</span>
            </h2>
            <div className="w-16 h-1 bg-accent mb-6"></div>
            <p className="text-gray-600">
              Reservas, consultas o simplemente para saber qué hay en la parrilla hoy. 
              Estamos en el corazón de Puerto Maldonado.
            </p>
          </div>

          {/* Tarjetas de contacto */}
          <div className="grid grid-cols-1 gap-4">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.href}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:translate-x-1 transition-all duration-300 flex items-center space-x-4"
              >
                <div className="text-4xl">{info.icon}</div>
                <div>
                  <h4 className="font-bold text-primary-800">{info.title}</h4>
                  <p className="text-gray-600 text-sm">{info.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
