#!/usr/bin/env python3
"""Genera el Manual de Usuario PDF premium del CRM Dental VM."""
import os
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Image, Table, TableStyle, PageBreak,
                                NextPageTemplate, KeepTogether)
from reportlab.lib.styles import ParagraphStyle

# ── Paleta Clinical Precision ─────────────────────────────
PRIMARY = HexColor('#1976D2')
PRIMARY_DARK = HexColor('#005dac')
SURFACE = HexColor('#f3faff')
ON_SURFACE = HexColor('#071e27')
ON_VARIANT = HexColor('#414752')
OUTLINE = HexColor('#c1c6d4')
SUCCESS = HexColor('#2E7D32')
ERROR = HexColor('#D32F2F')
WHITE = white
LIGHT_BLUE = HexColor('#e3f0fc')
AMBER = HexColor('#f57c00')

BASE = os.path.expanduser('~/veranomedia/docs/crm-dental-manual')
CAPS = os.path.join(BASE, 'capturas')
LOGO = os.path.expanduser('~/clinica-crm/frontend/static/logo_clinica.jpg')
OUT = os.path.join(BASE, 'Manual-Usuario-CRM-Dental.pdf')

# ── Estilos ────────────────────────────────────────────────
def st(name, **kw):
    base = dict(fontName='Helvetica', fontSize=10.5, leading=15, textColor=ON_SURFACE, spaceAfter=6)
    base.update(kw)
    return ParagraphStyle(name, **base)

S = {
    'h1': st('h1', fontName='Helvetica-Bold', fontSize=20, leading=25, textColor=PRIMARY, spaceBefore=10, spaceAfter=10),
    'h2': st('h2', fontName='Helvetica-Bold', fontSize=14, leading=19, textColor=PRIMARY_DARK, spaceBefore=14, spaceAfter=6),
    'h3': st('h3', fontName='Helvetica-Bold', fontSize=11.5, leading=16, textColor=ON_SURFACE, spaceBefore=10, spaceAfter=4),
    'p': st('p', spaceAfter=7),
    'li': st('li', leftIndent=16, bulletIndent=4, spaceAfter=4),
    'step': st('step', leftIndent=20, bulletIndent=4, spaceAfter=5, textColor=ON_SURFACE),
    'note': st('note', fontName='Helvetica-Oblique', fontSize=9.5, leading=13.5, textColor=ON_VARIANT, leftIndent=14, spaceAfter=8),
    'tip': st('tip', fontSize=9.5, leading=13.5, textColor=PRIMARY_DARK, leftIndent=14, spaceAfter=8),
    'cap': st('cap', fontSize=8.5, leading=11, textColor=ON_VARIANT, alignment=TA_CENTER, spaceBefore=3, spaceAfter=12),
    'toc': st('toc', fontSize=10.5, leading=17, textColor=ON_SURFACE, leftIndent=8),
}

def h1(t): return Paragraph(t, S['h1'])
def h2(t): return Paragraph(t, S['h2'])
def h3(t): return Paragraph(t, S['h3'])
def p(t): return Paragraph(t, S['p'])
def li(t): return Paragraph(t, S['li'], bulletText='•')
def step(n, t): return Paragraph(f'<b>{n}.</b> {t}', S['step'])
def note(t): return Paragraph('💡 ' + t, S['note'])
def tip(t): return Paragraph('🦷 ' + t, S['tip'])
def cap(t): return Paragraph(t, S['cap'])

def shot(fname, caption, width=6.2*inch):
    path = os.path.join(CAPS, fname)
    if not os.path.exists(path):
        return [Paragraph(f'<i>[captura faltante: {fname}]</i>', S['cap'])]
    img = Image(path, width=width, height=width * 0.62)  # ratio aproximado 16:10
    img.hAlign = 'CENTER'
    tbl = Table([[img]], colWidths=[width])
    tbl.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 1, OUTLINE),
        ('BACKGROUND', (0, 0), (-1, -1), WHITE),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    return [tbl, cap(caption)]

def tipbox(t):
    """Caja de consejo con fondo azul claro."""
    inner = Paragraph(t, S['tip'])
    tbl = Table([[inner]], colWidths=[6.5*inch])
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BLUE),
        ('BOX', (0, 0), (-1, -1), 0.75, PRIMARY),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    return [tbl, Spacer(1, 10)]

# ── Footer / portada ───────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(ON_VARIANT)
    canvas.drawString(0.75*inch, 0.5*inch, 'CRM Dental — Clínica Dra. Reyna Pimentel')
    canvas.drawRightString(LETTER[0]-0.75*inch, 0.5*inch, f'Página {doc.page}')
    canvas.setStrokeColor(OUTLINE)
    canvas.setLineWidth(0.5)
    canvas.line(0.75*inch, 0.65*inch, LETTER[0]-0.75*inch, 0.65*inch)
    canvas.restoreState()

def on_first(canvas, doc):
    """Portada: fondo azul primario + contenido centrado."""
    canvas.saveState()
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, 0, LETTER[0], LETTER[1], stroke=0, fill=1)
    canvas.setFillColor(PRIMARY_DARK)
    canvas.rect(0, 0, LETTER[0], LETTER[1]*0.12, stroke=0, fill=1)
    canvas.restoreState()

def cover_story():
    els = []
    # Logo
    if os.path.exists(LOGO):
        logo = Image(LOGO, width=1.1*inch, height=1.1*inch)
        logo.hAlign = 'CENTER'
        els.append(logo)
    else:
        els.append(Paragraph('🦷', st('logo', fontSize=48, alignment=TA_CENTER, textColor=WHITE)))
    els.append(Spacer(1, 0.4*inch))
    els.append(Paragraph('MANUAL DE USUARIO', st('cov1', fontName='Helvetica-Bold', fontSize=15, leading=20, alignment=TA_CENTER, textColor=HexColor('#BBDEFB'))))
    els.append(Spacer(1, 0.15*inch))
    els.append(Paragraph('CRM Dental', st('cov2', fontName='Helvetica-Bold', fontSize=40, leading=46, alignment=TA_CENTER, textColor=WHITE)))
    els.append(Spacer(1, 0.1*inch))
    els.append(Paragraph('Sistema de Gestión de Pacientes', st('cov3', fontSize=14, leading=20, alignment=TA_CENTER, textColor=HexColor('#E3F2FD'))))
    els.append(Spacer(1, 0.6*inch))
    els.append(Paragraph('Clínica Dental Pimentel', st('cov4', fontName='Helvetica-Bold', fontSize=18, leading=24, alignment=TA_CENTER, textColor=WHITE)))
    els.append(Paragraph('Dra. Reyna Pimentel · Nagua, República Dominicana', st('cov5', fontSize=11, leading=16, alignment=TA_CENTER, textColor=HexColor('#BBDEFB'))))
    els.append(Spacer(1, 1.4*inch))
    els.append(Paragraph('Guía paso a paso para todo el personal', st('cov6', fontSize=11, leading=16, alignment=TA_CENTER, textColor=HexColor('#E3F2FD'))))
    els.append(Spacer(1, 0.1*inch))
    els.append(Paragraph('Hecho por Verano Media RD · Versión 1.0 · Agosto 2026', st('cov7', fontSize=9, leading=13, alignment=TA_CENTER, textColor=HexColor('#90CAF9'))))
    els.append(NextPageTemplate('content'))
    els.append(PageBreak())
    return els

# ── Construcción ───────────────────────────────────────────
doc = BaseDocTemplate(OUT, pagesize=LETTER,
                      leftMargin=0.85*inch, rightMargin=0.85*inch,
                      topMargin=0.8*inch, bottomMargin=0.9*inch,
                      title='Manual de Usuario — CRM Dental',
                      author='Verano Media RD')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='main')
cover_frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='cover')
doc.addPageTemplates([
    PageTemplate(id='cover', frames=[cover_frame], onPage=on_first),
    PageTemplate(id='content', frames=[frame], onPage=on_page),
])

E = []
E += cover_story()
E.append(h1('Tabla de Contenidos'))
E.append(Paragraph('1. ¿Qué es este sistema?<br/>2. Cómo entrar (Iniciar sesión)<br/>3. El panel principal (Dashboard)<br/>4. Pacientes<br/>5. El Odontograma digital 🦷<br/>6. Consentimientos firmados 📝<br/>7. Citas<br/>8. No-show: recuperar citas perdidas ⏰<br/>9. Recuperación de presupuestos 💰<br/>10. Crecimiento: Hora Sillón y Orígenes 📈<br/>11. Administración 🔒<br/>12. Preguntas frecuentes<br/>13. Problemas comunes<br/>14. Soporte', S['toc']))
E.append(PageBreak())

# 1. Introducción
E.append(h1('1. ¿Qué es este sistema?'))
E.append(p('El CRM de la Clínica es el <b>cerebro digital</b> de su consultorio. En una sola pantalla usted puede:'))
for t in ['Ver <b>todo el día de la clínica</b>: pacientes, citas y facturación',
          'Registrar el <b>odontograma</b> (mapa bucal) de cada paciente',
          'Detectar <b>citas perdidas</b> y recuperarlas por WhatsApp',
          'Recordar <b>presupuestos sin cobrar</b> en el día exacto',
          'Saber <b>cuánto vale cada hora</b> de su sillón',
          'Proteger los <b>datos de sus pacientes</b> (como exige la ley)']:
    E.append(li(t))
E.append(p('<b>No necesita saber de computadoras.</b> Si sabe usar WhatsApp, puede usar este sistema.'))
E.append(PageBreak())

# 2. Login
E.append(h1('2. Cómo entrar al sistema (Iniciar sesión)'))
E.append(p('El sistema se abre desde la <b>página web de la clínica</b>. Usted no necesita recordar ninguna dirección técnica — el botón Admin lo lleva al sistema.'))
E += shot('00-sitio-web-admin.png', 'La página web de la clínica. Toque el botón "⚙ Admin" (arriba a la derecha).')
E += shot('01-login.png', 'Pantalla de entrada: escriba su usuario y contraseña y toque "Entrar".')
for i, t in enumerate(['Abra el navegador de su teléfono o computadora (Chrome, Safari o Edge).',
                       'Escriba la dirección de la página web de la clínica: <b>https://dra-reyna-pimentel.vercel.app</b>',
                       'Toque el botón <b>⚙ Admin</b> (arriba a la derecha de la pantalla).',
                       'Se abrirá la pantalla de entrada del sistema.',
                       'En el recuadro <b>Usuario</b>, escriba su usuario (ejemplo: <font color="#1976D2"><b>admin</b></font>).',
                       'En el recuadro <b>Contraseña</b>, escriba su contraseña.',
                       'Toque el botón <b>Entrar</b>.'], 1):
    E.append(step(i, t))
E += tipbox('Guarde la página web de la clínica en los favoritos. Desde ahí, el botón ⚙ Admin siempre lo lleva al sistema.')
E.append(PageBreak())

# 3. Dashboard
E.append(h1('3. El panel principal (Dashboard)'))
E += shot('02-dashboard.png', 'El tablero de control: tarjetas con los números del día y menú lateral.')
E.append(p('Al entrar, lo primero que ve es el <b>tablero de control</b>:'))
for t in ['<b>Tarjetas arriba:</b> cuántos pacientes tiene, cuántas citas hay hoy, cuánto ha facturado el mes.',
          '<b>Menú lateral izquierdo:</b> las secciones del sistema (Pacientes, Citas, Tratamientos, Facturación...).',
          '<b>Botón azul "Agendar Cita":</b> para crear una cita nueva rápidamente.']:
    E.append(li(t))
E += tipbox('Regla de oro: el menú lateral es su mapa. Cada opción abre una sección distinta.')
E.append(PageBreak())

# 4. Pacientes
E.append(h1('4. Pacientes'))
E.append(h3('4.1 Ver la lista de pacientes'))
E += shot('03-pacientes.png', 'Lista de pacientes con buscador y estado de cada uno.')
for i, t in enumerate(['Toque <b>Pacientes</b> en el menú lateral.',
                       'Aparece la lista completa con el nombre, teléfono y estado de cada paciente.',
                       'Use el <b>buscador</b> (arriba) para encontrar a alguien por nombre o teléfono.'], 1):
    E.append(step(i, t))
E.append(h3('4.2 Abrir la ficha de un paciente'))
for i, t in enumerate(['En la lista, toque el <b>nombre del paciente</b>.',
                       'Se abre su ficha con toda su información: teléfono, email, motivo, última visita.',
                       'En la ficha encontrará: el <b>Odontograma</b>, sus <b>Citas</b>, sus <b>Planes de Tratamiento</b>, sus <b>Consentimientos</b> y su historial.'], 1):
    E.append(step(i, t))
E.append(h3('4.3 Registrar un paciente nuevo'))
for i, t in enumerate(['En la sección <b>Pacientes</b>, toque el botón <b>+ Nuevo paciente</b>.',
                       'Escriba el <b>nombre</b> (obligatorio) y el teléfono.',
                       'Si viene referido por otro doctor, escriba su nombre en <b>Referido por</b>.',
                       'Toque <b>Guardar</b>.'], 1):
    E.append(step(i, t))
E.append(PageBreak())

# 5. Odontograma
E.append(h1('5. El Odontograma digital 🦷'))
E.append(p('El odontograma es el <b>mapa bucal</b> del paciente: los 32 dientes de adulto (o 20 de niño) dibujados en pantalla.'))
E.append(h3('5.1 Ver el odontograma'))
for i, t in enumerate(['Abra la <b>ficha del paciente</b> (paso 4.2).',
                       'Busque la sección <b>🦷 Odontograma digital</b>.',
                       'Arriba aparecen los dientes de arriba (Maxilar) y abajo los de abajo (Mandíbula).'], 1):
    E.append(step(i, t))
E += shot('04-ficha-odontograma.png', 'La ficha del paciente con su odontograma digital y la sección de consentimientos.')
E.append(h3('5.2 Marcar el estado de un diente'))
for i, t in enumerate(['Toque el <b>diente</b> que quiere registrar (ejemplo: el diente 26).',
                       'Se abre una ventana con el diente en grande y sus <b>5 superficies</b> (Oclusal = la mordida, Mesial, Bucal, Distal, Lingual).',
                       'Elija el <b>estado</b> tocando un chip de color: <b>Sano</b>, <b>Caries</b> (rojo), <b>Obturado</b> (azul), <b>Endodoncia</b> (morado), <b>Corona</b> (dorado), <b>Extraído</b> (gris), <b>Implante</b> (verde)...',
                       'Toque la <b>superficie</b> del diente grande para marcarla.',
                       'Si quiere, escriba una <b>nota</b> (ejemplo: "Caries profunda, pendiente de endodoncia").',
                       'Toque <b>Guardar diente</b>.'], 1):
    E.append(step(i, t))
E += shot('05-editor-diente.png', 'Editor del diente: elija el estado, marque la superficie y guarde.')
E += tipbox('Para niños: toque el botón "Cambiar a Niño" para ver la dentición temporal (20 dientes).')
E += tipbox('La doctora ve en 10 segundos qué se hizo y dónde cuando el paciente vuelve. Es el historial clínico vivo.')
E.append(PageBreak())

# 6. Consentimientos
E.append(h1('6. Consentimientos firmados 📝'))
E.append(h3('6.1 Firmar un consentimiento con el paciente'))
for i, t in enumerate(['En la ficha del paciente, busque <b>📝 Consentimientos firmados</b>.',
                       'Toque <b>+ Firmar consentimiento</b>.',
                       'Elija el <b>tipo</b>: Tratamiento clínico, WhatsApp, Marketing o Privacidad.',
                       'Escriba el <b>título</b> (ejemplo: "Endodoncia diente 26").',
                       '<b>Pase la tableta al paciente</b> y pídale que <b>firme con el dedo</b> en el recuadro.',
                       'Toque <b>Guardar firma</b>.'], 1):
    E.append(step(i, t))
E += shot('06-consentimiento-firma.png', 'El paciente firma con el dedo en el recuadro.')
E += shot('07-consentimiento-firmado.png', 'La firma queda guardada con fecha y responsable.')
E += tipbox('La firma queda registrada con fecha y nombre del responsable. Esto es lo que exige la ley de protección de datos (172-13).')
E.append(PageBreak())

# 7. Citas
E.append(h1('7. Citas'))
E.append(h3('7.1 Ver las citas'))
E += shot('08-citas.png', 'Todas las citas con paciente, hora, servicio y estado.')
for i, t in enumerate(['Toque <b>Citas</b> en el menú lateral.',
                       'Verá todas las citas con paciente, hora, servicio y estado.'], 1):
    E.append(step(i, t))
E.append(h3('7.2 Agendar una cita nueva'))
for i, t in enumerate(['Toque <b>Agendar Cita</b> (botón azul, arriba a la derecha).',
                       'Elija el <b>paciente</b>, la <b>fecha</b> y la <b>hora</b>.',
                       'Elija el <b>servicio</b> (consulta, limpieza...) y la duración.',
                       'Toque <b>Guardar</b>.'], 1):
    E.append(step(i, t))
E.append(h3('7.3 Estados de una cita'))
for t in ['<b>Pendiente:</b> la cita está creada, falta confirmar.',
          '<b>Confirmada:</b> el paciente confirmó que asistirá.',
          '<b>Completada:</b> el paciente asistió y fue atendido.',
          '<b>Cancelada:</b> se canceló.',
          '<b>No-show:</b> el paciente no llegó (el sistema lo marca solo).']:
    E.append(li(t))
E.append(PageBreak())

# 8. No-show
E.append(h1('8. No-show: recuperar citas perdidas ⏰'))
E.append(p('El sistema <b>detecta solo</b> las citas que pasaron sin confirmarse y las marca como <b>no-show</b>.'))
for i, t in enumerate(['Toque <b>No-show</b> en el menú lateral.',
                       'Verá la lista de pacientes que no llegaron a su cita.',
                       'Cada uno tiene dos botones: <b>💬 WhatsApp</b> (mensaje de reagendamiento ya escrito) y <b>Reagendar</b> (nueva cita al momento).'], 1):
    E.append(step(i, t))
E += shot('09-no-show.png', 'No-show: cada paciente perdido con botón de WhatsApp y Reagendar.')
E += tipbox('Cada cita recuperada es dinero que estaba perdido. El sistema le dice cuánto perdió por no-shows en la sección Crecimiento.')
E.append(PageBreak())

# 9. Recuperación
E.append(h1('9. Recuperación de presupuestos 💰'))
E.append(p('¿Presentó un presupuesto y el paciente no volvió? Este sistema se acuerda por usted.'))
for i, t in enumerate(['Toque <b>Recuperación</b> en el menú lateral.',
                       'Verá todos los <b>presupuestos sin aceptar</b> con su fase de seguimiento: <b>Fase 3</b> (primer contacto), <b>Fase 7</b> (URGENTE), <b>Fase 30</b> (última llamada).',
                       'Botón <b>💬 WhatsApp:</b> mensaje listo para preguntar si ya decidió.',
                       'Botón <b>Registrar seguimiento:</b> anote que ya lo llamó, por qué medio, y si aceptó o rechazó.'], 1):
    E.append(step(i, t))
E += shot('10-recuperacion.png', 'Presupuestos pendientes con su fase de cadencia y acciones.')
E += shot('11-seguimiento-modal.png', 'Registrar seguimiento: método, nota y resultado.')
E += tipbox('Las clínicas que hacen seguimiento sistemático aceptan 30-40% más presupuestos. Un plan de RD$45,000 olvidado es dinero en la mesa.')
E.append(PageBreak())

# 10. Crecimiento
E.append(h1('10. Crecimiento: Hora Sillón y Orígenes 📈'))
E.append(h3('10.1 Cuánto vale su sillón'))
E += shot('12-crecimiento.png', 'Crecimiento: valor hora sillón, ingresos, ocupación y costo de no-shows.')
for t in ['<b>Valor hora sillón:</b> cuánto genera cada hora de trabajo.',
          '<b>Ingresos del mes.</b>',
          '<b>Ocupación del sillón:</b> % del tiempo que el consultorio está lleno.',
          '<b>Perdido por no-show:</b> cuánto dinero se fue con las citas perdidas.']:
    E.append(li(t))
E.append(h3('10.2 De dónde vienen sus pacientes'))
E.append(p('La lista <b>Orígenes de pacientes</b> muestra cuántos llegaron por WhatsApp, Instagram, referidos... y cuánto facturaron. Útil para decidir dónde invertir.'))
E.append(PageBreak())

# 11. Administración
E.append(h1('11. Administración 🔒'))
E.append(h3('11.1 Auditoría (quién hizo qué)'))
for i, t in enumerate(['Toque <b>Auditoría</b> en el menú lateral (solo el administrador ve esta sección).',
                       'Vea cada acción registrada: quién la hizo, cuándo y desde qué IP.'], 1):
    E.append(step(i, t))
E += shot('13-auditoria.png', 'Auditoría: cada acción del sistema queda registrada.')
E.append(h3('11.2 Usuarios (accesos del personal)'))
for i, t in enumerate(['Toque <b>Usuarios</b> en el menú lateral (solo administrador).',
                       'Toque <b>+ Nuevo usuario</b> para crear la cuenta de un empleado.',
                       'Elija el <b>rol</b>: <b>admin</b> (acceso total), <b>doctor</b> (clínica y finanzas) o <b>recepcionista</b> (agenda y pacientes, sin finanzas).',
                       'Escriba usuario y contraseña, toque <b>Guardar</b>.'], 1):
    E.append(step(i, t))
E += shot('14-usuarios.png', 'Lista de usuarios con su rol.')
E += shot('15-nuevo-usuario.png', 'Crear un usuario nuevo con su rol.')
E += tipbox('Cada persona con su propio usuario. Nunca compartan cuentas — la auditoría lo registra todo.')
E.append(PageBreak())

# 12. FAQ
E.append(h1('12. Preguntas frecuentes'))
for q, a in [
    ('¿Se puede usar en el teléfono?', 'Sí. Funciona en celular, tableta y computadora. En la tableta es ideal para el odontograma y las firmas.'),
    ('¿Qué pasa si se va la luz o el internet?', 'Nada. Los datos están guardados en la nube (servidores seguros). Al volver la conexión, todo sigue igual.'),
    ('¿Puedo imprimir un reporte?', 'Sí. En la sección Reportes puede generar el resumen del período y exportarlo.'),
    ('¿Los datos están seguros?', 'Sí. Acceso por roles, auditoría de cada acción, y cumplimiento de la Ley 172-13 de protección de datos.'),
    ('¿Cómo cambio mi contraseña?', 'El administrador la cambia en Usuarios → Editar.'),
]:
    E.append(h3(q))
    E.append(p(a))

# 13. Troubleshooting
E.append(h1('13. Problemas comunes'))
rows = [['Problema', 'Solución'],
        ['La página no carga', 'Revise el internet. Espere 10 segundos y vuelva a entrar.'],
        ['Veo una pantalla vieja', 'Cierre la pestaña y ábrala de nuevo, o use el modo incógnito.'],
        ['Olvidé mi contraseña', 'Pídale al administrador que la cambie en Usuarios.'],
        ['No veo la sección Finanzas', 'Su usuario tiene rol de recepcionista. Pida acceso al administrador.'],
        ['El diente no se marca', 'Toque primero el estado (chip de color) y luego la superficie del diente.']]
tbl = Table(rows, colWidths=[2.6*inch, 4.2*inch])
tbl.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT_BLUE]),
    ('GRID', (0, 0), (-1, -1), 0.5, OUTLINE),
    ('TOPPADDING', (0, 0), (-1, -1), 7),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
]))
E.append(tbl)

# 14. Soporte
E.append(Spacer(1, 0.3*inch))
E.append(h1('14. Soporte'))
E.append(p('¿Dudas o problemas? Contáctenos por WhatsApp: <b>809-584-7033</b>'))
E.append(p('Horario de soporte: lunes a viernes, 8:00 am - 5:00 pm.'))
E.append(Spacer(1, 0.4*inch))
E.append(p('<i>Manual preparado por Verano Media RD — Sistemas Inteligentes para su clínica.</i>'))
E.append(p('<i>Sistema CRM Dental · Versión 1.0 · Agosto 2026</i>'))

doc.build(E)
print('PDF generado:', OUT, os.path.getsize(OUT), 'bytes')
