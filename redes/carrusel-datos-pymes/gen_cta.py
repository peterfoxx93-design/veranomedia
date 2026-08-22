import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-datos-pymes")
W, H = 1080, 1350
BLUE = (0, 122, 255); GREEN = (52, 199, 89); WHITE = (255, 255, 255); GREY = (174, 174, 178)

def gradient_bg():
    img = Image.new("RGB", (W, H)); d = ImageDraw.Draw(img)
    top = (10, 10, 12); bot = (28, 28, 30)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=(int(top[0]+(bot[0]-top[0])*t), int(top[1]+(bot[1]-top[1])*t), int(top[2]+(bot[2]-top[2])*t)))
    return img

def wrap(text, font, max_w, draw):
    words = text.split(); lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=font) <= max_w: cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def block_lines(draw, lines, font, fill, cx, y, max_w, line_gap=10):
    for l in lines:
        bb = draw.textbbox((0, 0), l, font=font)
        tw = bb[2] - bb[0]
        draw.text((cx - tw/2, y), l, font=font, fill=fill)
        y += (bb[3] - bb[1]) + line_gap
    return y

def vcenter_block(draw, box_y1, box_y2, lines, font, fill, max_w, cx=W//2, line_gap=10):
    h = 0
    for l in lines:
        bb = draw.textbbox((0, 0), l, font=font)
        h += (bb[3] - bb[1]) + line_gap
    y = box_y1 + (box_y2 - box_y1 - h) / 2
    block_lines(draw, lines, font, fill, cx, y, max_w, line_gap)

# Lámina 5 — CTA
img = gradient_bg(); d = ImageDraw.Draw(img)
f_cta_t = ImageFont.truetype(F_BOLD, 52)
f_cta_s = ImageFont.truetype(F_BOLD, 36)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 40)

y = 200
y = block_lines(d, wrap("Cerrar la brecha entre", f_h, 920, d), f_h, WHITE, W//2, y, 920, 8)
y = block_lines(d, wrap("confianza y automatización", f_h, 920, d), f_h, GREEN, W//2, y, 920, 8)
y += 80
block_lines(d, wrap("Nosotros implementamos el sistema completo para que tu negocio", f_b, 860, d), f_b, GREY, W//2, y, 860, 10)
block_lines(d, wrap("deje de perder clientes por procesos manuales.", f_b, 860, d), f_b, GREY, W//2, y+50, 860, 10)

d.rounded_rectangle([(140, 940), (940, 1190)], radius=40, fill=BLUE)
vcenter_block(d, 940, 1190, ["DIAGNÓSTICO GRATUITO", "Escríbenos 'SISTEMA' por WhatsApp"], f_cta_t, WHITE, 760, line_gap=20)
block_lines(d, wrap("Verano Media · tu sistema de clientes", f_b, 900, d), f_b, GREY, W//2, 1250, 900, 10)
img.save(f"{OUT}/05-cta.png", quality=92)
print("05-cta OK")

# Verificar ancho del botón
for l, font in [("DIAGNÓSTICO GRATUITO", f_cta_t), ("Escríbenos 'SISTEMA' por WhatsApp", f_cta_s)]:
    wl = d.textlength(l, font=font)
    print(f"  '{l}': {wl:.0f}px vs 800px → {'OK' if wl < 800 else 'SE SALE'}")
