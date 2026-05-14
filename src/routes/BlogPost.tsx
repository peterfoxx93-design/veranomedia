import { motion } from 'motion/react'
import { useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles } from '../blog/articles'
import KommentSection from '../components/KommentSection'

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

// ═══════════════════════════════════════════════════════════
// Componente principal
// ═══════════════════════════════════════════════════════════

export default function BlogPost() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug) || articles[0]

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  function renderArticleBody() {
    switch (article.slug) {
      case 'landing-vs-sitio':
        return <ArticleLandingVsSitio />
      case 'chatbots-whatsapp':
        return <ArticleChatbotsWhatsApp />
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
