import { motion } from 'motion/react'
import { useEffect } from 'react'

export default function ProyectoPosicionamientoLocal() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#34C759] uppercase tracking-widest">Demo • SEO Local</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mt-4 mb-6">Posicionamiento Local</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl">Tu negocio apareciendo en Google Maps y en los primeros resultados de búsqueda local. Clientes cerca, todos los días.</motion.p>
        </div>
      </section>

      <section className="section-vm">
        <div className="container-vm grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Google My Business', desc: 'Perfil optimizado con fotos, horarios, reseñas y publicaciones semanales.' },
            { title: 'Reseñas Estratégicas', desc: 'Sistema para conseguir reseñas positivas que mejoren tu ranking local.' },
            { title: 'Citas y Palabras Clave', desc: 'Investigación de términos locales que tus clientes usan para encontrarte.' },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-vm-xl bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all">
              <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{f.title}</h3>
              <p className="text-[#636366] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-vm-alt text-center py-24">
        <div className="container-vm">
          <h2 className="text-heading-lg text-[#1C1C1E] mb-4">Ideal para</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {['Clínicas Dentales', 'Restaurantes', 'Talleres y Servicios'].map((n, i) => (
              <div key={n} className="p-6 rounded-vm-xl bg-white border border-[#E8E8ED]/50">
                <div className="w-12 h-12 rounded-full bg-[#34C759]/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3 className="text-lg font-bold text-[#1C1C1E]">{n}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0F1A2E] text-white py-24">
        <div className="container-vm text-center">
          <h2 className="text-heading-lg font-extrabold mb-6">¿No apareces en Google Maps?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Empecemos con un diagnóstico gratuito de tu presencia local.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#34C759] text-white px-8 py-4 rounded-vm-md font-semibold hover:bg-[#34C759]/90 transition-all hover:-translate-y-1">
            Diagnosticar mi negocio
          </a>
        </div>
      </section>
    </div>
  )
}
