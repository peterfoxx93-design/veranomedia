import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const marketData = [
  {
    stat: '27,8%',
    label: 'de las PyMEs dominicanas se sienten listas para la IA — el mayor optimismo de Latinoamérica.',
    accent: '#007AFF',
  },
  {
    stat: '36,1%',
    label: 'opera con baja automatización en sus procesos clave. Hay oportunidad para quien actúe primero.',
    accent: '#FF9F0A',
  },
  {
    stat: '49%',
    label: 'de las empresas de la región solo explora la IA sin resultados concretos todavía.',
    accent: '#34C759',
  },
  {
    stat: '68%',
    label: 'no tiene talento especializado en IA. La barrera real no es el precio: es el conocimiento.',
    accent: '#FF3B30',
  },
]

const verticals = [
  {
    icon: '🦷',
    title: 'Clínicas y consultorios',
    problem: 'Pierden citas porque nadie contesta el teléfono o el WhatsApp.',
    solution: 'Web con reservas, recordatorios automáticos y chat con IA que responde 24/7.',
  },
  {
    icon: '⚖️',
    title: 'Bufetes de abogados',
    problem: 'El despacho depende del boca a boca y no convierte las consultas en clientes.',
    solution: 'Presencia digital seria, contenido que educa y sistema que capta cada consulta.',
  },
  {
    icon: '🏠',
    title: 'Inmobiliarias',
    problem: 'Las propiedades se anuncian en grupos de Facebook y las oportunidades se pierden.',
    solution: 'Catálogo profesional, leads organizados y seguimiento automático por WhatsApp.',
  },
]

export default function Evidence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-vm">
      <div className="container-vm" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest"
          >
            Los datos del mercado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4"
          >
            Las PyMEs dominicanas quieren digitalizarse. Falta quien lo haga fácil.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            Confianza hay de sobra. Lo que falta es ejecución. Ahí entra Verano Media.
          </motion.p>
        </div>

        {/* Datos reales del mercado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketData.map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="card-vm rounded-vm-xl p-8 h-full"
            >
              <div className="text-5xl font-extrabold tracking-tight mb-4" style={{ color: item.accent }}>
                {item.stat}
              </div>
              <p className="text-sm text-[#636366] leading-relaxed">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-[#A0A0A5] text-center mb-16">
          Fuente: estudio "Pulso Pymes LATAM 2026" de Alegra (5.000+ PyMEs en 8 países) y reportes de Diario Libre sobre adopción de IA en la región, 2026.
        </p>

        {/* Problema → solución por vertical */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-heading-md text-[#1C1C1E] mb-4"
          >
            Conocemos los problemas de tu sector
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#8E8E93]"
          >
            No vendemos tecnología por venderla. Resolvemos el problema de fondo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {verticals.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-vm rounded-vm-xl p-8 h-full flex flex-col"
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h4 className="text-heading-sm text-[#1C1C1E] mb-3">{v.title}</h4>
              <p className="text-sm text-[#FF3B30] leading-relaxed mb-2">
                <span className="font-semibold">El problema:</span> {v.problem}
              </p>
              <p className="text-sm text-[#2E7D32] leading-relaxed">
                <span className="font-semibold">La solución:</span> {v.solution}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/diagnostico"
            className="inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#0066CC] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/35"
          >
            Diagnóstico gratuito
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
