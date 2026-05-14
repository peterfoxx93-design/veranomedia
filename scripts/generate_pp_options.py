#!/data/data/com.termux/files/home/.hermes/venv/bin/python3
"""
Genera 4 opciones de foto de perfil para Verano Media
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/data/data/com.termux/files/home/veranomedia/public/profile-pics"
os.makedirs(OUT, exist_ok=True)

# Colors
DARK_GRAY = "#2C2C2E"
BRAND_BLUE = "#0066CC"
LIGHT_GRAY = "#F2F2F7"
MID_GRAY = "#8E8E93"
WHITE = "#FFFFFF"
SUNSET_ORANGE = "#FF6B35"
SUNSET_YELLOW = "#FFD166"
OCEAN_TEAL = "#0A9396"

# Fonts
FONT_REG = "/data/data/com.termux/files/home/.hermes/scripts/font_regular.ttf"
FONT_BOLD = "/data/data/com.termux/files/home/.hermes/scripts/font_bold.ttf"

SZ = 640  # base square size

def circle_crop(img):
    """Crop image to circle"""
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    result = img.copy()
    result.putalpha(mask)
    return result

def make_gradient(size, color1, color2, direction='v'):
    """Create gradient background"""
    img = Image.new('RGBA', size, WHITE)
    for y in range(size[1]):
        ratio = y / size[1] if direction == 'v' else 0.5
        r = int(int(color1[1:3], 16) * (1-ratio) + int(color2[1:3], 16) * ratio)
        g = int(int(color1[3:5], 16) * (1-ratio) + int(color2[3:5], 16) * ratio)
        b = int(int(color1[5:7], 16) * (1-ratio) + int(color2[5:7], 16) * ratio)
        for x in range(size[0]):
            img.putpixel((x, y), (r, g, b, 255))
    return img

# ─── OPTION 1: Full Wordmark ───
def option_1_full_wordmark():
    img = Image.new('RGBA', (SZ, SZ), LIGHT_GRAY)
    draw = ImageDraw.Draw(img)
    
    # Subtle gradient overlay
    overlay = make_gradient((SZ, SZ), "#FFFFFF00", "#00000008", 'v')
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)
    
    # "Verano" in dark gray
    f1 = ImageFont.truetype(FONT_BOLD, 72)
    draw.text((320, 240), "Verano", fill=DARK_GRAY, font=f1, anchor="mm")
    
    # "Media" in blue
    f2 = ImageFont.truetype(FONT_BOLD, 72)
    draw.text((320, 316), "Media", fill=BRAND_BLUE, font=f1, anchor="mm")
    
    # Tagline
    f3 = ImageFont.truetype(FONT_REG, 24)
    draw.text((320, 380), "AGENCIA DE MARKETING DIGITAL", fill=MID_GRAY, font=f3, anchor="mm")
    
    # Circle crop
    final = circle_crop(img)
    final.save(f"{OUT}/01-full-wordmark.png")
    return final

# ─── OPTION 2: Minimal Wordmark (no tagline) ───
def option_2_minimal_wordmark():
    # Background: dark gradient (navy -> dark blue) for contrast
    img = make_gradient((SZ, SZ), "#1C1C2E", BRAND_BLUE)
    draw = ImageDraw.Draw(img)
    
    # "Verano" in white
    f1 = ImageFont.truetype(FONT_BOLD, 80)
    draw.text((320, 270), "Verano", fill=WHITE, font=f1, anchor="mm")
    
    # "Media" in bright accent
    f2 = ImageFont.truetype(FONT_BOLD, 80)
    draw.text((320, 350), "Media", fill="#4FC3F7", font=f2, anchor="mm")
    
    # Subtle underline accent
    draw.rounded_rectangle([220, 380, 420, 386], radius=3, fill="#4FC3F7")
    
    final = circle_crop(img)
    final.save(f"{OUT}/02-minimal-wordmark.png")
    return final

# ─── OPTION 3: VM Monogram + Sun ───
def option_3_vm_monogram():
    # Background: warm summer gradient
    img = make_gradient((SZ, SZ), "#FF6B35", "#FFD166", 'v')
    draw = ImageDraw.Draw(img)
    
    # Large "VM" monogram
    f1 = ImageFont.truetype(FONT_BOLD, 180)
    text = "VM"
    bbox = draw.textbbox((0, 0), text, font=f1)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((SZ - tw) // 2, (SZ - th) // 2 - 10), text, fill=WHITE, font=f1)
    
    # Subtle tagline below
    f2 = ImageFont.truetype(FONT_REG, 22)
    draw.text((320, 450), "VERANO MEDIA", fill="#FFFFFFCC", font=f2, anchor="mm")
    
    final = circle_crop(img)
    final.save(f"{OUT}/03-vm-monogram.png")
    return final

# ─── OPTION 4: Brand Blue Square with Wordmark ───
def option_4_blue_wordmark():
    # Dark blue background with a modern feel
    img = Image.new('RGBA', (SZ, SZ), (10, 22, 40, 255))
    draw = ImageDraw.Draw(img)
    
    # Bottom accent glow — must be full size RGBA
    glow = Image.new('RGBA', (SZ, SZ), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.rectangle([0, SZ//2, SZ, SZ], fill=(0, 102, 204, 40))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)
    
    # "VeranoMedia" as one word, with color split
    f1 = ImageFont.truetype(FONT_BOLD, 64)
    # We'll position and draw manually since we can't do mixed colors in one string
    # "Verano" dark gray on light? No — on dark bg use white
    draw.text((320, 260), "Verano", fill=WHITE, font=f1, anchor="mm")
    draw.text((320, 335), "Media", fill="#4FC3F7", font=f1, anchor="mm")
    
    # Decorative dots
    dot_y = 410
    for i in range(3):
        draw.ellipse([310 + i*30 - 5, dot_y - 5, 310 + i*30 + 5, dot_y + 5], fill=BRAND_BLUE)
    
    final = circle_crop(img)
    final.save(f"{OUT}/04-blue-wordmark.png")
    return final

# ─── Option 5: Instagram-friendly circular avatar with "VM" icon ───
def option_5_vm_icon_circle():
    # Clean white background, blue ring, monogram center
    img = Image.new('RGBA', (SZ, SZ), (0, 0, 0, 0))
    
    # Outer ring
    draw = ImageDraw.Draw(img)
    draw.ellipse([20, 20, SZ-20, SZ-20], outline=BRAND_BLUE, width=12)
    
    # Inner circle accent
    draw.ellipse([120, 180, 520, 480], fill="#0A1628")
    
    # "VM" in white
    f1 = ImageFont.truetype(FONT_BOLD, 160)
    text = "VM"
    bbox = draw.textbbox((0, 0), text, font=f1)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((SZ - tw) // 2, (SZ - th) // 2), text, fill=WHITE, font=f1)
    
    final = circle_crop(img)
    final.save(f"{OUT}/05-vm-icon-ring.png")
    return final

# Generate all
print("🎨 Generando opciones de foto de perfil...")
option_1_full_wordmark()
print("✅ 01 - Full Wordmark (light bg)")
option_2_minimal_wordmark()
print("✅ 02 - Minimal Wordmark (dark bg)")
option_3_vm_monogram()
print("✅ 03 - VM Monogram + summer gradient")
option_4_blue_wordmark()
print("✅ 04 - Blue Wordmark (dark)")
option_5_vm_icon_circle()
print("✅ 05 - VM Icon + ring (clean)")
print(f"\n📁 Todas guardadas en: {OUT}/")
