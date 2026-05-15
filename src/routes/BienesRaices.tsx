import { motion, useInView } from 'motion/react'
import { useRef, useEffect } from 'react'

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */

const properties = [
  {
    title: 'Villa de Lujo en Playa Dorada',
    type: 'En Venta',
    price: 'USD $450,000',
    location: 'Playa Dorada, Puerto Plata',
    beds: 4, baths: 3, area: '350 m²',
    image: 'images/realestate/luxury-pool.jpg',
    featured: true,
  },
  {
    title: 'Apartamento frente al mar',
    type: 'En Venta',
    price: 'USD $185,000',
    location: 'Malecón de Puerto Plata',
    beds: 2, baths: 2, area: '120 m²',
    image: 'images/realestate/modern-interior.jpg',
    featured: false,
  },
  {
    title: 'Casa Moderna en Urbanización',
    type: 'En Venta',
    price: 'USD $275,000',
    location: 'Los Magellanes, Puerto Plata',
    beds: 3, baths: 2, area: '220 m²',
    image: 'images/realestate/modern-house.jpg',
    featured: false,
  },
  {
    title: 'Penthouse de lujo',
    type: 'En Alquiler',
    price: 'USD $2,500/mes',
    location: 'Costa Atlántica, Puerto Plata',
    beds: 3, baths: 2, area: '180 m²',
    image: 'images/realestate/modern-bedroom.jpg',
    featured: false,
  },
]

const services = [
  { icon: '🏠', title: 'Compra de Propiedades', desc: 'Te acompañamos en cada paso para encontrar la propiedad ideal, desde la búsqueda hasta el cierre.' },
  { icon: '📋', title: 'Venta de Propiedades', desc: 'Valoramos tu propiedad, la promocionamos y gestionamos todo el proceso de venta sin complicaciones.' },
  { icon: '🔑', title: 'Alquileres', desc: 'Alquileres de corto y largo plazo. Casas, apartamentos y villas completamente equipadas.' },
  { icon: '📈', title: 'Asesoría de Inversión', desc: 'Analizamos el mercado para encontrar las mejores oportunidades de inversión inmobiliaria en RD.' },
]

const testimonials = [
  { name: 'María Fernanda R.', role: 'Compradora', text: 'Encontraron exactamente lo que buscaba. Profesionales, honestos y con un conocimiento increíble del mercado de Puerto Plata.', rating: 5 },
  { name: 'Carlos Mendoza', role: 'Inversionista', text: 'Invertir desde el extranjero siempre me daba desconfianza. Ellos gestionaron todo: visitas, documentos y cierre. 100% recomendados.', rating: 5 },
  { name: 'Ana Lucía P.', role: 'Vendedora', text: 'Vendí mi casa en tiempo récord y a mejor precio del que esperaba. La presentación de la propiedad y la negociación fueron impecables.', rating: 5 },
]

/* ───────────────────────────────────────────
   Componentes reutilizables
   ─────────────────────────────────────────── */

function FadeIn({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  }
  return (
    <motion.div ref={ref} initial={initial} animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

/* ───────────────────────────────────────────
   Página principal
   ─────────────────────────────────────────── */

export default function BienesRaices() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════
         HERO — Split layout
         ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-[#1C1C1E]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="images/realestate/hero-beach-house.jpg" alt=""
            className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1E] via-[#1C1C1E]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-vm relative z-10 py-32 md:py-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-white/60 uppercase tracking-[0.2em] mb-4">
              Bienes Raíces en Puerto Plata
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6">
              Bienes Raíces<br />
              <span className="text-[#007AFF]">Costa Norte</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
              La propiedad de tus sueños en el destino más exclusivo del Caribe. Compra, vende o alquila con el respaldo de quienes conocen Puerto Plata como nadie.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007AFF] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#007AFF]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
                {/* WhatsApp icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escríbenos por WhatsApp
              </a>
              <span className="inline-flex items-center text-white/50 text-sm gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                (809) 000-0000
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/10">
          <div className="container-vm py-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: '150+', label: 'Propiedades vendidas' },
                { value: '12', label: 'Años de experiencia' },
                { value: '98%', label: 'Clientes satisfechos' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-xl md:text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════
         PROPERTIES — Featured listings
         ═══════════════════════════════════ */}
      <section className="section-vm">
        <div className="container-vm">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#007AFF] uppercase tracking-[0.2em]">Propiedades Destacadas</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-4 leading-tight">Encuentra tu próximo hogar</h2>
              <p className="text-lg text-[#8E8E93]">Las mejores propiedades en Puerto Plata, seleccionadas para ti.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="group rounded-vm-xl overflow-hidden bg-white border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-56 md:h-64 overflow-hidden bg-[#F5F5F7]">
                    <img src={p.image} alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                        p.featured
                          ? 'bg-[#007AFF] text-white'
                          : 'bg-white/90 text-[#1C1C1E]'
                      }`}>
                        {p.featured ? '⭐ Destacado' : p.type}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xl font-bold text-white">{p.price}</span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-1">{p.title}</h3>
                    <div className="flex items-center gap-1.5 text-sm text-[#8E8E93] mb-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {p.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#636366] pt-4 border-t border-[#E8E8ED]/40">
                      <span className="flex items-center gap-1.5">🛏️ {p.beds} hab</span>
                      <span className="flex items-center gap-1.5">🚿 {p.baths} baños</span>
                      <span className="flex items-center gap-1.5">📐 {p.area}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         SERVICES
         ═══════════════════════════════════ */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#007AFF] uppercase tracking-[0.2em]">Nuestros Servicios</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-4 leading-tight">Todo lo que necesitas, en un solo lugar</h2>
              <p className="text-lg text-[#8E8E93]">Compra, venta, alquiler e inversión. Te cubrimos de principio a fin.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="bg-white rounded-vm-xl p-6 md:p-8 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <span className="text-2xl block mb-4">{s.icon}</span>
                  <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#636366] leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         ABOUT — Conócenos
         ═══════════════════════════════════ */}
      <section className="section-vm">
        <div className="container-vm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-xs font-semibold text-[#007AFF] uppercase tracking-[0.2em]">Sobre Nosotros</span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1E] mt-3 mb-5 leading-tight">Conocedores de Puerto Plata, apasionados por las propiedades</h2>
                <p className="text-base text-[#636366] leading-relaxed mb-5">
                  Con más de 12 años en el mercado inmobiliario de la región Norte, en Bienes Raíces Costa Norte conocemos cada rincón de Puerto Plata: desde las exclusivas villas de Playa Dorada hasta los modernos apartamentos frente al malecón.
                </p>
                <p className="text-base text-[#636366] leading-relaxed mb-6">
                  Nuestro equipo local te ofrece asesoría personalizada, transparente y en tu idioma. Ya sea que estés en República Dominicana o en el extranjero, te ayudamos a encontrar la propiedad perfecta.
                </p>
                <div className="flex flex-wrap gap-6">
                  {[
                    { value: '150+', label: 'Propiedades vendidas' },
                    { value: '500+', label: 'Clientes satisfechos' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold text-[#007AFF]">{s.value}</div>
                      <div className="text-xs text-[#8E8E93] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="relative">
                <img src="images/realestate/luxury-exterior.jpg" alt="Propiedad de lujo en Puerto Plata"
                  className="rounded-vm-xl w-full h-[400px] md:h-[500px] object-cover shadow-vm-lg" />
                <div className="absolute -bottom-5 -left-5 bg-white rounded-vm-md px-5 py-4 shadow-vm-lg border border-[#E8E8ED]/40 hidden md:block">
                  <div className="text-sm font-bold text-[#1C1C1E]">📍 Puerto Plata</div>
                  <div className="text-xs text-[#8E8E93]">Destino #1 del Caribe</div>
                </div>
              </div>
            </FadeIn>
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
              <span className="text-xs font-semibold text-[#007AFF] uppercase tracking-[0.2em]">Testimonios</span>
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
      <section className="relative bg-[#1C1C1E] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#007AFF]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 text-center">
          <FadeIn>
            <span className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">¿Listo para dar el paso?</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mt-4 mb-6 leading-tight max-w-2xl mx-auto">
              La propiedad que buscas está más cerca de lo que crees
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Hablemos sin compromiso. Te ayudamos a encontrar tu próximo hogar, inversión o inquilino en Puerto Plata.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007AFF] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#007AFF]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Contáctanos por WhatsApp
              </a>
              <span className="text-white/40 text-sm">o llama al <strong className="text-white/70">(809) 000-0000</strong></span>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
