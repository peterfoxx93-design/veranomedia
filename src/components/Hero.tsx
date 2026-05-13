import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const VIDEO_DURATION = 8 // seconds (new video)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canScrub, setCanScrub] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest)
    if (!canScrub) return
    const v = videoRef.current
    if (v && !isNaN(v.duration)) {
      v.currentTime = latest * VIDEO_DURATION
    }
  })

  // The video shows frames progressively; the text fades in/stays based on scroll
  const textOpacity = Math.min(scrollProgress * 8, 1) // fast fade in at start
  const ctaOpacity = Math.max(0, Math.min((scrollProgress - 0.3) * 3, 1)) // CTAs appear at ~30% scroll

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video — no autoPlay, scrubbed by scroll */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-frame.jpg"
          onLoadedMetadata={() => {
            const v = videoRef.current
            if (v) {
              v.currentTime = 0
              setCanScrub(true)
            }
          }}
        >
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-[#34C759] rounded-full animate-pulse" />
            <span className="text-sm text-white/80 font-medium tracking-wide">
              Agencia de marketing digital
            </span>
          </motion.div>

          {/* Logo text — fades in with scroll */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
            style={{ opacity: textOpacity }}
          >
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[7rem] font-extrabold tracking-tight leading-[1.05]">
              <span className="text-white">Verano</span>
              <span className="text-[#0066CC]">Media</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/70 text-sm md:text-base tracking-[0.2em] uppercase mb-10"
            style={{ opacity: textOpacity }}
          >
            Tu marca en su mejor temporada
          </motion.p>

          {/* CTAs — appear at ~30% scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: ctaOpacity }}
          >
            <a
              href="https://wa.me/18296848477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052CC] text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-[#0066CC]/25 hover:shadow-[#0066CC]/40 hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.48 0 0 4.48 0 10c0 1.85.5 3.58 1.38 5.07L.02 20l5.15-1.36C6.6 19.5 8.25 20 10 20c5.52 0 10-4.48 10-10S15.52 0 10 0zm0 18c-1.45 0-2.8-.4-3.97-1.08l-.3-.18-3.06.8.82-2.98-.2-.32A7.97 7.97 0 012 10c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8zm5.1-5.5c-.28.28-1.16.56-1.65.56-.33 0-.38-.07-.74-.23-.5-.22-1.5-.6-2.87-1.77-1.1-.94-1.82-2.04-2.03-2.4-.2-.36-.1-.56.02-.68.1-.1.22-.27.33-.4.1-.13.14-.24.2-.4s.02-.3-.02-.42c-.04-.12-.36-1.06-.5-1.46-.14-.4-.28-.4-.42-.4H5.5c-.2 0-.44.12-.58.28-.14.16-.68.76-.68 1.84 0 1.08.76 2.12.86 2.28.1.16 1.5 2.4 3.68 3.6 2.18 1.2 2.18.8 2.56.76.4-.04 1.28-.56 1.46-1.1.18-.54.18-1 .12-1.1-.06-.1-.2-.16-.34-.22-.14-.06-.26-.1-.36-.18-.1-.08-.1-.18-.06-.32.04-.14.62-1.42.7-1.54.08-.12.16-.12.26-.1.1.02.32.06.44.08.12.02.3 0 .42-.06.14-.06.68-.34 1.2-.7.24-.17.48-.35.68-.5.16-.12.32-.1.44.04.14.14.56.74.68.84.12.1.2.18.28.22.08.04.14.1.16.18.02.08.02.42-.18.7z" />
              </svg>
              Diagnóstico Gratuito
            </a>
            <Link
              to="/servicios/web"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 font-medium px-8 py-3.5 rounded-full transition-all duration-300"
            >
              Ver Servicios
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: textOpacity > 0.5 ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-xs tracking-wide">DESCUBRE MÁS</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center"
            >
              <motion.div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
