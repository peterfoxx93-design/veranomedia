import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const projects = [
  {
    image: '/images/proyectos/landing-pages.webp',
    title: 'Landing Pages',
    category: 'Diseño Web',
    desc: 'Páginas profesionales optimizadas para convertir visitantes en clientes. Diseño responsive, SEO y velocidad.',
    gradient: 'from-blue-500/10 to-blue-600/5',
    link: '/proyectos/landing-pages',
  },
  {
    image: '/images/proyectos/posicionamiento-local.webp',
    title: 'Posicionamiento Local',
    category: 'Google Business',
    desc: 'Clínicas, restaurantes y comercios que ahora aparecen en Google Maps y atraen clientes locales todos los días.',
    gradient: 'from-green-500/10 to-green-600/5',
    link: '/proyectos/posicionamiento-local',
  },
  {
    image: '/images/proyectos/paquetes-integrales.webp',
    title: 'Paquetes Integrales',
    category: 'Marketing Completo',
    desc: 'Estrategias 360° que combinan web, redes, anuncios y automatización para negocios que quieren crecer de verdad.',
    gradient: 'from-purple-500/10 to-purple-600/5',
    link: '/proyectos/paquetes-integrales',
  },
  {
    image: '/images/proyectos/automatizaciones.webp',
    title: 'Automatizaciones',
    category: 'Workflow & IA',
    desc: 'Conectamos tus herramientas con Zapier, Make y n8n para que los procesos repetitivos de tu negocio se ejecuten solos.',
    gradient: 'from-cyan-500/10 to-cyan-600/5',
    link: '/proyectos/automatizaciones',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={project.link}
        className={`block rounded-vm-xl overflow-hidden bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1 group`}
      >
        <div className="relative h-44 md:h-52 overflow-hidden bg-[#0A0A0A]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="p-6 md:p-8">
          <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-wider mb-2">
            {project.category}
          </div>
          <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{project.title}</h3>
          <p className="text-base text-[#636366] leading-relaxed mb-4">{project.desc}</p>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066CC] group-hover:gap-3 transition-all">
            Ver proyecto
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </span>
        </div>
      </Link>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
