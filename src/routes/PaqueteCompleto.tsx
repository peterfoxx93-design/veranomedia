import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const included = [
  { icon: '🌐', label: 'Sitio Web Completo (3-5 páginas)' },
  { icon: '📍', label: 'Google Business Pro' },
  { icon: '📱', label: 'Kit Redes Sociales' },
  { icon: '🎬', label: 'Video Promocional' },
  { icon: '🤖', label: 'Chatbot WhatsApp' },
  { icon: '✉️', label: 'Newsletter Automatizada' },
  { icon: '🔧', label: '1 mes de mantenimiento gratis' },
]

export default function PaqueteCompleto() {
  const ref = useRef(null)

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#0066CC]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-28 md:py-36 text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest block mb-4">
            🚀 Verano Media Pro
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[4rem] font-extrabold mb-4 leading-[1.05]">
            Tu agencia en un solo paquete
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Seis servicios al precio de tres. Tu presencia digital completa en un solo paso.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2 mb-8">
            <span className="text-3xl text-white/40 line-through">$40,500 RD$</span>
            <span className="text-5xl md:text-6xl font-extrabold text-[#0066CC]">$28,000 RD$</span>
            <span className="text-sm text-white/30">Promoción de lanzamiento</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-10 py-4 rounded-vm-md text-lg font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
              Quiero este paquete
            </a>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={ref ? { opacity: 1, y: 0 } : {}}
              className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest block mb-2">
              Incluye
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={ref ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }} className="text-heading-lg text-[#1C1C1E]">
              Todo lo que necesitas para despegar
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {included.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} animate={ref ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-vm-lg p-4 border border-[#E8E8ED]/50">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-[#1C1C1E] font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={ref ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            className="text-center mt-10">
            <div className="inline-flex items-center gap-2 bg-[#34C759]/10 text-[#34C759] rounded-full px-4 py-2 text-sm font-medium">
              <span>✅</span> Ahorras $12,500 RD$ comparado con servicios por separado
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">Tu presencia digital completa</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Un solo pago. Seis servicios. Resultados reales.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
