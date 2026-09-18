# TOURS 3D GAUSSIAN SPLATTING — PLAN VM (25 ago 2026)

## Qué es
Recorridos 3D fotorrealistas a partir de video/fotos de celular. Navegables en el navegador, sin app ni VR. Repo original INRIA gratis (23k stars).

## Stack de producción recomendado VM
| Paso | Herramienta | Costo |
|---|---|---|
| Captura | Video caminando lento por el espacio (celular) | $0 |
| Procesamiento | **Luma AI** (cloud, fácil) o **Postshot** ($20-30/mes, requiere PC con NVIDIA RTX 3060+) | $0-30/mes |
| Limpieza/edición | **SuperSplat** (superspl.at, browser, gratis) | $0 |
| Viewer web | Export HTML desde SuperSplat (un solo archivo .html autocontenido) o viewer antimatter15/splat / gsplat.js | $0 |
| Hosting | Vercel (mismo stack que todos nuestros demos) | $0 |

## Costo operativo por tour: ~$0-5 USD
## Precio de venta referencial: $250-500 USD/tour (Matterport cobra $69-309/MES solo hosting)

## Plan piloto Atlántico
1. Pedir a Peter/Atlantico UNA propiedad: video walkthrough 1-2 min por celular
2. Procesar → limpiar → exportar HTML viewer
3. Embeber en la página de la propiedad del demo Atlántico + link por WhatsApp desde Valeria
4. Usarlo como prueba de venta para prospectos inmobiliarios R4

## Verticales de venta
- Inmobiliarias: tours de propiedades ($250-500 c/u, paquetes mensuales)
- Hoteles/restaurantes turismo RD: instalaciones (Punta Cana, Samaná)
- Add-on Sistema Verano: web + IA + tour 3D = paquete premium diferenciado

## Notas técnicas
- Postshot necesita GPU NVIDIA local (no disponible en Termux) → usar Luma cloud para empezar
- SuperSplat exporta un SOLO archivo HTML con viewer incluido → perfecto para Vercel/WhatsApp
- Formatos: .ply, .splat, .ksplat
- Fuentes de referencia: superspl.at, github.com/antimatter15/splat, realhorizons.ai/blog/gaussian-splatting-for-real-estate

## Contenido GT/VM
Post viral listo para hacer: "Esto convierte una casa en un recorrido 3D GRATIS" (tweet Fran Pradas 45K impresiones como referencia del ángulo)
