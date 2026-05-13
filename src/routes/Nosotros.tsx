import { motion, useInView } from 'motion/react'
import { useRef, createElement } from 'react'

const values = [
  { icon: '🎯', title: 'Resultados Reales', desc: 'No vendemos humo. Cada estrategia está diseñada para generar clientes nuevos. Medimos lo que hacemos.' },
  { icon: '✨', title: 'Diseño Premium', desc: 'Nada de plantillas genéricas. Sitios únicos con calidad Apple a precio justo. Tu marca merece lo mejor.' },
  { icon: '🤝', title: 'Sin Tecnicismos', desc: 'Te explicamos todo en cristiano. No necesitas saber de tecnología para entender lo que hacemos por tu negocio.' },
  { icon: '⚡', title: 'Rápidos y Eficientes', desc: 'Diagnóstico en 24 horas, página web en 48. Sin vueltas, sin esperas, sin excusas.' },
  { icon: '🛡️', title: 'Soporte Continuo', desc: 'No te dejamos solo después de entregar. Estamos contigo en cada paso del camino.' },
]

const team = [
  { role: 'Fundador & Estratega', name: 'Peter Fx', desc: 'Lidera la visión y estrategia de Verano Media.' },
  { role: 'Agente AI', name: 'Neo', desc: 'Automatización, contenido y análisis de datos.' },
]

export default function Nosotros() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Nosotros</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Hecho para negocios que quieren crecer</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">
            En Verano Media creemos que todo negocio merece una presencia digital profesional,
            sin pagar precios de agencia internacional. Usamos tecnología de punta para ofrecerte
            resultados reales a precios justos.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50"
            >
              <h3 className="text-heading-sm text-[#0066CC] mb-4">Nuestra Misión</h3>
              <p className="text-base text-[#636366] leading-relaxed">
                Democratizar el marketing digital de calidad para pequeños y medianos negocios.
                Creemos que tener una presencia digital profesional no debería costar un ojo de la cara.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50"
            >
              <h3 className="text-heading-sm text-[#0066CC] mb-4">Nuestra Visión</h3>
              <p className="text-base text-[#636366] leading-relaxed">
                Ser la agencia digital de referencia para negocios locales en toda Latinoamérica.
                Un cliente a la vez, un negocio transformado a la vez.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }} className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">¿Por qué elegirnos?</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }} className="text-heading-lg text-[#1C1C1E] mt-3">Nuestros valores</motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-6 bg-white rounded-vm-xl border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{v.title}</h3>
                <p className="text-sm text-[#8E8E93]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-vm">
        <div className="container-vm text-center">
          <h2 className="text-heading-lg text-[#1C1C1E] mb-4">Equipo</h2>
          <p className="text-lg text-[#8E8E93] mb-12 max-w-xl mx-auto">
            Detrás de Verano Media hay un equipo comprometido con tu éxito.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-vm-xl p-6 border border-[#E8E8ED]/50 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0066CC]/10 flex items-center justify-center text-2xl mx-auto mb-4">
                  {i === 0 ? '👤' : '🤖'}
                </div>
                <h3 className="font-bold text-[#1C1C1E]">{m.name}</h3>
                <p className="text-sm text-[#0066CC] mb-2">{m.role}</p>
                <p className="text-sm text-[#8E8E93]">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para trabajar juntos?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Háblanos sin compromiso. Te escuchamos, te diagnosticamos y te proponemos.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
