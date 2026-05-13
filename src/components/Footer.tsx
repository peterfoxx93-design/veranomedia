import { Link } from 'react-router-dom'

const footerLinks = {
  servicios: [
    { label: 'Diseño Web', href: '/servicios/web' },
    { label: 'Redes Sociales', href: '/servicios/redes' },
    { label: 'SEO y Anuncios', href: '/servicios/anuncios-seo' },
    { label: 'Automatización', href: '/servicios/automatizacion' },
    { label: 'Contenido', href: '/servicios/contenido' },
    { label: 'Paquete Completo', href: '/paquete-completo' },
  ],
  company: [
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1E] text-white">
      <div className="container-vm py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight">
              Verano<span className="text-[#0066CC]">Media</span>
            </Link>
            <p className="mt-3 text-sm text-white/50 max-w-xs leading-relaxed">
              Agencia de marketing digital. Tu marca en su mejor temporada.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.servicios.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-[#0066CC] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Compañía
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/50 hover:text-[#0066CC] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <div className="space-y-3 text-sm text-white/50">
              <a
                href="https://wa.me/18296848477"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-[#34C759] transition-colors duration-200"
              >
                WhatsApp
              </a>
              <a
                href="mailto:info@veranomedia.digital"
                className="block hover:text-[#0066CC] transition-colors duration-200"
              >
                info@veranomedia.digital
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Verano Media. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/20">
            Tu marca en su mejor temporada
          </p>
        </div>
      </div>
    </footer>
  )
}
