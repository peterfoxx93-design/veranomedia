import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Chatbot WhatsApp',
    desc: 'Un asistente virtual en WhatsApp que responde preguntas, agenda citas y califica leads automáticamente. 24/7.',
    tagline: '"Nunca más pierdas una venta porque no contestaste a tiempo."',
    price: '$6,000 RD$',
    color: '#34C759',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'Newsletter Automatizada',
    desc: 'Sistema de email marketing listo: plantillas profesionales, formulario de suscripción y primera campaña.',
    tagline: '"El email sigue siendo el canal que más vende. Actívalo."',
    price: '$4,000 RD$',
    color: '#5AC8FA',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Email Marketing Continuo',
    desc: 'Campañas semanales automatizadas con segmentación y reportes. Recupera hasta un 10% de ventas perdidas.',
    tagline: '"Tus suscriptores son tu activo más valioso. Cultívalos."',
    price: '$5,000 RD$/mes',
    color: '#FF9F0A',
  },
]

export default function ServiciosAutomatizacion() {
  const ref = useRef(null)

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Automatización</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Trabaja menos, vende más</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Automatiza la atención al cliente, el email marketing y la generación de leads.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const cardRef = useRef(null)
              const cardInView = useInView(cardRef, { once: true, margin: '-50px' })
              return (
                <motion.div key={s.title} ref={cardRef}
                  initial={{ opacity: 0, y: 30 }} animate={cardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-5" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                    {s.icon}
                  </div>
                  <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{s.title}</h3>
                  <p className="text-base text-[#636366] mb-3">{s.desc}</p>
                  <p className="text-sm text-[#8E8E93] italic mb-4">{s.tagline}</p>
                  <div className="text-sm font-semibold text-[#0066CC]">{s.price}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para automatizar?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Descubre cómo la automatización puede hacer crecer tu negocio mientras duermes.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
