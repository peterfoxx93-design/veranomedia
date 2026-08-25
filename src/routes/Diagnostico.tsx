import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const bullets = [
  'Respuesta 24/7 sin demoras',
  'Calificación automática de leads',
  'Agenda sin intervención manual',
  'CRM sin fugas ni excusas',
]

export default function Diagnostico() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#5170FF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>

        <div className="container-vm relative z-10 py-24 md:py-32 text-center max-w-3xl mx-auto" ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-medium tracking-wide">Diagnóstico digital gratuito</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            ¿Qué está frenando el crecimiento de tu negocio?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl mt-6 leading-relaxed"
          >
            Convierte tu página web en un sistema que atrae, atiende y convierte. En menos de 20 minutos te mostramos exactamente qué mejorar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto"
          >
            {bullets.map((b) => (
              <div key={b} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-vm-md px-5 py-4">
                <span className="mt-[3px] inline-block w-2 h-2 rounded-full bg-[#34C759] shrink-0" />
                <span className="text-white/90 text-sm leading-relaxed">{b}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
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
        </div>
      </section>
    </div>
  )
}
