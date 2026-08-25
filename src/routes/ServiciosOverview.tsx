import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const verticales = [
  {
    icon: '🦷',
    title: 'Clínicas Dentales',
    desc: 'El paciente busca odontólogo cerca y con cita rápida. Nuestro sistema responde al instante, agenda en tu calendario y llena la silla vacía.',
    puntos: ['Web optimizada para búsquedas locales', 'Agente IA que agenda citas 24/7', 'Seguimiento automático por WhatsApp'],
  },
  {
    icon: '🏠',
    title: 'Inmobiliarias',
    desc: 'El comprador escribe sobre tres propiedades a la vez. Gana quien responde primero — y nuestro sistema siempre responde primero.',
    puntos: ['Catálogo que carga rápido en móvil', 'Calificación automática de compradores', 'CRM con seguimiento de cada lead'],
  },
  {
    icon: '⚖️',
    title: 'Bufetes Legales',
    desc: 'El cliente legal necesita confidencialidad y respuesta inmediata. El sistema capta el caso, filtra y agenda la consulta.',
    puntos: ['Presencia profesional y discreta', 'Triage automático de consultas', 'Citas confirmadas sin fricción'],
  },
]

const piezas = [
  {
    n: '01',
    title: 'Puerta Digital',
    desc: 'Sitio web móvil primero, rápido y con mensaje directo. Diseñado para que el visitante entienda en segundos qué haces y cómo contactarte.',
  },
  {
    n: '02',
    title: 'Receptor IA',
    desc: 'Agente inteligente en tu web y WhatsApp que responde al instante, califica el lead y agenda — a cualquier hora, sin depender de horarios.',
  },
  {
    n: '03',
    title: 'Sistema de Seguimiento',
    desc: 'CRM que registra cada conversación y hace seguimiento automático. Ningún prospecto se enfría por falta de respuesta.',
  },
]

export default function ServiciosOverview() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white">
      <div className="container-vm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold text-[#5170FF] uppercase tracking-[0.15em] mb-4">Servicios</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1E] leading-tight">
            No vendemos piezas sueltas.
            <br />
            Instalamos <span className="text-[#5170FF]">sistemas de captación</span>.
          </h1>
          <p className="text-base md:text-lg text-[#636366] leading-relaxed mt-6">
            Un sitio bonito no paga facturas. Nosotros entregamos el sistema completo
            que convierte visitantes en clientes: puerta digital, receptor IA y
            seguimiento automatizado — especializado en tres industrias donde la
            velocidad de respuesta decide la venta.
          </p>
        </motion.div>

        {/* Verticales */}
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {verticales.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-vm-lg border border-[#E8E8ED]/60 p-7 hover:shadow-vm-lg transition-shadow duration-300 bg-white"
            >
              <span className="text-3xl">{v.icon}</span>
              <h2 className="font-serif text-xl text-[#1C1C1E] mt-4">{v.title}</h2>
              <p className="text-sm text-[#636366] leading-relaxed mt-3">{v.desc}</p>
              <ul className="mt-5 space-y-2.5">
                {v.puntos.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-[#636366]">
                    <span className="text-[#5170FF] flex-shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Las 3 piezas del sistema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="font-serif text-3xl text-[#1C1C1E]">Cómo funciona el sistema</h2>
          <p className="text-base text-[#636366] mt-3 max-w-2xl leading-relaxed">
            Tres piezas integradas. Cada una resuelve una fuga específica de clientes:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {piezas.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-vm-lg bg-[#F5F5F7]/70 p-7"
            >
              <span className="text-sm font-bold text-[#5170FF] tracking-widest">{p.n}</span>
              <h3 className="font-serif text-lg text-[#1C1C1E] mt-3">{p.title}</h3>
              <p className="text-sm text-[#636366] leading-relaxed mt-3">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Principio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-vm-lg border-l-4 border-[#5170FF] bg-[#F5F5F7]/50 p-8 md:p-10"
        >
          <p className="font-serif text-xl md:text-2xl text-[#1C1C1E] leading-relaxed">
            "El negocio no necesita más publicidad: necesita dejar de perder los
            clientes que ya llegan. El 78% de las visitas vienen del móvil y deciden
            en segundos — el sistema existe para ganar esos segundos."
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <h2 className="font-serif text-3xl text-[#1C1C1E]">¿Tu negocio pierde clientes en silencio?</h2>
          <p className="text-base text-[#636366] mt-4 max-w-xl mx-auto leading-relaxed">
            Te revisamos tu captación actual sin costo: te decimos dónde se están
            fugando los clientes y qué corregir primero. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="https://wa.me/18093586497"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5170FF] hover:bg-[#5170FF]/90 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#5170FF]/25"
            >
              Diagnóstico Gratuito
            </a>
            <Link
              to="/portafolio"
              className="text-[#5170FF] border border-[#5170FF]/30 hover:border-[#5170FF]/60 font-medium px-8 py-3.5 rounded-full transition-all duration-300"
            >
              Ver casos reales
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
