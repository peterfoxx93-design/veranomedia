import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

const practiceAreas = [
  { icon: '⚖️', title: 'Derecho Civil', desc: 'Contratos, propiedades, responsabilidad civil, herencias y sucesiones. Asesoría integral en todas las ramas del derecho civil.' },
  { icon: '🔒', title: 'Derecho Penal', desc: 'Defensa penal en todas las etapas del proceso. Representación ante tribunales, asistencia al imputado y víctimas.' },
  { icon: '📋', title: 'Derecho Laboral', desc: 'Despidos injustificados, reclamaciones laborales, contratos de trabajo, negociaciones colectivas y seguridad social.' },
  { icon: '🏠', title: 'Derecho Inmobiliario', desc: 'Compraventa de propiedades, títulos de propiedad, hipotecas, contratos de arrendamiento y due diligence.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Derecho Familiar', desc: 'Divorcios, custodia de menores, pensiones alimenticias, adopciones y régimen de visitas.' },
  { icon: '🏢', title: 'Derecho Corporativo', desc: 'Constitución de empresas, contratos comerciales, fusiones, cumplimiento regulatorio y asesoría fiscal.' },
]

const teamMembers = [
  { name: 'Dr. Carlos Rodríguez', role: 'Socio Fundador', desc: 'Más de 20 años de experiencia en derecho civil y corporativo. Egresado de la Universidad Autónoma de Santo Domingo.' },
  { name: 'Dra. María Peña', role: 'Socia Directora', desc: 'Especialista en derecho penal y familiar. Amplia trayectoria en litigios de alto perfil en la región Norte.' },
  { name: 'Lic. José M. Sánchez', role: 'Asociado Senior', desc: 'Experto en derecho laboral e inmobiliario. Asesor de empresas locales e internacionales en Puerto Plata.' },
]

const testimonials = [
  { name: 'Empresas Turísticas PP', role: 'Cliente Corporativo', text: 'Nos han asesorado en cada paso de nuestra expansión. Profesionales, éticos y con un conocimiento profundo del marco legal dominicano.', rating: 5 },
  { name: 'Laura Sánchez', role: 'Cliente Particular', text: 'Llevaron mi caso con total dedicación. Explicaron cada paso del proceso y lograron un resultado mejor del que esperaba.', rating: 5 },
  { name: 'Inversores del Norte', role: 'Cliente Corporativo', text: 'Su asesoría en derecho inmobiliario fue clave para nuestras inversiones en la región. Los recomiendo ampliamente.', rating: 5 },
]

/* ───────────────────────────────────────────
   Componentes reutilizables
   ─────────────────────────────────────────── */

function FadeIn({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const initial = { opacity: 0, y: direction === 'up' ? 40 : 0, x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0 }
  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D4A017" stroke="#D4A017" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

/* ───────────────────────────────────────────
   Página principal
   ─────────────────────────────────────────── */

export default function BufeteAbogados() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════
         HERO
         ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-[#1C1C1E]">
        <div className="absolute inset-0">
          <img src="images/lawfirm/hero-lawyer.jpg" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E] via-[#1C1C1E]/80 to-transparent" />
        </div>

        <div className="container-vm relative z-10 py-32 md:py-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-[#D4A017]/80 uppercase tracking-[0.2em] mb-4">
              ⚖️ Abogados en Puerto Plata
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
              Bufete Jurídico<br />
              <span className="text-[#D4A017]">Rodríguez</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-8">
              Más de 20 años defendiendo sus derechos y asesorando a empresas y particulares en Puerto Plata y todo el Norte de República Dominicana.
            </p>
            <div className="flex items-center gap-3 text-white/40 text-sm mb-10">
              <span className="flex items-center gap-1.5">📍 Puerto Plata</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5">🕐 Lun–Vie 8:00–6:00</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5">⭐ 4.9/5</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A017] text-[#1C1C1E] px-8 py-4 rounded-vm-md text-base font-bold hover:bg-[#D4A017]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Consulta Gratis por WhatsApp
              </a>
              <span className="inline-flex items-center text-white/40 text-sm gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                (809) 000-0000
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/10">
          <div className="container-vm py-5">
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { value: '20+', label: 'Años' },
                { value: '500+', label: 'Casos exitosos' },
                { value: '98%', label: 'Casos ganados' },
                { value: '4.9', label: 'Calificación' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-xl md:text-2xl font-bold text-[#D4A017]">{s.value}</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════
         PRACTICE AREAS
         ═══════════════════════════════════ */}
      <section className="section-vm">
        <div className="container-vm">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-[0.2em]">Áreas de Práctica</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-4 leading-tight">Servicios Legales Especializados</h2>
              <p className="text-lg text-[#8E8E93]">Cubrimos todas las ramas del derecho para proteger tus intereses.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {practiceAreas.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.08}>
                <div className="group rounded-vm-xl p-6 md:p-7 border border-[#E8E8ED]/50 bg-white hover:border-[#D4A017]/20 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-vm-md flex items-center justify-center mb-4 bg-[#D4A017]/10 text-xl group-hover:bg-[#D4A017]/20 transition-colors">
                    {area.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{area.title}</h3>
                  <p className="text-sm text-[#636366] leading-relaxed">{area.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         ABOUT —  Two columns
         ═══════════════════════════════════ */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-[0.2em]">Nuestra Firma</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-5 leading-tight">Compromiso, experiencia y resultados</h2>
                <p className="text-base text-[#636366] leading-relaxed mb-5">
                  En Bufete Jurídico Rodríguez llevamos más de dos décadas brindando asesoría legal de excelencia en Puerto Plata y toda la región Norte de República Dominicana. Nuestro equipo combina experiencia, ética profesional y un profundo conocimiento del sistema legal dominicano.
                </p>
                <p className="text-base text-[#636366] leading-relaxed mb-6">
                  Creemos en un trato cercano y transparente con cada cliente. No solo defendemos casos — defendemos personas, familias y empresas que confían en nosotros.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="text-2xl font-bold text-[#D4A017]">3</div>
                    <div className="text-xs text-[#8E8E93] mt-0.5">Abogados senior</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#D4A017]">6</div>
                    <div className="text-xs text-[#8E8E93] mt-0.5">Áreas de práctica</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#D4A017]">20+</div>
                    <div className="text-xs text-[#8E8E93] mt-0.5">Años de experiencia</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative">
                <img src="images/lawfirm/law-books.jpg" alt="Bufete Jurídico Rodríguez"
                  className="rounded-vm-xl w-full h-[400px] md:h-[500px] object-cover shadow-vm-lg" />
                <div className="absolute -bottom-5 -left-5 bg-white rounded-vm-md px-5 py-4 shadow-vm-lg border border-[#E8E8ED]/40 hidden md:block">
                  <div className="text-sm font-bold text-[#1C1C1E]">⚖️ Justicia con experiencia</div>
                  <div className="text-xs text-[#8E8E93]">Puerto Plata, RD</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         TEAM
         ═══════════════════════════════════ */}
      <section className="section-vm">
        <div className="container-vm">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-[0.2em]">Nuestro Equipo</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-4 leading-tight">Conoce a tus abogados</h2>
              <p className="text-lg text-[#8E8E93]">Profesionales con vocación de servicio y experiencia comprobada.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <div className="rounded-vm-xl p-6 md:p-8 bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-full bg-[#D4A017]/10 flex items-center justify-center mb-4 text-2xl font-bold text-[#D4A017]">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1C1E]">{m.name}</h3>
                  <div className="text-xs font-semibold text-[#D4A017] uppercase tracking-wider mb-3">{m.role}</div>
                  <p className="text-sm text-[#636366] leading-relaxed">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         TESTIMONIALS
         ═══════════════════════════════════ */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4A017] uppercase tracking-[0.2em]">Testimonios</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-4 leading-tight">Lo que dicen nuestros clientes</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-vm-xl p-6 md:p-8 border border-[#E8E8ED]/50 h-full flex flex-col">
                  <StarRating rating={t.rating} />
                  <p className="text-base text-[#636366] leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
                  <div className="pt-4 border-t border-[#E8E8ED]/40">
                    <div className="font-semibold text-[#1C1C1E] text-sm">{t.name}</div>
                    <div className="text-xs text-[#8E8E93]">{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         CTA FINAL
         ═══════════════════════════════════ */}
      <section className="relative bg-[#0F1A2E] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#D4A017]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 text-center">
          <FadeIn>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">Tu consulta inicial es gratuita</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6 leading-tight max-w-2xl mx-auto">
              Tu caso merece la mejor defensa
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Hablemos sin compromiso. Cuéntanos tu situación y recibe asesoría legal personalizada de nuestro equipo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A017] text-[#1C1C1E] px-8 py-4 rounded-vm-md text-base font-bold hover:bg-[#D4A017]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Consulta Gratis
              </a>
              <span className="text-white/40 text-sm">o llama al <strong className="text-white/70">(809) 000-0000</strong></span>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
