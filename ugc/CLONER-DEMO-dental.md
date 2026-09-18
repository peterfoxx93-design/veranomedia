# UGC Cloner — DEMO aplicada (vertical dental RD)

> Método del skill `vm-ugc-cloner`. Referencia: formato de talking-head UGC probado en
> apps de salud (confesión casual en ambiente doméstico → demostración → CTA suave),
> desarmado y re-aplicado a una clínica dental de Santo Domingo.

---

## 0. Referencia (formato ganador a clonar)
- **Formato:** talking head doméstico, 18-32 s, una sola persona, una sola toma
- **Por qué funcionó:** el hook es una **confesión personal** (no un anuncio), el producto
  aparece **después del segundo 8**, y el CTA es de baja presión ("me di cuenta…")
- **Métrica que lo prueba:** retención > 60% en los primeros 3 s + CTR sobre el promedio

## 1. Desarme (6 preguntas)
| # | Pregunta | Respuesta del formato original |
|---|---|---|
| 1 | Primeros 3 s | Persona en su cocina, mira a cámara: *"llevo años haciéndolo mal y no me di cuenta hasta ahora"* |
| 2 | Cuándo aparece el producto | ~seg 8. Muestra la pantalla/teléfono haciendo la acción |
| 3 | Problema que introduce el hook | Vergüenza/desinformación personal (no dolor) |
| 4 | Demostración antes del CTA | 5-8 s de la acción resolviéndose en pantalla |
| 5 | Qué hacía mientras hablaba | Tarea doméstica (café, cocina) → naturalidad |
| 6 | CTA | Blando: *"yo lo hice por esto, míralo tú"* — sin urgencia falsa |

## 2. Estructura que se conserva (NO se toca)
`confesión (0-3s)` → `contexto personal (3-8s)` → `revelación + producto en pantalla (8-14s)`
→ `resultado (14-20s)` → `CTA blando (20-24s)`
**Tono:** íntimo, sin locución. **Ritmo:** cortes cada 2-4 s. **Duración objetivo:** 22-26 s.

## 3. Destino
- **Vertical:** clínica dental (implantes / diseño de sonrisa) · RD
- **Dolor principal:** *"sé que debería arreglarme esto, pero me da miedo/pena/cuesta"*
- **Idiomas:** es-DO (principal) + inglés (turismo dental)
- **Restricción legal:** salud → **nada de promesas de resultado clínico**. Se vende
  la **decisión de consultar**, no el resultado.

## 4. Lote de 12 variantes (una variable por lote)

### Lote A — variable: HOOK (creador y escena fijos)
| # | Variable cambiada | Valor | Hipótesis |
|---|---|---|---|
| 1 | Hook | Confesión: *"tengo 3 años evitando las fotos"* | El dolor social retiene más que el dolor físico |
| 2 | Hook | Negación: *"no es la plata, es el miedo"* | Nombra la objeción real (miedo, no precio) |
| 3 | Hook | Pregunta: *"¿cuándo fue la última vez que te reíste sin taparte?"* | Autodiagnóstico → alto engagement en comentarios |

### Lote B — variable: CREADOR (hook ganador fijo)
| # | Variable cambiada | Valor | Hipótesis |
|---|---|---|---|
| 4 | Creador | Mujer 28-35, tono calmado | Cercanía a la paciente real de diseño de sonrisa |
| 5 | Creador | Hombre 40-50, tono seco | Segmento implantes (mayor ticket) |
| 6 | Creador | Mujer 55+, tono cálido | Segmento prótesis/implante múltiple |

### Lote C — variable: AMBIENTE
| # | Variable cambiada | Valor | Hipótesis |
|---|---|---|---|
| 7 | Ambiente | Carro, antes de entrar al trabajo | Escena de "decisión" (va en camino a consultar) |
| 8 | Ambiente | Baño con espejo, luz natural | Máxima intimidad con el dolor (mirarse) |
| 9 | Ambiente | Sala con familia de fondo | Refuerza el costo social (fotos, reuniones) |

### Lote D — variable: IDIOMA
| # | Variable cambiada | Valor | Hipótesis |
|---|---|---|---|
| 10 | Idioma | es-DO | Base local |
| 11 | Idioma | Inglés (US) | Turismo dental: paciente investiga de noche desde EE.UU. |
| 12 | Idioma | es-DO con subtítulo inglés | Híbrido para reels de clínicas con pacientes mixtos |

**Regla:** cada lote cambia UNA dimensión y mantiene el resto. Si el lote A gana, el
hook se queda y se mueve el siguiente eje — no se reinicia todo.

## 5. Producción (stack VM, sin GPU)
- **Voz:** ElevenLabs (natural) o Edge TTS `es-DO`/`es-MX-DaliaNeural` como respaldo
- **Personaje:** Nano Banana / DeepAI (retrato fotorrealista, luz de ventana, 50mm)
- **Video:** pipeline **agnes** (talking head) · **Post:** ffmpeg → 9:16, subtítulos quemados
- **Slideshow alterno (más barato):** Pillow + ffmpeg (mismo guion, 6-8 placas)
- **Entregable por lote:** 12 videos 9:16 + guiones + copys de caption

## 6. Guardrails
- Sin promesas de resultado clínico (salud = riesgo legal y de plataforma)
- Sin farming de cuentas: publica **la clínica en sus propias cuentas**
- Declarar IA cuando la plataforma lo exija

## 7. Qué medir (no solo views)
Retención al seg 3 · ¿vieron la demostración? · clics a WhatsApp · ¿comentó el público
correcto (zona/servicio)? · ¿un hook ganó repetidamente?
**Escalar solo el formato que ya ganó.**
