# 🏢 DEPARTAMENTO DE MARKETING Y CRECIMIENTO — VeranoMedia

> **Este no es un equipo de creación de contenido. Es un equipo de captación,
> autoridad y conversión.** El contenido es solo uno de los insumos.

---

## FILOSOFÍA DEL DEPARTAMENTO

**Principio #1 — Selección sobre producción.**
Producir es gratis. Elegir qué sale es el trabajo. Un agente con 0% de rechazo
está fallando, no funcionando.

**Principio #2 — Todo deja rastro.**
Ningún esfuerzo termina en el aire. Cada post, cada artículo, cada conversación
debe poder llevar a un nombre y un correo. Si no deja rastro, no vale.

**Principio #3 — El sistema trabaja, Neo dirige, Peter decide.**
Los agentes ejecutan sus funciones sin supervisión. Neo define prioridades y
arbitra. Peter aprueba lo que toca dinero, reputación o clientes.

**Principio #4 — Cero datos inventados.**
Todo número que se publica sale de una fuente verificada o de una medición
propia. Sin excepciones.

**Principio #5 — Un puesto = una función = un criterio de éxito medible.**
Sin métrica de éxito no es un puesto, es un pasatiempo.

---

## ORGANIGRAMA

```
                        ┌──────────────────────┐
                        │      NEO             │
                        │  Director de         │
                        │  Marketing y         │
                        │  Crecimiento         │
                        └──────────┬───────────┘
                                   │
     ┌────────────┬────────────┬───┴────────┬────────────┬────────────┐
     ▼            ▼            ▼            ▼            ▼            ▼
┌─────────┐ ┌─────────┐  ┌──────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ SCOUT   │ │ HUNTER  │  │ CREATOR  │ │ AUDIT   │ │NURTURE  │ │ PROOF   │
│ Inteli- │ │Prospec- │  │Contenido │ │Calidad  │ │Lista y  │ │ Casos y │
│ gencia  │ │ cción   │  │ y marca  │ │y verdad │ │nutrición│ │ prueba  │
└─────────┘ └─────────┘  └──────────┘ └─────────┘ └─────────┘ └─────────┘
     │            │            │            │            │            │
     └────────────┴────────────┴─────┬──────┴────────────┴────────────┘
                                     ▼
                          ┌────────────────────┐
                          │   MAGNET           │
                          │ Captura de leads   │
                          │ (el motor de todo) │
                          └────────────────────┘
```

---

## PUESTOS — FICHAS COMPLETAS

### 🟦 1. MAGNET — Motor de Captura
**Existe:** 🔴 NO (a construir)
**Función:** Convertir tráfico en nombres y correos. Es el puesto más importante:
sin él, los otros seis trabajan para nadie.

**Responsabilidades:**
- Mantener el formulario de diagnóstico funcionando y enviando al CRM
- Entregar el lead magnet automáticamente (sin intervención humana)
- Puntuar cada lead entrante (0-100) según señales de interés
- Avisar a Peter por WhatsApp cuando entra un lead caliente (score >= 70)
- Reportar cuántos leads entran por canal, por día, por fuente

**Entradas:** visitas al sitio, respuestas de campaña, mensajes de WhatsApp
**Salidas:** registros en el CRM (`Lead`), alertas de leads calientes
**Criterio de éxito:** % de visitas que dejan correo (objetivo: >= 4%)
**Frecuencia:** continuo (webhook) + reporte diario

---

### 🟩 2. HUNTER — Prospección
**Existe:** 🟡 PARCIAL (la campaña R4 existe, falta el buscador de prospectos)
**Función:** Llenar la base de prospectos con negocios reales de RD.

**Responsabilidades:**
- Buscar negocios objetivo (clínicas, inmobiliarias, legales, retail, estética)
- Verificar que existan y que sus datos sean reales (regla dura: MX del correo)
- Enriquecer con señales: web, redes, WhatsApp, reseñas
- Nunca inventar un prospecto ni una métrica
- Mantener la base limpia: sin duplicados, sin correos muertos

**Entradas:** búsquedas web, directorios RD, Google Places
**Salidas:** `~/veranomedia/prospeccion/BASE-PROSPECTOS-*.md` + `campaign.json`
**Criterio de éxito:** prospectos NUEVOS verificados por semana (objetivo: >= 25)
**Frecuencia:** semanal

---

### 🟨 3. CREATOR — Contenido y Marca
**Existe:** ✅ SÍ (`VM-Generar-Semana`, 4 publicadores, blog)
**Función:** Producir el contenido de los 5 canales + blog.

**Responsabilidades:**
- Calendario semanal (7 días, 4 redes, textos diferenciados por canal)
- Artículos de blog >= 150 líneas de fuente, con casos reales
- Respetar la REGLA DE CANAL ÚNICO (Threads no repite el visual de IG)
- Cero cifras inventadas; toda cifra con fuente

**Criterio de éxito:** 7/7 posts publicados sin fallo por semana
**Frecuencia:** diario + generación semanal

---

### 🟥 4. AUDIT — Calidad y Verdad
**Existe:** ✅ SÍ (`agent_audit.py`, `VM-Audit-PrePublicacion`)
**Función:** Rechazar lo que no cumple. El puesto más importante para la marca.

**Responsabilidades:**
- Revisar cada post contra criterios estrictos antes de publicar
- Verificar que toda cifra esté en la lista blanca de datos verificados
- Rechazar promesas vacías, clickbait, CTAs falsos
- Reportar tasa de rechazo (si es 0%, el auditor no está trabajando)

**Criterio de éxito:** tasa de rechazo entre 5% y 20% (ni 0 ni 100)
**Frecuencia:** diario, antes de publicar

---

### 🟪 5. NURTURE — Lista y Nutrición
**Existe:** ✅ SÍ (`VM-Campana-Prospeccion`, R4-Email-5-Toques)
**Función:** Mantener viva la relación con quien ya nos conoce.

**Responsabilidades:**
- Secuencia de correos en frío (5 toques, cadencia 0/3/8/14/21)
- Secuencia para quien dejó su correo (bienvenida + valor + oferta)
- A/B de asuntos; medir respuesta
- Respetar ventana mar/mié/jue 9:30, límite 10/día, 8s entre envíos
- Correr al siguiente día hábil si hay feriado en RD

**Criterio de éxito:** tasa de respuesta >= 3,8% (línea base actual)
**Frecuencia:** 3 veces por semana

---

### 🟫 6. PROOF — Casos y Prueba
**Existe:** 🔴 NO (a construir)
**Función:** Convertir resultados reales en activos de autoridad.

**Responsabilidades:**
- Documentar cada cliente/caso con números reales (antes → después)
- Convertir casos en: artículo de blog, PDF descargable, post, carrusel
- Mantener un banco de pruebas citables para el resto del equipo
- Nunca publicar un caso sin permiso del cliente

**Criterio de éxito:** 1 caso documentado por mes con métricas verificadas
**Frecuencia:** mensual

---

### ⬜ 7. SCOUT — Inteligencia de Mercado
**Existe:** ✅ SÍ (`agent_scout.py`, `VM-Scout-Señales`)
**Función:** Saber qué pasa afuera antes que la competencia.

**Responsabilidades:**
- Rastrear señales de mercado RD (regulaciones, tendencias, competencia)
- Detectar temas que la audiencia está discutiendo
- Alimentar a CREATOR con ángulos frescos
- Detectar menciones de VM (¡y de la competencia!)

**Criterio de éxito:** >= 3 señales accionables por semana
**Frecuencia:** diario

---

## FLUJO DE TRABAJO

```
SCOUT ──señales──┐
                 ▼
HUNTER ──────► CREATOR ──► AUDIT ──► PUBLICAR ──► MAGNET
prospectos      contenido   aprueba   5 redes     captura leads
                                                 │
                                                 ▼
                              PROOF ◄──── NURTURE
                          (casos con datos)  (nutre la lista)
                                                 │
                                                 ▼
                                              VENTA
```

**El ciclo se cierra:** el contenido atrae → MAGNET captura → NURTURE nutre →
alguien compra → PROOF documenta el caso → el caso alimenta nuevo contenido.

**Hoy ese ciclo está ROTO en dos puntos:** MAGNET no existe (no captura) y
PROOF no existe (no documenta). Por eso el sistema produce pero no convierte.

---

## REGLAS DEL DEPARTAMENTO

1. **Toda regla crítica va en el código, no en un documento.**
2. **Ningún agente envía nada a un cliente sin aprobación de Peter** (excepto
   los publicadores de contenido y la secuencia de nutrición ya aprobada).
3. **Cero datos inventados.** Cifra sin fuente = rechazo.
4. **Si algo falla, se reporta.** Un monitor que se traga el error miente.
5. **Un puesto sin métrica no existe.** Todo puesto reporta su número.
6. **Neo arbitra conflictos entre puestos.** Ejemplo: si HUNTER quiere mandar
   más correos y NURTURE dice que quema el dominio, gana la protección del
   dominio.

---

## MÉTRICAS DEL DEPARTAMENTO (reporte semanal)

| Puesto   | Métrica principal                  | Línea base  | Objetivo |
|----------|------------------------------------|-------------|----------|
| MAGNET   | % visitas que dejan correo         | 0%          | 4%       |
| HUNTER   | prospectos nuevos verificados/sem  | 0           | 25       |
| CREATOR  | posts publicados / fallidos        | 7 / varios  | 7 / 0    |
| AUDIT    | tasa de rechazo                    | n/a         | 5-20%    |
| NURTURE  | tasa de respuesta                  | 3,8%        | 5%       |
| PROOF    | casos documentados                 | 0           | 1/mes    |
| SCOUT    | señales accionables/sem            | ~3          | 5        |

---

## HOJA DE RUTA

**Fase 1 — El motor de captura (MAGNET)**
- Formulario de diagnóstico conectado al CRM
- Entrega automática del lead magnet
- Puntuación de leads + alerta de calientes
- Captura de correo en el blog

**Fase 2 — El buscador de prospectos (HUNTER)**
- Búsqueda automática de negocios objetivo
- Verificación de datos reales
- Enriquecimiento y carga a la base

**Fase 3 — La fábrica de prueba (PROOF)**
- Banco de casos documentados
- Conversión a activos descargables
- Caso -> artículo -> post -> lead magnet

**Fase 4 — El reporte que dirige**
- Un solo resumen semanal que diga qué duplicar y qué cortar
- Métricas por canal atribuidas a leads reales
