#!/usr/bin/env python3
"""SCOUT - Agente de Senales VM. Busca tendencias, preguntas de clientes y oportunidades.

Backends de busqueda (en orden, todos sin API key):
  1. DuckDuckGo HTML  -> resultados web reales + snippet
  2. Google News RSS  -> noticias es-419 / DO
(Bing RSS fue RETIRADO 2026-09-10: Bing deprecó format=rss y devolvia relleno irrelevante.)

Salida: ~/veranomedia/agentes/scout/YYYY-MM-DD.md
"""
import os, re, html, urllib.request, urllib.parse
from datetime import datetime

OUT_DIR = os.path.expanduser("~/veranomedia/agentes/scout")
os.makedirs(OUT_DIR, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36"}


def _get(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="ignore")


def _unwrap(u):
    u = html.unescape(u)
    if "uddg=" in u:
        m = re.search(r"uddg=([^&]+)", u)
        if m:
            return urllib.parse.unquote(m.group(1))
    return u if u.startswith("http") else "https:" + u


def search_ddg(query, limit=5):
    """DuckDuckGo HTML - resultados web reales con snippet."""
    try:
        h = _get("https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query))
        blocks = re.findall(r'class="result__a"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', h, re.DOTALL)
        snips = re.findall(r'class="result__snippet"[^>]*>(.*?)</a>', h, re.DOTALL)
        out = []
        for i, (u, t) in enumerate(blocks):
            title = re.sub(r"<[^>]+>", "", html.unescape(t)).strip()
            if not title:
                continue
            sn = ""
            if i < len(snips):
                sn = re.sub(r"<[^>]+>", "", html.unescape(snips[i])).strip()
            out.append({"title": title[:120], "url": _unwrap(u), "snippet": sn[:200], "src": "ddg"})
            if len(out) >= limit:
                break
        if not out:
            raise RuntimeError("ddg sin resultados")
        return out
    except Exception as e:
        raise RuntimeError(f"ddg: {e}")


def search_gnews(query, limit=5):
    """Google News RSS (es-419 / DO) - noticias con fuente y fecha."""
    url = ("https://news.google.com/rss/search?q=" + urllib.parse.quote(query) +
           "&hl=es-419&gl=DO&ceid=DO:es-419")
    xml = _get(url)
    items = re.findall(r"<item>(.*?)</item>", xml, re.DOTALL)
    out = []
    for it in items:
        t = re.search(r"<title>(.*?)</title>", it, re.DOTALL)
        l = re.search(r"<link>(.*?)</link>", it, re.DOTALL)
        d = re.search(r"<pubDate>(.*?)</pubDate>", it, re.DOTALL)
        if not (t and l):
            continue
        title = re.sub(r"<!\[CDATA\[|\]\]>", "", t.group(1)).strip()
        title = re.sub(r"<[^>]+>", "", html.unescape(title)).strip()
        out.append({"title": title[:120], "url": l.group(1).strip(),
                    "snippet": (d.group(1)[:16] if d else ""), "src": "gnews"})
        if len(out) >= limit:
            break
    if not out:
        raise RuntimeError("gnews sin resultados")
    return out


def search_web(query, limit=5):
    """Cadena de backends: DDG -> Google News. Nunca devuelve relleno irrelevante."""
    errors = []
    for fn in (search_ddg, search_gnews):
        try:
            r = fn(query, limit)
            if r:
                return r, fn.__name__
        except Exception as e:
            errors.append(str(e))
    return [{"title": "SIN SENALES: " + " | ".join(errors), "url": "", "snippet": "", "src": "err"}], "none"


def relevant(item, keywords):
    """Marca si el resultado realmente toca el vertical (evita ruido tipo Wikipedia/Toyota)."""
    blob = (item["title"] + " " + item.get("snippet", "")).lower()
    return any(k in blob for k in keywords)


VERTICALS = [
    ("Clinicas dentales", "clinicas dentales Republica Dominicana automatizacion citas pacientes",
     ["dental", "odontolog", "clinica", "cita", "paciente", "diente", "salud"]),
    ("Inmobiliarias", "agentes inmobiliarios Republica Dominicana leads seguimiento WhatsApp",
     ["inmobiliar", "agente", "propiedad", "lead", "alquiler", "venta", "real estate", "proyecto"]),
    ("Pymes RD", "pequenas empresas Republica Dominicana atencion al cliente WhatsApp ventas",
     ["pyme", "mipyme", "empresa", "cliente", "whatsapp", "ventas", "rep dom", "dominicana", "negocio", "comercio"]),
]

TRENDS = ("inteligencia artificial marketing digital 2026 Latinoamerica automatizacion negocios",
          ["ia", "inteligencia artificial", "automatizacion", "marketing", "digital", "whatsapp", "empresa", "negocio"])


def render(lines, name, query, results, keywords):
    lines.append("## " + name)
    lines.append("*Busqueda: " + query + "*")
    ok = [r for r in results if relevant(r, keywords)]
    for i, r in enumerate(ok[:4], 1):
        lines.append(f"{i}. {r['title']}")
        if r.get("snippet"):
            lines.append("   > " + r["snippet"])
        if r.get("url"):
            lines.append("   " + r["url"])
    if not ok:
        lines.append("- _Sin senales relevantes (backend devolvio ruido). Requiere busqueda profunda._")
    lines.append("")
    return len(ok)


def main():
    today = datetime.now().strftime("%Y-%m-%d")
    out_file = os.path.join(OUT_DIR, today + ".md")
    print("SCOUT activo - " + today)
    lines = ["# Senales Scout - " + today, ""]
    total = 0
    for name, query, kw in VERTICALS:
        print("  -> " + name + "...")
        res, backend = search_web(query)
        total += render(lines, name, query, res, kw)
        print("     backend=" + backend + " resultados=" + str(len(res)))
    print("  -> Tendencias IA/marketing...")
    tq, tkw = TRENDS
    tres, tbackend = search_web(tq)
    total += render(lines, "Tendencias IA/Marketing", tq, tres, tkw)
    lines += [
        "## Criterios de prioridad",
        "- Tiene razon de existir AHORA? (evento, dato nuevo, temporada)",
        "- Le importa a un dueno de negocio en RD? (dolor real, medible)",
        "- Tenemos evidencia o podemos conseguirla? (dato, caso, testimonio)",
        "- Se convierte en post para clinicas O inmobiliarias?",
        "",
        "*Este archivo lo consume el agente STRATEGIST.*",
    ]
    open(out_file, "w").write("\n".join(lines))
    print("SCOUT completo -> " + out_file)
    print("   Senales relevantes: " + str(total))


if __name__ == "__main__":
    main()
