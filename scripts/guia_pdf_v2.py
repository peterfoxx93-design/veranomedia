#!/usr/bin/env python3
"""
Genera el PDF del lead magnet "5 señales de que tu negocio está perdiendo leads".

VERSION 2 — reemplaza al generador de imagenes (guia_premium_gen.py).

POR QUE SE REHIZO (2026-09-28):
La v1 renderizaba cada pagina como IMAGEN con Pillow. Consecuencias reales,
todas reportadas o verificadas:
  - CERO enlaces: el boton "AGENDA TU LLAMADA" estaba dibujado, no era
    clickeable. El lector lo pulsaba y no pasaba nada. Peter lo reporto.
  - No buscable ni copiable: no se puede seleccionar texto ni citarlo.
  - Google no lo indexa.
  - 1,25 MB para 7 paginas (fotos de fondo con overlay oscuro).
  - El texto se veia pequeno: el lienzo era 1080x1920 y al escalar al PDF
    (648x1152) la tipografia se encogia. Peter: "el texto debe ser mas grande".

VERSION 2:
  - Texto REAL con reportlab: seleccionable, buscable, indexable.
  - Enlaces nativos en el CTA, el correo y el pie.
  - Tipografia GRANDE: cuerpo 15pt, titulares hasta 40pt.
  - Sin fotos de fondo: ~200-350 KB.

USO:
    python3 guia_pdf_v2.py
Salida: ~/slides/guia-5-senales-v2.pdf
"""

import os

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as rl_canvas

# ---------------------------------------------------------------- medidas
ANCHO, ALTO = A4  # 595 x 842 pt
MARGEN = 56

# ---------------------------------------------------------------- paleta
# Azul de marca VM. NUNCA como fondo (regla de marca): aqui solo en acentos,
# filetes y el boton del CTA.
AZUL = HexColor("#5170FF")
AZUL_CLARO = HexColor("#8FA3FF")
NEGRO = HexColor("#0B0D12")
BLANCO = HexColor("#FFFFFF")
GRIS = HexColor("#5A6070")
GRIS_CLARO = HexColor("#E8EAF0")
ORO = HexColor("#C89B3C")

# ---------------------------------------------------------------- fuentes
# DejaVu esta disponible en Termux y trae acentos completos. Helvetica (la
# fuente por defecto de reportlab) no cubre todos los glifos del español.
RUTAS_FUENTE = [
    "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans.ttf",
    "/system/fonts/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
RUTAS_BOLD = [
    "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
    "/system/fonts/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def registrar_fuentes():
    normal = next((p for p in RUTAS_FUENTE if os.path.exists(p)), None)
    bold = next((p for p in RUTAS_BOLD if os.path.exists(p)), None)
    if normal:
        pdfmetrics.registerFont(TTFont("VM", normal))
    if bold:
        pdfmetrics.registerFont(TTFont("VM-Bold", bold))
    return ("VM" if normal else "Helvetica", "VM-Bold" if bold else "Helvetica-Bold")


FUENTE, FUENTE_BOLD = registrar_fuentes()

# ---------------------------------------------------------------- contenido
WA = ("https://wa.me/18093586497?text=Hola%2C%20vi%20la%20gu%C3%ADa%20de%20"
      "las%205%20se%C3%B1ales%20y%20quiero%20agendar%20una%20llamada%20de%20diagn%C3%B3stico")
WEB = "https://veranomedia.click"
CORREO = "hola@veranomedia.click"

SENALES = [
    {
        "num": "SEÑAL #1",
        "titulo": "Invisibilidad digital",
        "cuerpo": ("El 82% de tus clientes potenciales busca en Google antes de "
                   "elegir. Si tu negocio no aparece en los primeros resultados, "
                   "no es que hayan elegido a otro: es que a ti ni siquiera te "
                   "consideraron."),
        "dato": "6 de cada 10",
        "dato_texto": "negocios en RD no tienen presencia en Google",
        "solucion": "Perfil de Google Business optimizado más un sitio web que captura.",
    },
    {
        "num": "SEÑAL #2",
        "titulo": "El silencio que vende",
        "cuerpo": ("El 70% de los leads se enfría en la primera hora. Si respondes "
                   "en 5 minutos, multiplicas por 7 tu probabilidad de conversión. "
                   "Si respondes al día siguiente, el cliente ya encontró a otro."),
        "dato": "7x",
        "dato_texto": "más conversión si respondes en 5 minutos o menos",
        "solucion": "Asistente automatizado 24/7 que responde al instante.",
    },
    {
        "num": "SEÑAL #3",
        "titulo": "Datos en el aire",
        "cuerpo": ("Tus leads viven en capturas de pantalla, notas de voz y chats "
                   "de WhatsApp que desaparecen. Sin un CRM, cada cliente "
                   "potencial es un dato que se pierde cuando se borra el teléfono."),
        "dato": "73%",
        "dato_texto": "de las PYMEs en RD no usa CRM",
        "solucion": "Un CRM simple que captura, organiza y da seguimiento.",
    },
    {
        "num": "SEÑAL #4",
        "titulo": "El seguimiento que nunca llega",
        "cuerpo": ("El 80% de las ventas requiere al menos 5 puntos de contacto. "
                   "La mayoría de los negocios hace 1 o 2 intentos y abandona. No "
                   "es que el cliente no quisiera comprar: es que te olvidaste de él."),
        "dato": "44%",
        "dato_texto": "de los vendedores abandona tras el primer contacto",
        "solucion": "Secuencias automatizadas de seguimiento por WhatsApp.",
    },
    {
        "num": "SEÑAL #5",
        "titulo": "La trampa del anuncio",
        "cuerpo": ("Cuando tu único canal son Facebook Ads o Google Ads, no tienes "
                   "un negocio: tienes una máquina de gastar en publicidad. El día "
                   "que dejas de pagar, dejas de vender. Eso no es sostenible."),
        "dato": "5-7x",
        "dato_texto": "cuesta más un cliente nuevo que retener uno existente",
        "solucion": "SEO local, contenido orgánico y automatización.",
    },
]


def envolver(texto, fuente, tam, ancho_max):
    """Parte el texto en lineas que quepan en ancho_max."""
    palabras = texto.split()
    lineas, actual = [], ""
    for p in palabras:
        prueba = f"{actual} {p}".strip()
        if pdfmetrics.stringWidth(prueba, fuente, tam) <= ancho_max:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = p
    if actual:
        lineas.append(actual)
    return lineas


def pagina(c, fondo=NEGRO):
    c.setFillColor(fondo)
    c.rect(0, 0, ANCHO, ALTO, stroke=0, fill=1)


def texto(c, x, y, txt, fuente, tam, color, alineado="izq"):
    c.setFont(fuente, tam)
    c.setFillColor(color)
    if alineado == "centro":
        c.drawCentredString(x, y, txt)
    elif alineado == "der":
        c.drawRightString(x, y, txt)
    else:
        c.drawString(x, y, txt)
    return y - tam * 1.35


def parrafo(c, x, y, txt, tam, color, ancho, interlineado=1.5, fuente=None):
    fuente = fuente or FUENTE
    for linea in envolver(txt, fuente, tam, ancho):
        c.setFont(fuente, tam)
        c.setFillColor(color)
        c.drawString(x, y, linea)
        y -= tam * interlineado
    return y


def enlace(c, x, y, txt, url, tam, color, ancho=None, alto=None, alineado="izq"):
    """
    Dibuja texto (si se da) y registra el area clickeable con c.linkURL.

    reportlab no trae helper de enlace de texto: linkURL crea la anotacion
    /URI. El area es (x, y, x+ancho, y+alto). Si no se pasan medidas se
    calculan del propio texto, para que lo clickeable coincida con lo visible.
    """
    if txt:
        texto(c, x, y, txt, FUENTE, tam, color, alineado=alineado)
        w = pdfmetrics.stringWidth(txt, FUENTE, tam)
        h = tam * 1.2
        if ancho is None:
            ancho = w
            if alineado == "der":
                x = x - w
            elif alineado == "centro":
                x = x - w / 2
        alto = h

    c.linkURL(url, (x, y - 3, x + ancho, y + (alto or 12) - 3), relative=0)


# ---------------------------------------------------------------- portada
def portada(c):
    pagina(c)

    c.setFillColor(AZUL)
    c.rect(MARGEN, ALTO - 150, 56, 5, stroke=0, fill=1)

    y = ALTO - 210
    y = texto(c, MARGEN, y, "Guía gratuita para dueños", FUENTE, 16, AZUL_CLARO)
    y = texto(c, MARGEN, y - 6, "de negocio en RD", FUENTE, 16, AZUL_CLARO)

    y -= 34
    for linea in ["5 señales de que", "tu negocio está", "perdiendo leads"]:
        y = texto(c, MARGEN, y, linea, FUENTE_BOLD, 40, BLANCO)

    y -= 14
    for linea in envolver(
        "Y cómo construir un sistema que capture clientes todos los días, "
        "sin depender de anuncios ni de estar pegado al teléfono.",
        FUENTE, 15, ANCHO - MARGEN * 2
    ):
        c.setFont(FUENTE, 15)
        c.setFillColor(GRIS_CLARO)
        c.drawString(MARGEN, y, linea)
        y -= 22

    c.setFillColor(AZUL)
    c.rect(MARGEN, 96, 40, 3, stroke=0, fill=1)
    texto(c, MARGEN, 74, "VERANO MEDIA", FUENTE_BOLD, 13, BLANCO)
    enlace(c, MARGEN, 56, WEB, WEB, 12, GRIS)

    c.showPage()


# ---------------------------------------------------------------- senales
def pagina_senal(c, s, indice, total):
    pagina(c)

    texto(c, MARGEN, ALTO - 78, s["num"], FUENTE_BOLD, 14, ORO)
    c.setStrokeColor(HexColor("#232733"))
    c.setLineWidth(1)
    c.line(MARGEN, ALTO - 92, ANCHO - MARGEN, ALTO - 92)

    y = ALTO - 150
    for linea in envolver(s["titulo"], FUENTE_BOLD, 32, ANCHO - MARGEN * 2):
        y = texto(c, MARGEN, y, linea, FUENTE_BOLD, 32, BLANCO)

    # Cuerpo a 15pt: el PDF viejo se veia pequeno porque el texto se pintaba
    # sobre un lienzo de 1080px y luego se escalaba a 595pt de ancho.
    y -= 16
    y = parrafo(c, MARGEN, y, s["cuerpo"], 15, GRIS_CLARO, ANCHO - MARGEN * 2, 1.6)

    y -= 30
    c.setFillColor(HexColor("#141824"))
    c.rect(MARGEN, y - 78, ANCHO - MARGEN * 2, 92, stroke=0, fill=1)
    c.setFillColor(ORO)
    c.rect(MARGEN, y - 78, 5, 92, stroke=0, fill=1)
    texto(c, MARGEN + 22, y - 4, s["dato"], FUENTE_BOLD, 34, ORO)
    texto(c, MARGEN + 22, y - 44, s["dato_texto"], FUENTE, 14, GRIS_CLARO)

    y -= 126
    texto(c, MARGEN, y, "SOLUCIÓN", FUENTE_BOLD, 12, AZUL)
    y -= 26
    parrafo(c, MARGEN, y, s["solucion"], 16, BLANCO, ANCHO - MARGEN * 2, 1.5)

    c.setStrokeColor(HexColor("#232733"))
    c.line(MARGEN, 62, ANCHO - MARGEN, 62)
    texto(c, MARGEN, 44, f"Verano Media · {indice}/{total}", FUENTE, 11, GRIS)
    enlace(c, ANCHO - MARGEN, 44, WEB, WEB, 11, GRIS, alineado="der")

    c.showPage()


# ---------------------------------------------------------------- cierre
def cierre(c):
    pagina(c)

    y = ALTO - 190
    for linea in ["¿Listo para dejar", "de perder leads?"]:
        y = texto(c, MARGEN, y, linea, FUENTE_BOLD, 38, BLANCO)

    y -= 20
    y = parrafo(
        c, MARGEN, y,
        "En Verano Media diseñamos sistemas de captura y seguimiento para "
        "negocios en RD: desde tu presencia en Google hasta un CRM con IA.",
        15, GRIS_CLARO, ANCHO - MARGEN * 2, 1.6
    )

    # --- Boton con enlace REAL ---
    # El rectangulo se dibuja y el enlace va encima, de modo que el area
    # clickeable coincide con lo que se ve. En el PDF viejo el boton era una
    # imagen sin enlace: parecia roto (reportado por Peter).
    y -= 40
    alto_btn = 74
    ancho_btn = ANCHO - MARGEN * 2
    c.setFillColor(AZUL)
    c.roundRect(MARGEN, y - alto_btn, ancho_btn, alto_btn, 10, stroke=0, fill=1)

    texto(c, MARGEN + ancho_btn / 2, y - 30, "Agenda tu llamada gratis",
          FUENTE_BOLD, 19, BLANCO, alineado="centro")
    texto(c, MARGEN + ancho_btn / 2, y - 54, "15 minutos · Sin compromiso",
          FUENTE, 13, HexColor("#D8E0FF"), alineado="centro")

    enlace(c, MARGEN, y - alto_btn, "", WA, 1, BLANCO,
           ancho=ancho_btn, alto=alto_btn)

    y -= alto_btn + 34
    texto(c, MARGEN, y, "¿Prefieres escribirnos?", FUENTE, 13, GRIS)
    y -= 22
    enlace(c, MARGEN, y, CORREO, f"mailto:{CORREO}", 14, AZUL_CLARO)

    c.setStrokeColor(HexColor("#232733"))
    c.line(MARGEN, 74, ANCHO - MARGEN, 74)
    texto(c, MARGEN, 54, "Verano Media · República Dominicana", FUENTE, 11, GRIS)
    enlace(c, ANCHO - MARGEN, 54, WEB, WEB, 11, GRIS, alineado="der")

    c.showPage()


# ---------------------------------------------------------------- main
def main():
    salida = os.path.expanduser("~/slides/guia-5-senales-v2.pdf")
    c = rl_canvas.Canvas(salida, pagesize=A4)
    c.setTitle("5 señales de que tu negocio está perdiendo leads")
    c.setAuthor("Verano Media")
    c.setSubject("Guía gratuita para dueños de negocio en RD")

    portada(c)
    for i, s in enumerate(SENALES, 1):
        pagina_senal(c, s, i, len(SENALES))
    cierre(c)

    c.save()

    kb = os.path.getsize(salida) / 1024
    print(f"  generado: {salida}")
    print(f"  peso: {kb:.0f} KB")
    print(f"  paginas: {1 + len(SENALES) + 1}")


if __name__ == "__main__":
    main()
