import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useMemo } from 'react'

const WORD = 'VERANO MEDIA'
const LETTERS = WORD.split('')
const N = LETTERS.length

type Chaos = { x: number; y: number; rotate: number; delay: number }

function generateChaos(): Chaos[] {
  const positions: Chaos[] = []
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2
    const radius = 80 + Math.random() * 200
    positions.push({
      x: Math.cos(angle) * radius + (Math.random() - 0.5) * 120,
      y: Math.sin(angle) * radius * 0.55 + 80 + Math.random() * 60,
      rotate: (Math.random() - 0.5) * 120,
      delay: Math.random() * 0.12,
    })
  }
  return positions
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const chaos = useMemo(() => generateChaos(), [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Letter transforms (fixed hook order — one loop, one per letter) ──
  const tx: MotionValue<number>[] = []
  const ty: MotionValue<number>[] = []
  const tr: MotionValue<number>[] = []
  const to: MotionValue<number>[] = []

  for (let i = 0; i < N; i++) {
    const c = chaos[i]
    const s = c.delay
    const e = 0.55 + c.delay * 0.25
    tx.push(useTransform(scrollYProgress, [s, e], [c.x, 0]))
    ty.push(useTransform(scrollYProgress, [s, e], [c.y, 0]))
    tr.push(useTransform(scrollYProgress, [s, e], [c.rotate, 0]))
    to.push(useTransform(scrollYProgress, [0, s + 0.03, e], [0, 0.5, 1]))
  }

  // ── Tagline ──
  const taglineOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const taglineY = useTransform(scrollYProgress, [0.4, 0.55], [30, 0])

  // ── Hero content (CTAs + stats) ──
  const contentOpacity = useTransform(scrollYProgress, [0.6, 0.78], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.6, 0.78], [40, 0])

  // ── BG glow ──
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.4, 0.7, 0.5, 0.2])

  // ── Scroll indicator ──
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [1, 0.6, 0])

  return (
    <section ref={sectionRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#080808] via-[#0c0c0c] to-[#080808] overflow-hidden">
        {/* Ambient glow */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOpacity }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-radial from-[#007AFF]/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-gradient-radial from-[#34C759]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/4 left-1/5 w-[400px] h-[400px] bg-gradient-radial from-[#5e6ad2]/5 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* ─── LETTERS ─────────────────────────── */}
        <div className="relative z-10 flex items-center justify-center flex-wrap px-4 select-none">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              style={{ x: tx[i], y: ty[i], rotate: tr[i], opacity: to[i] }}
              className="inline-block text-[clamp(3rem,10vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#F5F5F7] via-[#E8E8ED] to-[#AEAEB2] drop-shadow-[0_2px_8px_rgba(0,122,255,0.06)]">
                {letter === ' ' ? '\u00A0\u00A0\u00A0' : letter}
              </span>
            </motion.span>
          ))}
        </div>

        {/* ─── TAGLINE ──────────────────────────── */}
        <motion.div
          style={{ opacity: taglineOpacity, y: taglineY }}
          className="relative z-10 mt-8 md:mt-10 text-center px-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/15 hidden sm:block" />
            <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-[#8E8E93]">
              Verano Media
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/15 hidden sm:block" />
          </div>
          <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#F5F5F7] tracking-wide">
            &ldquo;Tu marca en su{' '}
            <span className="text-[#5E9FFF]">mejor temporada</span>&rdquo;
          </p>
          <p className="text-xs text-[#636366] mt-3 tracking-wider">Verano Media &mdash; Est. 2026</p>
        </motion.div>

        {/* ─── HERO CONTENT ─────────────────────── */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 mt-10 md:mt-14 text-center px-6 w-full max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base text-[#8E8E93] max-w-xl mx-auto mb-8 leading-relaxed">
            Páginas web modernas, Google Maps optimizado y automatización inteligente
            para negocios dominicanos que quieren crecer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contacto"
              className="bg-[#007AFF] text-white px-8 py-3.5 rounded-xl text-sm font-semibold
                         hover:bg-[#007AFF]/90 transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:-translate-y-0.5
                         active:scale-[0.98]"
            >
              Diagnóstico Gratuito
            </a>
            <a
              href="https://wa.me/18296848477"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#F5F5F7] px-8 py-3.5 rounded-xl text-sm font-semibold
                         border border-white/15 hover:border-white/30
                         transition-all duration-300 hover:-translate-y-0.5
                         active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 md:gap-14 mt-12">
            {[
              { number: '83+', label: 'Clínicas analizadas' },
              { number: '100%', label: 'Clientes satisfechos' },
              { number: '24h', label: 'Diagnóstico express' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#F5F5F7]">{stat.number}</div>
                <div className="text-[11px] md:text-xs text-[#636366] mt-1 tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/18296848477"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full
                     shadow-[0_4px_20px_rgba(37,211,102,0.35)]
                     hover:shadow-[0_4px_30px_rgba(37,211,102,0.5)]
                     hover:scale-110 active:scale-95
                     transition-all duration-300"
          aria-label="Chatea con nosotros en WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{ opacity: indicatorOpacity }}
        >
          <span className="text-[10px] text-[#636366] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 border-2 border-white/15 rounded-full flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-white/40 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
