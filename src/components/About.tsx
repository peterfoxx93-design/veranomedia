import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

const values = [
  { icon: '🎯', title: 'Resultados Reales', desc: 'No vendemos humo. Cada estrategia está diseñada para generar clientes nuevos.' },
  { icon: '✨', title: 'Diseño Premium', desc: 'Nada de plantillas genéricas. Sitios únicos con calidad Apple a precio justo.' },
  { icon: '🤝', title: 'Sin Tecnicismos', desc: 'Te explicamos todo en cristiano. No necesitas saber de tecnología.' },
  { icon: '⚡', title: 'Rápidos y Eficientes', desc: 'Diagnóstico en 24h, página web en 48h. Sin vueltas ni esperas.' },
]

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="text-center p-6"
    >
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{value.title}</h3>
      <p className="text-base text-[#8E8E93]">{value.desc}</p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="nosotros" className="section-vm-alt">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-16">
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
            Hecho para negocios que quieren crecer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93] mb-8"
          >
            En Verano Media creemos que todo negocio merece una presencia digital
            profesional, sin pagar precios de agencia internacional. Usamos tecnología
            de punta para ofrecerte resultados reales a precios justos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
