import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

function ServiceCard({ s, i }: { s: typeof services[number]; i: number }) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div ref={cardRef}
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
}

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="10.5" /><path d="M15 7.5l-5 5L7 9" />
      </svg>
    ),
    title: 'SEO Básico',
    desc: 'Auditoría técnica, investigación de keywords, optimización on-page y reporte mensual de resultados.',
    tagline: '"El mejor cliente es el que te encuentra sin que le pagues por clic."',
    price: '$8,000 RD$/mes',
    color: '#34C759',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="10.5" /><path d="M15 7.5l-5 5L7 9" />
      </svg>
    ),
    title: 'SEO Avanzado',
    desc: 'Todo lo del SEO Básico + link building, contenido estratégico y optimización continua para dominar tu nicho.',
    tagline: '"Domina los resultados de búsqueda en tu sector."',
    price: '$18,000 RD$/mes',
    color: '#0066CC',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12" /><line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    title: 'Gestión de Anuncios',
    desc: 'Campañas en Google Ads y Meta Ads con segmentación precisa, copy persuasivo y resultados medibles.',
    tagline: '"Deja de improvisar con tu presupuesto de anuncios."',
    price: '$8,000 RD$/mes (fee de gestión)',
    color: '#FF453A',
  },
]

export default function ServiciosSEO() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">SEO y Anuncios</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Que te encuentren, que te elijan</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Posicionamiento orgánico + campañas pagadas. La combinación perfecta para atraer clientes.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para aparecer en Google?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Descubre cómo podemos posicionar tu negocio en los primeros resultados.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
