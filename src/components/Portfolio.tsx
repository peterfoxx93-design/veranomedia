import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const demos = [
  {
    brand: 'KINETIC REST',
    tag: 'Gimnasio & Fitness',
    tagline: 'Donde el movimiento encuentra su equilibrio.',
    url: 'https://kinetic-rest.vercel.app',
    bg: 'bg-[#0A0A0A]',
    accent: '#007AFF',
    glowColor: 'bg-[#007AFF]',
  },
  {
    brand: 'ATLÁNTICO RS',
    tag: 'Bienes Raíces',
    tagline: 'Tu propiedad, nuestra prioridad.',
    url: 'https://atlantico-rs.vercel.app',
    bg: 'bg-[#0A0A0A]',
    accent: '#34C759',
    glowColor: 'bg-[#34C759]',
  },
  {
    brand: 'ORA NOVA 2',
    tag: 'Asistente IA',
    tagline: 'Inteligencia artificial para tu negocio.',
    url: 'https://ora-nova-2.vercel.app',
    bg: 'bg-[#0A0A0A]',
    accent: '#AF52DE',
    glowColor: 'bg-[#AF52DE]',
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
      className={`block rounded-vm-xl overflow-hidden ${demo.bg} border border-white/10 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1 group relative`}
    >
      {/* Glow effect */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 ${demo.glowColor}/10 rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-20 -left-20 w-40 h-40 ${demo.glowColor}/5 rounded-full blur-3xl pointer-events-none`} />

      <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center min-h-[260px] justify-center">
        {/* Tag */}
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: demo.accent }}
        >
          {demo.tag}
        </div>

        {/* Brand name — hero style */}
        <h3 className="text-[1.75rem] md:text-[2rem] font-extrabold text-white leading-tight mb-3 tracking-tight">
          {demo.brand}
        </h3>

        {/* Accent line */}
        <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: demo.accent }} />

        {/* Tagline */}
        <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
          {demo.tagline}
        </p>

        {/* CTA */}
        <span
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
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
