import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const systemItems = [
 'Web de alta conversión',
 'Chatbot con IA 24/7',
 'Atención y agenda por WhatsApp',
 'CRM integrado',
 'SEO y Google Maps',
 'Automatizaciones',
 'Analítica y seguimiento',
 'Contenido estratégico',
]

const process = [
  { title: 'Diagnóstico', desc: 'Analizamos tu presencia digital, tu competencia y tus oportunidades.' },
  { title: 'Estrategia', desc: 'Definimos un sistema de captación a medida, no solo herramientas.' },
  { title: 'Implementación', desc: 'Web, CRM, IA, WhatsApp y automatizaciones conectadas.' },
  { title: 'Lanzamiento', desc: 'Ponemos en marcha el sistema con SEO, Maps y campañas iniciales.' },
  { title: 'Resultados', desc: 'Medimos, iteramos y escalamos cada mes.' },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="section-vm-alt">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest"
          >
            Nuestro Sistema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Sistema Inteligente de Captación de Clientes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            No vendemos piezas sueltas. Te implementamos un sistema que atrae, atiende, convierte y organiza a tus clientes sin que pierdas oportunidades.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: '¿Qué incluye el sistema?',
              items: systemItems,
              accent: '#5170FF',
            },
            {
              title: '¿Cómo funciona?',
              items: process.map((p) => `${p.title}: ${p.desc}`),
              accent: '#34C759',
            },
            {
              title: '¿Para quién es?',
              items: [
                'Clínicas y consultorios.',
                'Negocios locales.',
                'Inmobiliarias.',
                'Servicios profesionales.',
                'Empresas que quieren crecer sin depender solo del teléfono.',
              ],
              accent: '#FF9F0A',
            },
          ].map((block, blockIndex) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + blockIndex * 0.1 }}
              className="glass-card glass-shine rounded-vm-xl p-8 h-full"
            >
              <h3 className="text-heading-sm text-[#1C1C1E] mb-4">{block.title}</h3>
              <ul className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="text-sm text-[#636366] leading-relaxed flex items-start gap-2">
                    <span className="mt-[3px] inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: block.accent }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-[#636366]"
          >
            A diferencia de contratar web, community manager o CRM por separado, nosotros integramos todo en un único sistema orientado a resultados.
          </motion.p>
        </div>

        <div className="text-center">
          <Link
            to="/paquete-completo"
            className="inline-flex items-center gap-2 bg-[#5170FF] hover:bg-[#5170FF] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#5170FF]/20 hover:shadow-[#5170FF]/35"
          >
            Ver sistema completo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
