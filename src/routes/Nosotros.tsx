import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const teamMembers = [
  { name: 'Carlos Méndez', role: 'Director Creativo', desc: 'Diseño visual y estrategia de marca. Más de 10 años creando identidades digitales.', img: '/carlos-mendez.jpg' },
  { name: 'Ana Paula Reyes', role: 'Community Manager', desc: 'Redes sociales, contenido y engagement. Conecta marcas con audiencias reales.', img: '/ana-paula.jpg' },
  { name: 'Luis Fernando Peña', role: 'Desarrollador Web', desc: 'Código limpio, sitios rápidos. Especialista en React, Tailwind y rendimiento.', img: '/luis-fernando.jpg' },
  { name: 'María José Castillo', role: 'Especialista SEO', desc: 'Posicionamiento orgánico y estrategia de contenido. Hace que Google te encuentre.', img: '/maria-jose.jpg' },
  { name: 'Pedro Ramírez', role: 'Growth & Ads', desc: 'Google Ads, Meta Ads y estrategias de crecimiento con resultados medibles.', img: '/pedro-ramirez.jpg' },
  { name: 'Sofía Martínez', role: 'Diseñadora Gráfica', desc: 'Identidad visual, contenido visual y diseño editorial para marcas que quieren destacar.', img: '/sofia-martinez.jpg' },
  { name: 'Neo', role: 'Agente de IA', desc: 'Automatización inteligente, análisis de datos y contenido generado con tecnología de punta.', img: '/neo-photo.jpg' },
  { name: 'Peter Fx', role: 'Fundador & Director General', desc: 'Visión estratégica y liderazgo. Asegura que cada proyecto supere expectativas.', img: '/peter-fx.jpg' },
]

const values = [
  { icon: '🎯', title: 'Resultados Reales', desc: 'No vendemos humo. Cada estrategia está diseñada para generar clientes nuevos. Medimos lo que hacemos.' },
  { icon: '✨', title: 'Diseño Premium', desc: 'Nada de plantillas genéricas. Sitios únicos con calidad Apple a precio justo.' },
  { icon: '🤝', title: 'Sin Tecnicismos', desc: 'Te explicamos todo en cristiano. No necesitas saber de tecnología para entender lo que hacemos.' },
  { icon: '⚡', title: 'Rápidos y Eficientes', desc: 'Diagnóstico en 24 horas. Sitio web en 48h. Sin vueltas ni esperas.' },
  { icon: '🛡️', title: 'Soporte Continuo', desc: 'No te dejamos solo después de entregar. Estamos contigo en cada paso.' },
]

function TeamMemberCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  // Use real image if available, initials otherwise
  const avatarContent = member.img ? (
    <img src={member.img} alt={member.name} className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-[#0066CC]/20" />
  ) : (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066CC]/20 to-[#0066CC]/5 flex items-center justify-center text-xl font-bold text-[#0066CC] mx-auto">
      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
    </div>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-vm-xl p-6 border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1"
    >
      {avatarContent}
      <h3 className="text-center font-bold text-[#1C1C1E] text-sm">{member.name}</h3>
      <p className="text-center text-xs text-[#0066CC] font-medium mt-0.5 mb-2">{member.role}</p>
      <p className="text-center text-xs text-[#8E8E93] leading-relaxed">{member.desc}</p>
    </motion.div>
  )
}

export default function Nosotros() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      {/* Hero with team photo */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F5F7]">
        <div className="container-vm py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
              >
                Nosotros
              </motion.span>
              <h1 className="text-heading-lg md:text-[3.5rem] font-extrabold text-[#1C1C1E] mt-3 mb-4 leading-[1.05]">
                Tu marca en su <span className="text-[#0066CC]">mejor temporada</span>
              </h1>
              <p className="text-lg text-[#636366] leading-relaxed max-w-lg">
                En Verano Media creemos que todo negocio merece una presencia digital profesional,
                sin pagar precios de agencia internacional. Somos un equipo apasionado por la tecnología
                y el marketing, comprometido con resultados reales.
              </p>
            </motion.div>

            {/* Team photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src="/team-photo.jpg"
                alt="Equipo de Verano Media"
                className="w-full h-auto rounded-vm-xl shadow-vm-lg object-cover"
                style={{ maxHeight: '420px' }}
              />
              <div className="absolute -bottom-3 -right-3 bg-[#0066CC] text-white text-xs font-semibold px-4 py-2 rounded-vm-md shadow-lg">
                🚀 Creciendo juntos
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-vm" ref={ref}>
        <div className="container-vm">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">Nuestro equipo</span>
            <h2 className="text-heading-lg text-[#1C1C1E] mt-3 mb-4">Conoce a quienes harán despegar tu negocio</h2>
            <p className="text-lg text-[#8E8E93]">Profesionales apasionados por el marketing digital y la tecnología.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {teamMembers.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50"
            >
              <h3 className="text-heading-sm text-[#0066CC] mb-4">Nuestra Misión</h3>
              <p className="text-base text-[#636366] leading-relaxed">
                Democratizar el marketing digital de calidad para pequeños y medianos negocios.
                Creemos que tener una presencia digital profesional no debería costar un ojo de la cara.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-vm-xl p-8 border border-[#E8E8ED]/50"
            >
              <h3 className="text-heading-sm text-[#0066CC] mb-4">Nuestra Visión</h3>
              <p className="text-base text-[#636366] leading-relaxed">
                Ser la agencia digital de referencia para negocios locales en toda Latinoamérica.
                Un cliente a la vez, un negocio transformado a la vez.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-vm">
        <div className="container-vm">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest">¿Por qué elegirnos?</span>
            <h2 className="text-heading-lg text-[#1C1C1E] mt-3">Nuestros valores</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-6 bg-white rounded-vm-xl border border-[#E8E8ED]/50 hover:shadow-vm-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-heading-sm text-[#1C1C1E] mb-2">{v.title}</h3>
                <p className="text-sm text-[#8E8E93]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#1C1C1E] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#0066CC]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-vm relative z-10 py-24 md:py-32 text-center">
          <h2 className="text-heading-lg md:text-[3.5rem] font-extrabold mb-6">¿Listo para trabajar con nosotros?</h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto">Háblanos sin compromiso. Te escuchamos, te diagnosticamos y te proponemos.</p>
          <a href="https://wa.me/18296848477" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-8 py-4 rounded-vm-md text-base font-semibold hover:bg-[#0066CC]/90 transition-all duration-300 hover:shadow-vm-lg hover:-translate-y-1">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
