import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'CM Básico',
    desc: '8 publicaciones + 8 historias al mes con copywriting profesional y moderación de comentarios.',
    tagline: '"Publica con consistencia profesional sin gastar horas en redes."',
    price: '$8,000 RD$/mes',
    color: '#34C759',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'CM Pro',
    desc: '12 reels + 12 historias + copywriting diario + atención 24 horas. Gestión premium de redes.',
    tagline: '"Tu marca merece atención 24/7."',
    price: '$18,000 RD$/mes',
    color: '#0066CC',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Reputación Online',
    desc: 'Gestión activa de reseñas en Google y redes. Solicitamos, respondemos y monitoreamos por ti.',
    tagline: '"Una reseña negativa sin respuesta puede costarte 20 clientes."',
    price: '$3,500 RD$/mes',
    color: '#FF9F0A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    title: 'Kit Redes Sociales',
    desc: '10 plantillas profesionales con la identidad de tu marca + calendario para tu primer mes.',
    tagline: '"Redes sociales con cara bonita desde el día uno."',
    price: '$5,000 RD$',
    color: '#FF453A',
  },
]

function ServiceCard({ icon, title, desc, tagline, price, color, delay }: {
  icon: React.ReactNode
  title: string
  desc: string
  tagline: string
  price: string
  color: string
  delay: number
}) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 30 }} animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-5" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{title}</h3>
      <p className="text-base text-[#636366] mb-3">{desc}</p>
      <p className="text-sm text-[#8E8E93] italic mb-4">{tagline}</p>
      <div className="text-sm font-semibold text-[#0066CC]">{price}</div>
    </motion.div>
  )
}

export default function ServiciosRedes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Redes Sociales</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Conecta con tu audiencia</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Contenido profesional, consistente y diseñado para generar engagement.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc}
                tagline={s.tagline} price={s.price} color={s.color} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para crecer en redes?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Descubre cómo podemos hacer crecer tu presencia en redes sociales.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
