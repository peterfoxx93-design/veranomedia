import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export default function Contacto() {
  const ref = useRef(null)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#0066CC]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest block mb-4">
            Contacto
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[4rem] font-extrabold mb-6 leading-[1.05]">
            Diagnóstico Digital <span className="text-[#0066CC]">Gratuito</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10">
            Descubre qué oportunidades estás perdiendo en internet. Sin compromiso, sin spam. Solo valor real para tu negocio.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-10 py-4 rounded-vm-md text-lg font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>
            <a href="mailto:info@veranomedia.digital"
              className="text-white/80 hover:text-white px-8 py-4 rounded-vm-md text-base font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300">
              info@veranomedia.digital
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={ref ? { opacity: 1, y: 0 } : {}}
            className="text-heading-lg text-[#1C1C1E] mb-4">¿Qué incluye tu diagnóstico?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ref ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }} className="text-lg text-[#8E8E93] mb-12 max-w-xl mx-auto">
            Una llamada de 15 minutos donde analizamos tu presencia digital y te damos 3 recomendaciones personalizadas.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: '🔍', title: 'Auditoría', desc: 'Revisamos tu presencia online actual' },
              { icon: '📊', title: 'Análisis', desc: 'Comparamos con tu competencia local' },
              { icon: '💡', title: 'Recomendaciones', desc: '3 acciones concretas para mejorar' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 20 }} animate={ref ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-vm-xl p-6 border border-[#E8E8ED]/50">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#1C1C1E] mb-1">{item.title}</h3>
                <p className="text-sm text-[#8E8E93]">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={ref ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 text-sm text-[#8E8E93]">
            Sin compromiso. Sin spam. Solo valor real para tu negocio.
          </motion.div>
        </div>
      </section>
    </div>
  )
}
