// api/blog-og.ts
//
// Por qué existe: el proyecto es Vite puro y Vercel NO ejecuta middleware.ts
// (ese archivo existía desde mayo-2026 pero nunca corrió en producción). Sin
// esto, al compartir un artículo en LinkedIn/WhatsApp/Facebook el crawler lee
// las OG tags genéricas del index.html —título y descripción de la HOME— y el
// preview no muestra el artículo.
//
// Qué hace: para un crawler devuelve un HTML mínimo con las OG tags del
// artículo. Para un humano devuelve un HTML que carga la SPA normalmente (con
// redirección por si el JS no corre).
//
// El matcher de vercel.json manda /blog/:slug aquí; el resto sigue al index.html.

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Runtime Node (no Edge): este handler lee dist/index.html del disco con
// node:fs, y el runtime Edge no soporta esos módulos — Vercel rechazaba el
// deploy entero con "The Edge Function middleware is referencing unsupported
// modules: node:fs, node:path".
export const config = { runtime: 'nodejs' }

const CRAWLERS = /LinkedInBot|facebookexternalhit|Twitterbot|WhatsApp|Slack|Discord|Pinterest|TelegramBot|bot|crawler|spider|preview/i
const SITE = 'https://veranomedia.click'

interface Article {
  slug: string
  title: string
  excerpt: string
  category?: string
  date?: string
  published?: boolean
}

// Los articulos se leen de api/articles.json, generado desde src/blog/articles.ts
// (el mismo contenido que usa la SPA). NO se puede importar el .ts directamente:
// una Function de Vercel se empaqueta sola y no incluye modulos de src/, asi que
// el import dinamico fallaba y el catch devolvia [] en silencio — el handler
// respondia la SPA generica sin OG tags, sin ningun error visible.
// Si se anade un articulo nuevo hay que regenerar el JSON:
//   python3 -c "..."  (ver scripts/gen-articles-json.py en el repo)
import articlesData from './articles.json'

function getArticles(): Article[] {
  try {
    return (articlesData as Article[]) || []
  } catch {
    return []
  }
}

function escapar(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Firma Web Standard. Vercel NO invoca `export default function handler(...)`:
// la Function API pide `fetch(request)` o named exports (GET/POST). Con la
// firma vieja la funcion existia pero Vercel devolvia 500 en cada /blog/:slug
// (verificado 2026-09-28 en todos los articulos publicados).
export default {
  async fetch(request: Request): Promise<Response> {
    return manejar(request)
  },
}

async function manejar(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug') || ''
  const ua = request.headers.get('user-agent') || ''
  const esCrawler = CRAWLERS.test(ua)

  const articles = getArticles()
  const art = articles.find(a => a.slug === slug && a.published !== false)

  // -------- Crawler: HTML con las OG tags del artículo --------
  if (esCrawler && art) {
    const title = escapar(art.title)
    const desc = escapar(art.excerpt)
    const link = `${SITE}/blog/${art.slug}`
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Un cuaderno de Verano</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${link}" />
  <meta property="og:title" content="${title} — Un cuaderno de Verano" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${link}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${SITE}/og-image.jpg" />
  <meta property="og:site_name" content="Verano Media" />
  <meta property="article:published_time" content="${escapar(art.date || '')}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${SITE}/og-image.jpg" />
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
  <p><a href="${link}">Leer el artículo completo</a></p>
</body>
</html>`
    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=86400',
        'x-og-source': 'article',
      },
    })
  }

  // -------- Humano (o slug desconocido): cargar la SPA --------
  // Se sirve el index.html real del build para no romper el arranque de React.
  let indexHtml = ''
  try {
    indexHtml = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf-8')
  } catch {
    indexHtml = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Verano Media</title></head><body><div id="root"></div><script>window.location.replace('/blog/${escapar(slug)}')</script></body></html>`
  }

  return new Response(indexHtml, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-og-source': 'spa',
    },
  })
}
