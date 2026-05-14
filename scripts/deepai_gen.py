#!/data/data/com.termux/files/home/.hermes/venv/bin/python3
"""Generate profile pic backgrounds using DeepAI, then composite with Verano Media text."""
import json, os, time, requests, sys
from PIL import Image, ImageDraw, ImageFont

API_KEY = "11b6546c-d048-42ab-9715-aadf98d7e431"
OUT = "/data/data/com.termux/files/home/veranomedia/public/profile-pics"
os.makedirs(OUT, exist_ok=True)

FONT_REG = "/data/data/com.termux/files/home/.hermes/scripts/font_regular.ttf"
FONT_BOLD = "/data/data/com.termux/files/home/.hermes/scripts/font_bold.ttf"

# ─── Styles for backgrounds ───
STYLES = [
    {
        "name": "navy-premium",
        "prompt": "Premium dark navy blue background with subtle geometric patterns and golden accent lines, luxurious texture, elegant minimal design, 1:1 square format, marketing agency aesthetic"
    },
    {
        "name": "tech-waves",
        "prompt": "Modern abstract background with flowing blue waves, technology theme, gradient from deep blue to teal, clean professional style for business branding"
    },
    {
        "name": "marble-luxury",
        "prompt": "Luxury minimalist background with subtle marble texture in light gray, elegant clean design, premium corporate style, soft lighting"
    },
    {
        "name": "summer-warm",
        "prompt": "Warm summer sunset gradient from coral orange to golden yellow, smooth modern abstract background, vibrant but professional, brand identity background"
    },
    {
        "name": "ocean-teal",
        "prompt": "Deep teal and ocean blue abstract gradient, modern dynamic pattern, professional technology feel for digital agency branding"
    }
]

def generate_bg(name, prompt):
    """Generate a background image via DeepAI."""
    print(f"🎨 Generating {name}...")
    resp = requests.post(
        "https://api.deepai.org/api/text2img",
        headers={"api-key": API_KEY},
        data={"text": prompt},
        timeout=90
    )
    if resp.status_code != 200:
        print(f"❌ {name}: API error {resp.status_code}")
        return None
    
    data = resp.json()
    img_url = data.get("output_url")
    if not img_url:
        print(f"❌ {name}: no output_url")
        return None
    
    print(f"   URL: {img_url}")
    
    # Download the image
    img_resp = requests.get(img_url, timeout=30)
    if img_resp.status_code != 200:
        print(f"❌ {name}: download failed {img_resp.status_code}")
        return None
    
    # Save raw
    raw_path = f"{OUT}/{name}_raw.jpg"
    with open(raw_path, "wb") as f:
        f.write(img_resp.content)
    
    # Open and resize to 640x640
    img = Image.open(raw_path).convert("RGB")
    img = img.resize((640, 640), Image.LANCZOS)
    
    # Save resized
    img.save(raw_path, quality=92)
    print(f"   Saved: {raw_path}")
    return img

def composite_logo(bg_img, name):
    """Overlay Verano Media text on background."""
    img = bg_img.copy().convert("RGBA")
    draw = ImageDraw.Draw(img)
    
    # Colors
    WHITE = (255, 255, 255, 255)
    ACCENT = (79, 195, 247, 255)  # Light blue
    DARK_GRAY = (44, 44, 46, 255)
    
    # --- Text: "Verano Media" ---
    # "Verano"
    f_main = ImageFont.truetype(FONT_BOLD, 72)
    draw.text((320, 240), "Verano", fill=WHITE, font=f_main, anchor="mm")
    
    # "Media"
    draw.text((320, 320), "Media", fill=ACCENT, font=f_main, anchor="mm")
    
    # Tagline
    f_tag = ImageFont.truetype(FONT_REG, 22)
    draw.text((320, 390), "AGENCIA DE MARKETING DIGITAL", fill=(255, 255, 255, 180), font=f_tag, anchor="mm")
    
    # Decorative underline
    draw.rounded_rectangle([200, 355, 440, 359], radius=2, fill=ACCENT)
    
    # Circle crop for profile pic
    mask = Image.new('L', (640, 640), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, 640, 640), fill=255)
    
    result = img.copy()
    result.putalpha(mask)
    
    final_path = f"{OUT}/deepai-{name}.png"
    result.save(final_path)
    print(f"✅ Composite: {final_path}")
    return final_path

def create_monogram_variant(file_label="vm-monogram"):
    """Create a VM monogram version with the best background."""
    # Use the navy premium bg or generate a custom one
    resp = requests.post(
        "https://api.deepai.org/api/text2img",
        headers={"api-key": API_KEY},
        data={"text": "Luxury deep blue background with subtle golden geometric shapes, modern corporate design, elegant texture, 1:1 square format for brand logo"},
        timeout=90
    )
    if resp.status_code != 200:
        print(f"❌ Monogram bg failed")
        return None
    
    data = resp.json()
    img_url = data.get("output_url")
    if not img_url:
        print("❌ Monogram: no output_url")
        return None
    
    img_resp = requests.get(img_url, timeout=30)
    if img_resp.status_code != 200:
        return None
    
    raw_path = f"{OUT}/monogram_raw.jpg"
    with open(raw_path, "wb") as f:
        f.write(img_resp.content)
    
    bg = Image.open(raw_path).convert("RGBA").resize((640, 640), Image.LANCZOS)
    
    # Dark overlay for contrast
    overlay = Image.new('RGBA', (640, 640), (0, 0, 0, 100))
    bg = Image.alpha_composite(bg, overlay)
    draw = ImageDraw.Draw(bg)
    
    # Large "VM" 
    f_big = ImageFont.truetype(FONT_BOLD, 180)
    draw.text((320, 280), "VM", fill=(255, 255, 255, 255), font=f_big, anchor="mm")
    
    # Full name below
    f_small = ImageFont.truetype(FONT_REG, 28)
    draw.text((320, 400), "VERANO MEDIA", fill=(255, 255, 255, 200), font=f_small, anchor="mm")
    
    # Circle crop
    mask = Image.new('L', (640, 640), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, 640, 640), fill=255)
    bg.putalpha(mask)
    
    final_path = f"{OUT}/deepai-{file_label}.png"
    bg.save(final_path)
    print(f"✅ Monogram: {final_path}")
    return final_path

# ─── Main ───
print("=" * 50)
print("🚀 DeepAI Profile Picture Generator for Verano Media")
print("=" * 50)

results = []

for style in STYLES:
    bg = generate_bg(style["name"], style["prompt"])
    if bg:
        path = composite_logo(bg, style["name"])
        if path:
            results.append(path)
    time.sleep(2)  # Rate limit buffer

# Bonus: Monogram version
mono = create_monogram_variant()
if mono:
    results.append(mono)

print("\n" + "=" * 50)
print(f"✅ GENERADAS: {len(results)} imágenes")
for r in results:
    print(f"   • {r}")
print("=" * 50)
