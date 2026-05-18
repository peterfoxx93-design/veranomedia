import { articles } from './src/blog/articles'

export const config = {
  matcher: '/blog/:path*',
}

export default function middleware(request: Request) {
  const userAgent = request.headers.get('User-Agent') || ''
  const isCrawler = /LinkedIn|facebookexternalhit|Twitterbot|Pinterest|Slack|Discord/i.test(userAgent)

  // Solo interceptamos crawlers de redes sociales
  if (!isCrawler) return

  const url = new URL(request.url)
  const slug = url.pathname.replace('/blog/', '')
  const article = articles.find(a => a.slug === slug && a.published)

  if (!article) return

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${article.title} — Un cuaderno de Verano</title>
  <meta name="description" content="${article.excerpt}" />
  <meta property="og:title" content="${article.title} — Un cuaderno de Verano" />
  <meta property="og:description" content="${article.excerpt}" />
  <meta property="og:url" content="https://veranomedia.digital/blog/${slug}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://veranomedia.digital/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${article.title}" />
  <meta name="twitter:description" content="${article.excerpt}" />
  <script>window.location.href = '/blog/${slug}'</script>
</head>
<body>
  <h1>${article.title}</h1>
  <p>${article.excerpt}</p>
</body>
</html>`

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}
