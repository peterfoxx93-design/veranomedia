import { Link } from 'react-router-dom'

const ACTUALIZADO = '23 de septiembre de 2026'

const secciones = [
  {
    titulo: 'Qué ofrecemos',
    cuerpo: [
      'Verano Media presta servicios de marketing digital: sitios web, automatización de atención al cliente, captación de clientes y gestión de contenido. El alcance concreto de cada servicio se acuerda por escrito con cada cliente.',
    ],
  },
  {
    titulo: 'Uso del sitio',
    cuerpo: [
      'Este sitio es informativo. Puede usarlo con fines lícitos y sin intentar alterar su funcionamiento, su seguridad o el acceso de otras personas.',
      'El contenido publicado (textos, diseño, código y marca) es propiedad de Verano Media o se usa con autorización, y no puede reproducirse con fines comerciales sin nuestro consentimiento.',
    ],
  },
  {
    titulo: 'Diagnósticos y cotizaciones',
    cuerpo: [
      'Los diagnósticos gratuitos son orientativos y no constituyen una garantía de resultados. Las cifras, ejemplos y casos publicados corresponden a proyectos concretos y no representan una promesa de resultados idénticos para otros negocios.',
    ],
  },
  {
    titulo: 'Resultados',
    cuerpo: [
      'Trabajamos con métricas reales y verificables, pero ningún resultado depende solo de nosotros: depende también del mercado, del producto del cliente, de su capacidad de respuesta y de factores ajenos a nuestro control.',
    ],
  },
  {
    titulo: 'Comunicaciones',
    cuerpo: [
      'Si nos contacta, podremos responderle por el canal que utilizó. Puede pedirnos en cualquier momento que dejemos de escribirle y lo haremos.',
    ],
  },
  {
    titulo: 'Privacidad',
    cuerpo: [
      'El tratamiento de datos personales se rige por nuestra Política de privacidad.',
    ],
  },
  {
    titulo: 'Legislación aplicable',
    cuerpo: [
      'Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se someterá a los tribunales competentes de dicho país.',
    ],
  },
]

export default function Terminos() {
  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="container-vm max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-[#5170FF] uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1C1E]">
          Términos de servicio
        </h1>
        <p className="mt-3 text-sm text-[#8E8E93]">Actualizados el {ACTUALIZADO}</p>

        <div className="mt-10 space-y-8">
          {secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-2">{s.titulo}</h2>
              {s.cuerpo.map((p, i) => (
                <p key={i} className="text-sm text-[#4A4A4F] leading-relaxed mb-2">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E8ED] flex flex-wrap gap-4 text-sm">
          <Link to="/privacidad" className="text-[#5170FF] font-medium hover:underline">Política de privacidad</Link>
          <Link to="/" className="text-[#5170FF] font-medium hover:underline">Volver al inicio</Link>
          <a href="mailto:hola@veranomedia.click" className="text-[#5170FF] font-medium hover:underline">hola@veranomedia.click</a>
        </div>
      </div>
    </main>
  )
}
