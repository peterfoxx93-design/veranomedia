import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const demos = [
  {
    brand: 'KINETIC REST',
    tag: 'GIMNASIO & FITNESS',
    tagline: 'Donde el movimiento encuentra su equilibrio.',
    url: 'https://kinetic-rest.vercel.app',
    accent: '#007AFF',
    textColor: '#FFFFFF',
    heroImage: '/images/demos/kinetic-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/10 via-black/30 to-black/60',
  },
  {
    brand: 'ATLÁNTICO REAL STATE',
    tag: 'BIENES RAÍCES',
    tagline: 'Redefiniendo el lujo tropical.',
    url: 'https://atlantico-rs.vercel.app',
    accent: '#34C759',
    textColor: '#FFFFFF',
    heroImage: '/images/demos/atlantico-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/5 via-black/15 to-black/50',
  },
  {
    brand: 'ORA NOVA',
    tag: 'ODONTOLOGÍA ESTÉTICA',
    tagline: 'Donde la ciencia se encuentra con el arte.',
    url: 'https://ora-nova-2.vercel.app',
    accent: '#AF52DE',
    textColor: '#FFFFFF',
    heroImage: '/images/demos/oranova-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/10 via-black/20 to-black/50',
  },
]

function DemoCard({ demo, index }: { demo: typeof demos[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.a
      ref={ref}
      href={demo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="block rounded-vm-xl overflow-hidden group relative h-[320px]"
    >
      {/* Hero image background */}
      <div className="absolute inset-0">
        <img
          src={demo.heroImage}
          alt={demo.brand}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay — preserva la imagen visible */}
        <div className={`absolute inset-0 ${demo.overlayStyle}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center justify-end min-h-full">
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
          style={{ color: demo.accent }}
        >
          {demo.tag}
        </div>

        <h3
          className="text-[1.75rem] md:text-[2rem] font-extrabold leading-tight mb-3 tracking-tight"
          style={{ color: demo.textColor }}
        >
          {demo.brand}
        </h3>

        <div className="w-8 h-[2px] mb-3" style={{ backgroundColor: demo.accent }} />

        <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: `${demo.textColor}CC` }}>
          {demo.tagline}
        </p>

        <span
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
          style={{ color: demo.accent }}
        >
          Ver demo en vivo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </motion.a>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-vm">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
          >
            Demos de proyectos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Transformamos negocios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Cada demo muestra lo que podemos hacer por tu negocio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <DemoCard key={demo.brand} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
