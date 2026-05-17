import { motion } from 'motion/react'
import { useEffect } from 'react'

export default function ProyectoAutomatizaciones() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="pt-20">
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#06B6D4] uppercase tracking-widest">Demo • Automatización</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mt-4 mb-6">Automatizaciones</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl">Conectamos tus herramientas con Zapier, Make y n8n para que los procesos repetitivos se ejecuten solos. Ahorra tiempo, reduce errores y escala sin esfuerzo.</motion.p>
        </div>
      </section>

      <section className="section-vm">
        <div className="container-vm grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Chatbots 24/7', desc: 'Atención automática en WhatsApp que responde preguntas, agenda citas y califica leads.' },
            { title: 'Email Marketing', desc: 'Campañas automatizadas que nutren a tus clientes y convierten en frío.' },
            { title: 'Flujos de Trabajo', desc: 'Conexión entre tus apps: formularios → CRM → email → notificaciones, todo automático.' },
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
        <div className="container-vm max-w-3xl mx-auto text-center">
          <h2 className="text-heading-lg text-[#1C1C1E] mb-4">Herramientas que conectamos</h2>
          <p className="text-lg text-[#8E8E93] mb-10">Las plataformas líderes en automatización, integradas para tu negocio.</p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Zapier', color: '#FF4F00' },
              { name: 'Make', color: '#6A1B9A' },
              { name: 'n8n', color: '#EA4B71' },
            ].map((h, i) => (
              <motion.div key={h.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-vm-xl bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all">
                <div className="w-16 h-16 rounded-vm-md flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${h.color}15` }}>
                  <span className="text-2xl font-black" style={{ color: h.color }}>{h.name[0]}</span>
                </div>
                <h3 className="font-bold text-[#1C1C1E]">{h.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#1C1C1E] text-white py-24">
        <div className="container-vm text-center">
          <h2 className="text-heading-lg font-extrabold mb-6">¿Qué proceso quieres automatizar hoy?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Cuéntanos tu caso y te mostramos cómo podría funcionar automatizado.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#06B6D4] text-white px-8 py-4 rounded-vm-md font-semibold hover:bg-[#06B6D4]/90 transition-all hover:-translate-y-1">
            Empezar diagnóstico
          </a>
        </div>
      </section>
    </div>
  )
}
