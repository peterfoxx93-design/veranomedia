import { motion } from 'motion/react'
import { useEffect } from 'react'

export default function ProyectoPaquetesIntegrales() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#AF52DE]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#AF52DE] uppercase tracking-widest">Demo • Marketing 360°</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mt-4 mb-6">Paquetes Integrales</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl">Estrategias 360° que combinan web, redes sociales, anuncios y automatización. Todo lo que tu negocio necesita para crecer en un solo paquete.</motion.p>
        </div>
      </section>

      <section className="section-vm">
        <div className="container-vm grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Sitio Web + SEO', desc: 'Landing page profesional optimizada para buscadores con diseño responsive.' },
            { title: 'Redes Sociales', desc: 'Gestión de perfiles, calendario de contenido y diseño de publicaciones.' },
            { title: 'Automatización', desc: 'Chatbots, email marketing y flujos de trabajo que funcionan 24/7.' },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-vm-xl bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all">
              <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{f.title}</h3>
              <p className="text-[#636366] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-vm-alt py-24">
        <div className="container-vm">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-heading-lg text-[#1C1C1E] mb-4">Ejemplo de combo mensual</h2>
            <p className="text-lg text-[#8E8E93]">Todo lo que un negocio local necesita para despegar.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-vm-xl border border-[#E8E8ED]/50 p-8 shadow-vm-lg">
            <ul className="space-y-4">
              {['Landing page de 5 secciones', 'Perfil de Google Business optimizado', '8 publicaciones para redes sociales/mes', 'Chatbot en WhatsApp básico', 'Reporte mensual de resultados'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#AF52DE] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-[#1C1C1E]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white py-24">
        <div className="container-vm text-center">
          <h2 className="text-heading-lg font-extrabold mb-6">Un plan hecho a tu medida</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Hablemos de lo que tu negocio necesita y armamos el paquete perfecto.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#AF52DE] text-white px-8 py-4 rounded-vm-md font-semibold hover:bg-[#AF52DE]/90 transition-all hover:-translate-y-1">
            Cotizar mi paquete
          </a>
        </div>
      </section>
    </div>
  )
}
