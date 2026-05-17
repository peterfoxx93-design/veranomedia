import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Landing Page',
    desc: 'Página profesional de 1 página, optimizada para convertir visitantes en clientes. Diseño responsive, SEO básico y hosting incluido.',
    tagline: '"Tu negocio merece una primera impresión impecable."',
    price: 'Desde $8,000 RD$',
    color: '#0066CC',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Sitio Web Completo',
    desc: 'De 3 a 5 páginas con diseño premium, integración de WhatsApp, Google Maps y SEO. Tu hogar digital completo.',
    tagline: '"Donde tus clientes te encuentran, te conocen y te eligen."',
    price: 'Desde $18,000 RD$',
    color: '#34C759',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Tienda Online',
    desc: 'Tu tienda virtual lista para vender 24/7. Catálogo, carrito, pasarela de pago y diseño optimizado para móvil.',
    tagline: '"Tu tienda abierta siempre, incluso cuando tú descansas."',
    price: 'Desde $35,000 RD$',
    color: '#FF9F0A',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Google Business Pro',
    desc: 'Optimización completa de tu perfil de Google: fotos, descripciones estratégicas y gestión de reseñas.',
    tagline: '"Si no estás en Google Maps, no existes para tus vecinos."',
    price: '$3,500 RD$',
    color: '#5AC8FA',
  },
]

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1"
    >
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

export default function ServiciosWeb() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
          >
            Diseño Web
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Tu hogar en internet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Desde una landing page hasta un ecommerce completo. Diseñamos tu presencia web con calidad premium.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para tu sitio web?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Agenda tu Diagnóstico Digital Gratuito y descubre qué oportunidades estás perdiendo en internet.
          </p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
