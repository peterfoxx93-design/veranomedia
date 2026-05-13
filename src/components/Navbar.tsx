import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const serviceCategories = [
  { label: 'Diseño Web', href: '/servicios/web', desc: 'Landing, sitios, tiendas' },
  { label: 'Redes Sociales', href: '/servicios/redes', desc: 'Community management' },
  { label: 'SEO y Anuncios', href: '/servicios/anuncios-seo', desc: 'Google Ads, SEO' },
  { label: 'Automatización', href: '/servicios/automatizacion', desc: 'Chatbots, email' },
  { label: 'Contenido', href: '/servicios/contenido', desc: 'Video, marketing' },
  { label: 'Paquete Completo', href: '/paquete-completo', desc: 'Todo en uno' },
]

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '#', hasDropdown: true },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Nosotros', href: '/nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-vm flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1C1C1E] tracking-tight">
            Verano<span className="text-[#0066CC]">Media</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm text-[#636366] hover:text-[#0066CC] transition-colors duration-200 font-medium">
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-vm-lg shadow-vm-lg border border-[#E8E8ED]/50 overflow-hidden"
                  >
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        to={cat.href}
                        className={`block px-5 py-3 text-sm transition-colors duration-150 ${
                          isActive(cat.href)
                            ? 'bg-[#0066CC]/5 text-[#0066CC] font-semibold'
                            : 'text-[#636366] hover:bg-[#F5F5F7] hover:text-[#1C1C1E]'
                        }`}
                      >
                        <div className="font-medium">{cat.label}</div>
                        <div className="text-xs text-[#8E8E93] mt-0.5">{cat.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors duration-200 font-medium ${
                  isActive(item.href)
                    ? 'text-[#0066CC]'
                    : 'text-[#636366] hover:text-[#0066CC]'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            to="/contacto"
            className="bg-[#0066CC] text-white px-5 py-2.5 rounded-vm-md text-sm font-semibold hover:bg-[#0066CC]/90 transition-all duration-200 hover:shadow-vm-md hover:-translate-y-0.5"
          >
            Diagnóstico Gratuito
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1C1C1E] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1C1C1E] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1C1C1E] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-[#E8E8ED]/50 backdrop-blur-xl max-h-[80vh] overflow-y-auto"
        >
          <div className="container-vm py-6 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2.5 transition-colors ${
                location.pathname === '/' ? 'text-[#0066CC]' : 'text-[#636366]'
              }`}
            >
              Inicio
            </Link>

            {/* Mobile services submenu */}
            <div className="text-base font-medium text-[#636366] py-2.5">Servicios</div>
            <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-[#E8E8ED]">
              {serviceCategories.map((cat) => (
                <Link
                  key={cat.href}
                  to={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 transition-colors ${
                    isActive(cat.href) ? 'text-[#0066CC] font-medium' : 'text-[#8E8E93]'
                  }`}
                >
                  {cat.label}
                  <span className="text-xs text-[#AEAEB2] ml-2">{cat.desc}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/portafolio"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2.5 transition-colors ${
                isActive('/portafolio') ? 'text-[#0066CC]' : 'text-[#636366]'
              }`}
            >
              Portafolio
            </Link>
            <Link
              to="/nosotros"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2.5 transition-colors ${
                isActive('/nosotros') ? 'text-[#0066CC]' : 'text-[#636366]'
              }`}
            >
              Nosotros
            </Link>

            <div className="mt-4 pt-4 border-t border-[#E8E8ED]">
              <Link
                to="/contacto"
                onClick={() => setMobileOpen(false)}
                className="block bg-[#0066CC] text-white px-5 py-3 rounded-vm-md text-base font-semibold text-center"
              >
                Diagnóstico Gratuito
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
