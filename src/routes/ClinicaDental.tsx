import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

const services = [
  {
    icon: '🦷',
    title: 'Odontología General',
    desc: 'Chequeos de rutina, limpiezas profesionales y prevención para toda la familia.',
  },
  {
    icon: '😁',
    title: 'Ortodoncia',
    desc: 'Brackets tradicionales y alineadores invisibles para una sonrisa perfecta.',
  },
  {
    icon: '✨',
    title: 'Blanqueamiento Dental',
    desc: 'Estética dental avanzada para recuperar el brillo natural de tu sonrisa.',
  },
  {
    icon: '🦿',
    title: 'Implantes',
    desc: 'Reemplazo de piezas dentales con materiales de la más alta calidad.',
  },
  {
    icon: '🔬',
    title: 'Endodoncia',
    desc: 'Tratamiento de conducto indoloro para salvar tu diente natural.',
  },
  {
    icon: '💎',
    title: 'Estética Dental',
    desc: 'Carillas, coronas y diseño de sonrisa personalizado.',
  },
]

const testimonials = [
  {
    name: 'María Fernández',
    text: 'Excelente atención y resultados increíbles. Mi sonrisa nunca había lucido tan bien. Totalmente recomendados.',
  },
  {
    name: 'Roberto Méndez',
    text: 'El equipo de Sonrisa Dental transformó mi experiencia con el dentista. Trato profesional y humano a la vez.',
  },
  {
    name: 'Carmen Pérez',
    text: 'Desde la primera consulta me sentí en confianza. Los tratamientos son de primera calidad y el precio justo.',
  },
]

/* ───────────────────────────────────────────
   Components: Section Header
   ─────────────────────────────────────────── */

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {label && (
        <span className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest">
          {label}
        </span>
      )}
      <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-[#8E8E93]">{subtitle}</p>
      )}
    </div>
  )
}

/* ───────────────────────────────────────────
   Components: Fade-in wrapper
   ─────────────────────────────────────────── */

function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const offsets = {
    up: { x: 0, y: 30 },
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
  }

  const offset = offsets[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────────────────────────────────
   Main Page
   ─────────────────────────────────────────── */

export default function ClinicaDental() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex items-stretch overflow-hidden bg-white">
        {/* Mobile layout (stacked) / Desktop layout (side-by-side) */}
        <div className="flex flex-col-reverse lg:flex-row w-full">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-0 lg:w-1/2 bg-white"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest mb-4"
            >
              Clínica Dental
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.5rem] md:text-heading-xl lg:text-[3.5rem] font-extrabold text-[#1C1C1E] leading-[1.05]"
            >
              Sonrisa Dental{' '}
              <span className="text-[#007AFF]">Puerto Plata</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-[#636366] mt-4 mb-8 leading-relaxed"
            >
              Tu sonrisa, nuestra prioridad
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-[#8E8E93] mb-8 max-w-md leading-relaxed"
            >
              Odontología de calidad en Puerto Plata. Atención personalizada,
              tecnología avanzada y precios justos para toda la familia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://wa.me/18090000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#007AFF] hover:bg-[#0066CC] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#007AFF]/25 hover:shadow-[#007AFF]/40 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.48 0 0 4.48 0 10c0 1.85.5 3.58 1.38 5.07L.02 20l5.15-1.36C6.6 19.5 8.25 20 10 20c5.52 0 10-4.48 10-10S15.52 0 10 0zm0 18c-1.45 0-2.8-.4-3.97-1.08l-.3-.18-3.06.8.82-2.98-.2-.32A7.97 7.97 0 012 10c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm5.1-5.5c-.28.28-1.16.56-1.65.56-.33 0-.38-.07-.74-.23-.5-.22-1.5-.6-2.87-1.77-1.1-.94-1.82-2.04-2.03-2.4-.2-.36-.1-.56.02-.68.1-.1.22-.27.33-.4.1-.13.14-.24.2-.4s.02-.3-.02-.42c-.04-.12-.36-1.06-.5-1.46-.14-.4-.28-.4-.42-.4H5.5c-.2 0-.44.12-.58.28-.14.16-.68.76-.68 1.84 0 1.08.76 2.12.86 2.28.1.16 1.5 2.4 3.68 3.6 2.18 1.2 2.18.8 2.56.76.4-.04 1.28-.56 1.46-1.1.18-.54.18-1 .12-1.1-.06-.1-.2-.16-.34-.22-.14-.06-.26-.1-.36-.18-.1-.08-.1-.18-.06-.32.04-.14.62-1.42.7-1.54.08-.12.16-.12.26-.1.1.02.32.06.44.08.12.02.3 0 .42-.06.14-.06.68-.34 1.2-.7.24-.17.48-.35.68-.5.16-.12.32-.1.44.04.14.14.56.74.68.84.12.1.2.18.28.22.08.04.14.1.16.18.02.08.02.42-.18.7z" />
                </svg>
                Agenda tu consulta
              </a>
              <a
                href="tel:18090000000"
                className="inline-flex items-center justify-center gap-2 text-[#007AFF] border-2 border-[#007AFF]/20 hover:border-[#007AFF]/40 font-semibold px-8 py-3.5 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (809) 000-0000
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-6 mt-10 text-sm text-[#8E8E93]"
            >
              <span className="flex items-center gap-1.5">📍 Puerto Plata</span>
              <span className="flex items-center gap-1.5">🕐 Lun–Sáb 9:00 AM – 6:00 PM</span>
              <span className="flex items-center gap-1.5">⭐ 4.9 / 5.0</span>
            </motion.div>
          </motion.div>

          {/* Right: Full-bleed image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:w-1/2 min-h-[50vh] lg:min-h-screen"
          >
            <img
              src="images/dental/hero-dentist.jpg"
              alt="Sonrisa Dental Puerto Plata - Consultorio dental"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay for text readability on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/10 lg:via-transparent lg:to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── SERVICIOS ─────────────── */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <SectionHeader
            label="Servicios"
            title="Cuidamos tu sonrisa"
            subtitle="Ofrecemos una amplia gama de servicios odontológicos con tecnología de punta y un trato cercano."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06}>
                <div className="bg-white rounded-vm-xl p-6 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#8E8E93] leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── EQUIPO ─────────────── */}
      <section className="section-vm">
        <div className="container-vm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest">
                Nuestro equipo
              </span>
              <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-6">
                Conoce a nuestro equipo
              </h2>
              <p className="text-base text-[#636366] leading-relaxed mb-4">
                En Sonrisa Dental Puerto Plata contamos con un equipo de
                profesionales altamente capacitados, apasionados por la
                odontología y comprometidos con tu bienestar.
              </p>
              <p className="text-base text-[#636366] leading-relaxed mb-6">
                Creemos que una visita al dentista debe ser una experiencia
                cómoda y tranquila. Por eso, combinamos experiencia técnica con
                un trato humano y cercano.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-[#8E8E93]">
                <span className="inline-flex items-center gap-1.5">🎓 +15 años de experiencia</span>
                <span className="inline-flex items-center gap-1.5">🏥 Especialistas certificados</span>
                <span className="inline-flex items-center gap-1.5">❤️ Atención personalizada</span>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="relative">
                <img
                  src="images/dental/clinic-interior.jpg"
                  alt="Equipo de Sonrisa Dental Puerto Plata"
                  className="w-full h-auto rounded-vm-xl shadow-vm-lg object-cover"
                  style={{ maxHeight: '400px' }}
                />
                <div className="absolute -bottom-3 -right-3 bg-[#007AFF] text-white text-xs font-semibold px-4 py-2 rounded-vm-md shadow-lg">
                  🏆 Excelencia dental
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────── UBICACIÓN ─────────────── */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest">
                Ubicación
              </span>
              <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-6">
                Estamos en <span className="text-[#007AFF]">Puerto Plata</span>
              </h2>
              <p className="text-base text-[#636366] leading-relaxed mb-6">
                Nuestra clínica está ubicada en el corazón de Puerto Plata,
                con fácil acceso y estacionamiento disponible para tu comodidad.
              </p>
              <div className="space-y-3 text-sm text-[#8E8E93]">
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📍</span>
                  <div>
                    <p className="font-medium text-[#1C1C1E]">Dirección</p>
                    <p>Calle Principal #123, Puerto Plata, República Dominicana</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">🕐</span>
                  <div>
                    <p className="font-medium text-[#1C1C1E]">Horarios</p>
                    <p>Lunes a Sábado — 9:00 AM a 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📞</span>
                  <div>
                    <p className="font-medium text-[#1C1C1E]">Teléfono</p>
                    <p>(809) 000-0000</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <img
                src="images/dental/dental-tools.jpg"
                alt="Instalaciones Sonrisa Dental Puerto Plata"
                className="w-full h-auto rounded-vm-xl shadow-vm-lg object-cover"
                style={{ maxHeight: '400px' }}
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="section-vm">
        <div className="container-vm">
          <SectionHeader
            label="Testimonios"
            title="Lo que dicen nuestros pacientes"
            subtitle="La satisfacción de nuestros pacientes es nuestra mejor carta de presentación."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4 text-[#FF9F0A]">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#636366] leading-relaxed mb-4 flex-grow">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-[#E8E8ED]/50">
                    <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-sm font-bold text-[#007AFF]">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1C1E]">{t.name}</p>
                      <p className="text-xs text-[#8E8E93]">Paciente verificada</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA FINAL ─────────────── */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#007AFF]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <FadeIn>
            <span className="text-sm font-semibold text-[#007AFF] uppercase tracking-widest">
              Contacto
            </span>
            <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mt-3 mb-6">
              Agenda tu consulta
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
              Danos la oportunidad de cuidar tu sonrisa. Contáctanos sin
              compromiso y agenda una cita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/18090000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007AFF] hover:bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0C4.48 0 0 4.48 0 10c0 1.85.5 3.58 1.38 5.07L.02 20l5.15-1.36C6.6 19.5 8.25 20 10 20c5.52 0 10-4.48 10-10S15.52 0 10 0zm0 18c-1.45 0-2.8-.4-3.97-1.08l-.3-.18-3.06.8.82-2.98-.2-.32A7.97 7.97 0 012 10c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm5.1-5.5c-.28.28-1.16.56-1.65.56-.33 0-.38-.07-.74-.23-.5-.22-1.5-.6-2.87-1.77-1.1-.94-1.82-2.04-2.03-2.4-.2-.36-.1-.56.02-.68.1-.1.22-.27.33-.4.1-.13.14-.24.2-.4s.02-.3-.02-.42c-.04-.12-.36-1.06-.5-1.46-.14-.4-.28-.4-.42-.4H5.5c-.2 0-.44.12-.58.28-.14.16-.68.76-.68 1.84 0 1.08.76 2.12.86 2.28.1.16 1.5 2.4 3.68 3.6 2.18 1.2 2.18.8 2.56.76.4-.04 1.28-.56 1.46-1.1.18-.54.18-1 .12-1.1-.06-.1-.2-.16-.34-.22-.14-.06-.26-.1-.36-.18-.1-.08-.1-.18-.06-.32.04-.14.62-1.42.7-1.54.08-.12.16-.12.26-.1.1.02.32.06.44.08.12.02.3 0 .42-.06.14-.06.68-.34 1.2-.7.24-.17.48-.35.68-.5.16-.12.32-.1.44.04.14.14.56.74.68.84.12.1.2.18.28.22.08.04.14.1.16.18.02.08.02.42-.18.7z" />
                </svg>
                Escribir por WhatsApp
              </a>
              <a
                href="tel:18090000000"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-vm-md text-base font-semibold transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (809) 000-0000
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
