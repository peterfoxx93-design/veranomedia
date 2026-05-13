import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Sitio Web Completo',
    desc: 'De 3 a 5 páginas con diseño premium, integración de WhatsApp, Google Maps y SEO. Tu hogar digital completo.',
    tagline: '"Donde tus clientes te encuentran, te conocen y te eligen"',
    color: '#0066CC',
    bgColor: 'rgba(0,102,204,0.08)',
    link: '/servicios/web',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Community Management',
    desc: 'Contenido semanal, reels, historias y copywriting profesional. Tu marca publicando con consistencia.',
    tagline: '"Publica con consistencia profesional sin gastar horas en redes"',
    color: '#34C759',
    bgColor: 'rgba(52,199,89,0.08)',
    link: '/servicios/redes',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="10.5" /><path d="M15 7.5l-5 5L7 9" />
      </svg>
    ),
    title: 'SEO Mensual',
    desc: 'Optimización técnica y de contenido para aparecer en los primeros resultados de Google. Más tráfico orgánico.',
    tagline: '"El mejor cliente es el que te encuentra sin que le pagues por clic"',
    color: '#FF9F0A',
    bgColor: 'rgba(255,159,10,0.08)',
    link: '/servicios/anuncios-seo',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Google Business Pro',
    desc: 'Perfil optimizado en Google Maps y Search local. Fotos, reseñas y descripciones estratégicas.',
    tagline: '"Si no estás en Google Maps, no existes para tus vecinos"',
    color: '#5AC8FA',
    bgColor: 'rgba(90,200,250,0.08)',
    link: '/servicios/web',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12" /><line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    title: 'Gestión de Anuncios',
    desc: 'Campañas en Google Ads y Meta Ads con segmentación precisa. Resultados medibles, sin desperdiciar presupuesto.',
    tagline: '"Deja de improvisar con tu presupuesto de anuncios"',
    color: '#FF453A',
    bgColor: 'rgba(255,69,58,0.08)',
    link: '/servicios/anuncios-seo',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Paquete Completo',
    desc: 'Sitio web + Google Business + Contenido + Chatbot + Email. Todo lo que tu negocio necesita en un solo plan.',
    tagline: '"Seis servicios al precio de tres. Tu presencia digital completa"',
    color: '#0066CC',
    bgColor: 'rgba(0,102,204,0.08)',
    link: '/paquete-completo',
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
    >
      <Link
        to={service.link}
        className="group block bg-white rounded-vm-lg p-8 border border-[#E8E8ED]/50 hover:border-[#D1D1D6] transition-all duration-500 hover:shadow-vm-lg hover:-translate-y-1 h-full"
      >
        <div
          className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: service.bgColor, color: service.color }}
        >
          {service.icon}
        </div>
        <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{service.title}</h3>
        <p className="text-base text-[#636366] leading-relaxed mb-3">{service.desc}</p>
        <p className="text-sm text-[#8E8E93] italic">{service.tagline}</p>
      </Link>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const link = (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
    >
      Servicios
    </motion.span>
  )

  return (
    <section id="servicios" className="section-vm-alt">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
          >
            Servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Lo que tu negocio necesita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Desde una landing page hasta un ecosistema digital completo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Button to see all services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/servicios/web"
            className="inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052CC] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#0066CC]/20 hover:shadow-[#0066CC]/35"
          >
            Ver todos los servicios
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
