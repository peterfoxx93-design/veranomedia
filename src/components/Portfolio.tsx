import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Landing Pages',
    category: 'Diseño Web',
    desc: 'Páginas profesionales optimizadas para convertir visitantes en clientes. Diseño responsive, SEO y velocidad.',
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
    desc: 'Clínicas, restaurantes y comercios que ahora aparecen en Google Maps y atraen clientes locales todos los días.',
    gradient: 'from-green-500/10 to-green-600/5',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Paquetes Integrales',
    category: 'Marketing Completo',
    desc: 'Estrategias 360° que combinan web, redes, anuncios y automatización para negocios que quieren crecer de verdad.',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-vm-xl p-8 bg-gradient-to-br ${project.gradient} border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1 cursor-default`}
    >
      <div
        className="w-10 h-10 rounded-vm-md flex items-center justify-center mb-4 text-[#0066CC] bg-[#0066CC]/10"
      >
        {project.icon}
      </div>
      <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
        {project.category}
      </div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{project.title}</h3>
      <p className="text-base text-[#636366] leading-relaxed">{project.desc}</p>
    </motion.div>
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
            Trabajo realizado
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
            Cada proyecto es único y refleja la calidad que ponemos en todo lo que hacemos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/portafolio"
            className="inline-flex items-center gap-2 text-[#0066CC] hover:text-[#0052CC] font-medium transition-all duration-300"
          >
            Ver portafolio completo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
