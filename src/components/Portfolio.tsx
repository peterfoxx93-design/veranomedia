import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

const projects = [
  {
    title: 'Clínicas Dentales',
    category: 'Investigación de Mercado',
    desc: 'Análisis de 83 clínicas dentales en zonas turísticas. Identificamos que 39% no tienen presencia web.',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    title: 'IA para Humanos',
    category: 'Contenido Educativo',
    desc: 'Serie de 12 semanas educando sobre inteligencia artificial para profesionales y emprendedores.',
    gradient: 'from-green-500/10 to-green-600/5',
  },
  {
    title: 'Automatización Inteligente',
    category: 'Herramientas',
    desc: 'Chatbots, newsletters automatizadas y sistemas de lead scoring para optimizar tu negocio.',
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
      <div className="text-xs font-semibold text-[#007AFF] uppercase tracking-wider mb-3">
        {project.category}
      </div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-3">{project.title}</h3>
      <p className="text-base text-[#8E8E93] leading-relaxed">{project.desc}</p>
    </motion.div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portafolio" className="section-vm">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
          >
            Portafolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Nuestro trabajo habla
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Próximamente: los casos de éxito de nuestros clientes.
            Mientras, estos son algunos proyectos que demuestran nuestra capacidad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
