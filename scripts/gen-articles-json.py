#!/usr/bin/env python3
"""
Genera api/articles.json desde src/blog/articles.ts.

POR QUE EXISTE:
La funcion serverless api/blog-og.ts necesita la lista de articulos para inyectar
las OG tags cuando un crawler (WhatsApp, LinkedIn, X) pide /blog/<slug>. Una
Function de Vercel se empaqueta sola: no puede importar modulos de src/, asi que
el import dinamico fallaba y el handler devolvia la SPA sin OG tags en silencio.

SOLUCION: un JSON plano que la funcion SI puede importar. La SPA sigue leyendo
articles.ts (fuente de verdad); este script mantiene el JSON sincronizado.

CUANDO EJECUTARLO:
Cada vez que se anade, edita o despublica un articulo en src/blog/articles.ts.
Si no se regenera, el blog sirve bien (200) pero los previews al compartir no
llevan el titulo ni el resumen correctos.

USO:
    python3 scripts/gen-articles-json.py
"""

import json
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FUENTE = os.path.join(RAIZ, "src", "blog", "articles.ts")
DESTINO = os.path.join(RAIZ, "api", "articles.json")


def campo(bloque, nombre):
    """Lee un campo de texto: acepta comillas simples o dobles."""
    m = re.search(rf"{nombre}:\s*'([^']*)'", bloque) or re.search(
        rf'{nombre}:\s*"([^"]*)"', bloque
    )
    return m.group(1) if m else None


def booleano(bloque, nombre):
    m = re.search(rf"{nombre}:\s*(true|false)", bloque)
    return m.group(1) == "true" if m else True


def main():
    if not os.path.exists(FUENTE):
        print(f"  no existe: {FUENTE}")
        sys.exit(1)

    texto = open(FUENTE, encoding="utf-8").read()
    articulos = []
    vistos = set()

    # El archivo es una lista plana de objetos; se corta por 'slug:' y se leen
    # los campos de cada bloque. No se usa un parser de TS completo a proposito:
    # agregar esa dependencia por un solo archivo no se justifica.
    for bloque in texto.split("{\n"):
        if "slug:" not in bloque:
            continue
        slug = campo(bloque, "slug")
        if not slug or slug in vistos:
            continue
        vistos.add(slug)

        art = {
            "id": campo(bloque, "id") or slug,
            "slug": slug,
            "title": campo(bloque, "title") or "",
            "category": campo(bloque, "category") or "",
            "excerpt": campo(bloque, "excerpt") or "",
            "date": campo(bloque, "date") or "",
            "published": booleano(bloque, "published"),
        }
        m = re.search(r"readTime:\s*(\d+)", bloque)
        if m:
            art["readTime"] = int(m.group(1))
        articulos.append(art)

    os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
    with open(DESTINO, "w", encoding="utf-8") as f:
        json.dump(articulos, f, ensure_ascii=False, indent=2)

    publicados = sum(1 for a in articulos if a["published"])
    print(f"  {len(articulos)} articulos -> {os.path.relpath(DESTINO, RAIZ)}")
    print(f"  publicados: {publicados}")
    for a in articulos:
        estado = " " if a["published"] else "x"
        print(f"    [{estado}] {a['slug']}")


if __name__ == "__main__":
    main()
