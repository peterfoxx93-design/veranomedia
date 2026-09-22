#!/usr/bin/env python3
"""AUDIT — Agente Auditor VM. NO produce contenido: solo revisa y aprueba/rechaza.

El agente más importante del equipo (lección de heyanjey):
"AI makes production nearly free → selection becomes the bottleneck.
A 0% rejection rate should scare you."

Revisa el post ANTES de publicar contra criterios estrictos de calidad VM.

Uso:
  python3 agent_audit.py --post "texto del post" [--plataforma x|threads|linkedin|bluesky|fb]
  python3 agent_audit.py --file /ruta/al/post.md
"""
import argparse, os, sys, re
from datetime import datetime

# Datos verificados citables VM (lista blanca) — evita rechazos falsos
DATOS_VERIFICADOS = [
    "82%",      # hogares RD compran por WhatsApp (fuente: análisis mercado local)
    "27,8%",    # negocios RD listos para IA (Alegra 2026)
    "36,1%",    # negocios RD sin automatizar (Alegra 2026)
    "20%",      # citas dentales no-show
    "4 de cada 10",  # consultas inmobiliarias fuera de horario
    "80%",      # ventas perdidas en el seguimiento (mecanismo documentado)
    "24h", "48h", "7 días", "7d",  # plazos de seguimiento estándar
]

# --- CTA: imperativo real o pregunta dirigida al lector ---------------------
# Fix 2026-09-22 (falso negativo sistemático):
#   El whitelist anterior era una lista de palabras sueltas. El house style de VM
#   cierra con una PREGUNTA al lector ("¿Cuántas consultas quedaron sin responder
#   en tu tienda?"), que el propio criterio acepta como "invitación a conversar",
#   pero ninguna palabra de la lista aparecía en el texto -> 0/4 plataformas
#   aprobadas con CTAs válidas. Se añade detección interrogativa y se retiran las
#   señales débiles ("hoy", "link", "mira", "conoce") que aprobaban posts sin CTA
#   real. Validado contra todo el calendario: 0 regresiones.
CTA_IMPERATIVOS = [
    # "escribe" + "diagnóstico": CTA del mecanismo de keyword (ej. "Escribe 'RESTAURANTE'")
    "escríbenos", "escribenos", "escribe", "diagnóstico", "mensaje", "whatsapp",
    "agenda", "hablemos", "cotiza", "empieza", "contacta", "reserva", "pide",
    "solicita", "llámanos", "llamanos", "comenta", "cuéntame", "cuentame",
]
CTA_INTERROGATIVOS = [
    "cuánt", "cuant", "cómo", "como ", "qué", "cuál", "dónde", "cuándo",
    "tienes", "tiene", "quieres", "estás", "estas", "sabes", "puedes",
    "podrías", "sigues", "vas ", "has ", "te ", "tu ", "tú ",
]

def cta_ok(t: str) -> bool:
    """True si hay llamada a la acción o invitación a conversar."""
    tl = t.lower()
    if any(w in tl for w in CTA_IMPERATIVOS):
        return True
    # pregunta dirigida al lector = invitación a conversar (house style VM)
    return bool(re.search(r"[¿?]", t)) and any(w in tl for w in CTA_INTERROGATIVOS)


# Criterios de calidad VM — checklist obligatorio
CRITERIOS = [
    {
        "id": "hook",
        "desc": "Hook/dolor en las primeras 15 palabras",
        "check": lambda t: len(t) > 15 and any(w in t.lower() for w in [
            "perdi", "error", "cliente", "venta", "dinero", "no responde", "cita",
            "seguimiento", "hora", "agenda", "sin", "deja", "escapa", "invierte",
            "crece", "automatiza", "sistema", "recupera", "mensaje", "whatsapp"]),
    },
    {
        "id": "longitud",
        "desc": "Longitud según plataforma (X≤280, LinkedIn≤2500, Threads≤490, BlueSky≤290)",
        "check": lambda t, plat: {
            "x": len(t) <= 280,
            "linkedin": len(t) <= 2500,
            "threads": len(t) <= 490,
            "bluesky": len(t) <= 290,
        }.get(plat, len(t) <= 2500),
    },
    {
        "id": "datos",
        "desc": "Sin datos inventados (solo citas verificables o mecanismos genéricos)",
        "check": lambda t: (
            not re.search(r"\d{2,3}%", t)  # no hay % → OK
            or any(k in t for k in DATOS_VERIFICADOS)  # % está en lista blanca
            or any(k in t.lower() for k in ["según", "estudio", "dato", "alegra", "referencia", "fuente"])
        ),
    },
    {
        "id": "cta",
        "desc": "Llamada a la acción clara (o invitación a conversar)",
        "check": cta_ok,
    },
    {
        "id": "promesa",
        "desc": "Promesa de resultado concreta (no solo presencia)",
        "check": lambda t: any(w in t.lower() for w in [
            "vender", "citas", "clientes", "ventas", "agenda", "ingresos",
            "recupera", "convierte", "llena", "crece", "responde"]),
    },
]

def audit(text, plataforma="x", verbose=True):
    print(f"🔍 AUDIT — revisando post ({plataforma}, {len(text)} chars)")
    print("=" * 50)
    results = []
    for c in CRITERIOS:
        try:
            if c["id"] == "longitud":
                ok = c["check"](text, plataforma)
            else:
                ok = c["check"](text)
        except Exception:
            ok = False
        results.append((c, ok))
        status = "✅" if ok else "❌"
        print(f"{status} {c['id']}: {c['desc']}")

    approved = all(ok for _, ok in results)
    print("=" * 50)
    if approved:
        print("✅ APROBADO — listo para publicar")
        return 0
    else:
        fails = [c["id"] for c, ok in results if not ok]
        print(f"❌ RECHAZADO — falla: {', '.join(fails)}")
        print("   → Enviar de vuelta al WRITER con el checklist")
        return 1

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--post", help="texto del post directamente")
    ap.add_argument("--file", help="archivo con el post")
    ap.add_argument("--plataforma", default="x", choices=["x", "threads", "linkedin", "bluesky", "fb"])
    args = ap.parse_args()

    if args.post:
        text = args.post
    elif args.file:
        with open(args.file) as f:
            text = f.read().strip()
    else:
        # Si no hay args, intentar leer el post de HOY del calendario
        cal = os.path.expanduser("~/.hermes/scripts/vm_x_posts_premium.json")
        if os.path.exists(cal):
            import json
            with open(cal) as f:
                posts = json.load(f)
            today = datetime.now().strftime("%Y-%m-%d")
            post = next((p for p in posts if p.get("date") == today), None)
            if post:
                # Elegir el campo según la plataforma
                campo = {
                    "x": "text_x",
                    "threads": "text_threads",
                    "bluesky": "text_bsky",
                    "linkedin": "text_linkedin",
                }.get(args.plataforma, "text")
                text = post.get(campo) or post.get("text") or post.get("text_x")
                print(f"📅 Post de hoy: {post.get('title')} (campo: {campo})")
            else:
                print("❌ No hay post para hoy en el calendario")
                sys.exit(1)
        else:
            print("❌ Necesitas --post o --file")
            sys.exit(1)

    sys.exit(audit(text, args.plataforma))

if __name__ == "__main__":
    main()
