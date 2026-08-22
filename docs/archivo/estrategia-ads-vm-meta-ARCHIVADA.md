> ⏸️ ARCHIVADA (18-ago-2026): campaña de pago Meta en pausa hasta que haya presupuesto. Se ejecutará cuando Peter active el fondo. La campaña orgánica (estrategia-ads-organico.md) es la activa.

# 📣 Estrategia de Ads — Verano Media (Primera Campaña)

**Fecha:** 18-ago-2026 · **Skill:** ads-plan (plantilla agency) + ads-copywriter + vm-ugc-creatives
**Producto:** Sistema Verano (web + SEO local + WhatsApp/CRM + IA)
**Oferta:** Diagnóstico Gratuito (lead magnet — 20 min de análisis)
**Objetivo:** Leads por WhatsApp (conversión)

---

## 1. Diagnóstico del negocio

| Elemento | VM |
|---|---|
| Producto | Sistema de captación de clientes (web + Google Business + WhatsApp/CRM + IA) |
| Precio | Paquetes desde RD$6,900/mes (ancla Profesional) |
| Público | Dueños de clínicas, bufetes, inmobiliarias y servicios profesionales en RD |
| Canal actual | WhatsApp directo + Instagram |
| Competencia | Agencias locales de diseño web (sin sistema completo) |
| Gap de mercado | Datos REALES: 36,1% de PyMEs RD sin automatizar + 27,8% se sienten listas para IA (Alegra 2026) → **confianza alta, ejecución baja** |

## 2. Selección de plataforma

**Meta Ads (Facebook + Instagram)** — el ICP (40-55 años, dueños de negocio local) vive ahí y su canal de respuesta es WhatsApp.

| Plataforma | ¿Por qué? | ¿Por qué no? |
|---|---|---|
| **Meta (FB+IG)** ✅ | ICP presente, formato visual, leads directos a WhatsApp | Budget mínimo |
| Google Search | Intención alta pero volumen bajo en Nagua/MTS | Presupuesto |
| TikTok | Audiencia joven, no es el ICP | No ahora |
| LinkedIn | No es el ICP (PyMEs locales) | No |

**Presupuesto inicial: RD$8,000-12,000/mes** (USD ~140-210) — suficiente para testear 2 semanas y aprender.

## 3. Arquitectura de campañas (Meta)

```
VM_META_CONV_Prospeccion_RD_2026Q3   ← Campaña principal (70% presupuesto)
├── Ad Set A: Clínicas dentales y consultorios (intereses: odontología, salud, Nagua/MTS/Santiago)
├── Ad Set B: Bufetes y servicios legales (intereses: derecho, notarías)
└── Ad Set C: Inmobiliarias (intereses: bienes raíces, propiedades)

VM_META_CONV_Retargeting_RD_2026Q3  ← Visitantes del sitio (30%)
└── Audiencia: visitantes últimos 14 días + engagement con ads
```

**Naming:** `VM_META_CONV_Prospeccion_RD_2026Q3`

## 4. Presupuesto (70/20/10 simplificado a 2 campañas)

| Semana | Acción | Presupuesto |
|---|---|---|
| 1-2 | Testeo 3 ad sets + 3 creativos c/u | RD$1,500-2,000/día |
| 3-4 | Optimizar: matar lo que no convierte (3x Kill Rule) | Escalar ganadores +20%/semana |
| 5-8 | Escalar + añadir retargeting | Subir a RD$12,000-15,000/mes |

**KPI objetivo:** CPL (costo por lead WhatsApp) RD$300-600 · CVR landing 5-10% · CPA diagnóstico agendado RD$800-1,500

## 5. Copy de anuncios (3 variantes por set)

### Variante A — Problema/Agitación (gancho estadística real)
```
¿Tu negocio pierde clientes porque nadie contesta el teléfono?

El 36% de las PyMEs dominicanas aún no automatiza sus procesos.
Las que lo hacen, no dejan que una llamada perdida se convierta en un cliente perdido.

En Verano Media te montamos el sistema completo:
✅ Página web que convierte visitantes en citas
✅ WhatsApp que responde solo, 24/7
✅ Google Maps optimizado para que te encuentren

Diagnóstico gratuito — 20 minutos, sin compromiso.
👉 Escríbenos y lo agendamos.
```

### Variante B — Antes/Después (storytelling)
```
Antes: "El teléfono suena y no lo oigo. Las citas se me pierden."

Después: El WhatsApp responde solo. Los pacientes confirman su cita. El sistema me recuerda los no-shows.

Eso es lo que hace Verano Media: convertimos tu negocio en una máquina de clientes.

Diagnóstico gratuito. Escríbenos "QUIERO SABER" 👇
```

### Variante C — Autoridad/Datos (para dueños que dudan)
```
27,8% de las PyMEs dominicanas se sienten listas para la IA.
Solo el mercado que actúe primero va a ganar.

Nosotros ya lo hacemos por clínicas, bufetes e inmobiliarias.

Empieza por un diagnóstico gratuito de tu presencia digital.
👉 WhatsApp: [número]
```

### Headlines (Meta, 40 chars)
- "Tu web puede darte clientes" ✅
- "Diagnóstico digital gratuito"
- "WhatsApp que responde solo"
- "Más clientes, menos trabajo"

### CTA
`Escríbenos por WhatsApp` → directo a wa.me/18093586497

## 6. Creativos (el pipeline que ya tenemos)

| Tipo | Cantidad | Fuente |
|---|---|---|
| **Video UGC 15s** (vertical 9:16) | 3 (uno por vertical) | **Agnes** — pipeline VM (gratis) |
| Imagen estática con datos | 4 | DeepAI (Super Genius) |
| Carrusel "problema → solución" | 2 | DeepAI + texto |

**UGC #1 — Clínica dental** (receta alineadores adaptada):
- Mujer dominicana polo azul, consultorio, piel limpia, habla de perder citas → cómo el sistema las recupera
- Voz: es-MX-DaliaNeural · Subtítulos: español · 15s

**UGC #2 — Bufete:**
- Hombre 40s, oficina de abogados, habla de "consultas que nadie responde" → WhatsApp automático

**UGC #3 — Inmobiliaria:**
- Mujer 30s con carpeta de propiedades, "las oportunidades se pierden en los grupos de Facebook" → catálogo + CRM

## 7. Tracking (pendiente de configurar)

- [ ] **Píxel Meta** en veranomedia.digital (Meta Pixel + CAPI para iOS)
- [ ] **Evento Lead** (click a WhatsApp / submit formulario diagnóstico)
- [ ] **UTM** en todos los enlaces: `utm_source=meta&utm_medium=cpc&utm_campaign=VM_META_CONV_Prospeccion_RD_2026Q3`
- [ ] **Webhook WhatsApp** → CRM (veranomedia-crm) para contar leads reales
- [ ] Dashboard semanal: gasto, leads, CPL, agendados

## 8. Roadmap de lanzamiento

**Semana 1 (fundación):**
1. ✅ Creativos: 3 UGC (Agnes) + 4 estáticos (DeepAI)
2. ✅ Copy aprobado (este documento)
3. ✅ Píxel Meta + eventos (requiere acceso a la cuenta de ads de VM)
4. ✅ Landing de diagnóstico lista (ya existe /diagnostico)

**Semana 2 (lanzamiento):**
1. Crear campaña en Meta Ads Manager
2. Lanzar con presupuesto conservador (RD$1,500/día)
3. Monitoreo diario 7 días

**Semanas 3-8 (optimizar/escalar):**
- 3x Kill Rule (matar CPA >3x)
- Escalar ganadores +20%/semana
- Activar retargeting

---

*Preparado por Neo — Verano Media · 18-ago-2026*
*Basado en: ads-plan (agency template), ads-copywriter, datos Alegra Pulso Pymes LATAM 2026*
