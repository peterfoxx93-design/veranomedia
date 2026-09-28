#!/usr/bin/env python3
"""NEO — panel de mando del departamento de marketing de VM.

POR QUÉ EXISTE
--------------
Hoy los puestos del departamento son scripts: corren, reportan y avisan. Pero un
director no puede dirigir leyendo 7 reportes de prosa distinta todos los días.

Este es el puente: llama a cada puesto con `--json`, junta los datos y devuelve
UN panorama — qué pasó, qué está bloqueado y qué hay que decidir. Es lo que yo
(Neo) leo para dirigir, y lo que se puede convertir en agente con prompt el día
que haya presupuesto de tokens, sin tocar los puestos.

NO piensa por sí solo: agrega datos que ya existen. Cuando se le enchufe un LLM
encima, este archivo ya le da el material limpio.

Uso:
  python3 neo_panel.py              # panorama en texto
  python3 neo_panel.py --json       # panorama estructurado
  python3 neo_panel.py --puesto magnet   # solo un puesto
"""
import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta, timezone

HOME = os.path.expanduser("~")
AGENTES = os.path.join(HOME, "veranomedia", "agentes")
RD = timezone(timedelta(hours=-4))

# Cada puesto: (archivo, argumentos para su corrida rápida, orden de importancia)
# El orden importa: primero lo que mide el DINERO (MAGNET), luego lo que lo
# alimenta (HUNTER), luego el respaldo (PROOF). Un director quiere ver eso arriba.
PUESTOS = {
    "magnet": ("agent_magnet.py", ["--dias", "7"], 1),
    "hunter": ("agent_hunter.py", ["--vertical", "dental"], 2),
    "proof":  ("agent_proof.py", ["--solo-listar"], 3),
}


def correr(nombre: str) -> dict:
    """Corre un puesto y devuelve su JSON. Nunca revienta el panel completo."""
    archivo, extra, _orden = PUESTOS[nombre]
    ruta = os.path.join(AGENTES, archivo)
    if not os.path.exists(ruta):
        return {"puesto": nombre, "error": f"no existe {archivo}"}

    try:
        r = subprocess.run(
            ["python3", ruta, "--json", *extra],
            capture_output=True, text=True, timeout=280, cwd=AGENTES,
        )
    except subprocess.TimeoutExpired:
        return {"puesto": nombre, "error": "tardó más de 280s"}
    except Exception as e:
        return {"puesto": nombre, "error": str(e)[:120]}

    if not r.stdout.strip():
        return {"puesto": nombre, "error": (r.stderr or "sin salida")[:160]}

    try:
        datos = json.loads(r.stdout)
    except json.JSONDecodeError as e:
        # Un puesto que no devuelve JSON válido es un puesto roto: se reporta.
        return {"puesto": nombre, "error": f"JSON inválido: {e}", "crudo": r.stdout[:200]}

    datos["puesto"] = nombre
    datos["rc"] = r.returncode
    return datos


def main() -> int:
    ap = argparse.ArgumentParser(description="NEO — panel del departamento VM")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--puesto", choices=sorted(PUESTOS))
    args = ap.parse_args()

    nombres = [args.puesto] if args.puesto else sorted(
        PUESTOS, key=lambda p: PUESTOS[p][2]
    )
    resultados = {n: correr(n) for n in nombres}

    bloqueados, decisiones, errores = [], [], []
    for n, d in resultados.items():
        if d.get("error"):
            errores.append(f"{n}: {d['error']}")
            continue
        if d.get("bloqueado_por"):
            bloqueados.append(f"{n}: {str(d['bloqueado_por'])[:150]}")
        for h in d.get("hallazgos") or []:
            decisiones.append(f"[{n}] {h}")
        for rec in d.get("recomendaciones") or []:
            decisiones.append(f"[{n}] → {rec}")

    if args.json:
        print(json.dumps({
            "ts": datetime.now(RD).isoformat(),
            "puestos": resultados,
            "bloqueados": bloqueados,
            "errores": errores,
            "para_decidir": decisiones,
        }, ensure_ascii=False, indent=2))
        return 0

    print("🧠 PANEL DEL DEPARTAMENTO — VeranoMedia")
    print(f"   {datetime.now(RD).strftime('%Y-%m-%d %H:%M')} AST")
    print()

    # --- lo que reporta cada puesto ---------------------------------------
    for n in nombres:
        d = resultados[n]
        if d.get("error"):
            print(f"❌ {n.upper()} — {d['error']}")
            continue
        icono = {"magnet": "🧲", "hunter": "🏹", "proof": "📚"}.get(n, "•")
        if n == "magnet":
            L = d.get("leads", {})
            print(f"{icono} MAGNET — {L.get('total', 0)} leads en 7d "
                  f"(hoy {L.get('hoy', 0)}, ayer {L.get('ayer', 0)})")
            for f, c in (L.get("por_fuente") or {}).items():
                print(f"     · {f}: {c}")
            cal = d.get("calientes") or []
            print(f"     🔥 calientes sin atender: {len(cal)}")
        elif n == "hunter":
            print(f"{icono} HUNTER — {d.get('nuevos', 0)} prospecto(s) nuevo(s)")
        elif n == "proof":
            print(f"{icono} PROOF — {d.get('total', 0)} pruebas "
                  f"({d.get('verificadas', 0)} verificadas)")
        print()

    # --- lo que necesita acción -------------------------------------------
    if bloqueados:
        print("🚧 BLOQUEADO (necesita a Peter):")
        for b in bloqueados:
            print(f"   · {b}")
        print()

    if decisiones:
        print("📋 PARA DECIDIR:")
        for d in decisiones:
            print(f"   · {d}")
        print()

    if errores:
        print("❌ PUESTOS ROTOS:")
        for e in errores:
            print(f"   · {e}")
        print()

    if not bloqueados and not errores:
        print("✅ Todo operativo.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
