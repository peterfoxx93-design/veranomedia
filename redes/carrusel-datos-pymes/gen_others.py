import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
OUT = os.path.expanduser("~/veranomedia/redes/carrusel-datos-pymes")
W, H = 1080, 1350
BLUE = (0, 122, 255); GREEN = (52, 199, 89); RED = (255, 59, 48)
ORANGE = (255, 159, 10); WHITE = (255, 255, 255); GREY = (174, 174, 178)

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

# Lámina 2 — Dato 36,1%
img = gradient_bg(); d = ImageDraw.Draw(img)
f_num_big = ImageFont.truetype(F_COND, 300)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 42)

d.text((W//2, 300), "36,1%", font=f_num_big, fill=RED, anchor="ma")
y = 500
y = block_lines(d, wrap("de las PyMEs dominicanas", f_h, 860, d), f_h, WHITE, W//2, y, 860, 8)
y = block_lines(d, wrap("opera con baja automatización", f_h, 860, d), f_h, WHITE, W//2, y, 860, 8)
y += 60
block_lines(d, wrap("No usan herramientas digitales en sus procesos clave.", f_b, 860, d), f_b, GREY, W//2, y, 860, 10)
block_lines(d, wrap("Eso significa: más trabajo manual, más errores, menos clientes.", f_b, 860, d), f_b, GREY, W//2, y+50, 860, 10)
img.save(f"{OUT}/02-dato-36.png", quality=92)
print("02-dato-36 OK")

# Lámina 3 — Dato 27,8%
img = gradient_bg(); d = ImageDraw.Draw(img)
d.text((W//2, 300), "27,8%", font=f_num_big, fill=BLUE, anchor="ma")
y = 500
y = block_lines(d, wrap("se siente lista para IA", f_h, 860, d), f_h, WHITE, W//2, y, 860, 8)
y = block_lines(d, wrap("— el mayor optimismo de Latinoamérica", f_h, 860, d), f_h, WHITE, W//2, y, 860, 8)
y += 60
block_lines(d, wrap("La confianza hay de sobra.", f_b, 860, d), f_b, GREY, W//2, y, 860, 10)
block_lines(d, wrap("Lo que falta es ejecución. Ahí entra Verano Media.", f_b, 860, d), f_b, GREY, W//2, y+50, 860, 10)
img.save(f"{OUT}/03-dato-27.png", quality=92)
print("03-dato-27 OK")

# Lámina 4 — 49% / 68%
img = gradient_bg(); d = ImageDraw.Draw(img)
f_num_mid = ImageFont.truetype(F_COND, 200)
d.text((W//2, 220), "49%", font=f_num_mid, fill=ORANGE, anchor="ma")
y = 400
y = block_lines(d, wrap("solo explora IA sin resultados", f_h, 860, d), f_h, WHITE, W//2, y, 860, 8)
y += 60
d.text((W//2, y+20), "68%", font=f_num_mid, fill=RED, anchor="ma")
y2 = y + 130
y2 = block_lines(d, wrap("no tiene talento especializado en IA", f_h, 860, d), f_h, WHITE, W//2, y2, 860, 8)
block_lines(d, wrap("La barrera no es el dinero. Es el conocimiento.", f_b, 860, d), f_b, GREY, W//2, y2+50, 860, 10)
img.save(f"{OUT}/04-dato-49-68.png", quality=92)
print("04-dato-49-68 OK")
