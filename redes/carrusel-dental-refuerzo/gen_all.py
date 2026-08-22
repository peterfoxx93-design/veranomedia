"""
Generador de carruseles SIN anchor="ma" — layout por bloques con medición real.
"""
import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-dental-refuerzo")
W, H = 1080, 1350
WHITE=(255,255,255); GREY=(174,174,178)
BLUE=(0,122,255); GREEN=(52,199,89)
RED=(255,59,48); ORANGE=(255,159,10)

def gradient_bg(top=(10,10,12), bot=(28,28,30)):
    img = Image.new("RGB", (W, H)); d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(int(top[0]+(bot[0]-top[0])*t), int(top[1]+(bot[1]-top[1])*t), int(top[2]+(bot[2]-top[2])*t)))
    return img

def wrap(draw, text, font, max_w):
    words = text.split(); lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=font) <= max_w: cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def draw_block(draw, text, font, fill, cx, y, max_w, line_gap=12):
    """Bloque centrado SIN anchor. Devuelve Y después del bloque."""
    lines = wrap(draw, text, font, max_w)
    for l in lines:
        bb = draw.textbbox((0, 0), l, font=font)
        tw = bb[2] - bb[0]
        draw.text((cx - tw/2, y), l, font=font, fill=fill)
        y += (bb[3] - bb[1]) + line_gap
    return y

def number_block(draw, text, font, cx, y, fill, alpha=35):
    """Número posicionado por bbox real, no por anchor."""
    bb = draw.textbbox((0, 0), text, font=font)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    x = cx - tw//2
    draw.text((x, y), text, font=font, fill=(*fill, alpha))
    return y + th

def badge(draw, text, font, cx, y, color=BLUE):
    bb = draw.textbbox((0, 0), text, font=font)
    tw = bb[2] - bb[0] + 60
    th = bb[3] - bb[1] + 30
    draw.rounded_rectangle([(cx-tw//2, y), (cx+tw//2, y+th)], radius=th//2, fill=(*color, 40))
    draw.text((cx, y+8), text, font=font, fill=color)
    return y + th + 10

def button(draw, texts, fonts, fills, cx, y1, y2, max_w, bg, line_gap=26):
    pad = 28
    total_h = 0
    for i, t in enumerate(texts):
        bb = draw.textbbox((0, 0), t, font=fonts[i])
        total_h += (bb[3] - bb[1])
        if i < len(texts) - 1: total_h += line_gap
    total_h += pad * 2
    btn_h = min(total_h, y2 - y1)
    btn_y1 = y1 + (y2 - y1 - btn_h) // 2
    btn_y2 = btn_y1 + btn_h
    draw.rounded_rectangle([(140, btn_y1), (940, btn_y2)], radius=40, fill=bg)
    y = btn_y1 + pad
    for i, t in enumerate(texts):
        bb = draw.textbbox((0, 0), t, font=fonts[i])
        tw = bb[2] - bb[0]
        draw.text((cx - tw/2, y), t, font=fonts[i], fill=fills[i])
        y += (bb[3] - bb[1]) + (line_gap if i < len(texts) - 1 else 0)
    return btn_y2 + 20

# ========== VARIANTE 1: Número arriba ==========
img = gradient_bg(top=(12,8,8), bot=(30,18,18)); d = ImageDraw.Draw(img)
f_badge = ImageFont.truetype(F_BOLD, 32)
f_h1 = ImageFont.truetype(F_BOLD, 88)
f_sub = ImageFont.truetype(F_REG, 40)
f_num = ImageFont.truetype(F_COND, 220)

y = 80
y = badge(d, "CLÍNICAS DENTALES · VERANO MEDIA", f_badge, W//2, y, RED)
y += 20
y = number_block(d, "1", f_num, W//2, y, RED, alpha=35)
y += 40
y = draw_block(d, "TU CLÍNICA NO PIERDE", f_h1, WHITE, W//2, y, 900, 10)
y = draw_block(d, "PACIENTES.", f_h1, WHITE, W//2, y, 900, 10)
y = draw_block(d, "PIERDE TIEMPO.", f_h1, RED, W//2, y, 900, 10)
y += 40
draw_block(d, "El problema no es la odontología. Es el sistema.", f_sub, GREY, W//2, y, 860, 12)
img.save(f"{OUT}/01-portada.png", quality=92)
print("01-portada OK")

# ========== VARIANTE 2: Número izquierda ==========
img = gradient_bg(top=(8,12,8), bot=(18,30,18)); d = ImageDraw.Draw(img)
f_h = ImageFont.truetype(F_BOLD, 68)
f_b = ImageFont.truetype(F_REG, 40)
f_num = ImageFont.truetype(F_COND, 260)

y = 200
y = number_block(d, "1", f_num, 160, y, GREEN, alpha=30)
y += 60
y = draw_block(d, "El 30% de las llamadas", f_h, WHITE, W//2, y, 860, 12)
y = draw_block(d, "se pierden", f_h, WHITE, W//2, y, 860, 12)
y += 60
draw_block(d, "El paciente llama y nadie contesta. Ese paciente ya llamó a otra clínica.", f_b, GREY, W//2, y, 840, 12)
draw_block(d, "Un sistema automático contesta las 24 horas.", f_b, GREY, W//2, y+80, 840, 12)
img.save(f"{OUT}/02-problema-1.png", quality=92)
print("02-problema-1 OK")

# ========== VARIANTE 3: Número derecha ==========
img = gradient_bg(top=(8,8,18), bot=(18,18,35)); d = ImageDraw.Draw(img)
y = 200
y = number_block(d, "2", f_num, 920, y, BLUE, alpha=30)
y += 60
y = draw_block(d, "Sin confirmación automática,", f_h, WHITE, W//2, y, 860, 12)
y = draw_block(d, "las citas se olvidan", f_h, WHITE, W//2, y, 860, 12)
y += 60
draw_block(d, "Un WhatsApp automático reduce los no-shows hasta en un 70%.", f_b, GREY, W//2, y, 840, 12)
draw_block(d, "El paciente confirma y la agenda se llena sola.", f_b, GREY, W//2, y+80, 840, 12)
img.save(f"{OUT}/03-problema-2.png", quality=92)
print("03-problema-2 OK")

# ========== VARIANTE 4: Número centro pequeño ==========
img = gradient_bg(top=(15,12,8), bot=(35,25,15)); d = ImageDraw.Draw(img)
f_num_small = ImageFont.truetype(F_COND, 120)
y = 160
y = number_block(d, "3", f_num_small, W//2, y, ORANGE, alpha=50)
y += 60
y = draw_block(d, "Sin seguimiento,", f_h, WHITE, W//2, y, 860, 12)
y = draw_block(d, "el presupuesto se archiva", f_h, WHITE, W//2, y, 860, 12)
y += 60
draw_block(d, "Un presupuesto sin seguimiento se convierte en dinero olvidado.", f_b, GREY, W//2, y, 840, 12)
draw_block(d, "Un recordatorio automático recupera lo que creías perdido.", f_b, GREY, W//2, y+80, 840, 12)
img.save(f"{OUT}/04-problema-3.png", quality=92)
print("04-problema-3 OK")

# ========== VARIANTE 5: CTA ==========
img = gradient_bg(top=(8,12,18), bot=(18,28,40)); d = ImageDraw.Draw(img)
f_cta_t = ImageFont.truetype(F_BOLD, 52)
f_cta_s = ImageFont.truetype(F_BOLD, 36)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 40)

y = 160
y = draw_block(d, "Automatiza tu clínica.", f_h, WHITE, W//2, y, 920, 12)
y = draw_block(d, "Sin dolor de cabeza.", f_h, GREEN, W//2, y, 920, 12)
y += 70
draw_block(d, "Confirmaciones + recordatorios + seguimiento automático.", f_b, GREY, W//2, y, 860, 12)
button(d, ["DIAGNÓSTICO GRATUITO", "Escríbenos 'SISTEMA' por WhatsApp"],
       [f_cta_t, f_cta_s], [WHITE, WHITE], W//2, 940, 1190, 760, BLUE, line_gap=28)
y = 1220
y = badge(d, "Verano Media · tu sistema de clientes", f_b, W//2, y, BLUE)
img.save(f"{OUT}/05-cta.png", quality=92)
print("05-cta OK")

print("\n✅ Generador SIN anchor='ma' completado")
