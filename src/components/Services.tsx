import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Diseño Web Profesional',
    desc: 'Sitios modernos con diseño premium, animaciones fluidas, responsive y optimizados para Google. Next.js + Tailwind + Motion.',
    color: '#007AFF',
    bgColor: 'rgba(0,122,255,0.05)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Google Business Pro',
    desc: 'Posiciona tu negocio en Google Maps. Perfil optimizado, fotos, categorías correctas y estrategia de reseñas.',
    color: '#34C759',
    bgColor: 'rgba(52,199,89,0.05)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    title: 'Contenido para Redes',
    desc: 'Carruseles, infografías y videos profesionales para Instagram, Facebook y LinkedIn.',
    color: '#FF9F0A',
    bgColor: 'rgba(255,159,10,0.05)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Chatbot WhatsApp',
    desc: 'Atención automática 24/7. Responde preguntas frecuentes, agenda citas y califica leads.',
    color: '#34C759',
    bgColor: 'rgba(52,199,89,0.05)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Email Marketing',
    desc: 'Newsletters automatizadas que convierten. Campañas de bienvenida, seguimiento y ofertas.',
    color: '#5AC8FA',
    bgColor: 'rgba(90,200,250,0.05)',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Paquete Completo',
    desc: 'Todo en un solo plan: sitio web + Google + Redes + Chatbot + Email. La solución integral.',
    color: '#007AFF',
    bgColor: 'rgba(0,122,255,0.05)',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-vm-lg p-8 border border-[#E8E8ED]/50 hover:border-[#D1D1D6] transition-all duration-500 hover:shadow-vm-lg hover:-translate-y-1"
    >
      <div
        className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: service.bgColor, color: service.color }}
      >
        {service.icon}
      </div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{service.title}</h3>
      <p className="text-base text-[#8E8E93] leading-relaxed">{service.desc}</p>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="section-vm-alt">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
          >
            Servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Todo lo que tu negocio necesita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Desde una landing page hasta un ecosistema digital completo.
            Diseñamos cada solución a la medida de tu negocio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
