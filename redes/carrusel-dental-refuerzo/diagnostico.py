import os
os.environ['TMPDIR'] = '/data/data/com.termux/files/usr/tmp'
from PIL import Image, ImageDraw, ImageFont

FONTS = "/data/data/com.termux/files/usr/share/fonts/TTF"
F_BOLD = os.path.join(FONTS, "DejaVuSans-Bold.ttf")
F_REG = os.path.join(FONTS, "DejaVuSans.ttf")
F_COND = os.path.join(FONTS, "DejaVuSansCondensed-Bold.ttf")
W, H = 1080, 1350
WHITE=(255,255,255); GREY=(174,174,178)
BLUE=(0,122,255); GREEN=(52,199,89)
RED=(255,59,48); ORANGE=(255,159,10)

def measure_line(text, font, cx, y, fill=(255,255,255)):
    img = Image.new("RGB", (W,H)); d = ImageDraw.Draw(img)
    d.text((cx,y), text, font=font, fill=fill, anchor="ma")
    bb = d.textbbox((cx,y), text, font=font, anchor="ma")
    return bb[1], bb[3], bb[3]-bb[1]

def draw_text_block(draw, text, font, fill, cx, y, max_w, line_gap=12):
    words = text.split(); lines, cur = [], ""
    for w in words:
        test = (cur+" "+w).strip()
        if draw.textlength(test, font=font) <= max_w: cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    for l in lines:
        bb = draw.textbbox((0,0), l, font=font)
        tw = bb[2]-bb[0]
        draw.text((cx-tw/2, y), l, font=font, fill=fill)
        y += (bb[3]-bb[1]) + line_gap
    return y

print("="*60)
print("TEST 1: Medición de líneas individuales")
print("="*60)
f_h1 = ImageFont.truetype(F_BOLD, 92)
f_h = ImageFont.truetype(F_BOLD, 72)
f_b = ImageFont.truetype(F_REG, 42)
f_num = ImageFont.truetype(F_COND, 200)

test_lines = [
    ("EL DATO QUE", f_h1, WHITE),
    ("TU COMPETENCIA", f_h1, WHITE),
    ("IGNORA", f_h1, BLUE),
    ("36,1%", f_num, RED),
    ("de las PyMEs dominicanas", f_h, WHITE),
]
for text, font, color in test_lines:
    top, bottom, height = measure_line(text, font, W//2, 0, color)
    print(f"  '{text}': top={top}, bottom={bottom}, height={height}")

print("\n" + "="*60)
print("TEST 2: textbbox con anchor='ma'")
print("="*60)
img = Image.new("RGB", (W,H)); d = ImageDraw.Draw(img)
cx, cy = W//2, 300
text = "36,1%"
d.text((cx,cy), text, font=f_num, fill=RED, anchor="ma")
bb = d.textbbox((cx,cy), text, font=f_num, anchor="ma")
print(f"  anchor=({cx},{cy})")
print(f"  bbox={bb}")
print(f"  bbox height={bb[3]-bb[1]}")
print(f"  bbox top={bb[1]} (esperado ~{cy - (bb[3]-bb[1])//2})")
print(f"  bbox bottom={bb[3]} (esperado ~{cy + (bb[3]-bb[1])//2})")

print("\n" + "="*60)
print("TEST 3: Layout 3 líneas con draw_text_block")
print("="*60)
img = Image.new("RGB", (W,H)); d = ImageDraw.Draw(img)
y = 440
y = draw_text_block(d, "EL DATO QUE", f_h1, WHITE, W//2, y, 900, line_gap=6)
y = draw_text_block(d, "TU COMPETENCIA", f_h1, WHITE, W//2, y, 900, line_gap=6)
y = draw_text_block(d, "IGNORA", f_h1, BLUE, W//2, y, 900, line_gap=6)
print(f"  Y final después de 3 líneas: {y}")
print(f"  (debería estar entre 700-900 para que quepa)")

print("\n" + "="*60)
print("TEST 4: Altura real de fuente vs tamaño declarado")
print("="*60)
for name, font in [("H1 92px", f_h1), ("H 72px", f_h), ("Body 42px", f_b), ("Num 200px", f_num)]:
    bb = d.textbbox((0,0), "Ag", font=font)
    h = bb[3]-bb[1]
    print(f"  {name}: bbox height={h}px (font size={font.size}px, ratio={h/font.size:.2f})")
