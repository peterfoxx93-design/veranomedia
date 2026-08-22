# 🎬 Receta UGC — Alineadores Dentales (Clínica Dra. Reyna)

**Formato:** vertical 9:16 · duración ~15-20s · voz española (acento dominicano) · subtítulos en español
**Motor:** Agnes Video Generator (video IA gratis, key en ~/.env)
**Fórmula:** UGC Selfie-Style Review (9 capas) — ver skill `vm-ugc-creatives`

---

## Opción A — Flujo CREATIVE (todo automático)

POST /api/tasks/creative
```json
{
  "idea": "Anuncio UGC vertical 9:16 de 15-20 segundos para una clínica dental en República Dominicana. Una mujer dominicana de unos 30 años, pelo oscuro recogido en un moño bajo, piel natural con textura visible, vistiendo un polo azul claro de clínica dental. Está en un consultorio dental pequeño y moderno: silla dental detrás, carteles en la pared, una planta en el mostrador, ambiente real y vivido. Luz natural de ventana, ligeramente sobreexpuesta en un lado, sin ring light, calidad de teléfono, sin filtros. Habla en español con acento dominicano de forma casual y auténtica, como un video selfie de TikTok: tenía miedo de los alineadores, se ponen en dos minutos, nadie se da cuenta, en tres meses ya ve el cambio. Tonos genuino, cercano, real — como una amiga contando algo que de verdad le gusta. Música suave de fondo al final. Subtítulos en español.",
  "video_width": 720,
  "video_height": 1280
}
```

## Opción B — Flujo MANUSCRIPT (guion controlado, escenas por párrafo)

POST /api/tasks/manuscript
```json
{
  "manuscript_text": "Oye, yo tenía miedo de los alineadores, pero mira. Se ponen en dos minutos y nadie se da cuenta. Tres meses y ya veo el cambio. En serio.",
  "video_width": 720,
  "video_height": 1280
}
```

## Opción C — Escenas manuales (flujo SIMPLE, máximo control)

3 generaciones t2v separadas + concat manual:

| # | Prompt (t2v, duration 5s) | Voz (edge_tts) |
|---|---|---|
| 1 | Mujer dominicana 30 años, moño bajo, polo azul claro, consultorio dental pequeño, luz natural de ventana, sostiene un estuche blanco de alineadores hacia la cámara, sonrisa genuina, mira a cámara y habla | "Oye, yo tenía miedo de los alineadores, pero mira." |
| 2 | Primer plano del estuche abierto con los alineadores transparentes, manos femeninas mostrándolos a cámara, fondo desenfocado del consultorio, luz natural | "Se ponen en dos minutos y nadie se da cuenta." |
| 3 | La misma mujer señala sus dientes con una sonrisa amplia, orgullosa, luz de ventana, calidad de teléfono | "Tres meses y ya veo el cambio. En serio." |

**Voz:** edge_tts — `es-MX-DaliaNeural` (aprobada VM) o `es-DO` si está disponible en el catálogo de Agnes (GET /api/voices).

---

## Check pre-generación (fórmula UGC 9 capas)
- [ ] Formato: 9:16, ~15-20s, smartphone, luz natural, ángulo selfie casual
- [ ] Persona: 2-3 imperfecciones de piel (textura visible, brillo en frente)
- [ ] Setting: consultorio con 3+ objetos (silla dental, carteles, planta)
- [ ] Producto: estuche blanco de alineadores, entra al cuadro
- [ ] Beats: hook → show → result → verdict (1 línea por beat, ritmo natural)
- [ ] Tone: genuino, cercano; pausas naturales
- [ ] Technical flaws: sin ring light, sin filtros, calidad teléfono
- [ ] Vibe: "una amiga contando algo que de verdad le gusta"
- [ ] Subtítulos en español (Agnes los genera con srt)
- [ ] Sin texto quemado en imagen, sin logos

---

## Cómo se genera
1. `~/bin/agnes-start.sh` (levanta :8765 con la key)
2. `curl -s -X POST http://localhost:8765/api/tasks/creative -H "Content-Type: application/json" -d '{...}'`
3. Polling `GET /api/tasks` hasta completar
4. El MP4 queda en el workspace de Agnes → entregar MEDIA:

*Receta creada 17-ago-2026 · VM UGC Pipeline*
