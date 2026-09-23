import * as Sentry from '@sentry/react'
import type { ReactNode } from 'react'

/**
 * Instrumentación de errores del sitio (proyecto Sentry: gt-neo / veranomedia-web).
 *
 * POR QUÉ: el 2026-09-23 descubrimos que el sitio que ven los clientes NO estaba
 * vigilado — solo el CRM. Un fallo silencioso en el sitio (por ejemplo un
 * formulario que deja de enviar) se traduce en leads perdidos sin que nadie
 * se entere. Esto lo hace imposible.
 *
 * El DSN de Sentry es una clave PÚBLICA por diseño (va en el bundle del
 * navegador en cualquier instalación de Sentry). Se puede sobrescribir con
 * VITE_SENTRY_DSN si algún día cambia el proyecto.
 */
const env = ((import.meta as unknown as { env?: Record<string, string> }).env) || {}
const DSN: string = env.VITE_SENTRY_DSN || 'https://ca9ed086c9978f7e471882aa9c613376@o4512103141867520.ingest.us.sentry.io/4512103302037504'

export function initSentry() {
  if (!DSN || !DSN.startsWith('https://')) return
  Sentry.init({
    dsn: DSN,
    environment: env.MODE || 'production',
    // 10% de trazas: suficiente para ver dónde se atasca, sin gastar cuota
    tracesSampleRate: 0.1,
    // Ruido que no aporta nada y llenaría el panel de basura
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      'NetworkError when attempting to fetch resource',
      "Can't find variable: ZiteReader",
      'top.GLOBALS',
    ],
  })
}

/** Mensaje de respaldo si algo se rompe al pintar: mejor esto que una página en blanco. */
function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold tracking-widest text-[#5170FF] uppercase mb-3">
          Verano Media
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1C1E]">
          Algo se atascó al cargar esta página
        </h1>
        <p className="mt-3 text-sm text-[#4A4A4F] leading-relaxed">
          Ya nos llegó el aviso y lo estamos revisando. Mientras tanto puedes
          recargar o escribirnos directamente.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-[#5170FF] text-white text-sm font-medium px-5 py-2.5"
          >
            Recargar
          </button>
          <a
            href="https://wa.me/18093586497"
            className="rounded-full border border-[#E8E8ED] text-[#1C1C1E] text-sm font-medium px-5 py-2.5"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary fallback={<Fallback />} showDialog={false}>
      {children}
    </Sentry.ErrorBoundary>
  )
}
