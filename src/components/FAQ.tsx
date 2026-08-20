import { useState } from 'react'

const faqs = [
  { q: '¿Qué es un CRM para clínicas dentales?', a: 'Es un sistema digital que centraliza pacientes, citas, odontograma, consentimientos y seguimientos en una sola plataforma.' },
  { q: '¿Cuánto tiempo tarda la implementación?', a: 'Nuestro Sistema Verano se despliega en 7 días o menos, con configuración personalizada y capacitación.' },
  { q: '¿Mis datos están seguros?', a: 'Sí. Cumplimos con la Ley 172-13. Incluye roles, auditoría y cifrado en tránsito y reposo.' },
  { q: '¿Puedo automatizar recordatorios por WhatsApp?', a: 'Sí. Reduce no-shows hasta un 70% y mejora la ocupación del sillón.' },
  { q: '¿Atienden bufetes jurídicos e inmobiliarias?', a: 'Sí. Flujos específicos para bufetes (SEO local + captación) e inmobiliarias (catálogo digital + seguimiento).' }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-20 px-6 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5">
              <button onClick={() => setOpen(open === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-lg font-semibold text-white">{item.q}</span>
                <span className="text-white/60">{open === idx ? '−' : '+'}</span>
              </button>
              {open === idx && <div className="px-5 pb-5 text-white/80 leading-relaxed">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
