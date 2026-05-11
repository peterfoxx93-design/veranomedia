export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E8E8ED]/50">
      <div className="container-vm py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="/" className="text-xl font-bold text-[#1C1C1E] tracking-tight">
              Verano<span className="text-[#007AFF]">Media</span>
            </a>
            <p className="text-sm text-[#8E8E93] mt-3 max-w-xs leading-relaxed">
              Diseñamos la presencia digital que tu negocio merece.
              Páginas web modernas, Google Maps optimizado y automatización inteligente.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1C1C1E] uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <div className="flex flex-col gap-3">
              <a href="#servicios" className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors">Servicios</a>
              <a href="#portafolio" className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors">Portafolio</a>
              <a href="#nosotros" className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors">Nosotros</a>
              <a href="#contacto" className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors">Contacto</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#1C1C1E] uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@veranomedia.digital" className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors">
                info@veranomedia.digital
              </a>
              <a href="https://wa.me/18091234567" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8E8E93] hover:text-[#34C759] transition-colors">
                WhatsApp
              </a>
              <span className="text-sm text-[#8E8E93]">
                veranomedia.digital
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8E8ED]/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8E8E93]">
            &copy; {new Date().getFullYear()} Verano Media. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#D1D1D6]">
            Hecho con ❤️ para negocios que quieren crecer.
          </p>
        </div>
      </div>
    </footer>
  )
}
