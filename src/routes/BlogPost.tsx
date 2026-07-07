import { motion } from 'motion/react'
import { useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles } from '../blog/articles'
import KommentSection from '../components/KommentSection'
import ShareButtons from '../components/ShareButtons'

// ═══════════════════════════════════════════════════════════
// Componentes editoriales reutilizables
// ═══════════════════════════════════════════════════════════

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
        <div className="text-base text-[#636366] leading-relaxed">{children}</div>
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

// ═══════════════════════════════════════════════════════════
// Contenido de cada artículo
// ═══════════════════════════════════════════════════════════

function ArticleLandingVsSitio() {
  return (
    <>
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
    </>
  )
}

function ArticleChatbotsWhatsApp() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>S</DropCap>on las 11 de la noche. Un paciente acaba de terminar su turno laboral y recuerda que tiene que agendar una cita con el dentista. Abre WhatsApp, busca la clínica que le recomendaron, y escribe:
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic text-center my-6">
        — <em>"Buenas, ¿tienen disponibles para una limpieza el sábado en la mañana?"</em>
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La clínica cierra a las 6 de la tarde. Ese mensaje va a quedarse sin responder hasta el día siguiente. Para entonces, ese paciente ya le escribió a otros dos consultorios. Uno de ellos tenía un chatbot. Respondió al instante. Le agendó la cita. Ese paciente nunca volverá al primer consultorio.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Esto no es una historia hipotética. Pasa todos los días, en todos los rubros. Y tiene una solución que la mayoría de los negocios todavía no está usando.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        ¿Qué es un chatbot de WhatsApp realmente?
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Lo primero: un chatbot no es un robot que "habla por hablar". Es un <strong className="text-[#1C1C1E]">asistente automático</strong> que responde preguntas frecuentes, agenda citas, confirma horarios y recolecta información del cliente — TODO por WhatsApp, las 24 horas del día, los 7 días de la semana.
      </p>

      <PullQuote>
        No es un contestador automático de los 90. Es un recepcionista digital que trabaja mientras tú duermes.
      </PullQuote>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Funciona con reglas simples: si el cliente pregunta X, el chatbot responde Y. Pero cuando la conversación se sale del guion (una consulta compleja, un reclamo, un caso específico), el chatbot <strong className="text-[#1C1C1E]">deriva la conversación a un humano</strong> sin perder el historial. No hay mensajes perdidos, no hay clientes frustrados.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Lo que un chatbot PUEDE hacer (y lo que NO)
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Hay mucha confusión sobre lo que esta herramienta puede resolver. Vamos a separar la realidad del mito.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        ✅ Lo que SÍ hace
      </h3>

      <CheckList items={[
        'Responder al instante preguntas frecuentes (horarios, precios, ubicación, servicios)',
        'Agendar citas directamente en tu calendario sin intervención humana',
        'Calificar leads: preguntar datos clave antes de pasar el cliente a un vendedor',
        'Enviar recordatorios automáticos de citas (reduce el % de ausencias drásticamente)',
        'Responder mensajes a cualquier hora, incluso cuando el negocio está cerrado',
        'Recolectar nombres, correos y teléfonos de clientes potenciales',
      ]} />

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        ❌ Lo que NO hace
      </h3>

      <div className="space-y-4 my-6">
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Mito #1</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">"Va a sonar robótico y los clientes se van a molestar."</strong> Falso. Los chatbots modernos se configuran con tu tono de voz. Si tu negocio es cálido, el chatbot suena cálido. Si es formal, suena formal. El cliente ni siquiera nota que no es una persona hasta que el chatbot se presenta.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Mito #2</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">"Reemplaza al equipo de atención al cliente."</strong> No reemplaza: <strong className="text-[#1C1C1E]">aumenta</strong>. El chatbot filtra el 80% de las preguntas repetitivas para que tu equipo solo atienda lo que realmente requiere criterio humano. Tu equipo trabaja menos y rinde más.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Mito #3</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">"Es caro y solo para grandes empresas."</strong> Hoy en día, un chatbot funcional para WhatsApp cuesta menos que una campaña de anuncios de un mes. Y a diferencia de los anuncios, el chatbot no se acaba cuando dejas de pagar: sigue trabajando.
          </p>
        </div>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        ¿Cuánto cuesta NO tener uno?
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Más importante que preguntarse cuánto cuesta implementar un chatbot, es preguntarse cuánto estás perdiendo por no tenerlo. Hagamos el cálculo rápido:
      </p>

      <DataBox icon="🧮">
        <strong>El costo de la oportunidad perdida:</strong>
        <div className="mt-3 space-y-1.5 text-sm text-[#636366] leading-relaxed">
          <p>📱 <strong>10 consultas/día</strong> después de hora laboral = <strong>300/mes</strong></p>
          <p>💡 De esas, al menos <strong>30% son compradores listos</strong> = <strong>90 leads calificados</strong></p>
          <p>💰 Si cada cliente vale $100 USD de ganancia = <strong>$9,000 USD/mes en riesgo</strong></p>
          <p className="text-[#1C1C1E] font-medium mt-3">🔻 Un chatbot cuesta una fracción de eso. Y trabaja 24/7.</p>
        </div>
      </DataBox>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Son matemáticas simples. Cada hora que pasas sin un chatbot, hay leads que se te van a la competencia porque tú no estabas disponible para responder.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Tres negocios que deberían tenerlo YA
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        No todos los negocios se benefician igual de un chatbot. Estos tres tipos de negocio son los que más rentabilidad obtienen:
      </p>

      <MiniTable rows={[
        ['🦷 Clínica Dental', 'Agenda de citas, récord de ausencias >20%, preguntas repetitivas de precios y horarios'],
        ['🏡 Bienes Raíces', 'Calificación de leads 24/7, respuestas instantáneas sobre propiedades disponibles, agenda de visitas'],
        ['⚖️ Despacho de Abogados', 'Primer filtro de casos, captura de datos del cliente potencial, agenda de consultas iniciales'],
      ]} />

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La característica común: todos reciben consultas frecuentes y repetitivas fuera del horario laboral. Y todos dependen de la velocidad de respuesta para no perder el cliente.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Cómo empezar sin complicarse
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Implementar un chatbot en WhatsApp no requiere un equipo de ingenieros ni una inversión de miles de dólares. El proceso es simple:
      </p>

      <div className="space-y-4 my-8">
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Define las preguntas frecuentes</p>
            <p className="text-sm text-[#636366] mt-0.5">Horarios, precios, servicios, ubicación — todo lo que te preguntan 10 veces al día.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Configura las respuestas automáticas</p>
            <p className="text-sm text-[#636366] mt-0.5">Con el tono de tu marca. No suena a robot: suena a tu negocio.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Define las reglas de derivación</p>
            <p className="text-sm text-[#636366] mt-0.5">¿Qué conversaciones pasan a un humano? ¿Después de cuántas preguntas sin resolver?</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Prueba, ajusta, repite</p>
            <p className="text-sm text-[#636366] mt-0.5">Los chatbots mejoran con el uso. Las primeras semanas son de aprendizaje mutuo.</p>
          </div>
        </div>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        En resumen
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-3">Sin chatbot</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• Pierdes leads después del horario laboral</li>
            <li className="flex gap-2">• Tu equipo se satura con preguntas repetitivas</li>
            <li className="flex gap-2">• Los clientes esperan horas por una respuesta</li>
            <li className="flex gap-2">• Sin datos estructurados de tus prospectos</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• Oportunidad perdida: $$$$</li>
          </ul>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-3">Con chatbot</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• Captas leads 24/7 sin esfuerzo extra</li>
            <li className="flex gap-2">• Tu equipo solo atiende lo importante</li>
            <li className="flex gap-2">• Respuesta instantánea, cliente feliz</li>
            <li className="flex gap-2">• Base de datos de prospectos crece sola</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• Inversión: desde $108 USD</li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="my-10 text-center">
        <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-6">
          Un chatbot de WhatsApp no es una máquina fría que reemplaza a tu equipo. Es un empleado más que trabaja en el turno de la noche, los fines de semana y los feriados — y nunca pide horas extra.
        </p>
        <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-8">
          La pregunta no es si tu negocio necesita uno. Es cuánto estás dispuesto a perder mientras decides.
        </p>
        <p className="text-base md:text-lg text-[#636366] leading-relaxed italic">
          La próxima vez que tu WhatsApp suene a las 11 de la noche:
        </p>
        <p className="text-lg md:text-xl text-[#1C1C1E] font-serif italic mt-4 leading-relaxed">
          — ¿Va a contestar alguien?
        </p>
      </div>
    </>
  )
}

function ArticleGoogleMaps() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>I</DropCap>maginá esto: sos una clínica dental en Puerto Plata. Un turista se rompe una muela un sábado a las 7 de la tarde. Saca el teléfono, abre Google Maps y escribe:
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic text-center my-6">
        — <em>"dentista cerca de mí"</em>
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Google Maps le muestra 5 opciones. Tu clínica no aparece. Llama a la primera que ve. Agenda una cita de emergencia. Se convierte en paciente de ese consultorio.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Ese paciente no te eligió a vos ni al otro. Eligió al que apareció primero. Y vos perdiste esa oportunidad no porque tu clínica sea peor, sino porque <strong className="text-[#1C1C1E]">Google no sabía que existías</strong>.
      </p>

      <PullQuote>
        En el mundo digital, si no aparecés en Google Maps, no existís. Tan simple como eso.
      </PullQuote>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Y lo peor de todo: la herramienta para aparecer es completamente <strong className="text-[#1C1C1E]">gratuita</strong>. Google Business Profile (antes Google My Business) no cuesta un centavo. Lo que cuesta es el tiempo de configurarlo bien.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        ¿Qué es Google Business Profile?
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Es el perfil de tu negocio que aparece en Google cuando alguien busca tu marca o servicios relacionados. Incluye:
      </p>

      <MiniTable rows={[
        ['📍 Ubicación', 'Tu dirección exacta en el mapa, con indicaciones para llegar'],
        ['🕐 Horarios', 'Días y horarios de atención, incluyendo feriados'],
        ['📸 Fotos', 'Imágenes de tu local, productos, equipo y servicios'],
        ['⭐ Reseñas', 'Calificaciones y comentarios de tus clientes'],
        ['📞 Contacto', 'Teléfono, WhatsApp y sitio web con un clic'],
        ['❓ Preguntas', 'Sección de preguntas frecuentes que cualquier cliente puede ver'],
      ]} />

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
          Y todo esto aparece <strong className="text-[#1C1C1E]">sin que el usuario tenga que visitar tu sitio web</strong>. La información está ahí, en el mapa, en el momento exacto en que alguien te busca.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Los 5 errores que mantienen tu negocio invisible
      </h2>

      <div className="space-y-6 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #1</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">No verificaste tu perfil.</strong> Creaste el perfil pero nunca completaste la verificación por correo postal, teléfono o video. Google no confirma tu dirección y tu negocio aparece como "no verificado" — prácticamente invisible en los resultados.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #2</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Información incompleta o incorrecta.</strong> Falta el horario de los sábados. El teléfono está desactualizado. La dirección dice "Calle Principal" sin número. Google no confía en perfiles incompletos y los muestra después de los que están completos.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #3</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Sin fotos o con fotos de mala calidad.</strong> Los perfiles con más de 10 fotos reciben <strong className="text-[#1C1C1E]">2.5 veces más clics</strong> que los que tienen menos. Una foto borrosa de la fachada no da confianza. Tu perfil necesita imágenes profesionales de tu local, equipo y trabajos realizados.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #4</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Cero reseñas o reseñas sin respuesta.</strong> El 87% de los consumidores lee reseñas antes de elegir un negocio local. Si tenés 0 reseñas, desconfían. Si tenés reseñas y nunca respondiste, das la impresión de que no te importa la opinión de tus clientes.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #5</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Elegiste la categoría equivocada.</strong> Si tu clínica dental aparece como "Consultorio médico general" en vez de "Odontólogo", Google no sabe mostrarte a la persona correcta. Las categorías determinan cuándo y para qué búsquedas aparecés.
          </p>
        </div>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        El impacto real de un perfil optimizado
      </h2>

      <DataBox icon="📊">
        <strong>Lo que un perfil bien configurado genera:</strong>
        <div className="mt-3 space-y-1.5 text-sm text-[#636366] leading-relaxed">
          <p>📍 <strong>2.7x más visitas</strong> al sitio web desde Google Maps</p>
          <p>📞 <strong>3.5x más llamadas</strong> directas desde el perfil</p>
          <p>🚶 <strong>7x más solicitudes de indicaciones</strong> para llegar al local</p>
          <p className="text-[#1C1C1E] font-medium mt-3">Todo esto sin pagar un centavo en publicidad.</p>
        </div>
      </DataBox>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        No es magia. Es simplemente darle a Google la información que necesita para mostrarte a las personas que te buscan.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Cómo arreglarlo en 5 pasos
      </h2>

      <div className="space-y-4 my-8">
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Reclamá o creá tu perfil</p>
            <p className="text-sm text-[#636366] mt-0.5">Andá a google.com/business. Si tu negocio ya aparece, reclamalo. Si no, crealo desde cero.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Completá CADA campo</p>
            <p className="text-sm text-[#636366] mt-0.5">Nombre, dirección, teléfono, WhatsApp, horarios (incluyendo feriados), sitio web, categoría exacta. Todo.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Subí 10+ fotos de calidad</p>
            <p className="text-sm text-[#636366] mt-0.5">Fachada, interior, equipo, trabajos realizados. Fotos nítidas, bien iluminadas. Nada de imágenes borrosas.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Gestioná las reseñas</p>
            <p className="text-sm text-[#636366] mt-0.5">Pedile a tus clientes satisfechos que te dejen una reseña. Respondé a TODAS, las buenas y las malas, en menos de 24 horas.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="w-7 h-7 rounded-full bg-[#0066CC] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
          <div>
            <p className="text-sm font-semibold text-[#1C1C1E]">Publicá semanalmente</p>
            <p className="text-sm text-[#636366] mt-0.5">Google premia la actividad. Publicá ofertas, eventos, fotos nuevas. Un negocio activo aparece antes que uno abandonado.</p>
          </div>
        </div>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        En resumen
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-3">Sin perfil optimizado</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• No aparecés en búsquedas locales</li>
            <li className="flex gap-2">• Tus clientes no te encuentran en Maps</li>
            <li className="flex gap-2">• Sin reseñas = sin confianza</li>
            <li className="flex gap-2">• Le regalás clientes a tu competencia</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• Lo perdido: $$$$ en ventas</li>
          </ul>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#34C759] uppercase tracking-[0.1em] mb-3">Con perfil optimizado</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• Aparecés en "cerca de mí" en Maps</li>
            <li className="flex gap-2">• La info de tu negocio siempre visible</li>
            <li className="flex gap-2">• Reseñas positivas atraen más clientes</li>
            <li className="flex gap-2">• Le ganás exposure a tu competencia</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• Inversión: $0 USD (gratis)</li>
          </ul>
        </div>
      </div>

      <Separator />

      <div className="my-10 text-center">
        <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-6">
          Google Maps no es un juego de azar. No es que "algunos negocios tienen suerte y aparecen". Hay reglas claras, y el que las sigue, aparece.
        </p>
        <p className="text-base md:text-lg text-[#636366] leading-relaxed mb-8">
          La buena noticia: todo lo que necesitás hacer es gratis. Solo requiere tiempo y atención a los detalles.
        </p>
        <p className="text-base md:text-lg text-[#636366] leading-relaxed italic">
          La próxima vez que alguien busque tu servicio en Google Maps:
        </p>
        <p className="text-lg md:text-xl text-[#1C1C1E] font-serif italic mt-4 leading-relaxed">
          — ¿Va a aparecer tu negocio o el de la competencia?
        </p>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// Artículo 4: Community Management vs Publicidad
// ═══════════════════════════════════════════════════════════

function ArticleCMvsPublicidad() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>T</DropCap>e voy a hacer una pregunta incómoda: ¿cuánto gastaste en anuncios el mes pasado?
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Ahora otra: ¿cuánto invertiste en construir una comunidad alrededor de tu marca?
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Si la primera respuesta fue un número concreto y la segunda fue un "eh...", no estás solo. Nueve de cada diez dueños de negocio están en el mismo lugar. Y hay una razón: la publicidad se siente como acción, mientras que construir comunidad se siente como trabajo lento y sin resultados inmediatos.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Pero la realidad es más sutil. <strong className="text-[#1C1C1E]">No se trata de elegir uno sobre el otro.</strong> Se trata de entender qué hace cada uno, cuándo funciona y cómo combinarlos para que no estés quemando dinero.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Primero lo primero: ¿qué es cada cosa?
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Vamos a definiciones simples, porque en marketing la confusión empieza cuando usamos palabras grandes sin saber qué significan.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        Community Management
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Es el trabajo de <strong className="text-[#1C1C1E]">construir y mantener una relación</strong> con las personas que siguen tu marca. Publicar contenido, responder comentarios, crear conversación, resolver dudas, mostrar el detrás de escena. No es solo "postear". Es <strong className="text-[#1C1C1E]">estar presente</strong>.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        El community management construye confianza a largo plazo. No esperes que un post de Instagram te venda algo mañana. Pero sí espera que, cuando alguien necesite lo que vendes, tu marca sea la primera que le venga a la mente.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        Publicidad Digital
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Es el trabajo de <strong className="text-[#1C1C1E]">pagar por atención</strong>. Le dices a Meta, Google o TikTok: "aquí tengo $500, muéstrale mi anuncio a personas que cumplen este perfil". Y ellos lo hacen. Te garantizan alcance, clics y conversiones — siempre y cuando tu segmentación y tu oferta sean correctas.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La publicidad genera resultados <strong className="text-[#1C1C1E]">aquí y ahora</strong>. Pero el momento en que dejas de pagar, dejas de aparecer. No construye recuerdo de marca por sí sola.
      </p>

      <PullQuote>
        Community management construye el terreno. Publicidad enciende el motor. Si no tienes terreno, el motor solo levanta polvo.
      </PullQuote>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        La tabla de la verdad
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Pongamos las cartas sobre la mesa para que veas las diferencias claras:
      </p>

      <MiniTable rows={[
        ['Objetivo', 'Relación a largo plazo vs. Venta inmediata'],
        ['Velocidad', 'Lenta, constante (3—12 meses) vs. Rápida (hoy mismo)'],
        ['Costo', 'Tiempo + consistencia vs. Presupuesto mensual'],
        ['Alcance', 'Orgánico, limitado a seguidores vs. Pagado, segmentado'],
        ['Riesgo', 'Bajo (inviertes tiempo) vs. Alto (inviertes dinero)'],
        ['Resultado', 'Confianza y recuerdo de marca vs. Clientes y leads'],
        ['Duración', 'Permanente (la comunidad crece) vs. Temporal (se apaga sin presupuesto)'],
        ['Medición', 'Cualitativa: engagement, menciones vs. Cuantitativa: CPC, ROAS, CPL'],
      ]} />

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Ninguna es mejor que la otra.</strong> Son herramientas diferentes que resuelven problemas diferentes. El error es usarlas como si fueran intercambiables.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        El momento de cada una
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La pregunta del millón: <strong className="text-[#1C1C1E]">¿por dónde empiezo?</strong>
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        Si estás empezando — Community Management primero
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Cuando tu marca es nueva, nadie te conoce, nadie confía en ti. Si pones un anuncio, la gente va a ver tu perfil y se va a encontrar con 3 publicaciones y cero interacción. <strong className="text-[#1C1C1E]">El anuncio va a generar clics, pero no ventas.</strong> Porque no hay comunidad que respalde la promesa.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Invierte los primeros 3 meses en construir:
      </p>

      <CheckList items={[
        'Un perfil coherente con tu identidad visual',
        'Contenido que eduque sobre tu rubro (no que venda)',
        'Interacción genuina con cada comentario y mensaje',
        'Testimonios de tus primeros clientes (así sean gratis)',
        'Un estilo de comunicación consistente — tu "voz de marca"',
      ]} />

      <DataBox icon="📈">
        <strong>La métrica que importa al inicio:</strong> No los seguidores. La cantidad de personas que te escriben por iniciativa propia.
      </DataBox>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        Cuando ya tienes tracción — Activa la publicidad
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Una vez que tienes contenido de calidad, interacción orgánica y algunos clientes satisfechos, la publicidad se convierte en un <strong className="text-[#1C1C1E]">acelerador</strong>. Ya no estás poniendo un anuncio delante de personas que no saben quién eres. Estás poniendo un anuncio delante de personas que, al llegar a tu perfil, ven actividad, ven comentarios, ven que hay vida ahí.
      </p>

      <div className="my-6 pl-4 border-l-4 border-[#007AFF]">
        <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic">
          "La publicidad sin community management es como invitar gente a una fiesta vacía. Llegan, miran, y se van."
        </p>
      </div>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        Si ya tienes ambas — equílibralas
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Cuando las dos ruedas giran, el coche avanza rápido. El community management alimenta el recuerdo de marca y la confianza. La publicidad captura la demanda y convierte en clientes. Juntas crean un ciclo virtuoso:
      </p>

      <div className="my-8 bg-[#F5F5F7] rounded-vm-md p-5 md:p-6 border border-[#E8E8ED]/50">
        <p className="text-sm font-semibold text-[#007AFF] uppercase tracking-[0.1em] mb-2">El ciclo ideal</p>
        <ol className="space-y-2 text-sm text-[#636366]">
          <li><strong className="text-[#1C1C1E]">1.</strong> Publicas contenido orgánico que educa y engancha → la gente te conoce</li>
          <li><strong className="text-[#1C1C1E]">2.</strong> Activas anuncios dirigidos a audiencias que ya vieron tu contenido → el clic vale más</li>
          <li><strong className="text-[#1C1C1E]">3.</strong> El cliente llega, encuentra un perfil activo, ve reseñas, ve interacción → confía más</li>
          <li><strong className="text-[#1C1C1E]">4.</strong> Compra. Y si el servicio es bueno, deja un testimonio → alimenta el paso 1</li>
        </ol>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        El error que más duele
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Hay un error que veo repetirse en todos los rubros, todos los países, todos los presupuestos:
      </p>

      <PullQuote>
        Gastar $1,000 en anuncios cuando tu perfil de Instagram tiene 3 publicaciones y la última es de hace 2 meses.
      </PullQuote>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Es como poner un letrero luminoso en una tienda que está cerrada. La gente llega, mira por la ventana, ve que no hay nada, y se va. Y no solo se va: ahora sabe que no estás ahí. <strong className="text-[#1C1C1E]">Pagaste para que te descubrieran y te mostraste vacío.</strong>
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Si solo tienes presupuesto para una cosa, que sea community management los primeros meses. Construye el escaparate. Luego enciende el letrero.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        ¿Y cuánto deberías invertir en cada una?
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        No hay una fórmula mágica, pero sí una regla general que funciona para la mayoría de los negocios locales y pequeñas empresas:
      </p>

      <DataBox icon="📊">
        <strong>Regla del 70/30 si estás empezando:</strong>
        <div className="mt-3 space-y-1.5 text-sm text-[#636366]">
          <p>📱 <strong>70% de tu esfuerzo</strong> → Community Management (contenido, interacción, comunidad)</p>
          <p>📢 <strong>30% de tu presupuesto</strong> → Publicidad experimental (prueba con $200—$300 USD/mes)</p>
        </div>
      </DataBox>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        A medida que creces, la relación se invierte: marcas consolidadas pueden estar en 40% CM / 60% publicidad. Pero si no tienes base, la publicidad te va a costar más caro porque cada clic vale menos.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        El caso real
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Conozco un caso — y apuesto a que tú también conoces uno similar — de una clínica dental que invirtió $600 USD en anuncios de Facebook. Resultado: 5 leads, 0 citas agendadas. ¿La razón? Su página de Facebook tenía 4 fotos, el perfil decía "Clínica Dental" sin descripción, y la última publicación era de 8 meses atrás.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La gente hizo clic, vio el perfil vacío, y pensó: <em>"¿Esta clínica sigue abierta?"</em>. Y siguieron scrolleando.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Tres meses después, se tomaron el trabajo de hacer contenido semanal: fotos de la clínica, antes y después, tips de salud dental, respuestas a preguntas frecuentes. Volvieron a invertir los mismos $600 en anuncios. Esa vez: 22 leads, 8 citas agendadas. <strong className="text-[#1C1C1E]">El anuncio era casi idéntico. La diferencia fue el perfil.</strong>
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        En resumen
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#007AFF] uppercase tracking-[0.1em] mb-3">
            Solo Community Management
          </div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• Crecimiento lento pero sólido</li>
            <li className="flex gap-2">• Marca con personalidad y confianza</li>
            <li className="flex gap-2">• Dificultad para escalar rápido</li>
            <li className="flex gap-2">• Depende de algoritmos orgánicos</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• Ideal para construir los cimientos</li>
          </ul>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#34C759] uppercase tracking-[0.1em] mb-3">
            CM + Publicidad combinados
          </div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">• Crecimiento acelerado y sostenible</li>
            <li className="flex gap-2">• Anuncios más efectivos (perfil activo)</li>
            <li className="flex gap-2">• Audiencia fría → tibia → cliente</li>
            <li className="flex gap-2">• Datos para optimizar continuamente</li>
            <li className="flex gap-2 font-medium text-[#1C1C1E] mt-3">• El estándar de las marcas que crecen</li>
          </ul>
        </div>
      </div>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        No necesitas elegir. Necesitas <strong className="text-[#1C1C1E]">entender el orden</strong>.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] mb-8">
        Primero construye algo que valga la pena mostrar. Después paga para que más gente lo vea.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic">
        La próxima vez que te pregunten cuánto inviertes en redes:
      </p>
      <p className="text-lg md:text-xl text-[#1C1C1E] font-serif italic mt-4 leading-relaxed">
        — ¿Sabes cuánto de eso es construir comunidad y cuánto es comprar atención?
      </p>
    </>
  )
}

function ArticleAutomatizacionPymes() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>H</DropCap>ace unos meses hablé con el dueño de una ferretería en Santiago. Le mencioné que podía automatizar el envío de cotizaciones por WhatsApp. Su respuesta fue inmediata:
      </p>

      <div className="my-6 pl-4 border-l-4 border-[#007AFF]">
        <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic">
          "Eso es para empresas grandes, no para un negocio como el mío."
        </p>
      </div>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Y ahí está el primer mito, el más común, el que más duele. Así que vamos a desmontar cinco creencias que están frenando a miles de negocios pequeños como el suyo.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Mito #1: La automatización es solo para empresas grandes
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Realidad:</strong> Nunca fue tan barato ni tan fácil automatizar procesos. Herramientas como <strong className="text-[#1C1C1E]">Make, Zapier y n8n</strong> tienen planes gratuitos que permiten conectar apps sin escribir una línea de código.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Un negocio pequeño puede automatizar tareas como:
      </p>

      <CheckList items={[
        'Responder cotizaciones automáticas por WhatsApp',
        'Agendar citas en Google Calendar sin intervención humana',
        'Enviar correos de seguimiento a clientes después de una compra',
        'Publicar en Instagram y Facebook desde un solo lugar',
        'Respaldar facturas y recibos en la nube automáticamente',
      ]} />

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Todo esto por menos de lo que cuesta un café al día. No necesitas un departamento de IT. Necesitas 30 minutos y alguien que te guíe.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Mito #2: La automatización va a dejar a gente sin trabajo
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Realidad:</strong> La automatización no reemplaza personas. Reemplaza <strong className="text-[#1C1C1E]">tareas repetitivas</strong>. Y eso es exactamente lo que los dueños de negocio necesitan: que su equipo deje de hacer trabajo manual para dedicarse a lo que realmente importa.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Cuando un chatbot responde las preguntas frecuentes a las 2 de la mañana, no está quitándole el trabajo a nadie. Está haciendo que el dueño del negocio no tenga que despertarse a responder. Y cuando el sistema de facturación envía automáticamente los recibos, tu asistente puede estar cerrando una venta en lugar de copiar y pegar datos en Excel.
      </p>

      <PullQuote>
        La automatización no despide personas. La automatización libera personas para que hagan trabajo que las máquinas no pueden hacer.
      </PullQuote>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Mito #3: Es muy caro y solo se recupera a largo plazo
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Realidad:</strong> La mayoría de las automatizaciones se pagan solas en semanas, no en años. Hagamos cuentas simples:
      </p>

      <DataBox icon="🧮">
        <strong>Ejemplo real:</strong>
        <div className="mt-3 space-y-1.5 text-sm text-[#636366]">
          <p>⏱️ Una clínica dental recibe 30 consultas de precio por WhatsApp a la semana.</p>
          <p>👩‍⚕️ La recepcionista gasta 10 minutos por consulta respondiendo = 5 horas/semana.</p>
          <p>🤖 Con un chatbot + automatización, la respuesta se da en 10 segundos.</p>
          <p className="text-[#1C1C1E] font-medium mt-2">💰 Ahorro: ~20 horas al mes. Eso es medio sueldo de un empleado.</p>
        </div>
      </DataBox>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La automatización no es un gasto. Es una de las inversiones con mejor retorno que puede hacer un negocio pequeño.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Mito #4: Es complicado y solo los técnicos pueden usarlo
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Realidad:</strong> Las plataformas modernas de automatización son visuales. Arrastras, conectas, configuras. No necesitas saber programar.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Make y n8n funcionan con bloques visuales: "cuando llegue un mensaje → responde esto → guarda en Sheets → notifica al dueño". Esto es tan intuitivo que muchos dueños de negocio aprenden a crear sus propias automatizaciones en una tarde.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Y si no quieres hacerlo tú, agencias como Verano Media lo configuran por ti en 48 horas. Literalmente, te ahorramos el aprendizaje.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Mito #5: Mi negocio es muy pequeño, no necesito automatizar
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <strong className="text-[#1C1C1E]">Realidad:</strong> Es precisamente por eso que <strong className="text-[#1C1C1E]">más</strong> necesitas automatizar. Los negocios pequeños tienen menos personal, menos margen de error y menos tiempo. Cada minuto que tu equipo gasta en tareas repetitivas es un minuto que no están dedicando a vender, a atender bien al cliente, o a mejorar el negocio.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Automatizar no es cosa de grandes corporaciones. Es cosa de dueños inteligentes que entienden que su tiempo vale más que copiar y pegar datos.
      </p>

      <div className="my-8 bg-[#F5F5F7] rounded-vm-md p-5 md:p-6 border border-[#E8E8ED]/50">
        <p className="text-sm font-semibold text-[#007AFF] uppercase tracking-[0.1em] mb-2">La regla de oro</p>
        <p className="text-base text-[#636366] leading-relaxed">
          Si haces una tarea manual más de 3 veces a la semana, pregúntate: <strong className="text-[#1C1C1E]">"¿Puede hacerlo una máquina?"</strong>. Si la respuesta es sí, <strong className="text-[#1C1C1E]">automatízala</strong>.
        </p>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Por dónde empezar (sin abrumarte)
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        No intentes automatizar todo de golpe. El orden correcto es:
      </p>

      <div className="my-8 space-y-4">
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm font-bold text-[#0066CC]">1</span>
          </div>
          <div>
            <p className="text-base font-semibold text-[#1C1C1E]">Identifica el dolor</p>
            <p className="text-sm text-[#636366] mt-1">¿Qué tarea odias hacer? ¿Qué le roba más tiempo a tu equipo?</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm font-bold text-[#0066CC]">2</span>
          </div>
          <div>
            <p className="text-base font-semibold text-[#1C1C1E]">Empieza por una</p>
            <p className="text-sm text-[#636366] mt-1">Una sola automatización. Un proceso. Que funcione bien.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm font-bold text-[#0066CC]">3</span>
          </div>
          <div>
            <p className="text-base font-semibold text-[#1C1C1E]">Mide el resultado</p>
            <p className="text-sm text-[#636366] mt-1">¿Cuánto tiempo ahorraste? ¿Valió la pena? Spoiler: sí.</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="w-8 h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-sm font-bold text-[#0066CC]">4</span>
          </div>
          <div>
            <p className="text-base font-semibold text-[#1C1C1E]">Escala</p>
            <p className="text-sm text-[#636366] mt-1">Ahora que viste que funciona, automatiza el siguiente proceso.</p>
          </div>
        </div>
      </div>

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        En resumen
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF3B30] uppercase tracking-[0.1em] mb-3">Los mitos</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">✗ Solo para empresas grandes</li>
            <li className="flex gap-2">✗ Deja a gente sin trabajo</li>
            <li className="flex gap-2">✗ Es muy caro</li>
            <li className="flex gap-2">✗ Es complicado</li>
            <li className="flex gap-2">✗ No lo necesito</li>
          </ul>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-xl p-6 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#34C759] uppercase tracking-[0.1em] mb-3">Las realidades</div>
          <ul className="space-y-2 text-sm text-[#636366]">
            <li className="flex gap-2">✓ Nunca fue más barato</li>
            <li className="flex gap-2">✓ Libera, no reemplaza</li>
            <li className="flex gap-2">✓ Se paga sola en semanas</li>
            <li className="flex gap-2">✓ Visual, sin código</li>
            <li className="flex gap-2">✓ Lo necesitas más que una grande</li>
          </ul>
        </div>
      </div>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La automatización no es el futuro. Es el presente, y está al alcance de cualquier negocio que tenga conexión a internet y ganas de crecer.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic">
        La próxima vez que alguien te diga "eso es para empresas grandes", sonríe. Ahora sabes que no es verdad.
      </p>
    </>
  )
}

function ArticleSeo2026() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>S</DropCap>i todavía crees que el SEO es "poner palabras clave y esperar", tengo una noticia: <strong className="text-[#1C1C1E]">Google ya no busca keywords, busca respuestas</strong>.
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        En 2026, el SEO cambió más que en los últimos 10 años juntos. No porque el algoritmo sea diferente — porque <strong className="text-[#1C1C1E]">cómo busca la gente es diferente</strong>.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Lo que ya no funciona
      </h2>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        1. Rellenar de palabras clave
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Google ya no empareja términos. Entiende intención. Un artículo optimizado para "zapatos rojos baratos en Santo Domingo" y otro para "dónde comprar zapatos rojos económicos en RD" compiten por lo mismo si responden bien.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        2. Backlinks masivos
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Un solo link de un sitio relevante vale más que 50 de directorios basura. Google prioriza calidad sobre cantidad, y en 2026 esto se endureció.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        3. Contenido genérico generado por IA
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        El 91% de los marketeros ya usa IA para contenido (SE Ranking, 2025). Pero Google castiga lo que no aporta valor real. Si tu artículo lo pudo escribir cualquiera con ChatGPT, no va a posicionar.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Lo que funciona en 2026
      </h2>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        1. Optimización para motores de respuesta (AEO)
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Google ya no es un motor de búsqueda — es un <strong className="text-[#1C1C1E]">motor de respuestas</strong>. Cuando alguien pregunta "¿cómo facturar como freelancer en RD?", Google quiere darte la respuesta directa.
      </p>

      <CheckList items={[
        'Estructura tu contenido en formato pregunta → respuesta clara',
        'Usa listas, tablas, pasos numerados',
        'Pon la respuesta principal al inicio del artículo',
      ]} />

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        2. EEAT 2.0 — Experiencia real
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La "E" extra de Experience ahora pesa tanto como Expertise. Google quiere saber que <strong className="text-[#1C1C1E]">has hecho lo que explicas</strong>.
      </p>

      <CheckList items={[
        'Autor con nombre y foto real',
        'Datos propios, no solo teoría reciclada',
        'Casos de estudio, testimonios, resultados concretos',
      ]} />

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        3. SEO para búsqueda por voz y visual
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Más del 50% de las búsquedas en LATAM ya son por voz (Vexus, 2025). La gente habla distinto a como escribe:
      </p>

      <MiniTable rows={[
        ['Escrito', '"restaurante italiano Madrid"'],
        ['Hablado', '"¿Dónde hay un buen restaurante italiano cerca de aquí?"'],
      ]} />

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        4. SEO local hiperpersonalizado
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Google Business Profile completo, reseñas y contenido local son la prioridad #1 para negocios que atienden presencial.
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        5. Medir visibilidad, no solo tráfico
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        El 60% de las búsquedas ya no generan un clic (Semrush, 2026). Las nuevas métricas: fragmentos destacados, citas en IA, respuestas de voz y share of voice.
      </p>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Resumen práctico
      </h2>

      <MiniTable rows={[
        ['Ya no funciona', 'Funciona en 2026'],
        ['Keywords repetidas', 'Responder preguntas reales'],
        ['Backlinks masivos', 'Autoridad temática + experiencia'],
        ['Contenido IA genérico', 'EEAT 2.0 (datos propios, autor real)'],
        ['Medir solo tráfico', 'Medir visibilidad en IA + voz'],
      ]} />

      <PullQuote>
        El SEO de 2026 no se trata de engañar a un algoritmo, sino de convertirse en la fuente confiable de respuestas.
      </PullQuote>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic">
        ¿Tu negocio aparece cuando te buscan? Si no estás seguro, probablemente no.
      </p>
    </>
  )
}

function ArticleFunnelDigital() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>U</DropCap>n amigo me llamó la semana pasada. Acaba de abrir un consultorio de fisioterapia. Me dijo: <em>"Ya tengo Instagram, ya tengo WhatsApp, ya le pagué a un diseñador para el logo. ¿Qué más falta?"</em>
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Le respondí con una pregunta que casi nadie se hace al empezar:
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8] italic text-center my-6">
        — <em>"¿Qué quieres que pase desde que alguien escucha tu nombre hasta que paga?"</em>
      </p>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Ese camino — desde que una persona <strong className="text-[#1C1C1E]">descubre</strong> tu negocio hasta que <strong className="text-[#1C1C1E]">decide comprar</strong> — se llama <em>funnel digital</em>. Y la mayoría de los negocios lo construye al revés: invierten en diseño y anuncios antes de definir el recorrido del cliente.
      </p>

      <PullQuote>
        Un funnel no es un embudo que atrapa gente. Es un camino que acompaña decisiones. Si lo construyes bien, el cliente siente que llegó solo.
      </PullQuote>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Las tres etapas del funnel (sin jerga de manual)
      </h2>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Olvídate de TOFU, MOFU, BOFU y siglas que suenan a restaurante japonés. En la práctica, tu funnel tiene tres momentos:
      </p>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        1. Descubrimiento: que te encuentren
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Aquí la persona no sabe que existes. Te encuentra porque alguien le habló de ti, porque apareciste en Google, porque vio tu post en Instagram, porque un anuncio le llamó la atención.
      </p>

      <DataBox icon="🔍">
        <strong>Lo que necesitas en esta etapa:</strong> presencia donde tu cliente busca. Google Maps si es negocio local. Instagram si tu cliente pasa tiempo ahí. Un artículo de blog si resuelves una duda común. No necesitas convencer a nadie todavía. Solo <strong className="text-[#1C1C1E]">existir donde te buscan</strong>.
      </DataBox>

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        2. Consideración: que confíen en ti
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Ya te encontró. Ahora revisa tu perfil, tu sitio web, lo que otros dicen de ti. Compara. Investiga. En esta etapa <strong className="text-[#1C1C1E">no se compra, se decide</strong>.
      </p>

      <CheckList items={[
        'Un sitio web profesional que cargue rápido en el celular',
        'Testimonios o reseñas visibles (Google, Instagram, web)',
        'Contenido que responda sus dudas (blog, FAQs, videos)',
        'Fotos reales de tu negocio, no stock photos',
        'Un tono consistente en todos los canales',
      ]} />

      <h3 className="font-serif text-xl md:text-2xl text-[#1C1C1E] mt-8 mb-4">
        3. Decisión: que actúen
      </h3>

      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        Ya confía. Ahora necesita un empujón. Una oferta clara, un formulario simple, un WhatsApp directo, una razón para <strong className="text-[#1C1C1E">actuar hoy y no mañana</strong>.
      </p>

      <DataBox icon="🎯">
        <strong>Lo que mata la decisión:</strong> pedir demasiada información, formularios largos, no tener WhatsApp a la vista, precios escondidos, páginas que cargan lento. Cada fricción es una venta perdida.
      </DataBox>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        El error que casi todos cometen
      </h2>

      <div className="space-y-6 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #1</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Saltarse la consideración.</strong> Invierten solo en descubrimiento (anuncios, redes) y esperan que la gente compre directo. Pero sin contenido que genere confianza, el visitante llega, mira y se va.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #2</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Tener todo menos la decisión clara.</strong> Site bonito, Instagram activo, reseñas perfectas... pero ningún lugar visible que diga "reserva aquí" o "cómpralo ahora". El cliente quiere comprar y no encuentra cómo.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#FF453A] uppercase tracking-[0.1em] mb-2">Error #3</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Construir el funnel al revés.</strong> Empiezan por la página web (el final del camino) antes de saber cómo van a atraer gente al principio. Una web sin tráfico es un local en una calle sin peatones.
          </p>
        </div>
      </div>

      <Separator />

      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">
        Cómo construir tu funnel paso a paso
      </h2>

      <div className="space-y-8 my-8">
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-2">Paso 1</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Define el recorrido.</strong> ¿Dónde busca tu cliente? ¿Qué necesita saber antes de comprar? ¿Cuál es la última pregunta que hace antes de decidir? Responde eso primero.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-2">Paso 2</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Asegura el descubrimiento.</strong> Google Business Profile completo, Instagram activo con contenido útil, un artículo que responda la pregunta principal de tu cliente. Una sola fuente de tráfico bien trabajada vale más que cinco a medias.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-2">Paso 3</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Construye la consideración.</strong> Una landing page o sitio web que muestre quién eres, qué haces, y por qué deberían confiar en ti. Testimonios, casos, contenido que eduque.
          </p>
        </div>
        <div className="bg-[#F5F5F7] rounded-vm-md p-5 border border-[#E8E8ED]/50">
          <div className="text-sm font-semibold text-[#0066CC] uppercase tracking-[0.1em] mb-2">Paso 4</div>
          <p className="text-base text-[#636366] leading-relaxed">
            <strong className="text-[#1C1C1E]">Facilita la decisión.</strong> Botón de WhatsApp visible, formulario simple (3 campos máximo), precio claro, llamado a la acción específico. Elimina toda fricción entre "quiero" y "compro".
          </p>
        </div>
      </div>

      <MiniTable rows={[
        ['Antes del funnel', 'Después del funnel'],
        ['Inviertes en anuncios y esperas', 'Sabes exactamente qué canal atrae clientes'],
        ['Tienes web pero nadie la visita', 'Cada etapa alimenta a la siguiente'],
        ['Los clientes llegan "de casualidad"', 'El proceso es repetible y medible'],
        ['No sabes por qué no venden', 'Sabes exactamente dónde se pierden'],
      ]} />

      <Separator />

      <div className="my-10 text-center">
        <p className="text-base md:text-lg text-[#636366] leading-relaxed italic">
          Un funnel digital no es una estrategia de marketing. Es la respuesta a la pregunta más importante de tu negocio:
        </p>
        <p className="text-lg md:text-xl text-[#1C1C1E] font-serif italic mt-4 leading-relaxed">
          — "¿Qué pasa después de que alguien me descubre?"
        </p>
        <p className="text-base md:text-lg text-[#636366] leading-relaxed mt-6">
          Si no tienes una respuesta clara para cada etapa, no es que te falte marketing. Es que te falta un camino. Y sin camino, el cliente se pierde antes de llegar.
        </p>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════
// Componente principal
// ═══════════════════════════════════════════════════════════

export default 

function ArticleIA() {
  return (
    <>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        <DropCap>S</DropCap>i tienes un negocio en Republica Dominicana, sabes que necesitas contenido digital. El problema es que no tienes tiempo para crearlo.
      </p>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        La IA lo hace en segundos. Pero suena a robot.
      </p>
      <div className="my-10 md:my-12 pl-5 md:pl-6 border-l-4 border-[#0066CC] bg-[#F5F5F7] rounded-r-vm-md py-5 md:py-6 pr-5 md:pr-8">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#1C1C1E] italic">
          La IA encuentra los datos. Un humano pone la voz. El resultado es contenido que se lee como si lo hubiera escrito alguien con experiencia.
        </p>
      </div>
      <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] mt-12 mb-6 leading-tight">El metodo que si funciona</h2>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8]">
        En Verano Media combinamos investigacion con IA, estructura editorial y un humano que revisa cada palabra. El resultado: contenido que suena a ti, no a un robot.
      </p>
      <div className="my-8 bg-[#0066CC]/5 border border-[#0066CC]/10 rounded-vm-md p-5 md:p-6">
        <div className="flex gap-4 items-start">
          <span className="text-xl flex-shrink-0 mt-0.5">AI</span>
          <div className="text-base text-[#636366] leading-relaxed">
            <strong>Y si, usamos IA.</strong> Pero tambien criterio, experiencia y conocimiento del mercado dominicano.
          </div>
        </div>
      </div>
      <p className="text-base md:text-lg text-[#636366] leading-[1.8] font-bold text-center my-6">
        Cuantos clientes pierdes porque no apareces cuando te buscan?
      </p>
      <div className="my-8 bg-[#0066CC] rounded-vm-md p-6 md:p-8 text-center">
        <p className="text-white text-lg md:text-xl font-semibold mb-2">Escribenos al wa.me/18093586497</p>
        <p className="text-white/80 text-sm">En 24 horas tu negocio publica contenido que consigue clientes.</p>
      </div>
    </>
  )
}

// v1.0.1
function BlogPost() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug) || articles[0]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  function renderArticleBody() {
    switch (article.slug) {
      case 'landing-vs-sitio':
        return <ArticleLandingVsSitio />
      case 'chatbots-whatsapp':
        return <ArticleChatbotsWhatsApp />
      case 'tu-negocio-no-aparece-en-google-maps':
        return <ArticleGoogleMaps />
      case 'cm-vs-publicidad':
        return <ArticleCMvsPublicidad />
      case 'automatizacion-pymes':
        return <ArticleAutomatizacionPymes />
      case 'seo-2026':
        return <ArticleSeo2026 />
      case 'funnel-digital':
        return <ArticleFunnelDigital />
      case 'ia-contenido':
        return <ArticleIA />
      default:
        return <ArticleLandingVsSitio />
    }
  }

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
            {renderArticleBody()}
            <ShareButtons slug={article.slug} title={article.title} excerpt={article.excerpt} />
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

      {/* Comentarios */}
      <KommentSection articleSlug={String(article.slug)} />
    </div>
  )
}
