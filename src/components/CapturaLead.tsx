import { useState } from 'react'

/**
 * CapturaLead — formulario de captura del sitio de VM (puesto MAGNET).
 *
 * POR QUÉ EXISTE
 * --------------
 * Antes de este componente, el botón "Solicitar diagnóstico gratuito" de
 * /diagnostico mandaba a /contacto, que no tenía ningún formulario. El embudo
 * terminaba en una página vacía: el visitante interesado no tenía cómo dejar
 * sus datos. El sitio informaba pero no convertía, y todo el tráfico pagado o
 * ganado con contenido se perdía sin dejar rastro.
 *
 * Este formulario envía a `/api/captura` (CRM), que:
 *   - puntúa el lead automáticamente (calculateLeadScore)
 *   - le asigna estado (autoStatus)
 *   - le calcula fecha de seguimiento (followupDate)
 *   - crea una tarea de nutrición para el equipo de agentes
 *
 * CONFIGURACIÓN
 * -------------
 * `apiUrl` por defecto apunta al CRM en producción. Se puede sobrescribir con
 * la variable de entorno VITE_CRM_API_URL para apuntar a otro ambiente.
 */

const CRM =
  (import.meta.env.VITE_CRM_API_URL as string | undefined) ||
  'https://crm.veranomedia.click'

type Props = {
  /** de dónde viene el envío: 'diagnostico' | 'contacto' | 'blog' | 'footer' */
  form?: string
  /** texto del botón */
  cta?: string
  /** compacto = versión para incrustar dentro de un artículo */
  compacto?: boolean
  /** título opcional */
  titulo?: string
}

export default function CapturaLead({
  form = 'web',
  cta = 'Solicitar mi diagnóstico gratuito',
  compacto = false,
  titulo,
}: Props) {
  const [estado, setEstado] = useState<'idle' | 'enviando' | 'ok' | 'error'>('idle')
  const [mensaje, setMensaje] = useState('')

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setEstado('enviando')
    setMensaje('')

    const payload = {
      name: (fd.get('name') as string) || '',
      business: (fd.get('business') as string) || '',
      phone: (fd.get('phone') as string) || '',
      email: (fd.get('email') as string) || '',
      ciudad: (fd.get('ciudad') as string) || '',
      notes: (fd.get('notes') as string) || '',
      website: (fd.get('website') as string) || '',
      form,
      // honeypot: invisible para humanos, los bots lo rellenan
      website2: (fd.get('website2') as string) || '',
    }

    try {
      const r = await fetch(`${CRM}/api/captura`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await r.json().catch(() => ({}))

      if (!r.ok) {
        setEstado('error')
        setMensaje(j?.error || 'No pudimos enviar el formulario. Intenta de nuevo.')
        return
      }

      setEstado('ok')
      setMensaje(
        '✅ Recibido. Revisamos tu negocio y te escribimos en menos de 24 horas.'
      )
      e.currentTarget.reset()
    } catch {
      setEstado('error')
      setMensaje('Hubo un problema de conexión. Intenta otra vez o escríbenos por WhatsApp.')
    }
  }

  if (estado === 'ok') {
    return (
      <div
        className={
          compacto
            ? 'border border-[#34C759]/30 bg-[#34C759]/5 rounded-vm-md p-6 text-center'
            : 'border border-[#34C759]/30 bg-[#34C759]/5 rounded-vm-lg p-10 text-center max-w-xl mx-auto'
        }
      >
        <p className="text-[#34C759] font-semibold text-lg">{mensaje}</p>
        <p className="text-black/60 text-sm mt-3">
          Si quieres adelantar, escríbenos por WhatsApp y te atendemos ahora.
        </p>
        <a
          href="https://wa.me/18093586497"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-[#5170FF] font-semibold hover:underline"
        >
          Abrir WhatsApp →
        </a>
      </div>
    )
  }

  const inputCls =
    'w-full bg-white border border-black/15 rounded-vm-md px-4 py-3 text-black placeholder:text-black/35 focus:outline-none focus:border-[#5170FF] focus:ring-2 focus:ring-[#5170FF]/20 transition'

  return (
    <form
      onSubmit={enviar}
      className={
        compacto
          ? 'bg-[#F5F5F7] border border-black/10 rounded-vm-md p-6'
          : 'bg-white border border-black/10 rounded-vm-lg p-8 md:p-10 max-w-xl mx-auto shadow-xl'
      }
    >
      {titulo && (
        <h3 className={`font-bold ${compacto ? 'text-lg' : 'text-2xl'} mb-1`}>
          {titulo}
        </h3>
      )}
      <p className="text-black/60 text-sm mb-6">
        Sin costo y sin compromiso. Revisamos tu presencia digital y te decimos qué
        mejorar primero.
      </p>

      <div className="space-y-4">
        <input name="name" required placeholder="Tu nombre *" className={inputCls} />
        <input name="business" placeholder="Nombre del negocio" className={inputCls} />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className={inputCls}
        />
        <input
          name="phone"
          type="tel"
          placeholder="WhatsApp (ej: 809-000-0000)"
          className={inputCls}
        />
        {!compacto && (
          <>
            <input name="ciudad" placeholder="Ciudad" className={inputCls} />
            <input
              name="website"
              placeholder="Sitio web o Instagram (si tienes)"
              className={inputCls}
            />
          </>
        )}
        <textarea
          name="notes"
          rows={compacto ? 2 : 3}
          placeholder="¿Qué es lo que más te cuesta hoy? (opcional)"
          className={inputCls}
        />
        {/* honeypot — no visible para humanos */}
        <input
          name="website2"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="mt-6 w-full bg-[#5170FF] text-white px-6 py-4 rounded-full font-semibold hover:bg-[#5170FF]/90 transition-all duration-300 shadow-lg shadow-[#5170FF]/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {estado === 'enviando' ? 'Enviando…' : cta}
      </button>

      {estado === 'error' && (
        <p className="mt-4 text-sm text-red-600 font-medium">{mensaje}</p>
      )}

      <p className="mt-4 text-[11px] text-black/45 leading-relaxed">
        Tus datos se usan solo para contactarte sobre este diagnóstico. No los
        vendemos ni los compartimos con terceros.
      </p>
    </form>
  )
}
