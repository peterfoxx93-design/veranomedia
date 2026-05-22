import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

type ServiceType = 'one-time' | 'monthly' | 'hybrid'

interface Service {
  icon: string
  title: string
  desc: string
  tagline: string
  price: string
  maintenance: string | null
  type: ServiceType
  link: string
  color: string
}

const allServices: Service[] = [
  // === DESARROLLO WEB (One-time + Maintenance) ===
  { icon: '🌐', title: 'Landing Page', desc: 'Página profesional de 1 página optimizada para convertir. Diseño responsive, SEO y hosting incluido.', tagline: '"Tu negocio merece una primera impresión impecable."', price: '$8,000 RD$', maintenance: '$1,500 RD$/mes', type: 'one-time', link: '/servicios/web', color: '#0066CC' },
  { icon: '🏢', title: 'Sitio Web Completo', desc: 'De 3 a 5 páginas con diseño premium, WhatsApp, Google Maps y SEO. Tu hogar digital completo.', tagline: '"Donde tus clientes te encuentran, te conocen y te eligen."', price: '$18,000 RD$', maintenance: '$2,500 RD$/mes', type: 'one-time', link: '/servicios/web', color: '#34C759' },
  { icon: '🛒', title: 'Tienda Online', desc: 'Tu tienda virtual lista para vender 24/7. Catálogo, carrito, pasarela de pago y diseño móvil.', tagline: '"Tu tienda abierta siempre, incluso cuando tú descansas."', price: '$35,000 RD$', maintenance: '$3,500 RD$/mes', type: 'one-time', link: '/servicios/web', color: '#FF9F0A' },
  { icon: '📍', title: 'Google Business Pro', desc: 'Perfil optimizado en Google Maps: fotos, descripciones estratégicas y gestión de reseñas.', tagline: '"Si no estás en Google Maps, no existes para tus vecinos."', price: '$3,500 RD$', maintenance: '$800 RD$/mes', type: 'one-time', link: '/servicios/web', color: '#5AC8FA' },

  // === REDES SOCIALES (mix) ===
  { icon: '📱', title: 'CM Básico', desc: '8 publicaciones + 8 historias al mes con copywriting profesional y moderación.', tagline: '"Publica con consistencia profesional sin gastar horas en redes."', price: '$8,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/redes', color: '#34C759' },
  { icon: '📱', title: 'CM Pro', desc: '12 reels + 12 historias + copy diario + atención 24h. Gestión premium de redes.', tagline: '"Tu marca merece atención 24/7."', price: '$18,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/redes', color: '#0066CC' },
  { icon: '⭐', title: 'Reputación Online', desc: 'Gestión activa de reseñas en Google y redes. Solicitamos, respondemos y monitoreamos.', tagline: '"Una reseña negativa sin respuesta puede costarte 20 clientes."', price: '$3,500 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/redes', color: '#FF9F0A' },
  { icon: '📸', title: 'Kit Redes Sociales', desc: '10 plantillas profesionales + calendario editorial para tu primer mes.', tagline: '"Redes sociales con cara bonita desde el día uno."', price: '$5,000 RD$', maintenance: '$1,000 RD$/mes', type: 'one-time', link: '/servicios/redes', color: '#FF453A' },

  // === SEO Y ANUNCIOS (monthly) ===
  { icon: '🔍', title: 'SEO Básico', desc: 'Auditoría técnica, keywords, optimización on-page y reporte mensual.', tagline: '"El mejor cliente es el que te encuentra sin que le pagues por clic."', price: '$8,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/anuncios-seo', color: '#34C759' },
  { icon: '🔍', title: 'SEO Avanzado', desc: 'SEO Básico + link building, contenido estratégico y optimización continua.', tagline: '"Domina los resultados de búsqueda en tu sector."', price: '$18,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/anuncios-seo', color: '#0066CC' },
  { icon: '📢', title: 'Gestión de Anuncios', desc: 'Google Ads + Meta Ads con segmentación precisa y resultados medibles.', tagline: '"Deja de improvisar con tu presupuesto de anuncios."', price: '$8,000 RD$/mes (fee)', maintenance: null, type: 'monthly', link: '/servicios/anuncios-seo', color: '#FF453A' },

  // === AUTOMATIZACIÓN (one-time + maintenance) ===
  { icon: '🤖', title: 'Chatbot WhatsApp', desc: 'Asistente virtual que responde, agenda citas y califica leads 24/7.', tagline: '"Nunca más pierdas una venta porque no contestaste a tiempo."', price: '$6,000 RD$', maintenance: '$1,200 RD$/mes', type: 'one-time', link: '/servicios/automatizacion', color: '#34C759' },
  { icon: '✉️', title: 'Newsletter Automatizada', desc: 'Email marketing listo: plantillas, formulario y primera campaña.', tagline: '"El email sigue siendo el canal que más vende. Actívalo."', price: '$4,000 RD$', maintenance: '$800 RD$/mes', type: 'one-time', link: '/servicios/automatizacion', color: '#5AC8FA' },
  { icon: '⏰', title: 'Email Continuo', desc: 'Campañas semanales automatizadas con segmentación. Recupera ventas perdidas.', tagline: '"Tus suscriptores son tu activo más valioso. Cultívalos."', price: '$5,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/automatizacion', color: '#FF9F0A' },

  // === CONTENIDO ===
  { icon: '🎬', title: 'Video Promocional', desc: 'Video de 30-60s con locución profesional, música y edición dinámica.', tagline: '"Un video vale más que mil fotos. Y vende más también."', price: 'Desde $4,000 RD$', maintenance: null, type: 'one-time', link: '/servicios/contenido', color: '#FF453A' },
  { icon: '✍️', title: 'Marketing de Contenidos', desc: 'Artículos, infografías y calendario editorial. Posiciona tu marca como autoridad.', tagline: '"El contenido es el imán de clientes que nunca deja de funcionar."', price: 'Desde $8,000 RD$/mes', maintenance: null, type: 'monthly', link: '/servicios/contenido', color: '#5AC8FA' },

  // === PAQUETE ===
  { icon: '🚀', title: 'Paquete Completo Pro', desc: 'Sitio web + Google + Redes + Video + Chatbot + Email + mantenimiento incluido.', tagline: '"Seis servicios al precio de tres. Tu presencia digital completa."', price: 'Desde $28,000 RD$', maintenance: 'Mantenimiento incluido', type: 'hybrid', link: '/paquete-completo', color: '#0066CC' },
]

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={s.link}
        className="relative block group pricing-card h-full p-5 md:p-6"
      >
        {/* Icon */}
        <div className="text-2xl mb-3">{s.icon}</div>

        {/* Title */}
        <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{s.title}</h3>

        {/* Description */}
        <p className="text-sm text-[#636366] mb-2 leading-relaxed">{s.desc}</p>

        {/* Tagline */}
        <p className="text-xs text-[#8E8E93] italic mb-4">{s.tagline}</p>

        {/* Pricing — pointer-events-none en badges para que no activen el Link */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pointer-events-none">
          {/* Badge de precio principal */}
          <span className="price-pill price-pill-one">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {s.price}
          </span>

          {/* Segundo badge: maintenance o recurrente */}
          {s.type === 'monthly' ? (
            <span className="price-pill price-pill-monthly">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Recurrente
            </span>
          ) : s.maintenance ? (
            <span className="price-pill price-pill-monthly">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {s.maintenance}
            </span>
          ) : s.type === 'one-time' && (
            <span className="price-pill" style={{ background: 'rgba(142,142,147,0.08)', color: '#8E8E93' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Una vez
            </span>
          )}
        </div>

        {/* Badge tipo de servicio — solo visual, fuera del flujo de clic */}
        <div className="absolute top-3 right-3 pointer-events-none">
          {s.type === 'monthly' ? (
            <span className="badge-maintenance text-[10px] px-2 py-0.5">
              ⟳ Recurrente
            </span>
          ) : s.maintenance ? (
            <span className="badge-maintenance text-[10px] px-2 py-0.5">
              🛡️ Con mant.
            </span>
          ) : null}
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServiciosOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Hero section */}
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#0066CC]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#34C759]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-20 md:py-28 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest block mb-4"
          >
            Servicios
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-heading-lg md:text-[3.5rem] font-extrabold mb-4 leading-[1.05]"
          >
            Todo lo que tu negocio necesita
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            17 soluciones digitales. Cada una con mantenimiento incluido para garantizar calidad y rendimiento.
          </motion.p>
        </div>
      </section>

      {/* Maintenance banner */}
      <section className="bg-white border-b border-[#E8E8ED]/50">
        <div className="container-vm py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-vm-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#34C759]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#34C759]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#1C1C1E] mb-1">
                Todos nuestros proyectos incluyen mantenimiento mensual
              </h3>
              <p className="text-sm text-[#636366] leading-relaxed">
                En Verano Media no entregamos proyectos y desaparecemos. Cada sitio web, landing page o 
                chatbot incluye mantenimiento mensual porque el trabajo real empieza cuando publicamos: 
                actualizaciones de seguridad, respaldos, optimización de velocidad y soporte técnico. 
                <strong className="text-[#1C1C1E]"> Calidad garantizada no es un eslogan — es nuestro modelo de negocio.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allServices.map((s, i) => (
              <ServiceCard key={`${s.title}-${i}`} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative bg-[#0F1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿No sabes por dónde empezar?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Agenda tu Diagnóstico Digital Gratuito. Te decimos exactamente qué necesita tu negocio, 
            con precios claros y sin compromiso.
          </p>
          <a
            href="https://wa.me/18093586497"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Diagnóstico Gratuito
          </a>
        </div>
      </section>
    </div>
  )
}
