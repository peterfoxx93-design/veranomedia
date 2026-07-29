import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

const values = [
  { icon: '🎯', title: 'Resultados Reales', desc: 'No vendemos humo. Cada sistema está diseñado para generar clientes nuevos.' },
  { icon: '✨', title: 'Diseño Premium', desc: 'Nada de plantillas genéricas. Sitios únicos con calidad profesional a precio justo.' },
  { icon: '🤝', title: 'Sin Tecnicismos', desc: 'Te explicamos todo claro. No necesitas ser experto para crecer.' },
  { icon: '⚡', title: 'Rápidos y Eficientes', desc: 'Diagnóstico en 24h, sistema listo en 48h. Sin vueltas ni esperas.' },
]

const steps = [
  { title: 'Diagnóstico', desc: 'Auditoría de presencia digital, captación y competencia local.' },
  { title: 'Estrategia', desc: 'Definimos qué piezas necesitás y cómo se conectan entre sí.' },
  { title: 'Implementación', desc: 'Web, CRM, IA, WhatsApp y automatizaciones en un mismo sistema.' },
  { title: 'Lanzamiento', desc: 'SEO, Maps, contenido y anuncios activos desde el día uno.' },
  { title: 'Crecimiento', desc: 'Medimos, iteramos y escalamos cada mes.' },
]

function Step({ item, index }: { item: typeof steps[0]; index: number }) {
  return (
    <div className="relative text-center">
      <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#0066CC] text-white font-bold text-lg">
        {index + 1}
      </div>
      <h4 className="font-semibold text-[#1C1C1E] mb-1">{item.title}</h4>
      <p className="text-sm text-[#8E8E93] max-w-[260px] mx-auto">{item.desc}</p>
      {index < steps.length - 1 ? (
        <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[1px] bg-gradient-to-r from-[#0066CC]/40 to-transparent" />
      ) : null}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="nosotros" className="section-vm-alt">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
          >
            Nosotros
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            No vendemos páginas web.<br />
            <span className="md:text-[1.35em]">Implementamos sistemas inteligentes para captar, atender y convertir clientes.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Integramos web, IA, WhatsApp y CRM en una única solución, para que tu negocio gane clientes sin perder oportunidades.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{value.title}</h3>
              <p className="text-base text-[#8E8E93]">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
          >
            Metodología
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-10"
          >
            De la idea al crecimiento real
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {steps.map((item, index) => (
              <Step key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mb-4"
          >
            Quién está detrás
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            VeranoMedia es una agencia ágil con mentalidad startup:
            combinamos experiencia humana con herramientas de inteligencia artificial para entregar resultados de nivel profesional.
            Trabajo directo, decisiones rápidas y foco real en tu crecimiento.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
