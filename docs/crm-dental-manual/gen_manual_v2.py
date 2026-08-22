"""
Generador PDF Manual CRM Dental — reportlab platypus (flujo automático, sin superposiciones).
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Registrar DejaVu
FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
pdfmetrics.registerFont(TTFont("DejaVu", os.path.join(FONTS, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuB", os.path.join(FONTS, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DejaVuC", os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")))

OUT = os.path.expanduser("~/veranomedia/docs/crm-dental-manual/Manual-Usuario-CRM-Dental-v2.pdf")

# Estilos
styles = getSampleStyleSheet()
style_badge = ParagraphStyle("Badge", parent=styles["Normal"], fontName="DejaVuB", fontSize=14, textColor=colors.HexColor("#007AFF"), alignment=TA_CENTER, spaceAfter=6)
style_h1 = ParagraphStyle("H1", parent=styles["Heading1"], fontName="DejaVuB", fontSize=26, textColor=colors.HexColor("#071e27"), spaceAfter=10, leading=30)
style_h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontName="DejaVuB", fontSize=18, textColor=colors.HexColor("#007AFF"), spaceAfter=8, leading=22)
style_body = ParagraphStyle("Body", parent=styles["Normal"], fontName="DejaVu", fontSize=11, textColor=colors.HexColor("#333333"), leading=15, spaceAfter=8, alignment=TA_LEFT)
style_footer = ParagraphStyle("Footer", parent=styles["Normal"], fontName="DejaVu", fontSize=9, textColor=colors.grey, alignment=TA_CENTER, spaceBefore=20)
style_step = ParagraphStyle("Step", parent=styles["Normal"], fontName="DejaVu", fontSize=11, textColor=colors.HexColor("#333333"), leading=15, leftIndent=18, spaceAfter=6)

def P(text, style=style_body):
    return Paragraph(text, style)

def H1(text):
    return Paragraph(text, style_h1)

def H2(text):
    return Paragraph(text, style_h2)

def Badge(text):
    return Paragraph(text, style_badge)

def Footer(text):
    return Paragraph(text, style_footer)

def Step(text):
    return Paragraph(text, style_step)

def HR():
    return Spacer(1, 0.15*inch)

def PageBreakP():
    return PageBreak()

# Construir documento
doc = SimpleDocTemplate(OUT, pagesize=letter,
                        rightMargin=72, leftMargin=72,
                        topMargin=72, bottomMargin=72)
story = []

# Página 1 — Portada
story.append(Badge("DATOS DEL MERCADO · REPÚBLICA DOMINICANA"))
story.append(Spacer(1, 0.3*inch))
story.append(H1("EL DATO QUE"))
story.append(H1("TU COMPETENCIA"))
story.append(H1("IGNORA"))
story.append(Spacer(1, 0.2*inch))
story.append(P("PyMEs dominicanas: listas para IA, pero sin automatizar", style_body))
story.append(PageBreakP())

# Página 2 — TOC
story.append(H1("Tabla de Contenidos"))
story.append(HR())
toc_items = [
    "1. ¿Qué es este sistema?",
    "2. Cómo entrar (Iniciar sesión)",
    "3. El panel principal (Dashboard)",
    "4. Pacientes",
    "5. El Odontograma digital",
    "6. Consentimientos firmados",
    "7. Citas",
    "8. No-show: recuperar citas perdidas",
    "9. Recuperación de presupuestos",
    "10. Crecimiento: Hora Sillón y Orígenes",
    "11. Administración",
    "12. Preguntas frecuentes",
    "13. Problemas comunes",
    "14. Soporte",
]
for item in toc_items:
    story.append(P(f"• {item}", style_step))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 2"))
story.append(PageBreakP())

# Página 3 — Sección 1
story.append(H2("1. ¿Qué es este sistema?"))
story.append(P("El CRM de la Clínica es el cerebro digital de su consultorio. En una sola pantalla usted puede:"))
story.append(Step("• Ver todo el día de la clínica: pacientes, citas y facturación"))
story.append(Step("• Registrar el odontograma (mapa bucal) de cada paciente"))
story.append(Step("• Detectar citas perdidas y recuperarlas por WhatsApp"))
story.append(Step("• Recordar presupuestos sin cobrar en el día exacto"))
story.append(Step("• Saber cuánto vale cada hora de su sillón"))
story.append(Step("• Proteger los datos de sus pacientes (como exige la ley)"))
story.append(Spacer(1, 0.1*inch))
story.append(P("<b>No necesita saber de computadoras.</b> Si sabe usar WhatsApp, puede usar este sistema."))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 3"))
story.append(PageBreakP())

# Página 4 — Sección 2
story.append(H2("2. Cómo entrar al sistema (Iniciar sesión)"))
story.append(P("El sistema se abre desde la página web de la clínica. Usted no necesita recordar ninguna dirección técnica — el botón Admin lo lleva al sistema."))
story.append(HR())
story.append(P("<b>Pasos:</b>"))
story.append(Step("1. Abra el navegador de su teléfono o computadora (Chrome, Safari o Edge)."))
story.append(Step("2. Escriba la dirección de la página web de la clínica: https://dra-reyna-pimentel.vercel.app"))
story.append(Step('3. Toque el botón "Admin" (arriba a la derecha de la pantalla).'))
story.append(Step("4. Se abrirá la pantalla de entrada del sistema."))
story.append(Step('5. En el recuadro Usuario, escriba su usuario (ejemplo: admin).'))
story.append(Step('6. En el recuadro Contraseña, escriba su contraseña.'))
story.append(Step('7. Toque el botón "Entrar".'))
story.append(Spacer(1, 0.1*inch))
story.append(P("<b>Consejo:</b> Guarde la página web de la clínica en los favoritos. Desde ahí, el botón Admin siempre lo lleva al sistema."))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 4"))
story.append(PageBreakP())

# Página 5 — Dashboard
story.append(H2("3. El panel principal (Dashboard)"))
story.append(P("El tablero de control: tarjetas con los números del día y menú lateral."))
story.append(HR())
story.append(P("<b>Al entrar, lo primero que ve es el tablero de control:</b>"))
story.append(Step("• Tarjetas arriba: cuántos pacientes tiene, cuántas citas hay hoy, cuánto ha facturado el mes."))
story.append(Step("• Menú lateral izquierdo: las secciones del sistema (Pacientes, Citas, Tratamientos, Facturación...)."))
story.append(Step('• Botón azul "Agendar Cita": para crear una cita nueva rápidamente.'))
story.append(Spacer(1, 0.1*inch))
story.append(P("<b>Regla de oro:</b> el menú lateral es su mapa. Cada opción abre una sección distinta."))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 5"))
story.append(PageBreakP())

# Página 6 — Pacientes
story.append(H2("4. Pacientes"))
story.append(HR())
story.append(H2("4.1 Ver la lista de pacientes"))
story.append(P("Lista de pacientes con buscador y estado de cada uno."))
story.append(Step("1. Toque <b>Pacientes</b> en el menú lateral."))
story.append(Step("2. Aparece la lista completa con el nombre, teléfono y estado de cada paciente."))
story.append(Step("3. Use el buscador (arriba) para encontrar a alguien por nombre o teléfono."))
story.append(HR())
story.append(H2("4.2 Abrir la ficha de un paciente"))
story.append(Step("1. En la lista, toque el nombre del paciente."))
story.append(Step("2. Se abre su ficha con toda su información: teléfono, email, motivo, última visita."))
story.append(Step("3. En la ficha encontrará: el Odontograma, sus Citas, sus Planes de Tratamiento, sus Consentimientos y su historial."))
story.append(HR())
story.append(H2("4.3 Registrar un paciente nuevo"))
story.append(Step("1. En la sección Pacientes, toque el botón <b>+ Nuevo paciente</b>."))
story.append(Step("2. Escriba el nombre (obligatorio) y el teléfono."))
story.append(Step("3. Si viene referido por otro doctor, escriba su nombre en <b>Referido por</b>."))
story.append(Step("4. Toque <b>Guardar</b>."))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 6"))
story.append(PageBreakP())

# Página 7 — Odontograma
story.append(H2("5. El Odontograma digital"))
story.append(P("El odontograma es el mapa bucal del paciente: los 32 dientes de adulto (o 20 de niño) dibujados en pantalla."))
story.append(HR())
story.append(H2("5.1 Ver el odontograma"))
story.append(Step("1. Abra la ficha del paciente (paso 4.2)."))
story.append(Step('2. Busque la sección "Odontograma digital".'))
story.append(Step("3. Arriba aparecen los dientes de arriba (Maxilar) y abajo los de abajo (Mandíbula)."))
story.append(HR())
story.append(H2("5.2 Marcar el estado de un diente"))
story.append(Step("1. Toque el diente que quiere registrar (ejemplo: el diente 26)."))
story.append(Step("2. Se abre una ventana con el diente en grande y sus 5 superficies (Oclusal = la mordida, Mesial, Bucal, Distal, Lingual)."))
story.append(Step("3. Elija el estado tocando un chip de color: Sano, Caries (rojo), Obturado (azul), Endodoncia (morado), Corona (dorado), Extraído (gris), Implante (verde)..."))
story.append(Step("4. Toque la superficie del diente grande para marcarla."))
story.append(Step('5. Si quiere, escriba una nota (ejemplo: "Caries profunda, pendiente de endodoncia").'))
story.append(Step("6. Toque <b>Guardar diente</b>."))
story.append(Spacer(1, 0.1*inch))
story.append(P("<b>Para niños:</b> toque el botón \"Cambiar a Niño\" para ver la dentición temporal (20 dientes)."))
story.append(P("<b>Tip:</b> La doctora ve en 10 segundos qué se hizo y dónde cuando el paciente vuelve. Es el historial clínico vivo."))
story.append(Footer("CRM Dental — Clínica Dra. Reyna Pimentel · Página 7"))
story.append(PageBreakP())

doc.build(story)
print(f"PDF generado: {OUT}")
