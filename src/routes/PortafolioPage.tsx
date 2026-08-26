import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'

const realProjects = [
  {
    brand: 'HERNÁNDEZ & ASOCIADOS',
    tag: 'BUFETE LEGAL',
    tagline: 'Defensa jurídica con criterio y compromiso.',
    url: 'https://hernandez-asociados.vercel.app',
    accent: '#C9A227',
    heroImage: '/images/demos/hernandez-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/10 via-black/30 to-black/60',
  },
  {
    brand: 'KINETIC REST',
    tag: 'GIMNASIO & FITNESS',
    tagline: 'Donde el movimiento encuentra su equilibrio.',
    url: 'https://kinetic-rest.vercel.app',
    accent: '#5170FF',
    heroImage: '/images/demos/kinetic-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/10 via-black/30 to-black/60',
  },
  {
    brand: 'ATLÁNTICO REAL STATE',
    tag: 'BIENES RAÍCES',
    tagline: 'Redefiniendo el lujo tropical.',
    url: 'https://atlantico-rs.vercel.app',
    accent: '#34C759',
    heroImage: '/images/demos/atlantico-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/5 via-black/15 to-black/50',
  },
  {
    brand: 'ORA NOVA',
    tag: 'ODONTOLOGÍA ESTÉTICA',
    tagline: 'Donde la ciencia se encuentra con el arte.',
    url: 'https://ora-nova-2.vercel.app',
    accent: '#AF52DE',
    heroImage: '/images/demos/oranova-hero.jpg',
    overlayStyle: 'bg-gradient-to-b from-black/10 via-black/20 to-black/50',
  },
]

function RealProjectCard({ project, index }: { project: typeof realProjects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.a
      ref={ref}
      href={project.url}
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
          src={project.heroImage}
          alt={project.brand}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Subtle overlay */}
        <div className={`absolute inset-0 ${project.overlayStyle}`} />
      </div>

      <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center justify-end min-h-full">
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ color: project.accent }}
        >
          {project.tag}
        </div>

        <h3 className="text-[1.75rem] md:text-[2rem] font-extrabold text-white leading-tight mb-3 tracking-tight">
          {project.brand}
        </h3>

        <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: project.accent }} />

        <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
          {project.tagline}
        </p>

        <span
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
          style={{ color: project.accent }}
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

export default function PortafolioPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest">Portafolio</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Nuestro trabajo habla</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Demos funcionales del Sistema Verano: web premium + asistente IA + captación de leads, listos para tu negocio.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest">Demos de proyectos</span>
            <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Construido para negocios como el tuyo</h2>
            <p className="text-lg text-[#8E8E93]">Cada demo incluye el sistema completo: abre cualquiera y habla con su asistente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {realProjects.map((p, i) => (
              <RealProjectCard key={p.brand} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#5170FF]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Tu proyecto podría ser el próximo?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Hablemos de cómo podemos transformar tu presencia digital.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5170FF] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#5170FF]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
