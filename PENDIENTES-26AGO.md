# PENDIENTES VM — 26 agosto 2026

1. **Demos nuevas de Peter** → agregar al portafolio de veranomedia.digital
2. **Memoria entre visitas (asistentes web demos)** → cookie/ID anónimo en el widget + guardar sesión en el CRM, para que Mariela/Valeria/Hernández recuerden al visitante que regresa. Peter: "impresión de calidad, no somos aprendices"
3. **Rediseño visual VM** → según capturas Pinterest que Peter va a enviar (sitios web modernos)
4. **Paso 2 del hero VM** (de sesiones anteriores)

## HECHO 25-ago (contexto)
- María WhatsApp: memoria Redis extendida 24h → **7 días** (flow-engine.js línea ~190)
- Anti-spam: fallback máx 1 aviso cada 30 min por contacto (failnoti: en Redis), eliminada re-encolación
- Cron `monitor-asistentes-vm` (job d9fac0c49415): 8am y 8pm — verifica WhatsApp, Flow, CRM API, Ora Nova tenant, sitio VM; auto-reinicia y reporta críticos
- CORS arreglado en veranomedia-crm (/api/chat y /api/chat/tenant)
- Avatar María restaurado (c75862d); portafolio purgado del catálogo generalista (8a5b239)
- Token Valeria actualizado en Atlantico-RS ChatBubble.tsx
- Groq primario en /api/chat, /api/chat/tenant y vm-bot flow-engine

## Tokens tenants (DB Neon, tabla tenants)
- ora-nova: aeabce0a...edf3 | atlantico-real-estate: 96520c25...d27a8a | hernandez-asociados: 0f5c5a88...
