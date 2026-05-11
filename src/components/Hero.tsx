import { motion } from 'motion/react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-[#F5F5F7] to-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#007AFF]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#34C759]/2 rounded-full blur-3xl" />
      </div>

      <div className="container-vm relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E8E8ED]/50 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
            <span className="text-sm text-[#636366] font-medium">
              Agencia de marketing digital
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3rem] md:text-[5rem] lg:text-[5.5rem] font-extrabold text-[#1C1C1E] tracking-tight leading-[1.05] mb-6"
          >
            La presencia digital
            <br />
            que tu negocio{' '}
            <span className="text-[#007AFF]">merece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#8E8E93] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Páginas web modernas, Google Maps optimizado y automatización inteligente.
            Transformamos tu negocio en una marca digital lista para crecer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contacto"
              className="bg-[#007AFF] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#007AFF]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1"
            >
              Diagnóstico Gratuito
            </a>
            <a
              href="#servicios"
              className="text-[#1C1C1E] px-8 py-4 rounded-vm-md text-base font-semibold border-2 border-[#1C1C1E]/20 hover:border-[#1C1C1E]/40 transition-all duration-300 hover:-translate-y-1"
            >
              Ver Servicios
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex items-center justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { number: '83+', label: 'Clínicas analizadas' },
              { number: '100%', label: 'Clientes satisfechos' },
              { number: '24h', label: 'Diagnóstico express' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#1C1C1E]">{stat.number}</div>
                <div className="text-xs md:text-sm text-[#8E8E93] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
