const platforms = [
  { id: 'x', label: 'X', color: 'hover:bg-[#000] hover:text-white border-[#D1D1D6] hover:border-[#000]',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
    shareUrl: (u: string, t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { id: 'bluesky', label: 'BlueSky', color: 'hover:bg-[#0085FF] hover:text-white border-[#D1D1D6] hover:border-[#0085FF]',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.184 1 2.41 1 4.617c0 1.132.663 4.644 1.058 5.438 1.358 2.73 6.307 3.45 10.6 2.913.388-.049.533-.07.342-.07-.19 0-.326.021-.514.07-4.293.537-9.242-.183-10.6-2.913C1.663 9.261 1 5.749 1 4.617c0-2.207 1.566-3.433 4.202-1.812C7.954 4.747 10.913 8.686 12 10.8z" /><path d="M12 10.8c1.087-2.114 4.046-6.053 6.798-7.995C21.434 1.184 23 2.41 23 4.617c0 1.132-.663 4.644-1.058 5.438-1.358 2.73-6.307 3.45-10.6 2.913-.388-.049-.533-.07-.342-.07.19 0 .326.021.514.07 4.293.537 9.242-.183 10.6-2.913.395-.794 1.058-4.306 1.058-5.438 0-2.207-1.566-3.433-4.202-1.812C16.046 4.747 13.087 8.686 12 10.8z" /></svg>,
    shareUrl: (u: string, t: string) => `https://bsky.app/intent/compose?text=${encodeURIComponent(t + ' ' + u)}` },
  { id: 'facebook', label: 'Facebook', color: 'hover:bg-[#1877F2] hover:text-white border-[#D1D1D6] hover:border-[#1877F2]',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    shareUrl: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: 'threads', label: 'Threads', color: 'hover:bg-[#000] hover:text-white border-[#D1D1D6] hover:border-[#000]',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12.23 1.14c-1.6-.09-3.27.18-4.69.83a9.04 9.04 0 00-3.4 2.66c-1.44 1.8-2.17 4.15-2.14 6.52.02 1.86.54 3.72 1.53 5.28.78 1.23 1.86 2.3 3.15 3.01 1.56.86 3.36 1.25 5.18 1.15 1.37-.08 2.72-.46 3.93-1.12.7-.39 1.36-.86 1.98-1.38.06-.05.12-.02.13.05.26 1.44.97 2.76 2.03 3.74.96.89 2.2 1.46 3.53 1.6 1.52.16 3.06-.14 4.4-.88.55-.3 1.07-.67 1.53-1.1.22-.21.17-.57-.07-.73-.22-.15-.53-.12-.75.03a4.71 4.71 0 01-2.37.86c-1.3.13-2.6-.23-3.59-1.03-1.23-1-1.93-2.47-2.1-3.97-.08-.74-.05-1.49.08-2.22.32-1.76 1.2-3.28 2.6-4.29 1.2-.86 2.7-1.25 4.2-1.07 1.45.18 2.76.9 3.64 2.07.88 1.17 1.25 2.68.97 4.08-.18.91-.63 1.76-1.28 2.43-.18.19-.08.5.17.57.42.12.85-.1 1.14-.39.82-.82 1.36-1.88 1.52-3.04.2-1.47-.14-2.97-1-4.17-.98-1.37-2.54-2.27-4.26-2.43-1.74-.17-3.49.33-4.84 1.4-1.28 1.01-2.17 2.43-2.58 3.96-.12.42-.19.86-.21 1.3-.06 1.27.17 2.53.66 3.68.14.33-.07.7-.42.7-.15 0-.3-.06-.4-.17-1.42-1.47-2.4-3.35-2.78-5.35-.48-2.5.12-5.07 1.71-7.06 1.34-1.68 3.3-2.8 5.48-3.14 2.07-.32 4.19.04 6 1.03 1.56.85 2.84 2.15 3.64 3.75.59 1.16.9 2.47.87 3.78h2.2c.04-1.6-.38-3.2-1.23-4.6-.96-1.58-2.5-2.82-4.28-3.48-2-.74-4.2-.97-6.3-.64-2.28.35-4.38 1.48-5.88 3.26-1.66 1.97-2.5 4.5-2.35 7.04.12 1.99.89 3.93 2.24 5.4 1.16 1.27 2.7 2.18 4.42 2.58 1.65.38 3.38.28 4.97-.25 1.64-.55 3.06-1.57 4.06-2.93.7-.95 1.1-2.08 1.18-3.26.08-1.2-.16-2.39-.68-3.44-.43-.86-1.09-1.59-1.9-2.1-.76-.48-1.66-.72-2.57-.66-.96.06-1.87.44-2.58 1.08-.72.64-1.2 1.49-1.37 2.44-.1.58-.06 1.17.11 1.72.22.7.65 1.33 1.22 1.78.44.34 1 .54 1.58.55a2.2 2.2 0 001.86-1.04c.3-.5.39-1.1.22-1.64-.17-.55-.59-.98-1.12-1.16-.35-.12-.74-.1-1.07.07-.26.14-.4.4-.34.68.04.22.2.4.4.49.2.08.43.04.6-.12.08-.07.18-.1.28-.08.14.03.25.16.22.3-.04.18-.13.34-.26.46-.27.24-.66.34-1.03.26-.43-.1-.77-.41-.92-.82-.16-.45-.07-.96.22-1.31.46-.55 1.19-.83 1.93-.72.77.12 1.43.63 1.7 1.33.3.77.25 1.65-.13 2.37-.36.68-1 1.14-1.75 1.26a2.94 2.94 0 01-2.24-.65c-.66-.55-1.07-1.35-1.12-2.22-.04-.73.12-1.45.47-2.08.53-.98 1.42-1.7 2.46-2.01 1.1-.32 2.3-.19 3.41.37 1.04.53 1.87 1.38 2.37 2.4.4.82.56 1.72.46 2.6-.1.88-.42 1.7-.93 2.37-.97 1.27-2.44 2.1-4.08 2.3-1.87.23-3.78-.24-5.29-1.3-1.55-1.09-2.62-2.7-3.02-4.52-.37-1.68-.08-3.45.81-4.89.66-1.07 1.63-1.88 2.78-2.38" /></svg>,
    shareUrl: (u: string, t: string) => `https://www.threads.net/intent/post?text=${encodeURIComponent(t + ' ' + u)}` },
]

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const version = 'v5'
  const url = `${window.location.origin}/blog/${slug}`
  const fullTitle = `${title} — Un cuaderno de Verano`

  const handleShare = (platform: typeof platforms[0]) => {
    window.open(platform.shareUrl(url, fullTitle), '_blank', 'noopener,noreferrer')
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: fullTitle, text: fullTitle, url })
    }
  }

  return (
    <div className="my-10 pt-6 border-t border-[#E8E8ED]/40">
      <p className="text-sm text-[#636366] leading-relaxed text-center mb-5">
        ¿Te gustó este artículo? <strong className="text-[#1C1C1E]">Compártelo con tu comunidad</strong> 👇
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#1C1C1E]">Compartir este artículo</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {platforms.filter(p => p.id !== 'linkedin' && p.id !== 'instagram').map((p) => (
            <button key={p.id} onClick={() => handleShare(p)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border transition-all duration-200 bg-white text-[#636366] ${p.color}`}
              title={`Compartir en ${p.label}`}
              data-v={version}>
              {p.icon}
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
          <button onClick={handleNativeShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full border border-[#D1D1D6] bg-white text-[#636366] hover:bg-[#F5F5F7] hover:text-[#1C1C1E] transition-all duration-200 sm:hidden"
            title="Compartir">
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

