import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const pillars = [
  { title: 'Web de alta conversión', desc: 'Diseño orientado a convertir visitantes en leads cualificados, no solo a verse bien.' },
  { title: 'Chatbot con IA 24/7', desc: 'Responde, califica y agenda sin demoras, incluso fuera de horario.' },
  { title: 'CRM integrado', desc: 'Cada lead se guarda, se sigue y se cierra sin perder información ni oportunidades.' },
  { title: 'SEO + Google Maps', desc: 'Apareces cuando te buscan y conviertes tu ficha en canal de captación.' },
  { title: 'Automatizaciones', desc: 'Flujos que eliminan trabajo repetitivo sin aumentar costos fijos.' },
  { title: 'Analítica y crecimiento', desc: 'Métricas reales de captación, conversión y optimización continua.' },
]

const steps = [
  { title: 'Diagnóstico', desc: 'Auditoría de captación actual, SEO, Maps, CRM y competencia local.' },
  { title: 'Estrategia', desc: 'Definimos el sistema a medida: web, IA, WhatsApp, CRM y flujos.' },
  { title: 'Implementación', desc: 'Web, chatbot, contenido y Maps conectados en un mismo sistema.' },
  { title: 'Lanzamiento', desc: 'SEO, Maps, campañas iniciales y automatizaciones activas desde el día uno.' },
  { title: 'Crecimiento', desc: 'Métricas semanales, iteración mensual y optimización continua.' },
]

const proof = [
  { metric: '12→47 citas/semana', label: 'Clínica dental en 30 días' },
  { metric: '-73% tiempo de respuesta', label: 'Flujo IA + respuestas guardadas' },
  { metric: '60% menos fugas', label: 'CRM y seguimiento automático' },
]

const pricingCards = [
  {
    name: 'Sistema Inicial',
    price: 'RD$ 18,000',
    period: 'proyecto único',
    bestFor: 'Negocios que inician su captación digital',
    bullets: [
      'Landing page de alta conversión',
      'Chatbot WhatsApp con IA',
      'CRM基本: leads + pipeline',
      'SEO técnico inicial',
      'Google Business optimizado',
      'Entrega en 7 días',
    ],
    cta: 'Quiero mi diagnóstico',
  },
  {
    name: 'Sistema Mensual',
    price: 'RD$ 12,000/mes',
    period: 'mínimo 3 meses',
    bestFor: 'Negocios que quieren crecimiento predecible',
    bullets: [
      'Web completa + SEO mensual',
      'IA + automatizaciones avanzadas',
      'CRM completo + reportes',
      'Contenido semanal para redes',
      'Soporte prioritario',
      'Reuniones de optimización mensuales',
    ],
    cta: 'Hablar con un especialista',
    highlight: true,
  },
  {
    name: 'Sistema 360',
    price: 'RD$ 25,000/mes',
    period: 'socio estratégico',
    bestFor: 'Empresas que quieren escala real',
    bullets: [
      'Todo el Sistema Mensual',
      'Campañas pagas administradas',
      'Automatizaciones + integraciones',
      'Analítica avanzada + BI',
      'Consultoría estratégica semanal',
      'SLA y soporte 24/7',
    ],
    cta: 'Solicitar propuesta',
  },
]

export default function SistemaVerano() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#5170FF]/10 rounded-full blur-3xl" />
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
            <span className="text-[#5170FF]">Implementamos sistemas inteligentes para captar, atender y convertir clientes.</span>
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
              className="inline-flex items-center gap-2 bg-[#5170FF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5170FF]/90 transition-all duration-300 shadow-lg shadow-[#5170FF]/25 hover:shadow-[#5170FF]/40 hover:-translate-y-1"
            >
              Solicitar diagnóstico gratuito
            </Link>
            <Link to="/paquete-completo" className="text-white/80 hover:text-white px-6 py-4 rounded-full font-medium border border-white/20 hover:border-white/40 transition-all">
              Ver sistema completo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Prueba social */}
      <section className="section-vm">
        <div className="container-vm" ref={ref}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest"
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
                <div className="text-4xl md:text-5xl font-extrabold text-[#5170FF] mb-2">{item.metric}</div>
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
              className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
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

          <div className="text-center max-w-4xl mx-auto mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm font-semibold text-[#5170FF] uppercase tracking-widest"
            >
              Metodología
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-heading-lg text-[#1C1C1E] mt-3 mb-12"
            >
              Cómo implementamos tu sistema
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {steps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#5170FF] text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-[#1C1C1E] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#8E8E93] max-w-[260px] mx-auto">{item.desc}</p>
                  {index < steps.length - 1 ? (
                    <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-[1px] bg-gradient-to-r from-[#5170FF]/40 to-transparent" />
                  ) : null}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-heading-lg text-[#1C1C1E] mb-4"
            >
              ¿Por qué elegir VeranoMedia?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#636366]"
            >
              Combinamos experiencia humana con herramientas de inteligencia artificial para ofrecerte algo que las agencias tradicionales no pueden: velocidad, claridad y foco real en resultados.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#5170FF]/10 rounded-full blur-3xl" />
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
              className="bg-[#5170FF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#5170FF]/90 transition-all duration-300 shadow-lg shadow-[#5170FF]/25 hover:shadow-[#5170FF]/40 hover:-translate-y-1 inline-flex items-center gap-2"
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
