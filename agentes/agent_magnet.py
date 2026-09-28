#!/usr/bin/env python3
"""MAGNET — Motor de captura de leads del departamento de marketing de VM.

POR QUÉ EXISTE
--------------
El departamento tenía 5 puestos produciendo (contenido, prospección, calidad,
nutrición, inteligencia) y NINGUNO capturando. El sitio informaba pero no
convertía: /diagnostico mandaba a una página sin formulario, los artículos
terminaban sin captura, y el lead magnet llevaba desde junio sin publicar.

Este agente es el que cierra el ciclo. Corre cada mañana y responde tres
preguntas que hasta ahora nadie hacía:

  1. ¿CUÁNTOS leads entraron ayer, de dónde y con qué calidad?
  2. ¿HAY leads calientes (score >= 7) sin atender?
  3. ¿CUÁL es la tasa de conversión por fuente (web / whatsapp / blog)?

Y si detecta algo que necesita acción humana, avisa por WhatsApp a Peter.

Uso:
  python3 agent_magnet.py                 # reporte del día (lo que corre el cron)
  python3 agent_magnet.py --dias 7        # ventana distinta
  python3 agent_magnet.py --test-wa       # probar la alerta de WhatsApp

Si el bridge de WhatsApp falla, imprime el aviso en pantalla -> el cron lo
entrega por Telegram como respaldo.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

HOME = os.path.expanduser("~")
CRM_ENV = os.path.join(HOME, "veranomedia-crm", ".env")
STATE = os.path.join(HOME, ".hermes", "output", "magnet-estado.json")
LOG = os.path.join(HOME, ".hermes", "output", "magnet.log")
BRIDGE = "http://127.0.0.1:3001/send"
PETER_WA = "18296848477"          # 829-684-8477
CRM = "https://crm.veranomedia.click"
UMBRAL_CALIENTE = 7               # mismo umbral que autoStatus del CRM

RD = timezone(timedelta(hours=-4))


def log(msg: str) -> None:
    os.makedirs(os.path.dirname(LOG), exist_ok=True)
    linea = f"{datetime.now(RD).isoformat(timespec='seconds')} — {msg}"
    with open(LOG, "a") as f:
        f.write(linea + "\n")


def leer_env(clave: str) -> str:
    """Lee una clave del .env del CRM sin exponerla."""
    try:
        with open(CRM_ENV) as f:
            for linea in f:
                if linea.startswith(clave + "="):
                    return linea.split("=", 1)[1].strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return ""


def api(path: str, cookie: str = "") -> tuple[int, dict]:
    """GET a la API del CRM. Devuelve (status, datos) — datos siempre es dict."""
    req = urllib.request.Request(f"{CRM}{path}")
    if cookie:
        req.add_header("Cookie", f"vm_crm_session={cookie}")
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            datos = json.load(r)
            return r.status, datos if isinstance(datos, dict) else {"items": datos}
    except urllib.error.HTTPError as e:
        return e.code, {}
    except Exception as e:
        return 0, {"error": str(e)}


def login() -> str:
    """Login de admin para leer los leads. Devuelve el token de sesión."""
    pw = leer_env("CRM_ADMIN_PASSWORD")
    if not pw:
        return ""
    body = json.dumps({"username": "admin", "password": pw}).encode()
    req = urllib.request.Request(
        f"{CRM}/api/auth", data=body, headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            cookie = r.headers.get("Set-Cookie", "")
            m = re.search(r"vm_crm_session=([^;]+)", cookie)
            return m.group(1) if m else ""
    except Exception:
        return ""


def whatsapp(texto: str) -> bool:
    """Manda la alerta por WhatsApp vía el bridge local.

    El bridge (Baileys) espera un JID completo, no un número suelto: con
    "18296848477" responde 500 (`Cannot destructure property 'user' of
    'jidDecode(...)' as it is undefined`). Se añade el sufijo @s.whatsapp.net
    si no viene ya.
    """
    jid = PETER_WA if "@" in PETER_WA else f"{PETER_WA}@s.whatsapp.net"
    payload = json.dumps({"to": jid, "message": texto}).encode()
    req = urllib.request.Request(
        BRIDGE, data=payload, headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status == 200
    except Exception:
        return False


def cargar_estado() -> dict:
    try:
        with open(STATE) as f:
            return json.load(f)
    except Exception:
        return {"avisados": [], "ultimo_reporte": ""}


def guardar_estado(e: dict) -> None:
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    with open(STATE, "w") as f:
        json.dump(e, f, ensure_ascii=False, indent=2)


def main() -> int:
    ap = argparse.ArgumentParser(description="MAGNET — motor de captura VM")
    ap.add_argument("--dias", type=int, default=2, help="ventana en días (default 2)")
    ap.add_argument("--test-wa", action="store_true", help="probar la alerta WhatsApp")
    args = ap.parse_args()

    if args.test_wa:
        ok = whatsapp("🧪 Prueba del agente MAGNET — si ves esto, las alertas de leads funcionan.")
        print("WhatsApp:", "✅ enviado" if ok else "❌ falló")
        return 0 if ok else 1

    cookie = login()
    if not cookie:
        msg = "🚨 MAGNET no pudo entrar al CRM (login falló). Revisar CRM_ADMIN_PASSWORD."
        print(msg)
        log("login fallido")
        return 1

    st, datos = api(f"/api/leads?days={args.dias}", cookie)
    if st != 200 or not datos:
        msg = f"🚨 MAGNET no pudo leer los leads del CRM (HTTP {st})."
        print(msg)
        log(msg)
        return 1

    leads = datos.get("leads", [])
    hoy = datetime.now(RD).date()
    ayer = hoy - timedelta(days=1)

    # --- desglose por día y por fuente ------------------------------------
    por_fuente: dict[str, int] = {}
    por_dia: dict[str, int] = {}
    for l in leads:
        creado = (l.get("createdAt") or "")[:10]
        if not creado:
            continue
        por_dia[creado] = por_dia.get(creado, 0) + 1
        f = l.get("source") or "sin_fuente"
        por_fuente[f] = por_fuente.get(f, 0) + 1

    entrados_ayer = por_dia.get(ayer.isoformat(), 0)
    entrados_hoy = por_dia.get(hoy.isoformat(), 0)

    # --- leads calientes sin atender --------------------------------------
    # "Sin atender" = score alto y sin interacciones registradas.
    calientes = [
        l for l in leads
        if (l.get("score") or 0) >= UMBRAL_CALIENTE
        and not l.get("interactions")
        and l.get("status") != "ganado"
    ]

    # --- reporte ----------------------------------------------------------
    lineas = [
        f"🧲 MAGNET — captura de leads ({args.dias}d)",
        "",
        f"📥 Ayer: {entrados_ayer} | Hoy: {entrados_hoy} | Total ventana: {len(leads)}",
    ]

    if por_fuente:
        lineas.append("")
        lineas.append("Por fuente:")
        for f, n in sorted(por_fuente.items(), key=lambda x: -x[1]):
            lineas.append(f"  · {f}: {n}")

    lineas.append("")
    if calientes:
        lineas.append(f"🔥 {len(calientes)} lead(s) CALIENTE(S) sin atender:")
        for l in calientes[:5]:
            lineas.append(
                f"  · {l.get('name')} ({l.get('business') or 'sin negocio'}) "
                f"score={l.get('score')} — {l.get('phone') or l.get('email')}"
            )
    else:
        lineas.append("✅ Sin leads calientes pendientes de atender.")

    reporte = "\n".join(lineas)
    print(reporte)
    log(f"reporte: {len(leads)} leads, {len(calientes)} calientes")

    # --- alerta por WhatsApp solo si hay calientes NUEVOS -----------------
    estado = cargar_estado()
    avisados = set(estado.get("avisados", []))
    nuevos = [l for l in calientes if str(l.get("id")) not in avisados]

    if nuevos:
        texto = f"🔥 {len(nuevos)} lead(s) caliente(s) nuevo(s) en el CRM:\n"
        for l in nuevos[:3]:
            texto += (
                f"\n· {l.get('name')} — {l.get('business') or 'sin negocio'}"
                f"\n  score {l.get('score')} · {l.get('phone') or l.get('email')}"
            )
        texto += "\n\nEntra al CRM y atiéndelo antes de que se enfríe."
        if whatsapp(texto):
            avisados.update(str(l.get("id")) for l in nuevos)
            estado["avisados"] = sorted(avisados)
            log(f"avisados por WA: {len(nuevos)}")
        else:
            print("\n⚠️ (No se pudo enviar la alerta por WhatsApp — el cron la entrega por Telegram.)")
            log("alerta WA falló")

    estado["ultimo_reporte"] = datetime.now(RD).isoformat(timespec="seconds")
    guardar_estado(estado)
    return 0


if __name__ == "__main__":
    sys.exit(main())
