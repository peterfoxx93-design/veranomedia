"""
Portada v8 — layout compacto: títulos juntos + subtítulo cerca.
"""
import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-datos-pymes")
W, H = 1080, 1350
BLUE = (0, 122, 255); WHITE = (255, 255, 255); GREY = (174, 174, 178)

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

def draw_lines(draw, lines, font, fill, cx, y, max_w, line_gap=6):
    for l in lines:
        bb = draw.textbbox((0, 0), l, font=font)
        tw = bb[2] - bb[0]
        draw.text((cx - tw/2, y), l, font=font, fill=fill)
        y += (bb[3] - bb[1]) + line_gap
    return y

img = gradient_bg(); d = ImageDraw.Draw(img)
f_badge = ImageFont.truetype(F_BOLD, 34)
f_h1 = ImageFont.truetype(F_BOLD, 92)
f_sub = ImageFont.truetype(F_REG, 42)
f_num = ImageFont.truetype(F_COND, 120)

badge = "DATOS DEL MERCADO · REPÚBLICA DOMINICANA"
bb = d.textbbox((0, 0), badge, font=f_badge)
bw = bb[2]-bb[0]+80; bh = bb[3]-bb[1]+40
d.rounded_rectangle([(W//2-bw//2, 90), (W//2+bw//2, 90+bh)], radius=bh//2, fill=(255,255,255,18))
d.text((W//2-(bb[2]-bb[0])/2, 100), badge, font=f_badge, fill=BLUE)

d.text((W//2, 220), "36", font=f_num, fill=(255, 255, 255, 30), anchor="ma")

y = 420
y = draw_lines(d, wrap("EL DATO QUE", f_h1, 900, d), f_h1, WHITE, W//2, y, 900, line_gap=6)
y = draw_lines(d, wrap("TU COMPETENCIA", f_h1, 900, d), f_h1, WHITE, W//2, y, 900, line_gap=6)
y = draw_lines(d, wrap("IGNORA", f_h1, 900, d), f_h1, BLUE, W//2, y, 900, line_gap=6)
y += 30
draw_lines(d, wrap("PyMEs dominicanas: listas para IA, pero sin automatizar", f_sub, 860, d), f_sub, GREY, W//2, y, 860, 10)
img.save(f"{OUT}/01-portada.png", quality=92)
print("01-portada OK — compacta")
