import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'

const projects = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Landing Pages y Sitios Web',
    category: 'Diseño',
    desc: 'Páginas profesionales optimizadas para convertir. Diseño responsive, animaciones fluidas y SEO incluido.',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Posicionamiento Local',
    category: 'Google Business',
    desc: 'Clínicas, restaurantes y comercios locales optimizados para aparecer en Google Maps y atraer clientes.',
    gradient: 'from-green-500/10 to-green-600/5',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Estrategias de Contenido',
    category: 'Redes Sociales',
    desc: 'Planes de contenido para Instagram, Facebook y LinkedIn que generan engagement y seguidores reales.',
    gradient: 'from-orange-500/10 to-orange-600/5',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Automatización Inteligente',
    category: 'Chatbots y Email',
    desc: 'Chatbots en WhatsApp que atienden 24/7 y campañas de email marketing que convierten en automático.',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
]

const realProjects = [
  {
    brand: 'KINETIC REST',
    tag: 'Gimnasio & Fitness',
    tagline: 'Donde el movimiento encuentra su equilibrio.',
    url: 'https://kinetic-rest.vercel.app',
    accent: '#007AFF',
  },
  {
    brand: 'ATLÁNTICO RS',
    tag: 'Bienes Raíces',
    tagline: 'Tu propiedad, nuestra prioridad.',
    url: 'https://atlantico-rs.vercel.app',
    accent: '#34C759',
  },
  {
    brand: 'ORA NOVA 2',
    tag: 'Asistente IA',
    tagline: 'Inteligencia artificial para tu negocio.',
    url: 'https://ora-nova-2.vercel.app',
    accent: '#AF52DE',
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
      className="block rounded-vm-xl overflow-hidden bg-[#0A0A0A] border border-white/10 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1 group relative"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${project.accent}15` }} />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${project.accent}10` }} />

      <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center min-h-[260px] justify-center">
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

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-vm-xl p-8 bg-gradient-to-br ${project.gradient} border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1 cursor-default`}
    >
      <div className="w-10 h-10 rounded-vm-md flex items-center justify-center mb-4 text-[#0066CC] bg-[#0066CC]/10">
        {project.icon}
      </div>
      <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">{project.category}</div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{project.title}</h3>
      <p className="text-base text-[#636366] leading-relaxed">{project.desc}</p>
    </motion.div>
  )
}

export default function PortafolioPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Portafolio</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Nuestro trabajo habla</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">Proyectos que demuestran lo que somos capaces de hacer por tu negocio.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Demos de proyectos */}
      <section className="section-vm">
        <div className="container-vm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Demos de proyectos</span>
            <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Construido para negocios como el tuyo</h2>
            <p className="text-lg text-[#8E8E93]">Cada demo muestra lo que podemos hacer. El primero ya está listo; los siguientes, en camino.</p>
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
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Tu proyecto podría ser el próximo?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Hablemos de cómo podemos transformar tu presencia digital.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
