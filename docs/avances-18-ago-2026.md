## 18-ago-2026 20:42 AST

### Carrusel dental (5 láminas) ✅
- Formato 1080×1350, fondo oscuro premium VM
- Fix renderizado texto: layout calculado + bounding-box check programático
- Archivo: `~/veranomedia/redes/carrusel-dental-3-senales/`
- Aprobado por Peter para publicar

### Carrusel datos mercado RD (5 láminas) ✅
- Lámina 1: "EL DATO QUE TU COMPETENCIA IGNORA"
- Lámina 2: "36,1% baja automatización"
- Lámina 3: "27,8% listas para IA"
- Lámina 4: "49% sin resultados · 68% sin talento IA"
- Lámina 5: CTA "DIAGNÓSTICO GRATUITO · SISTEMA"
- Archivo: `~/veranomedia/redes/carrusel-datos-pymes/`
- Fuentes: Alegra Pulso Pymes 2026 + Diario Libre

### Estrategia orgánica VM ($0) ✅
- Documento: `~/veranomedia/docs/estrategia-ads-organico.md`
- Meta paga ARCHIVADA hasta que llegue presupuesto
- Calendario: Lun=Dental, Mar=Rotativo, Mié=Inmobiliaria, Jue=Legal, Vie=Dental, Sáb=Análisis
- CTA: DM "SISTEMA" → diagnóstico gratuito

### Skill vm-ugc-creatives ✅
- Creada con 10 fórmulas (Seedance UGC + 37 templates Meta)
- Estado: FLUX 3 → Agnes (video gratis)
- Bug audio pipeline Agnes → workaround edge_tts + ffmpeg

### Agnes Video Generator ✅
- Servidor :8765 corriendo (background)
- Pipeline probado: t2v 5s + creative 15s 3 escenas
- Receta instalación: TMPDIR=$PREFIX/tmp + ninja + numpy==1.26.4

### Video UGC v4 ✅
- final_v4_final.mp4 (15s, 704×1280, audio sincronizado)
- Cara intacta, aligner en palma, piel limpia

### SEO veranomedia.digital ✅
- LCP móvil fix (orbs blur ocultos + H1 estático) commit 0ccd4a6
- Sección Evidence con datos reales commit 1e3f7dd

### Notas técnicas
- cwd roto → workdir explícito en terminal
- Firecrawl sin créditos → RSS Google News fallback
- ModLens 503 → reintentar con sleep 12s
- Agnes rate limit normal, reintenta solo
- DeepAI obligatorio para imágenes
- Voz VM: es-MX-DaliaNeural
