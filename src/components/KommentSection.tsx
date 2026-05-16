import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// ═══════════════════════════════════════════════════════════════
// Configuración
// ═══════════════════════════════════════════════════════════════

/** URL del Web App de Google Apps Script (rellenar tras deploy) */
const APPS_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbwZXYwk2vmJANBA-P-Ym2kQkAe_DBTTSEY_ICLRLUPku01Q_LyoHtGWeVDo54bcJ1CD/exec'
const APPS_SCRIPT_URL_GET = APPS_SCRIPT_URL + '?v=' + Date.now()

// ═══════════════════════════════════════════════════════════════
// Tipos
// ═══════════════════════════════════════════════════════════════

interface Comment {
  timestamp: string
  name: string
  comment: string
}

interface FormData {
  name: string
  email: string
  comment: string
}

interface FormErrors {
  name?: string
  email?: string
  comment?: string
}

// ═══════════════════════════════════════════════════════════════
// Componente
// ═══════════════════════════════════════════════════════════════

export default function KommentSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<FormData>({ name: '', email: '', comment: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Cargar comentarios aprobados
  useEffect(() => {
    if ((APPS_SCRIPT_URL as string) === 'URL_DEL_SCRIPT_AQUI') {
      setLoading(false)
      return
    }
    fetch(`${APPS_SCRIPT_URL_GET}&article=${encodeURIComponent(articleSlug)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setComments(data.data || [])
      })
      .catch(() => {/* silencioso — los comentarios son bonus */})
      .finally(() => setLoading(false))
  }, [articleSlug])

  // Validar formulario
  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = '¿Cómo te llamas?'
    if (!form.email.trim()) {
      newErrors.email = 'Tu correo para recibir novedades'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Parece que falta un @ o un punto'
    }
    if (!form.comment.trim()) newErrors.comment = 'Cuéntanos qué opinas'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Enviar comentario
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Necesario para Google Apps Script cross-origin
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          name: form.name.trim(),
          email: form.email.trim(),
          comment: form.comment.trim(),
          article: articleSlug,
        }),
      })
      // Con no-cors no podemos leer la respuesta, asumimos éxito
      setSubmitted(true)
      setForm({ name: '', email: '', comment: '' })
    } catch {
      setSubmitError('Algo salió mal. ¿Puedes intentar de nuevo?')
    } finally {
      setSubmitting(false)
    }
  }

  // Formatear fecha relativa
  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'hoy'
    if (days === 1) return 'ayer'
    if (days < 7) return `hace ${days} días`
    if (days < 30) return `hace ${Math.floor(days / 7)} semanas`
    return `hace ${Math.floor(days / 30)} meses`
  }

  const inputClass =
    'w-full px-4 py-3.5 bg-[#F5F5F7] border border-[#E8E8ED]/60 ' +
    'rounded-vm-md text-sm text-[#1C1C1E] placeholder:text-[#8E8E93] ' +
    'focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] ' +
    'transition-all duration-200'

  const labelClass = 'block text-xs font-medium text-[#636366] uppercase tracking-[0.12em] mb-1.5'

  const isDemo = (APPS_SCRIPT_URL as string) === 'URL_DEL_SCRIPT_AQUI'

  return (
    <section className="bg-white border-t border-[#E8E8ED]/30">
      <div className="container-vm max-w-[700px] mx-auto py-12 md:py-16">

        {/* ── Encabezado ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">💬</span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1C1C1E] leading-tight">
              ¿Qué opinas?
            </h2>
          </div>
          <p className="text-sm text-[#636366] leading-relaxed max-w-[500px]">
            Tu opinión nos importa. Comparte tu experiencia, pregunta o sugerencia sobre este artículo.
            <span className="text-[#8E8E93]"> {comments.length > 0 && `(${comments.length} comentario${comments.length !== 1 ? 's' : ''})`}</span>
          </p>
        </motion.div>

        {/* ── Formulario ── */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#F5F5F7] rounded-vm-xl p-8 text-center mb-12 border border-[#E8E8ED]/50"
          >
            <span className="text-3xl block mb-3">✅</span>
            <p className="font-serif text-xl text-[#1C1C1E] mb-2">
              ¡Gracias por comentar!
            </p>
            <p className="text-sm text-[#636366] leading-relaxed">
              Tu comentario está pendiente de aprobación. Si es la primera vez que comentas, tu nombre aparecerá junto a tu opinión una vez la revisemos.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-5 text-sm font-medium text-[#0066CC] hover:text-[#0052CC] transition-colors"
            >
              Escribir otro comentario →
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-12 space-y-5">
            {/* Fila: nombre + email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Nombre completo <span className="text-[#FF453A]">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(e => ({ ...e, name: undefined })) }}
                  placeholder="Ej: Ana Martínez"
                  className={`${inputClass} ${errors.name ? 'ring-2 ring-[#FF453A]/20 border-[#FF453A]' : ''}`}
                />
                {errors.name && <p className="text-xs text-[#FF453A] mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className={labelClass}>
                  Correo electrónico <span className="text-[#FF453A]">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(e => ({ ...e, email: undefined })) }}
                  placeholder="tu@correo.com"
                  className={`${inputClass} ${errors.email ? 'ring-2 ring-[#FF453A]/20 border-[#FF453A]' : ''}`}
                />
                {errors.email && <p className="text-xs text-[#FF453A] mt-1.5">{errors.email}</p>}
              </div>
            </div>

            {/* Comentario */}
            <div>
              <label className={labelClass}>
                Tu comentario <span className="text-[#FF453A]">*</span>
              </label>
              <textarea
                rows={4}
                value={form.comment}
                onChange={e => { setForm(f => ({ ...f, comment: e.target.value })); setErrors(e => ({ ...e, comment: undefined })) }}
                placeholder="Comparte tu experiencia, una pregunta, o algo que te haya hecho pensar..."
                className={`${inputClass} resize-none ${errors.comment ? 'ring-2 ring-[#FF453A]/20 border-[#FF453A]' : ''}`}
              />
              {errors.comment && <p className="text-xs text-[#FF453A] mt-1.5">{errors.comment}</p>}
            </div>

            {/* Botón */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#8E8E93] leading-relaxed max-w-[300px]">
                Al comentar, aceptas que tu nombre y comentario sean públicos.
                Tu correo nunca será compartido.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066CC] text-white text-sm font-medium rounded-vm-md hover:bg-[#0052CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>Enviando…</>
                ) : (
                  <>Publicar comentario →</>
                )}
              </button>
            </div>

            {submitError && (
              <p className="text-sm text-[#FF453A]">{submitError}</p>
            )}

            {isDemo && (
              <p className="text-xs text-[#8E8E93] italic bg-[#F5F5F7] rounded-vm-md p-4 mt-2">
                ⚡ Modo demo: configura la URL del Apps Script en KommentSection.tsx para activar comentarios reales.
              </p>
            )}
          </form>
        )}

        {/* ── Lista de comentarios ── */}
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#8E8E93] mt-3">Cargando comentarios…</p>
          </div>
        ) : comments.length > 0 ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex-1 h-px bg-[#E8E8ED]/50" />
              <span className="text-xs text-[#8E8E93] uppercase tracking-[0.15em] font-medium">
                {comments.length} comentario{comments.length !== 1 ? 's' : ''}
              </span>
              <span className="flex-1 h-px bg-[#E8E8ED]/50" />
            </div>

            <div className="space-y-6">
              <AnimatePresence>
                {comments.map((c, i) => (
                  <motion.div
                    key={`${c.timestamp}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="pb-6 border-b border-[#E8E8ED]/30 last:border-0"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-full bg-[#0066CC]/10 flex items-center justify-center text-xs font-semibold text-[#0066CC]">
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-[#1C1C1E]">{c.name}</p>
                        <p className="text-xs text-[#8E8E93]">{timeAgo(c.timestamp)}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#636366] leading-relaxed pl-10.5 ml-0">
                      {c.comment}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          !isDemo && (
            <div className="text-center py-8">
              <p className="text-sm text-[#8E8E93]">
                Sé el primero en comentar este artículo.
              </p>
            </div>
          )
        )}

      </div>
    </section>
  )
}
