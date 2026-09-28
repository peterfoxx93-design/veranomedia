#!/usr/bin/env python3
"""PROOF — Banco de casos y prueba del departamento de marketing de VM.

POR QUÉ EXISTE
--------------
Las pruebas de VM (el caso de la clínica dental 0→20 pacientes, las métricas
de la campaña, los resultados de la tienda) viven dispersas: dentro de un
artículo del blog, en un post de X, en la memoria de Neo, en el cuerpo de
BlogPost.tsx. Nadie puede verlas juntas, así que se desperdician: el mismo
dato sirve para un artículo, una propuesta comercial, un post y un lead magnet,
pero hoy hay que buscarlo caso por caso.

Este agente mantiene UN archivo con todas las pruebas citables de VM, cada una
con su fuente y su nivel de verificación, para que cualquier otro puesto
(contenido, prospección, propuestas) pueda citar sin inventar nada.

REGLA DURA: no se inventa ninguna métrica. Cada prueba declara:
  - dato       la cifra o el hecho
  - fuente     de dónde salió (archivo, artículo, medición propia)
  - band       verified | probable | possible  (mismo criterio que LeadEvidence)
  - uso        en qué se puede usar (blog, venta, redes, lead magnet)
  - cliente    si es de un cliente, para respetar su privacidad al publicar

Uso:
  python3 agent_proof.py                    # regenera el banco y reporta
  python3 agent_proof.py --solo-listar      # muestra el banco actual
  python3 agent_proof.py --agregar          # interactivo (no usado por cron)
"""
import argparse
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

HOME = os.path.expanduser("~")
BANCO = os.path.join(HOME, "veranomedia", "marketing", "BANCO-PRUEBAS.json")
BANCO_MD = os.path.join(HOME, "veranomedia", "marketing", "BANCO-PRUEBAS.md")
ARTICLES = os.path.join(HOME, "veranomedia", "src", "blog", "articles.ts")
BLOGPOST = os.path.join(HOME, "veranomedia", "src", "routes", "BlogPost.tsx")
CAMPAIGN = os.path.join(HOME, "veranomedia", "prospeccion", "campaign.json")
RD = timezone(timedelta(hours=-4))


def leer(path: str) -> str:
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except Exception:
        return ""


def casos_del_blog() -> list[dict]:
    """Extrae los artículos que son casos prácticos (tienen métricas reales)."""
    txt = leer(ARTICLES)
    pruebas = []
    # separar por bloques de artículo y buscar los de tipo caso
    for m in re.finditer(
        r"id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*category:\s*'([^']*)',\s*"
        r"slug:\s*'([^']+)',\s*readTime:\s*(\d+),\s*excerpt:\s*'([^']*)'",
        txt,
    ):
        ident, titulo, cat, slug, rt, excerpt = m.groups()
        es_caso = "caso" in ident.lower() or "caso" in titulo.lower() or "caso" in cat.lower()
        if not es_caso:
            continue
        pruebas.append({
            "dato": titulo,
            "detalle": excerpt,
            "fuente": f"blog/{slug}",
            "band": "verified",   # el artículo está publicado y describe un caso real
            "uso": ["blog", "venta", "redes"],
            "cliente": "",         # el artículo declara que se omiten datos por privacidad
        })
    return pruebas


def metricas_campana() -> list[dict]:
    """Saca las métricas reales de la campaña de prospección (medición propia)."""
    pruebas = []
    try:
        with open(CAMPAIGN, encoding="utf-8") as f:
            c = json.load(f)
    except Exception:
        return pruebas

    # la campaña guarda los prospectos en 'prospects' (o 'prospectos' en versiones
    # viejas). Se aceptan las dos y también el formato de lista suelta.
    prospectos = None
    if isinstance(c, dict):
        prospectos = c.get("prospects") or c.get("prospectos")
    elif isinstance(c, list):
        prospectos = c
    if not isinstance(prospectos, list):
        return pruebas

    enviados = 0
    respondidos = 0      # respuesta HUMANA
    auto = 0             # autorespuesta (bot del negocio), no cuenta como interés
    for p in prospectos:
        if not isinstance(p, dict):
            continue
        enviados += len(p.get("sent") or [])
        if p.get("replied"):
            if p.get("auto_replied"):
                auto += 1
            else:
                respondidos += 1

    if enviados:
        # REGLA: solo cuenta como respuesta la de una persona. Las autorespuestas
        # (auto_replied, típicas de clínicas con bot de bienvenida) inflan la
        # métrica y hacen creer que hay interés donde no lo hay. Se reportan
        # aparte para no mentir ni al alza ni a la baja.
        tasa = round(respondidos / max(len(prospectos), 1) * 100, 1)
        cadencia = c.get("cadence_days") if isinstance(c, dict) else None
        cad_txt = "/".join(str(x) for x in cadencia) if cadencia else "0/3/8/14/21"
        detalle = (
            f"{respondidos} respuesta(s) humana(s) de {len(prospectos)} prospectos. "
            f"Cadencia {cad_txt} días, ventana mar-mié-jue."
        )
        if auto:
            detalle += f" ({auto} autorespuesta(s) de bot, no cuentan como interés.)"
        pruebas.append({
            "dato": (
                f"Campaña R4: {enviados} correos a {len(prospectos)} prospectos, "
                f"{tasa}% de respuesta humana"
            ),
            "detalle": detalle,
            "fuente": "medicion-propia (prospeccion/campaign.json)",
            "band": "verified",
            "uso": ["venta", "blog"],
            "cliente": "",
        })
    return pruebas


def datos_verificados_del_audit() -> list[dict]:
    """Los datos de mercado que el AUDIT ya tiene en lista blanca (con fuente)."""
    txt = leer(os.path.join(HOME, "veranomedia", "agentes", "agent_audit.py"))
    pruebas = []
    for m in re.finditer(r'^\s+"([^"]{2,12})",\s*#\s*(.+)$', txt, re.M):
        dato, comentario = m.groups()
        pruebas.append({
            "dato": dato,
            "detalle": comentario.strip(),
            "fuente": "agent_audit.py (lista blanca)",
            "band": "verified",
            "uso": ["blog", "redes", "venta"],
            "cliente": "",
        })
    return pruebas


def dedupe(pruebas: list[dict]) -> list[dict]:
    vistos, salida = set(), []
    for p in pruebas:
        clave = (p.get("dato") or "").strip()[:80]
        if clave and clave not in vistos:
            vistos.add(clave)
            salida.append(p)
    return salida


def escribir_md(pruebas: list[dict]) -> None:
    lineas = [
        "# 📚 BANCO DE PRUEBAS — VeranoMedia",
        "",
        "> Todas las pruebas citables del departamento de marketing, con su fuente.",
        "> **Regla dura: no se inventa ninguna métrica.** Si no está aquí, no se usa.",
        "",
        f"_Generado: {datetime.now(RD).strftime('%Y-%m-%d %H:%M')} AST · "
        f"{len(pruebas)} pruebas_",
        "",
        "## Cómo leer las bandas",
        "",
        "- `verified` — dato medido por VM o publicado con fuente verificable",
        "- `probable` — dato de tercero creíble, pendiente de confirmar la fuente original",
        "- `possible` — indicio sin confirmar; NO usar en contenido público",
        "",
        "## Pruebas",
        "",
    ]
    for i, p in enumerate(pruebas, 1):
        lineas.append(f"### {i}. {p.get('dato')}")
        if p.get("detalle"):
            lineas.append(f"{p['detalle']}")
        lineas.append("")
        lineas.append(f"- **Fuente:** `{p.get('fuente')}`")
        lineas.append(f"- **Banda:** `{p.get('band')}`")
        lineas.append(f"- **Uso:** {', '.join(p.get('uso') or [])}")
        if p.get("cliente"):
            lineas.append(f"- **Cliente:** {p['cliente']} (respetar privacidad al publicar)")
        lineas.append("")
    with open(BANCO_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(lineas))


def main() -> int:
    ap = argparse.ArgumentParser(description="PROOF — banco de pruebas VM")
    ap.add_argument("--solo-listar", action="store_true")
    ap.add_argument(
        "--json",
        action="store_true",
        help="salida estructurada para que Neo (u otro agente) la lea y actúe",
    )
    args = ap.parse_args()

    if args.solo_listar:
        pruebas: list[dict] = []
        try:
            with open(BANCO, encoding="utf-8") as f:
                cargado = json.load(f)
            if isinstance(cargado, list):
                pruebas = [p for p in cargado if isinstance(p, dict)]
        except Exception:
            if args.json:
                print(json.dumps({
                    "agente": "proof", "nuevos": 0, "pruebas": [],
                    "hallazgos": ["No hay banco todavía."],
                    "recomendaciones": ["Correr sin --solo-listar para generarlo."],
                }, ensure_ascii=False, indent=2))
                return 0
            print("(no hay banco todavía — corre sin --solo-listar)")
            return 0
    else:
        pruebas = dedupe(
            casos_del_blog() + metricas_campana() + datos_verificados_del_audit()
        )
        os.makedirs(os.path.dirname(BANCO), exist_ok=True)
        with open(BANCO, "w", encoding="utf-8") as f:
            json.dump(pruebas, f, ensure_ascii=False, indent=2)
        escribir_md(pruebas)

    if not pruebas:
        print("⚠️ PROOF: el banco quedó vacío. Revisar las fuentes (blog, campaña, audit).")
        return 1

    verified = sum(1 for p in pruebas if p.get("band") == "verified")
    possible = sum(1 for p in pruebas if p.get("band") == "possible")

    if args.json:
        print(json.dumps({
            "agente": "proof",
            "ts": datetime.now(RD).isoformat(),
            "total": len(pruebas),
            "verificadas": verified,
            "sin_verificar": possible,
            "archivo_json": BANCO,
            "archivo_md": BANCO_MD,
            "pruebas": pruebas,
            "hallazgos": [f"{len(pruebas)} pruebas en el banco, {verified} verificadas."],
            "recomendaciones": (
                ["Hay pruebas sin verificar: no usarlas en contenido público."]
                if possible else []
            ),
        }, ensure_ascii=False, indent=2))
        return 0

    print(f"📚 BANCO DE PRUEBAS VM — {len(pruebas)} pruebas ({verified} verificadas)")
    print()
    for p in pruebas:
        marca = {"verified": "✅", "probable": "🟡", "possible": "⚪"}.get(
            str(p.get("band") or ""), "?"
        )
        print(f"  {marca} {str(p.get('dato') or '')[:88]}")
    if len(pruebas) > 12:
        print(f"  … y {len(pruebas) - 12} más")
    print()
    print(f"📄 {BANCO_MD}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
