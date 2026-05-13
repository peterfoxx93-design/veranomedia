import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const allServices = [
  { icon: '🌐', title: 'Landing Page', desc: 'Página profesional de 1 página optimizada para convertir. Diseño responsive, SEO y hosting incluido.', tagline: '"Tu negocio merece una primera impresión impecable."', price: 'Desde $8,000 RD$', link: '/servicios/web', color: '#0066CC' },
  { icon: '🏢', title: 'Sitio Web Completo', desc: 'De 3 a 5 páginas con diseño premium, WhatsApp, Google Maps y SEO. Tu hogar digital completo.', tagline: '"Donde tus clientes te encuentran, te conocen y te eligen."', price: 'Desde $18,000 RD$', link: '/servicios/web', color: '#34C759' },
  { icon: '🛒', title: 'Tienda Online', desc: 'Tu tienda virtual lista para vender 24/7. Catálogo, carrito, pasarela de pago y diseño móvil.', tagline: '"Tu tienda abierta siempre, incluso cuando tú descansas."', price: 'Desde $35,000 RD$', link: '/servicios/web', color: '#FF9F0A' },
  { icon: '📍', title: 'Google Business Pro', desc: 'Perfil optimizado en Google Maps: fotos, descripciones estratégicas y gestión de reseñas.', tagline: '"Si no estás en Google Maps, no existes para tus vecinos."', price: '$3,500 RD$', link: '/servicios/web', color: '#5AC8FA' },
  { icon: '📱', title: 'CM Básico', desc: '8 publicaciones + 8 historias al mes con copywriting profesional y moderación.', tagline: '"Publica con consistencia profesional sin gastar horas en redes."', price: '$8,000 RD$/mes', link: '/servicios/redes', color: '#34C759' },
  { icon: '📱', title: 'CM Pro', desc: '12 reels + 12 historias + copy diario + atención 24h. Gestión premium de redes.', tagline: '"Tu marca merece atención 24/7."', price: '$18,000 RD$/mes', link: '/servicios/redes', color: '#0066CC' },
  { icon: '⭐', title: 'Reputación Online', desc: 'Gestión activa de reseñas en Google y redes. Solicitamos, respondemos y monitoreamos.', tagline: '"Una reseña negativa sin respuesta puede costarte 20 clientes."', price: '$3,500 RD$/mes', link: '/servicios/redes', color: '#FF9F0A' },
  { icon: '📸', title: 'Kit Redes Sociales', desc: '10 plantillas profesionales + calendario editorial para tu primer mes.', tagline: '"Redes sociales con cara bonita desde el día uno."', price: '$5,000 RD$', link: '/servicios/redes', color: '#FF453A' },
  { icon: '🔍', title: 'SEO Básico', desc: 'Auditoría técnica, keywords, optimización on-page y reporte mensual.', tagline: '"El mejor cliente es el que te encuentra sin que le pagues por clic."', price: '$8,000 RD$/mes', link: '/servicios/anuncios-seo', color: '#34C759' },
  { icon: '🔍', title: 'SEO Avanzado', desc: 'SEO Básico + link building, contenido estratégico y optimización continua.', tagline: '"Domina los resultados de búsqueda en tu sector."', price: '$18,000 RD$/mes', link: '/servicios/anuncios-seo', color: '#0066CC' },
  { icon: '📢', title: 'Gestión de Anuncios', desc: 'Google Ads + Meta Ads con segmentación precisa y resultados medibles.', tagline: '"Deja de improvisar con tu presupuesto de anuncios."', price: '$8,000 RD$/mes (fee)', link: '/servicios/anuncios-seo', color: '#FF453A' },
  { icon: '🤖', title: 'Chatbot WhatsApp', desc: 'Asistente virtual que responde, agenda citas y califica leads 24/7.', tagline: '"Nunca más pierdas una venta porque no contestaste a tiempo."', price: '$6,000 RD$', link: '/servicios/automatizacion', color: '#34C759' },
  { icon: '✉️', title: 'Newsletter Automatizada', desc: 'Email marketing listo: plantillas, formulario y primera campaña.', tagline: '"El email sigue siendo el canal que más vende. Actívalo."', price: '$4,000 RD$', link: '/servicios/automatizacion', color: '#5AC8FA' },
  { icon: '⏰', title: 'Email Continuo', desc: 'Campañas semanales automatizadas con segmentación. Recupera ventas perdidas.', tagline: '"Tus suscriptores son tu activo más valioso. Cultívalos."', price: '$5,000 RD$/mes', link: '/servicios/automatizacion', color: '#FF9F0A' },
  { icon: '🎬', title: 'Video Promocional', desc: 'Video de 30-60s con locución profesional, música y edición dinámica.', tagline: '"Un video vale más que mil fotos. Y vende más también."', price: 'Desde $4,000 RD$', link: '/servicios/contenido', color: '#FF453A' },
  { icon: '✍️', title: 'Marketing de Contenidos', desc: 'Artículos, infografías y calendario editorial. Posiciona tu marca como autoridad.', tagline: '"El contenido es el imán de clientes que nunca deja de funcionar."', price: 'Desde $8,000 RD$/mes', link: '/servicios/contenido', color: '#5AC8FA' },
  { icon: '🚀', title: 'Paquete Completo Pro', desc: 'Sitio web + Google + Redes + Video + Chatbot + Email + 1 mes gratis.', tagline: '"Seis servicios al precio de tres. Tu presencia digital completa."', price: 'Desde $28,000 RD$', link: '/paquete-completo', color: '#0066CC' },
]

function ServiceCard({ s, i }: { s: typeof allServices[0]; i: number }) {
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
        className="block group bg-white rounded-vm-xl p-6 border border-[#E8E8ED]/50 hover:border-[#D1D1D6] hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1 h-full"
      >
        <div className="text-2xl mb-3">{s.icon}</div>
        <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{s.title}</h3>
        <p className="text-sm text-[#636366] mb-2 leading-relaxed">{s.desc}</p>
        <p className="text-xs text-[#8E8E93] italic mb-3">{s.tagline}</p>
        <div className="text-sm font-semibold text-[#0066CC]">{s.price}</div>
      </Link>
    </motion.div>
  )
}

export default function ServiciosOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Servicios</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Todo lo que tu negocio necesita</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-[#8E8E93]">17 soluciones digitales diseñadas para hacer crecer tu negocio.</motion.p>
        </div>
      </section>

      <section className="section-vm-alt" ref={ref}>
        <div className="container-vm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allServices.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿No sabes por dónde empezar?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Agenda tu Diagnóstico Digital Gratuito. Te decimos exactamente qué necesita tu negocio.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Diagnóstico Gratuito
          </a>
        </div>
      </section>
    </div>
  )
}
