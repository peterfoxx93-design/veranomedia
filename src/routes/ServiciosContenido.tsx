import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: 'Video Promocional',
    desc: 'Video de 30-60 segundos con locución profesional, música y edición dinámica. Ideal para redes, web o anuncios.',
    tagline: '"Un video vale más que mil fotos. Y vende más también."',
    price: 'Desde $4,000 RD$',
    color: '#FF453A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Marketing de Contenidos',
    desc: 'Artículos de blog, infografías y calendario editorial. Posiciona tu marca como autoridad en tu sector.',
    tagline: '"El contenido es el imán de clientes que nunca deja de funcionar."',
    price: 'Desde $8,000 RD$/mes',
    color: '#5AC8FA',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    title: 'Kit Redes Sociales',
    desc: '10 plantillas profesionales con la identidad de tu marca + calendario editorial para tu primer mes.',
    tagline: '"Redes sociales con cara bonita desde el día uno."',
    price: '$5,000 RD$',
    color: '#FF9F0A',
  },
]

function ServiceCard({ service, index }: { service: typeof services[number]; index: number }) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 30 }} animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-5" style={{ backgroundColor: `${service.color}15`, color: service.color }}>
        {service.icon}
      </div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{service.title}</h3>
      <p className="text-base text-[#636366] mb-3">{service.desc}</p>
      <p className="text-sm text-[#8E8E93] italic mb-4">{service.tagline}</p>
      <div className="text-sm font-semibold text-[#0066CC]">{service.price}</div>
    </motion.div>
  )
}

export default function ServiciosContenido() {
  const ref = useRef(null)

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Contenido</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Tu historia, contada bien</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Video, contenido escrito y diseño gráfico para que tu marca comunique con impacto.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para crear contenido?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Descubre cómo el contenido de calidad puede transformar tu marca.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
