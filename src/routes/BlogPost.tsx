import { motion } from 'motion/react'
import { useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles } from '../blog/articles'

function DropCap({ children }: { children: string }) {
  return (
    <span className="float-left text-6xl md:text-7xl leading-[0.8] mr-3 mt-1 font-serif font-bold text-[#0066CC] select-none">
      {children}
    </span>
  )
}

function PullQuote({ children }: { children: string }) {
  return (
    <div className="my-10 md:my-12 pl-5 md:pl-6 border-l-4 border-[#0066CC] bg-[#F5F5F7] rounded-r-vm-md py-5 md:py-6 pr-5 md:pr-8">
      <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#1C1C1E] italic">
        {children}
      </p>
    </div>
  )
}

function DataBox({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="my-8 bg-[#0066CC]/5 border border-[#0066CC]/10 rounded-vm-md p-5 md:p-6">
      <div className="flex gap-4 items-start">
        <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="text-base text-[#636366] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div className="my-10 md:my-12 flex items-center justify-center gap-3 text-[#D1D1D6]">
      <span className="block w-8 h-px bg-[#D1D1D6]" />
      <span className="text-sm">☀️</span>
      <span className="block w-8 h-px bg-[#D1D1D6]" />
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 my-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base text-[#636366] leading-relaxed">
          <span className="text-[#34C759] flex-shrink-0 mt-0.5">☑️</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function MiniTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="my-8 overflow-hidden rounded-vm-md border border-[#E8E8ED]/50">
      {rows.map((row, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 px-5 py-4 ${
            i % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F7]'
          } ${i < rows.length - 1 ? 'border-b border-[#E8E8ED]/30' : ''}`}
        >
          <span className="text-sm font-semibold text-[#1C1C1E] min-w-[140px]">{row[0]}</span>
          <span className="text-sm text-[#636366]">{row[1]}</span>
        </div>
      ))}
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug) || articles[0]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  return (
    <div className="pt-20">
      {/* Hero tipográfico */}
      <section className="bg-white border-b border-[#E8E8ED]/30">
        <div className="container-vm max-w-[740px] mx-auto py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8E8E93] hover:text-[#0066CC] transition-colors uppercase tracking-[0.15em] mb-6"
            >
              ← Un cuaderno de Verano
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 text-xs text-[#8E8E93] uppercase tracking-[0.15em] mb-4">
              <span className="font-semibold text-[#0066CC]">{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#D1D1D6]" />
              <span>{article.readTime} min de lectura</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-[#1C1C1E]"
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-[#636366] leading-relaxed font-light italic max-w-[620px]"
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-[#E8E8ED]/40 flex items-center justify-between text-xs text-[#8E8E93]"
          >
            <span>Por el equipo de Verano Media</span>
            <span>{article.date}</span>
          </motion.div>
        </div>
      </section>

      {/* Contenido del artículo */}
      <article className="bg-white">
        <div className="container-vm max-w-[700px] mx-auto py-10 md:py-14">
          <div className="prose-custom">

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              <DropCap>H</DropCap>ay una pregunta que aparece en todos los foros de emprendedores, sin importar el país ni el idioma:
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic text-center my-6">
              — <em>"¿Necesito una página web para mi negocio?"</em>
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Y la respuesta correcta nunca empieza con un "sí" o un "no". Empieza con otra pregunta que casi nadie se hace:
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic text-center my-6">
              — <em>"¿Para qué exactamente?"</em>
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Porque una <strong className="text-[#1C1C1E]">landing page</strong> y un <strong className="text-[#1C1C1E]">sitio web completo</strong> resuelven problemas distintos. Usar la herramienta equivocada no solo te hace perder dinero: te hace perder clientes que nunca llegaste a tener.
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Vamos a entender la diferencia de una vez por todas.
            </p>

            <Separator />

            {/* Sección: El problema de fondo */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              El problema de fondo
            </h2>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Cuando alguien dice "voy a hacer una página web", en su cabeza hay una imagen borrosa de algo que tiene texto, fotos y un botón de WhatsApp. Y tiene razón... pero también está tan generalizando que el resultado suele ser una solución que no sirve bien para nada.
            </p>

            <PullQuote>
              Una landing page es un afiche bien diseñado. Un sitio web completo es una tienda.
            </PullQuote>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              El afiche lo ves, te da un mensaje claro y te invita a hacer una sola cosa. La tienda la recorres, exploras, comparas, vuelves otro día y eventualmente compras.
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Ambos venden. Pero de formas distintas.
            </p>

            <Separator />

            {/* Sección: Landing page */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              Landing page: el afiche que convierte
            </h2>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Una landing page es una página web <strong className="text-[#1C1C1E]">de una sola misión</strong>. No tiene menú de navegación, no tiene páginas secundarias, no tiene distracciones. Tiene un solo objetivo: que el visitante haga <strong className="text-[#1C1C1E]">una acción específica</strong>.
            </p>

            <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
              El momento correcto para usarla
            </h3>

            <CheckList items={[
              'Lanzas un producto o servicio único y quieres probar si funciona',
              'Vas a invertir en anuncios pagados y necesitas una página optimizada',
              'Tienes una promoción por tiempo limitado',
              'Quieres capturar correos o contactos con un lead magnet',
              'Eres un profesional independiente con una oferta clara',
            ]} />

            <DataBox icon="📐">
              <strong>Anatomía de una landing page efectiva:</strong>
              <div className="mt-3 font-mono text-sm text-[#636366] leading-relaxed whitespace-pre-line">
                {'Titular: una frase, un beneficio\nSubtítulo: refuerza el titular\nImagen o video del producto\n3—4 viñetas de beneficios\n❮ Botón de acción principal ❯\nTestimonial (opcional, poderoso)\n❮ Botón de acción (repetido) ❯'}
              </div>
            </DataBox>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Eso es todo. Sin "conócenos", sin "blog", sin galería de fotos. <strong className="text-[#1C1C1E]">Nada que distraiga de la misión.</strong>
            </p>

            <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
              Ejemplo concreto
            </h3>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Un nutriólogo que quiere conseguir sus primeros 10 pacientes crea una landing page con:
            </p>

            <MiniTable rows={[
              ['Título', '"Baja de peso sin dietas extremas — resultados visibles en 21 días"'],
              ['Subtítulo', 'Programa online con acompañamiento personalizado'],
              ['CTA', 'Agenda tu llamada gratuita'],
              ['Inversión', '$97 USD'],
            ]} />

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              No hay "sobre mí", no hay "planes y paquetes", no hay blog con recetas. <strong className="text-[#1C1C1E]">Todo es para que llegues al botón.</strong>
            </p>

            <DataBox icon="💰">
              <strong>Costo típico en el mercado:</strong> $200 – $600 USD
            </DataBox>

            <Separator />

            {/* Sección: Sitio web completo */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              Sitio web: la tienda que construye confianza
            </h2>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Un sitio web completo es un ecosistema de varias páginas que <strong className="text-[#1C1C1E]">representan tu negocio en internet</strong>. Aquí el visitante no llega a comprar inmediatamente. Llega a investigar, a conocerte, a decidir si confía en ti.
            </p>

            <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
              El momento correcto para usarlo
            </h3>

            <CheckList items={[
              'Tienes un negocio ya funcionando con múltiples servicios o productos',
              'Quieres aparecer en Google de forma orgánica (SEO)',
              'Tu cliente típico necesita varios días o visitas antes de comprar',
              'Tienes un equipo y quieres mostrar quiénes son',
              'Planeas publicar contenido regularmente (blog, casos de estudio)',
            ]} />

            <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
              Estructura típica
            </h3>

            <MiniTable rows={[
              ['Inicio', 'Presentación general, servicios principales, prueba social'],
              ['Servicios', 'Cada oferta explicada con detalle'],
              ['Nosotros', 'Quién eres, tu historia, tu equipo'],
              ['Blog / Recursos', 'Contenido educativo que atrae tráfico orgánico'],
              ['Contacto', 'Formulario, mapa, WhatsApp, redes sociales'],
            ]} />

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Cada página tiene un trabajo específico. Juntas construyen confianza. El cliente puede llegar por un artículo del blog, pasar a "servicios", leer sobre el equipo, y eventualmente contactar. <strong className="text-[#1C1C1E]">Sin presión. A su ritmo.</strong>
            </p>

            <DataBox icon="💰">
              <strong>Costo típico en el mercado:</strong> $600 – $2,000 USD
            </DataBox>

            <Separator />

            {/* Sección: La estrategia inteligente */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              La estrategia inteligente: empieza pequeño
            </h2>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Si estás empezando, hay un camino que recomendamos más que cualquier otro:
            </p>

            <PullQuote>
              Empieza con una landing page. Valida tu oferta. Gana tus primeros clientes. Luego escala a sitio web completo.
            </PullQuote>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Es mucho más inteligente invertir $300 USD en una landing page que te dice en 30 días si tu oferta funciona, que $1,500 USD en un sitio web completo que nadie visita porque tu producto aún no está validado.
            </p>

            <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
              Así trabajan las startups más exitosas del mundo. Lanzan. Prueban. Aprenden. Escalan.
            </p>

            <Separator />

            {/* Sección: Errores */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              Los errores que te harán perder dinero
            </h2>

            <div className="space-y-6 my-8">
              <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
                <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #1</div>
                <p className="text-base text-[#636366] leading-relaxed">
                  <strong className="text-[#1C1C1E]">La landing page con menú de navegación.</strong> Le pones "Inicio", "Servicios", "Blog", "Contacto". El visitante entra, se distrae, navega a otra página y nunca hace clic en el botón principal. Has perdido la venta.
                </p>
              </div>
              <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
                <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #2</div>
                <p className="text-base text-[#636366] leading-relaxed">
                  <strong className="text-[#1C1C1E]">El sitio web sin página de inicio clara.</strong> Tienes 5 páginas hermosas pero nadie que entra entiende en 3 segundos qué haces. El visitante se va. Has perdido el cliente.
                </p>
              </div>
              <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
                <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #3</div>
                <p className="text-base text-[#636366] leading-relaxed">
                  <strong className="text-[#1C1C1E]">Confundir "tener web" con "tener presencia digital".</strong> La web es solo el 30% de la ecuación. Sin SEO, sin redes, sin contenido, sin anuncios... es como tener una tienda en una calle donde nunca pasa nadie.
                </p>
              </div>
            </div>

            <Separator />

            {/* Resumen */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
              En resumen
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
              <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
                <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-3">Landing Page</div>
                <ul className="space-y-2 text-sm text-[#636366]">
                  <li className="flex gap-2">• Tienes una oferta única</li>
                  <li className="flex gap-2">• Vas a invertir en anuncios</li>
                  <li className="flex gap-2">• Quieres probar rápido</li>
                  <li className="flex gap-2">• Capturar leads o vender un curso</li>
                  <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• $200 – $600 USD</li>
                </ul>
              </div>
              <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
                <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-3">Sitio Web</div>
                <ul className="space-y-2 text-sm text-[#636366]">
                  <li className="flex gap-2">• Múltiples servicios o productos</li>
                  <li className="flex gap-2">• Quieres aparecer en Google</li>
                  <li className="flex gap-2">• Ya tienes clientes y quieres escalar</li>
                  <li className="flex gap-2">• Construir confianza y autoridad</li>
                  <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• $600 – $2,000 USD</li>
                </ul>
              </div>
            </div>

            <Separator />

            {/* Cierre */}
            <div className="my-10 text-center">
              <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-6">
                No hay respuesta correcta universal. La hay para <strong className="text-[#1C1C1E]">tu negocio, tu momento y tu mercado</strong>.
              </p>
              <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-8">
                La diferencia entre una landing page y un sitio web no es técnica. Es estratégica.
              </p>
              <p className="text-base md:text-lg text-[#636366] leading-relaxed italic">
                Y ahora que sabes la diferencia, la próxima vez que alguien te diga "necesito una página web", vas a poder responder con una pregunta mejor:
              </p>
              <p className="text-lg md:text-xl text-[#1C1C1E] font-serif italic mt-4 leading-relaxed">
                — "Cuéntame: ¿qué necesitas que pase cuando alguien llegue ahí?"
              </p>
            </div>

          </div>
        </div>
      </article>

      {/* Footer del artículo */}
      <section className="bg-[#F5F5F7] border-t border-[#E8E8ED]/30">
        <div className="container-vm max-w-[700px] mx-auto py-12 text-center">
          <p className="text-xs text-[#8E8E93] uppercase tracking-[0.15em] mb-2">
            Publicado originalmente en
          </p>
          <Link to="/blog" className="font-serif text-lg text-[#1C1C1E] hover:text-[#0066CC] transition-colors">
            Un cuaderno de Verano
          </Link>
          <p className="text-sm text-[#8E8E93] mt-1">por el equipo de Verano Media</p>
          <div className="mt-6 pt-6 border-t border-[#E8E8ED]/40">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066CC] hover:text-[#0052CC] transition-colors"
            >
              ← Todos los artículos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
