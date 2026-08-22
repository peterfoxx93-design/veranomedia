import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-datos-pymes")
W, H = 1080, 1350
BLUE=(0,122,255); GREEN=(52,199,89)
RED=(255,59,48); ORANGE=(255,159,10)
WHITE=(255,255,255); GREY=(174,174,178)

def gradient_bg(top=(10,10,12), bot=(28,28,30)):
    img = Image.new("RGB", (W,H)); d = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        d.line([(0,y),(W,y)], fill=(int(top[0]+(bot[0]-top[0])*t), int(top[1]+(bot[1]-top[1])*t), int(top[2]+(bot[2]-top[2])*t)))
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
    lines = wrap(draw, text, font, max_w)
    for l in lines:
        bb = draw.textbbox((0,0), l, font=font)
        tw = bb[2]-bb[0]
        draw.text((cx-tw/2, y), l, font=font, fill=fill)
        y += (bb[3]-bb[1]) + line_gap
    return y

def number_block(draw, text, font, cx, y, fill, alpha=35):
    bb = draw.textbbox((0,0), text, font=font)
    tw = bb[2]-bb[0]; th = bb[3]-bb[1]
    x = cx - tw//2
    draw.text((x, y), text, font=font, fill=(*fill, alpha))
    return y + th

def button(draw, texts, fonts, fills, cx, y1, y2, max_w, bg, line_gap=26):
    pad = 28
    total_h = 0
    for i, t in enumerate(texts):
        bb = draw.textbbox((0,0), t, font=fonts[i])
        total_h += (bb[3]-bb[1])
        if i < len(texts)-1: total_h += line_gap
    total_h += pad*2
    btn_h = min(total_h, y2-y1)
    btn_y1 = y1 + (y2-y1-btn_h)//2
    btn_y2 = btn_y1 + btn_h
    draw.rounded_rectangle([(140,btn_y1),(940,btn_y2)], radius=40, fill=bg)
    y = btn_y1 + pad
    for i, t in enumerate(texts):
        bb = draw.textbbox((0,0), t, font=fonts[i])
        tw = bb[2]-bb[0]
        draw.text((cx-tw/2, y), t, font=fonts[i], fill=fills[i])
        y += (bb[3]-bb[1]) + (line_gap if i < len(texts)-1 else 0)
    return btn_y2 + 20

# Portada
img = gradient_bg(); d = ImageDraw.Draw(img)
f_badge = ImageFont.truetype(F_BOLD, 32)
f_h1 = ImageFont.truetype(F_BOLD, 88)
f_sub = ImageFont.truetype(F_REG, 40)
f_num = ImageFont.truetype(F_COND, 150)
badge = "PYMES DOMINICANAS · VERANO MEDIA"
bb = d.textbbox((0,0), badge, font=f_badge)
bw = bb[2]-bb[0]+80; bh = bb[3]-bb[1]+40
d.rounded_rectangle([(W//2-bw//2, 90),(W//2+bw//2, 90+bh)], radius=bh//2, fill=(255,255,255,18))
d.text((W//2-(bb[2]-bb[0])/2, 100), badge, font=f_badge, fill=BLUE)
y = 200
y = number_block(d, "1", f_num, W//2, y, WHITE, alpha=25)
y += 40
y = draw_block(d, "EL DATO QUE TU", f_h1, WHITE, W//2, y, 900, 10)
y = draw_block(d, "COMPETENCIA", f_h1, WHITE, W//2, y, 900, 10)
y = draw_block(d, "IGNORA", f_h1, BLUE, W//2, y, 900, 10)
y += 30
draw_block(d, "Datos reales del mercado dominicano.", f_sub, GREY, W//2, y, 860, 12)
img.save(f"{OUT}/01-portada.png", quality=92)
print("01-portada OK")

# Dato 36,1%
img = gradient_bg(top=(8,12,18), bot=(18,28,40)); d = ImageDraw.Draw(img)
f_num_big = ImageFont.truetype(F_COND, 180)
f_h = ImageFont.truetype(F_BOLD, 68)
f_b = ImageFont.truetype(F_REG, 40)
y = 200
y = number_block(d, "36,1%", f_num_big, W//2, y, BLUE, alpha=50)
y += 40
y = draw_block(d, "de las PyMEs dominicanas", f_h, WHITE, W//2, y, 860, 12)
y = draw_block(d, "opera con baja automatizacion", f_h, WHITE, W//2, y, 860, 12)
y += 40
draw_block(d, "La mayoria sigue haciendo todo a mano.", f_b, GREY, W//2, y, 840, 12)
draw_block(d, "Nosotros le entregamos el sistema listo.", f_b, GREY, W//2, y+70, 840, 12)
img.save(f"{OUT}/02-dato-36.png", quality=92)
print("02-dato-36 OK")

# Dato 27,8%
img = gradient_bg(top=(8,12,8), bot=(18,30,18)); d = ImageDraw.Draw(img)
y = 200
y = number_block(d, "27,8%", f_num_big, W//2, y, GREEN, alpha=50)
y += 40
y = draw_block(d, "de las PyMEs se siente", f_h, WHITE, W//2, y, 860, 12)
y = draw_block(d, "lista para IA", f_h, WHITE, W//2, y, 860, 12)
y += 40
draw_block(d, "Tienen la confianza, pero no ejecutan.", f_b, GREY, W//2, y, 840, 12)
draw_block(d, "Nosotros le damos la herramienta y el camino.", f_b, GREY, W//2, y+70, 840, 12)
img.save(f"{OUT}/03-dato-27.png", quality=92)
print("03-dato-27 OK")

# Datos 49% y 68%
img = gradient_bg(top=(15,12,8), bot=(35,25,15)); d = ImageDraw.Draw(img)
f_num_med = ImageFont.truetype(F_COND, 140)
y = 160
y = number_block(d, "49%", f_num_med, W//2, y, ORANGE, alpha=50)
y += 20
draw_block(d, "solo explora IA sin resultados", f_h, WHITE, W//2, y, 860, 12)
y = 480
y = number_block(d, "68%", f_num_med, W//2, y, RED, alpha=50)
y += 20
draw_block(d, "no tiene talento especializado en IA", f_h, WHITE, W//2, y, 860, 12)
y = 780
draw_block(d, "La brecha no es de datos. Es de ejecucion.", f_b, GREY, W//2, y, 840, 12)
img.save(f"{OUT}/04-dato-49-68.png", quality=92)
print("04-dato-49-68 OK")

# CTA
img = gradient_bg(); d = ImageDraw.Draw(img)
f_cta_t = ImageFont.truetype(F_BOLD, 52)
f_cta_s = ImageFont.truetype(F_BOLD, 36)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 40)
y = 160
y = draw_block(d, "Nosotros cerramos", f_h, WHITE, W//2, y, 920, 10)
y = draw_block(d, "esa brecha.", f_h, GREEN, W//2, y, 920, 10)
y += 70
draw_block(d, "Automatizacion + IA + seguimiento para PyMEs dominicanas.", f_b, GREY, W//2, y, 860, 10)
button(d, ["DIAGNÓSTICO GRATUITO", "Escríbenos 'SISTEMA' por WhatsApp"],
       [f_cta_t, f_cta_s], [WHITE, WHITE], W//2, 940, 1190, 760, BLUE, line_gap=28)
draw_block(d, "Verano Media · tu sistema de clientes", f_b, GREY, W//2, 1260, 900, 10)
img.save(f"{OUT}/05-cta.png", quality=92)
print("05-cta OK")
