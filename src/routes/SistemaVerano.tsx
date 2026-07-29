import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const pillars = [
  { title: 'Web de alta conversión', desc: 'Diseño orientado a convertir visitantes en leads, no solo a verse bien.' },
  { title: 'Chatbot con IA 24/7', desc: 'Responde, califica y agenda sin demoras, incluso a las 11 p.m.' },
  { title: 'CRM integrado', desc: 'Cada lead se guarda, se sigue y se cierra sin perder información.' },
  { title: 'SEO + Maps', desc: 'Apareces cuando te buscan y conviertes tu ficha en canal de captación.' },
  { title: 'Automatizaciones', desc: 'Flujos que eliminan trabajo repetitivo sin aumentar costos fijos.' },
  { title: 'Analítica y seguimiento', desc: 'Métricas reales de captación, conversión y crecimiento mensual.' },
]

const steps = [
  { title: 'Diagnóstico', desc: 'Analizamos tu captación actual y la competencia local.' },
  { title: 'Estrategia', desc: 'Definimos el sistema a medida, no solo herramientas.' },
  { title: 'Implementación', desc: 'Web, CRM, IA y WhatsApp conectados en un mismo flujo.' },
  { title: 'Lanzamiento', desc: 'SEO, Maps y campañas activas desde el día uno.' },
  { title: 'Crecimiento', desc: 'Medimos, iteramos y escalamos cada mes.' },
]

const proof = [
  { metric: '12→47 citas/semana', label: 'Clínica dental en 30 días' },
  { metric: '-73% tiempo de respuesta', label: 'Con respuestas guardadas + flujo IA' },
  { metric: '60% menos fugas', label: 'Con CRM y seguimiento automático' },
]

export default function SistemaVerano() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0066CC]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>

        <div className="container-vm relative z-10 py-24 md:py-32">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium tracking-wide">Sistema Verano</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl"
          >
            No vendemos páginas web.<br />
            <span className="text-[#0066CC]">Implementamos sistemas inteligentes para captar, atender y convertir clientes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed"
          >
            Integramos web, IA, WhatsApp y CRM en una única solución. Sin piezas sueltas, sin guerra de precios. Un sistema pensado para generar clientes reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10"
          >
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 shadow-lg shadow-[#0066CC]/25 hover:shadow-[#0066CC]/40 hover:-translate-y-1"
            >
              Solicitar diagnóstico gratuito
            </Link>
            <Link to="/paquete-completo" className="text-white/80 hover:text-white px-6 py-4 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all">
              Ver sistema completo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Resultados */}
      <section className="section-vm">
        <div className="container-vm" ref={ref}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
            >
              Resultados
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
            >
              Lo que genera un sistema de captación real
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#8E8E93]"
            >
              No hablamos de vanity metrics. Hablamos de clientes, citas y leads que cierran.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {proof.map((item, i) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card glass-shine rounded-vm-xl p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-[#0066CC] mb-2">{item.metric}</div>
                <div className="text-sm text-[#636366]">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sistema */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
            >
              El sistema
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
            >
              ¿Qué incluye el Sistema Verano?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#8E8E93]"
            >
              Todas las piezas conectadas para un único objetivo: captar, atender y convertir clientes sin fuga.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card glass-shine rounded-vm-xl p-8"
              >
                <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{pillar.title}</h3>
                <p className="text-base text-[#636366] leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#007AFF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6 leading-[1.1]"
          >
            ¿Querés saber qué está frenando el crecimiento de tu negocio?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto"
          >
            Te implementamos un sistema de captación inteligente y, en menos de 20 minutos del diagnóstico, sabrás qué podés mejorar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/contacto"
              className="bg-[#007AFF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#007AFF]/90 transition-all duration-300 shadow-lg shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40 hover:-translate-y-1 inline-flex items-center gap-2"
            >
              Solicitar diagnóstico gratuito
            </Link>
            <a
              href="https://wa.me/18093586497"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            >
              Escríbenos por WhatsApp
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-sm text-white/50 mt-8"
          >
            Sin compromiso. Sin spam. Solo valor real para tu negocio.
          </motion.p>
        </div>
      </section>
    </div>
  )
}
