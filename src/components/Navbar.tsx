import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Nosotros', href: '#nosotros' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1C1C1E] tracking-tight">
            Verano<span className="text-[#007AFF]">Media</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#8E8E93] hover:text-[#007AFF] transition-colors duration-200 font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-[#007AFF] text-white px-5 py-2.5 rounded-vm-md text-sm font-semibold hover:bg-[#007AFF]/90 transition-all duration-200 hover:shadow-vm-md hover:-translate-y-0.5"
          >
            Diagnóstico Gratuito
          </a>
        </div>

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

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-[#E8E8ED]/50 backdrop-blur-xl"
        >
          <div className="container-vm py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-base text-[#636366] hover:text-[#007AFF] transition-colors font-medium py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="bg-[#007AFF] text-white px-5 py-3 rounded-vm-md text-base font-semibold text-center"
            >
              Diagnóstico Gratuito
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
