import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-inmobiliaria")
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
f_badge = ImageFont.truetype(F_BOLD, 34)
f_h1 = ImageFont.truetype(F_BOLD, 92)
f_sub = ImageFont.truetype(F_REG, 42)
f_num = ImageFont.truetype(F_COND, 120)
badge = "INMOBILIARIAS · VERANO MEDIA"
bb = d.textbbox((0,0), badge, font=f_badge)
bw = bb[2]-bb[0]+80; bh = bb[3]-bb[1]+40
d.rounded_rectangle([(W//2-bw//2, 90),(W//2+bw//2, 90+bh)], radius=bh//2, fill=(255,255,255,18))
d.text((W//2-(bb[2]-bb[0])/2, 100), badge, font=f_badge, fill=BLUE)
y = 200
y = number_block(d, "1", f_num, W//2, y, WHITE, alpha=25)
y += 40
y = draw_block(d, "TU PROPIEDAD", f_h1, WHITE, W//2, y, 900, 6)
y = draw_block(d, "NO SE VENDE.", f_h1, WHITE, W//2, y, 900, 6)
y = draw_block(d, "El problema no es la propiedad.", f_h1, BLUE, W//2, y, 900, 6)
y += 30
draw_block(d, "Es el sistema.", f_sub, GREY, W//2, y, 860, 10)
img.save(f"{OUT}/01-portada.png", quality=92)
print("01-portada OK")

# Problema 1
img = gradient_bg(); d = ImageDraw.Draw(img)
f_num_big = ImageFont.truetype(F_COND, 200)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 42)
y = 200
y = number_block(d, "1", f_num_big, W//2, y, RED, alpha=40)
y += 40
y = draw_block(d, "El anuncio se pierde", f_h, WHITE, W//2, y, 860, 8)
y = draw_block(d, "en el grupo de Facebook", f_h, WHITE, W//2, y, 860, 8)
y += 40
draw_block(d, "Tu propiedad se hunde en un mar de publicaciones.", f_b, GREY, W//2, y, 860, 10)
draw_block(d, "Un catálogo profesional la destaca de la competencia.", f_b, GREY, W//2, y+70, 860, 10)
img.save(f"{OUT}/02-problema-1.png", quality=92)
print("02-problema-1 OK")

# Problema 2
img = gradient_bg(); d = ImageDraw.Draw(img)
y = 200
y = number_block(d, "2", f_num_big, W//2, y, ORANGE, alpha=40)
y += 40
y = draw_block(d, "Sin fotos profesionales,", f_h, WHITE, W//2, y, 860, 8)
y = draw_block(d, "no generas confianza", f_h, WHITE, W//2, y, 860, 8)
y += 40
draw_block(d, "Un teléfono con fotos borrosas transmite desconfianza.", f_b, GREY, W//2, y, 860, 10)
draw_block(d, "Fotos profesionales + descripción clara = ventas.", f_b, GREY, W//2, y+70, 860, 10)
img.save(f"{OUT}/03-problema-2.png", quality=92)
print("03-problema-2 OK")

# Problema 3
img = gradient_bg(); d = ImageDraw.Draw(img)
y = 200
y = number_block(d, "3", f_num_big, W//2, y, BLUE, alpha=40)
y += 40
y = draw_block(d, "Sin seguimiento,", f_h, WHITE, W//2, y, 860, 8)
y = draw_block(d, "el cliente se va con otro", f_h, WHITE, W//2, y, 860, 8)
y += 40
draw_block(d, "Un interesado sin seguimiento se convierte en cliente de la competencia.", f_b, GREY, W//2, y, 860, 10)
draw_block(d, "Un CRM con WhatsApp automático captura cada lead.", f_b, GREY, W//2, y+70, 860, 10)
img.save(f"{OUT}/04-problema-3.png", quality=92)
print("04-problema-3 OK")

# CTA
img = gradient_bg(); d = ImageDraw.Draw(img)
f_cta_t = ImageFont.truetype(F_BOLD, 52)
f_cta_s = ImageFont.truetype(F_BOLD, 36)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 40)
y = 160
y = draw_block(d, "Un sistema profesional", f_h, WHITE, W//2, y, 920, 8)
y = draw_block(d, "vende tu propiedad", f_h, GREEN, W//2, y, 920, 8)
y += 70
draw_block(d, "Catálogo digital + seguimiento automático + CRM inmobiliario.", f_b, GREY, W//2, y, 860, 10)
button(d, ["DIAGNÓSTICO GRATUITO", "Escríbenos 'SISTEMA' por WhatsApp"],
       [f_cta_t, f_cta_s], [WHITE, WHITE], W//2, 940, 1190, 760, BLUE, line_gap=28)
draw_block(d, "Verano Media · tu sistema de clientes", f_b, GREY, W//2, 1260, 900, 10)
img.save(f"{OUT}/05-cta.png", quality=92)
print("05-cta OK")
