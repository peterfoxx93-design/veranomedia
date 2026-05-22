import { motion } from 'motion/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProyectoLandingPages() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#007AFF]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest">Demo • Diseño Web</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mt-4 mb-6">Landing Pages & Sitios Web</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl">Páginas profesionales optimizadas para convertir. Diseño responsive, animaciones fluidas, SEO incluido y velocidad de carga ultrarrápida.</motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="section-vm">
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Diseño Responsive', desc: 'Tu sitio se ve perfecto en cualquier dispositivo: móvil, tablet y escritorio.' },
              { title: 'SEO Técnico', desc: 'Estructura optimizada para que Google te encuentre desde el día uno.' },
              { title: 'Alta Velocidad', desc: 'Carga en menos de 2 segundos. Cada segundo de retraso cuesta conversiones.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-vm-xl bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all">
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{f.title}</h3>
                <p className="text-[#636366] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos disponibles */}
      <section className="section-vm-alt">
        <div className="container-vm text-center">
          <h2 className="text-heading-lg text-[#1C1C1E] mb-4">Modelos disponibles</h2>
          <p className="text-lg text-[#8E8E93] mb-12 max-w-xl mx-auto">Sitios prediseñados que personalizamos para tu negocio.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Clínica Dental', link: '/modelos/clinica-dental', color: '#007AFF' },
              { title: 'Bienes Raíces', link: '/modelos/bienes-raices', color: '#34C759' },
              { title: 'Bufete Abogados', link: '/modelos/bufete-abogados', color: '#AF52DE' },
            ].map((m, i) => (
              <Link key={m.title} to={m.link}
                className="p-8 rounded-vm-xl bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-4 mx-auto" style={{ backgroundColor: `${m.color}15` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{m.title}</h3>
                <span className="text-sm font-semibold text-[#007AFF] group-hover:gap-3 inline-flex items-center gap-2 transition-all">Ver demo →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden py-24">
        <div className="container-vm text-center relative z-10">
          <h2 className="text-heading-lg font-extrabold mb-6">¿Listo para tu landing page?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Contáctanos y en 48 horas tienes un prototipo de tu sitio.</p>
          <a href="https://wa.me/18093586497" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#007AFF] text-white px-8 py-4 rounded-vm-md font-semibold hover:bg-[#007AFF]/90 transition-all hover:-translate-y-1">
            Solicitar diagnóstico gratuito
          </a>
        </div>
      </section>
    </div>
  )
}
