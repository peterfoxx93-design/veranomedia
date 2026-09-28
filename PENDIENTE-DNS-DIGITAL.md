# 🔴 PENDIENTE CRÍTICO — DNS del redirect .digital → .click

**Fecha:** 26-sep-2026
**Estado:** esperando acción manual en Porkbun (Peter)

## El problema

Posts publicados ANTES del 18-sep-2026 comparten links con `veranomedia.digital`,
un dominio que hoy no resuelve (NXDOMAIN / HTTP 000). Ejemplo real:
post de Bluesky del 25-jul-2026 → `veranomedia.digital/blog/google-business-profile-clientes`

## Lo que YA está hecho

| Pieza | Estado |
|---|---|
| Vercel: `veranomedia.digital` → redirect 301 a `veranomedia.click` | ✅ configurado y verified |
| Código: 22 referencias `.digital` → `.click` (middleware + 10 scripts) | ✅ commiteado `0d38ae1` |
| DNS en Porkbun | ❌ **FALTA** |

## Lo que falta (Peter, 2 min)

Porkbun → Domain Management → `veranomedia.digital` → DNS Records:

```
Type:  A
Host:  @  (vacío)
Value: 216.198.79.1
TTL:   default
```

Ese es el `aValues` que devuelve la API de Vercel para el proyecto `veranomedia`.

## Verificación (cuando esté puesto)

```bash
curl -s -o /dev/null -w "%{http_code}" https://veranomedia.digital/
# esperado: 301 o 308 → luego 200 en .click
```
