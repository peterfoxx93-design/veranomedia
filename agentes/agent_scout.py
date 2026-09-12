#!/usr/bin/env python3
"""SCOUT - Agente de Senales VM. Busca tendencias, preguntas de clientes y oportunidades.

Backends de busqueda (en orden, todos sin API key):
  1. DuckDuckGo HTML  -> resultados web reales + snippet
  2. Google News RSS  -> noticias es-419 / DO
(Bing RSS fue RETIRADO 2026-09-10: Bing depreco format=rss y devolvia relleno irrelevante.)
(2026-09-12: DDG responde HTTP 202 = bloqueo anti-bot desde esta IP. Se agrego reintento,
 consulta alternativa por vertical vacia y GEO-filter en la consulta alternativa.)

Salida: ~/veranomedia/agentes/scout/YYYY-MM-DD.md
Reglas del archivo:
  - MAX 6 senales por vertical, sin duplicados (dedupe por URL Y por titulo normalizado).
  - Una corrida mala NO borra senales buenas del dia: se fusiona con lo ya escrito.
  - El conteo impreso == numero de senales en el archivo (nunca mentir en el log).
"""
import os, re, html, time, unicodedata, urllib.request, urllib.parse
from datetime import datetime

OUT_DIR = os.path.expanduser("~/veranomedia/agentes/scout")
os.makedirs(OUT_DIR, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36"}
MAX_PER_VERTICAL = 6

VERTICALS = [
    ("Clinicas dentales", "clinicas dentales Republica Dominicana automatizacion citas pacientes",
     ["dental", "odontolog", "clinica", "cita", "paciente", "diente", "salud"]),
    ("Inmobiliarias", "agentes inmobiliarios Republica Dominicana leads seguimiento WhatsApp",
     ["inmobiliar", "agente", "propiedad", "lead", "alquiler", "venta", "real estate", "proyecto",
      "acoprovi", "vivienda"]),  # acoprovi = asociacion dominicana del sector: senal RD fiable
    ("Pymes RD", "pequenas empresas Republica Dominicana atencion al cliente WhatsApp ventas",
     ["pyme", "mipyme", "empresa", "cliente", "whatsapp", "ventas", "rep dom", "dominicana", "negocio", "comercio"]),
]
TRENDS = ("inteligencia artificial marketing digital 2026 Latinoamerica automatizacion negocios",
          ["ia", "inteligencia artificial", "automatizacion", "marketing", "digital", "whatsapp", "empresa", "negocio"])

# Consulta alternativa si la vertical queda vacia
ALT_QUERIES = {
    "Clinicas dentales": "odontologia clinica dental Republica Dominicana gestion pacientes",
    "Inmobiliarias": "acoprovi mercado inmobiliario Republica Dominicana",
    "Pymes RD": "mipymes Republica Dominicana digitalizacion empresas",
}
ALT_TRENDS = "automatizacion inteligencia artificial empresas"

# Exigido SOLO en consultas alternativas: evita ruido LATAM (Miami, CDMX) en verticales RD.
# Se usan raices ("dominic") porque el genero varia: dominicana / dominicano.
GEO = ["dominic", " rep dom", " rep. dom", "santo domingo", "santiago", "acoprovi",
       "punta cana", "elcaribe", "diario libre", "acento", "el nuevo diario", "eldinero", "listin"]


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


def _norm(s):
    s = unicodedata.normalize("NFKD", (s or "").lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9 ]", "", s).strip()


def search_ddg(query, limit=5):
    """DuckDuckGo HTML - resultados web reales con snippet. Puede responder 202 (bloqueo)."""
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
            raise RuntimeError("ddg sin resultados (posible HTTP 202/bloqueo)")
        return out
    except Exception as e:
        raise RuntimeError("ddg: " + str(e))


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


def search_web(query, limit=5, attempts=2):
    """Cadena de backends: DDG -> Google News, con reintento (DDG rate-limita/bloquea)."""
    errors = []
    for fn in (search_ddg, search_gnews):
        for a in range(attempts):
            try:
                r = fn(query, limit)
                if r:
                    return r, (fn.__name__ if a == 0 else fn.__name__ + "+retry")
            except Exception as e:
                errors.append(str(e))
                time.sleep(1.5 * (a + 1))
    return [{"title": "SIN SENALES: " + " | ".join(errors), "url": "", "snippet": "", "src": "err"}], "none"


# Ruido que suele colarse por coincidencia de una sola palabra clave
NOISE = ["torneo", "golf", "rifa", "sorteo", "horoscopo", "obituario", "felicidades",
         "aniversario institucional", "felicitaciones"]


def relevant(item, keywords, geo=False):
    """Marca si el resultado toca el vertical (evita ruido tipo Wikipedia/Toyota)."""
    blob = (item["title"] + " " + item.get("snippet", "")).lower()
    if any(n in blob for n in NOISE):
        return False
    if not any(k in blob for k in keywords):
        return False
    if geo and not any(g in blob for g in GEO):
        return False
    return True


def parse_existing(path):
    """Lee el archivo del dia ya escrito -> {nombre_vertical: [item, ...]}."""
    secs, cur = {}, None
    if not os.path.exists(path):
        return secs
    for ln in open(path, encoding="utf-8").read().split("\n"):
        if ln.startswith("## "):
            cur = ln[3:].strip()
            secs.setdefault(cur, [])
        elif cur and re.match(r"^\d+\. ", ln):
            secs[cur].append({"title": ln.split(". ", 1)[1].strip(), "snippet": "", "url": ""})
        elif cur and secs[cur] and ln.startswith("   > "):
            secs[cur][-1]["snippet"] = ln[5:].strip()
        elif cur and secs[cur] and ln.strip().startswith("http"):
            secs[cur][-1]["url"] = ln.strip()  # la URL va indentada: hay que hacer strip()
    return secs


def dedupe(items):
    """Dedupe por URL y por titulo normalizado (una copia puede venir sin URL)."""
    out, urls, titles = [], set(), set()
    for r in items:
        if r["title"].startswith("SIN SENALES"):
            continue
        tn = _norm(r["title"])
        u = (r.get("url") or "").strip()
        if (u and u in urls) or (tn and tn in titles):
            continue
        if u:
            urls.add(u)
        titles.add(tn)
        out.append(r)
    return out


MONTHS = {m: i for i, m in enumerate(
    ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}


def _datekey(item):
    """Ordenar por frescura: las noticias (snippet='Fri, 11 Sep 2026') van primero y mas nuevas arriba."""
    sn = item.get("snippet", "")
    m = re.match(r"\w{3}, (\d{1,2}) (\w{3}) (\d{4})", sn)
    if m:
        mo = MONTHS.get(m.group(2).lower(), 0)
        return (1, int(m.group(3)) * 10000 + mo * 100 + int(m.group(1)))
    return (0, 0)


def collect(results, keywords, old_items=None, geo=False):
    ok = [r for r in results if relevant(r, keywords, geo)]
    merged = dedupe(list(ok) + list(old_items or []))
    # el filtro anti-ruido tambien limpia lo heredado de corridas anteriores
    merged = [r for r in merged if not any(n in (r["title"] + " " + r.get("snippet", "")).lower() for n in NOISE)]
    merged.sort(key=_datekey, reverse=True)  # frescura primero; el resto mantiene su orden
    return merged[:MAX_PER_VERTICAL]


def emit(lines, name, query, items):
    lines.append("## " + name)
    lines.append("*Busqueda: " + query + "*")
    for i, r in enumerate(items, 1):
        lines.append(str(i) + ". " + r["title"])
        if r.get("snippet"):
            lines.append("   > " + r["snippet"])
        if r.get("url"):
            lines.append("   " + r["url"])
    if not items:
        lines.append("- _Sin senales relevantes (backend devolvio ruido). Requiere busqueda profunda._")
    lines.append("")
    return len(items)


def main():
    today = datetime.now().strftime("%Y-%m-%d")
    out_file = os.path.join(OUT_DIR, today + ".md")
    print("SCOUT activo - " + today)
    prev = parse_existing(out_file)
    lines = ["# Senales Scout - " + today, ""]
    total = 0

    jobs = [(n, q, kw) for n, q, kw in VERTICALS] + [("Tendencias IA/Marketing", TRENDS[0], TRENDS[1])]
    for name, query, kw in jobs:
        print("  -> " + name + "...")
        res, backend = search_web(query)
        items = collect(res, kw, prev.get(name))
        print("     backend=" + backend + " resultados=" + str(len(res)) + " escritos=" + str(len(items)))
        if not items:  # vertical vacia -> consulta alternativa con filtro GEO (solo verticales RD)
            alt = ALT_QUERIES.get(name) or (ALT_TRENDS if name.startswith("Tendencias") else None)
            if alt:
                print("     vertical vacia -> consulta alternativa (geo-filter)")
                res2, b2 = search_web(alt)
                use_geo = name in ALT_QUERIES
                items = collect(res2, kw, prev.get(name), geo=use_geo)
                query = alt
                print("     backend_alt=" + b2 + " resultados=" + str(len(res2)) + " escritos=" + str(len(items)))
        total += emit(lines, name, query, items)

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
    written = len(re.findall(r"(?m)^\d+\. ", "\n".join(lines)))
    print("SCOUT completo -> " + out_file)
    print("   Senales relevantes: " + str(written) + " (contador interno: " + str(total) + ")")
    return 0


if __name__ == "__main__":
    main()
