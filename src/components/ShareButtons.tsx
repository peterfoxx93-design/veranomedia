import { useState } from 'react'

const platforms = [
  {
    id: 'x',
    label: 'X',
    color: 'hover:bg-[#000] hover:text-white border-[#D1D1D6] hover:border-[#000]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    shareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: 'bluesky',
    label: 'BlueSky',
    color: 'hover:bg-[#0085FF] hover:text-white border-[#D1D1D6] hover:border-[#0085FF]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.184 1 2.41 1 4.617c0 1.132.663 4.644 1.058 5.438 1.358 2.73 6.307 3.45 10.6 2.913.388-.049.533-.07.342-.07-.19 0-.326.021-.514.07-4.293.537-9.242-.183-10.6-2.913C1.663 9.261 1 5.749 1 4.617c0-2.207 1.566-3.433 4.202-1.812C7.954 4.747 10.913 8.686 12 10.8z" />
        <path d="M12 10.8c1.087-2.114 4.046-6.053 6.798-7.995C21.434 1.184 23 2.41 23 4.617c0 1.132-.663 4.644-1.058 5.438-1.358 2.73-6.307 3.45-10.6 2.913-.388-.049-.533-.07-.342-.07.19 0 .326.021.514.07 4.293.537 9.242-.183 10.6-2.913.395-.794 1.058-4.306 1.058-5.438 0-2.207-1.566-3.433-4.202-1.812C16.046 4.747 13.087 8.686 12 10.8z" />
      </svg>
    ),
    shareUrl: (url: string, title: string) =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(title + ' ' + url)}`,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    color: 'hover:bg-[#1877F2] hover:text-white border-[#D1D1D6] hover:border-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    color: 'hover:bg-[#0A66C2] hover:text-white border-[#D1D1D6] hover:border-[#0A66C2]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    shareUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    color: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white border-[#D1D1D6] hover:border-[#DD2A7B]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    shareUrl: null, // Instagram no tiene share URL web — usamos copy link
  },
  {
    id: 'threads',
    label: 'Threads',
    color: 'hover:bg-[#000] hover:text-white border-[#D1D1D6] hover:border-[#000]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12.23 1.14c-1.6-.09-3.27.18-4.69.83a9.04 9.04 0 00-3.4 2.66c-1.44 1.8-2.17 4.15-2.14 6.52.02 1.86.54 3.72 1.53 5.28.78 1.23 1.86 2.3 3.15 3.01 1.56.86 3.36 1.25 5.18 1.15 1.37-.08 2.72-.46 3.93-1.12.7-.39 1.36-.86 1.98-1.38.06-.05.12-.02.13.05.26 1.44.97 2.76 2.03 3.74.96.89 2.2 1.46 3.53 1.6 1.52.16 3.06-.14 4.4-.88.55-.3 1.07-.67 1.53-1.1.22-.21.17-.57-.07-.73-.22-.15-.53-.12-.75.03a4.71 4.71 0 01-2.37.86c-1.3.13-2.6-.23-3.59-1.03-1.23-1-1.93-2.47-2.1-3.97-.08-.74-.05-1.49.08-2.22.32-1.76 1.2-3.28 2.6-4.29 1.2-.86 2.7-1.25 4.2-1.07 1.45.18 2.76.9 3.64 2.07.88 1.17 1.25 2.68.97 4.08-.18.91-.63 1.76-1.28 2.43-.18.19-.08.5.17.57.42.12.85-.1 1.14-.39.82-.82 1.36-1.88 1.52-3.04.2-1.47-.14-2.97-1-4.17-.98-1.37-2.54-2.27-4.26-2.43-1.74-.17-3.49.33-4.84 1.4-1.28 1.01-2.17 2.43-2.58 3.96-.12.42-.19.86-.21 1.3-.06 1.27.17 2.53.66 3.68.14.33-.07.7-.42.7-.15 0-.3-.06-.4-.17-1.42-1.47-2.4-3.35-2.78-5.35-.48-2.5.12-5.07 1.71-7.06 1.34-1.68 3.3-2.8 5.48-3.14 2.07-.32 4.19.04 6 1.03 1.56.85 2.84 2.15 3.64 3.75.59 1.16.9 2.47.87 3.78h2.2c.04-1.6-.38-3.2-1.23-4.6-.96-1.58-2.5-2.82-4.28-3.48-2-.74-4.2-.97-6.3-.64-2.28.35-4.38 1.48-5.88 3.26-1.66 1.97-2.5 4.5-2.35 7.04.12 1.99.89 3.93 2.24 5.4 1.16 1.27 2.7 2.18 4.42 2.58 1.65.38 3.38.28 4.97-.25 1.64-.55 3.06-1.57 4.06-2.93.7-.95 1.1-2.08 1.18-3.26.08-1.2-.16-2.39-.68-3.44-.43-.86-1.09-1.59-1.9-2.1-.76-.48-1.66-.72-2.57-.66-.96.06-1.87.44-2.58 1.08-.72.64-1.2 1.49-1.37 2.44-.1.58-.06 1.17.11 1.72.22.7.65 1.33 1.22 1.78.44.34 1 .54 1.58.55a2.2 2.2 0 001.86-1.04c.3-.5.39-1.1.22-1.64-.17-.55-.59-.98-1.12-1.16-.35-.12-.74-.1-1.07.07-.26.14-.4.4-.34.68.04.22.2.4.4.49.2.08.43.04.6-.12.08-.07.18-.1.28-.08.14.03.25.16.22.3-.04.18-.13.34-.26.46-.27.24-.66.34-1.03.26-.43-.1-.77-.41-.92-.82-.16-.45-.07-.96.22-1.31.46-.55 1.19-.83 1.93-.72.77.12 1.43.63 1.7 1.33.3.77.25 1.65-.13 2.37-.36.68-1 1.14-1.75 1.26a2.94 2.94 0 01-2.24-.65c-.66-.55-1.07-1.35-1.12-2.22-.04-.73.12-1.45.47-2.08.53-.98 1.42-1.7 2.46-2.01 1.1-.32 2.3-.19 3.28.38.87.5 1.5 1.33 1.79 2.28.26.88.29 1.82.06 2.7-.2.76-.62 1.44-1.2 1.96-.48.41-1.03.72-1.64.9-1.43.43-2.99.33-4.33-.29-1.42-.65-2.58-1.8-3.25-3.23-.72-1.53-.83-3.29-.29-4.87.49-1.42 1.44-2.6 2.67-3.36.68-.42 1.45-.69 2.24-.79 1.06-.13 2.13.04 3.08.52.85.43 1.55 1.13 1.97 1.97.37.74.52 1.59.42 2.4.55.02.55.02 0 0v.01z" />
      </svg>
    ),
    shareUrl: null, // Threads no tiene share URL web
  },
]

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState<string | null>(null)

  const url = `https://veranomedia.digital/blog/${slug}`
  const fullTitle = `${title} — Un cuaderno de Verano`

  const handleShare = (platform: typeof platforms[0]) => {
    if (platform.shareUrl) {
      window.open(platform.shareUrl(url, fullTitle), '_blank', 'noopener,noreferrer')
    } else {
      // Instagram/Threads: copiar link al portapapeles
      navigator.clipboard.writeText(url).then(() => {
        setCopied(platform.id)
        setTimeout(() => setCopied(null), 2000)
      })
    }
  }

  // Web Share API en móvil
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fullTitle,
        text: fullTitle,
        url: url,
      })
    }
  }

  return (
    <div className="my-10 pt-6 border-t border-[#E8E8ED]/40">
      <p className="text-sm text-[#636366] leading-relaxed text-center mb-5">
        ¿Te gustó este artículo? <strong className="text-[#1C1C1E]">Compártelo con tu comunidad</strong> 👇
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#1C1C1E]">
          Compartir este artículo
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => handleShare(p)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition-all duration-200 bg-white text-[#636366] ${p.color}`}
              title={`Compartir en ${p.label}`}
            >
              {p.icon}
              <span className="hidden sm:inline">{copied === p.id ? '¡Link copiado!' : p.label}</span>
            </button>
          ))}

          {/* Native share (mobile) */}
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border border-[#D1D1D6] bg-white text-[#636366] hover:bg-[#F5F5F7] hover:text-[#1C1C1E] transition-all duration-200 sm:hidden"
            title="Compartir"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <span>Más</span>
          </button>
        </div>
      </div>
    </div>
  )
}
