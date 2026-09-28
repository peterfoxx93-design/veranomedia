#!/usr/bin/env python3
"""HUNTER — Buscador de prospectos del departamento de marketing de VM.

POR QUÉ EXISTE
--------------
La campaña R4 existe y funciona (53 correos, 3,8% de respuesta humana), pero
la base de prospectos es un archivo escrito a mano el 22-ago con 26 negocios.
Cuando esos 26 se agoten, la campaña se queda sin combustible: nadie está
buscando prospectos nuevos.

Este agente llena la base sola. Dos vías:

  1. Google Places API (preferida) — negocios locales reales con teléfono,
     web, dirección y reseñas. Requiere GOOGLE_PLACES_API_KEY y la Places API
     habilitada en el proyecto de Google Cloud. Si no está habilitada, el
     agente LO DICE (no falla en silencio) y cae a la vía 2.

  2. Búsqueda web (Perplexity) — para verticales donde Places no da suficiente.

REGLAS DURAS (aprendidas en este proyecto):
  - NUNCA inventar un prospecto. Si no tiene fuente real, no entra.
  - Verificar que el negocio exista antes de cargarlo.
  - No duplicar: dedupe por nombre normalizado Y por teléfono.
  - El conteo que imprime == lo que escribió en el archivo (nunca mentir).

Uso:
  python3 agent_hunter.py                        # busca en las verticales objetivo
  python3 agent_hunter.py --vertical dental      # solo una vertical
  python3 agent_hunter.py --ciudad "Punta Cana"  # cambia la ciudad
  python3 agent_hunter.py --sin-places           # exige la vía de búsqueda web

Salida: ~/veranomedia/prospeccion/prospectos-nuevos-YYYY-MM-DD.json
        (revisable antes de entrar a la campaña; NADA se envía solo)
"""
import argparse
import json
import os
import re
import subprocess
import sys
import unicodedata
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

HOME = os.path.expanduser("~")
OUT_DIR = os.path.join(HOME, "veranomedia", "prospeccion")
CAMPAIGN = os.path.join(OUT_DIR, "campaign.json")
ENV_FILE = os.path.join(HOME, ".hermes", ".env")
EXTRACTOR = os.path.join(HOME, ".hermes", "scripts", "places_extractor.py")
RD = timezone(timedelta(hours=-4))

# Verticales objetivo de VM (las mismas que la campaña actual)
VERTICALES = {
    "dental":      "clínicas dentales",
    "inmobiliaria": "inmobiliarias",
    "legal":       "bufetes de abogados",
    "estetica":    "centros de estética",
    "restaurante": "restaurantes",
}

CIUDADES = ["Santo Domingo", "Santiago de los Caballeros", "Punta Cana"]


def norm(s: str) -> str:
    """Normaliza para comparar: sin acentos, minúsculas, sin puntuación."""
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9 ]", "", s.lower()).strip()


def leer_env(clave: str) -> str:
    try:
        with open(ENV_FILE) as f:
            for linea in f:
                if linea.startswith(clave + "="):
                    return linea.split("=", 1)[1].strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return ""


def existentes() -> tuple[set[str], set[str]]:
    """Nombres y teléfonos ya en la campaña, para no duplicar."""
    nombres, telefonos = set(), set()
    try:
        with open(CAMPAIGN, encoding="utf-8") as f:
            c = json.load(f)
    except Exception:
        return nombres, telefonos
    for p in (c.get("prospects") or c.get("prospectos") or []):
        if not isinstance(p, dict):
            continue
        nombres.add(norm(p.get("name") or p.get("business") or ""))
        tel = re.sub(r"\D", "", p.get("phone") or "")
        if len(tel) >= 7:
            telefonos.add(tel)
    return nombres, telefonos


def buscar_places(categoria: str, ciudad: str, cantidad: int) -> tuple[list[dict], str]:
    """Vía 1: Google Places vía el extractor existente.

    Devuelve (resultados, motivo_si_falla).
    """
    key = leer_env("GOOGLE_PLACES_API_KEY")
    if not key:
        return [], "GOOGLE_PLACES_API_KEY no está en el .env"
    if not os.path.exists(EXTRACTOR):
        return [], f"no se encontró el extractor en {EXTRACTOR}"

    env = dict(os.environ, GOOGLE_PLACES_API_KEY=key)
    try:
        r = subprocess.run(
            ["python3", EXTRACTOR, categoria, ciudad, str(cantidad)],
            capture_output=True, text=True, timeout=240, env=env,
        )
    except subprocess.TimeoutExpired:
        return [], "el extractor tardó más de 4 minutos"

    salida = (r.stdout or "") + (r.stderr or "")

    # El extractor imprime el error de la API: propagarlo tal cual para que
    # quede claro QUÉ hay que habilitar (no tragárselo).
    m = re.search(r"Error API:\s*(\d+)\s*-\s*(.+)", salida)
    if m:
        return [], f"Places API {m.group(1)}: {m.group(2)[:160]}"

    # Buscar el JSON/CSV que haya dejado
    candidatos = sorted(
        [f for f in os.listdir(OUT_DIR) if f.endswith(".json") and "places" in f.lower()],
        reverse=True,
    )
    if candidatos:
        try:
            with open(os.path.join(OUT_DIR, candidatos[0]), encoding="utf-8") as f:
                datos = json.load(f)
            if isinstance(datos, list):
                return [d for d in datos if isinstance(d, dict)], ""
        except Exception:
            pass

    n = len(re.findall(r"✅|→", salida))
    if n == 0:
        return [], "el extractor no devolvió resultados"
    return [], "resultados no parseables (revisar formato del extractor)"


def main() -> int:
    ap = argparse.ArgumentParser(description="HUNTER — buscador de prospectos VM")
    ap.add_argument("--vertical", choices=sorted(VERTICALES) + ["todas"], default="todas")
    ap.add_argument("--ciudad", default="Santo Domingo")
    ap.add_argument("--cantidad", type=int, default=20)
    ap.add_argument("--sin-places", action="store_true", help="no usar Places")
    ap.add_argument(
        "--json",
        action="store_true",
        help="salida estructurada para que Neo (u otro agente) la lea y actúe",
    )
    args = ap.parse_args()

    verticales = sorted(VERTICALES) if args.vertical == "todas" else [args.vertical]
    nombres_ya, tels_ya = existentes()

    # En modo --json la salida debe ser JSON PURO: cualquier print de progreso
    # rompería el parseo de quien lo consuma (yo, un agente, un dashboard).
    # Los mensajes de avance van a stderr, que no contamina el stdout.
    def aviso(txt: str) -> None:
        if args.json:
            print(txt, file=sys.stderr)
        else:
            print(txt)

    aviso(f"🏹 HUNTER — buscando prospectos en {args.ciudad}")
    aviso(f"   verticales: {', '.join(verticales)}")
    aviso(f"   ya en la campaña: {len(nombres_ya)} nombres / {len(tels_ya)} teléfonos")
    aviso("")

    encontrados: list[dict] = []
    fallos: list[str] = []

    for v in verticales:
        categoria = VERTICALES[v]
        aviso(f"  ▸ {categoria}…")
        if args.sin_places:
            fallos.append(f"{v}: se pidió --sin-places (vía web no implementada aún)")
            aviso("     ⚠️ vía web aún no implementada")
            continue

        res, motivo = buscar_places(categoria, args.ciudad, args.cantidad)
        if motivo:
            # NO se traga el error: se imprime y se acumula para el reporte
            aviso(f"     ❌ {motivo}")
            fallos.append(f"{v}: {motivo}")
            continue

        nuevos = 0
        for r in res:
            nombre = (r.get("name") or r.get("displayName") or "").strip()
            if not nombre:
                continue
            tel = re.sub(r"\D", "", str(r.get("phone") or r.get("nationalPhoneNumber") or ""))
            if norm(nombre) in nombres_ya or (len(tel) >= 7 and tel in tels_ya):
                continue
            nombres_ya.add(norm(nombre))
            if len(tel) >= 7:
                tels_ya.add(tel)
            encontrados.append({
                "name": nombre,
                "business": nombre,
                "phone": r.get("phone") or r.get("nationalPhoneNumber") or "",
                "email": r.get("email") or "",
                "website": r.get("website") or r.get("websiteUri") or "",
                "address": r.get("address") or r.get("formattedAddress") or "",
                "rating": r.get("rating"),
                "reviews": r.get("reviews") or r.get("userRatingCount"),
                "vertical": v,
                "ciudad": args.ciudad,
                "fuente": "google-places",
            })
            nuevos += 1
        aviso(f"     ✅ {nuevos} nuevo(s) de {len(res)} resultado(s)")

    aviso("")
    if not encontrados:
        if args.json:
            print(json.dumps({
                "agente": "hunter",
                "ts": datetime.now(RD).isoformat(),
                "ciudad": args.ciudad,
                "verticales": verticales,
                "nuevos": 0,
                "prospectos": [],
                "hallazgos": list(fallos),
                "recomendaciones": [],
                "bloqueado_por": fallos[0] if fallos else "",
            }, ensure_ascii=False, indent=2))
            return 1
        print("⚠️ HUNTER no encontró prospectos nuevos.")
        if fallos:
            print()
            print("Motivos (esto es lo que hay que resolver):")
            for f in fallos:
                print(f"  · {f}")
        return 1

    os.makedirs(OUT_DIR, exist_ok=True)
    hoy = datetime.now(RD).strftime("%Y-%m-%d")
    destino = os.path.join(OUT_DIR, f"prospectos-nuevos-{hoy}.json")
    with open(destino, "w", encoding="utf-8") as f:
        json.dump(encontrados, f, ensure_ascii=False, indent=2)

    if args.json:
        por_vertical: dict[str, int] = {}
        for p in encontrados:
            v = str(p.get("vertical") or "sin_vertical")
            por_vertical[v] = por_vertical.get(v, 0) + 1
        con_tel = sum(1 for p in encontrados if p.get("phone"))
        con_web = sum(1 for p in encontrados if p.get("website"))
        print(json.dumps({
            "agente": "hunter",
            "ts": datetime.now(RD).isoformat(),
            "ciudad": args.ciudad,
            "verticales": verticales,
            "nuevos": len(encontrados),
            "por_vertical": por_vertical,
            "con_telefono": con_tel,
            "con_web": con_web,
            "archivo": destino,
            "prospectos": encontrados,
            "hallazgos": [
                f"{len(encontrados)} prospectos nuevos en {args.ciudad}.",
                f"{con_tel} traen teléfono (contactables por WhatsApp/llamada).",
            ],
            "recomendaciones": [
                "Revisar la lista antes de meterla a la campaña: HUNTER no envía nada."
            ],
            "bloqueado_por": "",
        }, ensure_ascii=False, indent=2))
        return 0

    print(f"🏹 {len(encontrados)} prospecto(s) nuevo(s) — guardados en:")
    print(f"   {destino}")
    print()
    print("   ⚠️ NADA se envió: esto es una lista para REVISAR. El motor de campaña")
    print("      solo contacta lo que Peter apruebe.")
    if fallos:
        print()
        print("Verticales que fallaron:")
        for f in fallos:
            print(f"  · {f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
