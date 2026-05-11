import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef } from 'react'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="contacto" className="relative bg-[#1C1C1E] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#007AFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/5 rounded-full blur-3xl" />
      </div>

      <div className="container-vm relative z-10 py-24 md:py-32" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6 leading-[1.1]">
            ¿Listo para digitalizar tu negocio?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Agenda tu Diagnóstico Digital Gratuito y descubre qué oportunidades
            estás perdiendo en internet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/18091234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#007AFF] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#007AFF]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1 inline-flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos por WhatsApp
            </a>
            <a
              href="mailto:info@veranomedia.digital"
              className="text-white/80 hover:text-white px-8 py-4 rounded-vm-md text-base font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300"
            >
              info@veranomedia.digital
            </a>
          </div>

          <p className="text-sm text-white/50 mt-8">
            Sin compromiso. Sin spam. Solo valor real para tu negocio.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
