#!/usr/bin/env python3
"""Generate multi-resolution opaque favicons and app icons for Adiells.github.io."""

import base64
import io
from pathlib import Path

from PIL import Image, ImageDraw

REPO_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = REPO_ROOT / "public"


def render_master(dim: int = 1024) -> Image.Image:
    """Render high-resolution master icon with solid dark background."""
    logo = Image.open(PUBLIC_DIR / "white-logo.png")
    bbox = logo.getbbox()
    logo_crop = logo.crop(bbox)

    master = Image.new("RGB", (dim, dim), (11, 13, 17))  # #0B0D11
    draw = ImageDraw.Draw(master)
    draw.rectangle([0, 0, dim - 1, dim - 1], outline=(35, 39, 48), width=max(1, int(dim / 48)))

    target_w = int(dim * 0.64)
    target_h = int(logo_crop.height * (target_w / logo_crop.width))
    logo_resized = logo_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)

    pos_x = (dim - target_w) // 2
    pos_y = (dim - target_h) // 2
    master.paste(logo_resized, (pos_x, pos_y), logo_resized.split()[-1])
    return master


def main() -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    master = render_master(1024)

    sizes = {
        "favicon-48x48.png": 48,
        "favicon-96x96.png": 96,
        "apple-touch-icon.png": 180,
        "icon-192.png": 192,
        "icon-512.png": 512,
    }

    for name, sz in sizes.items():
        resized = master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(PUBLIC_DIR / name, format="PNG", optimize=True)
        print(f"Saved {name} ({sz}x{sz})")

    # Multi-resolution ICO
    ico_path = PUBLIC_DIR / "favicon.ico"
    master_48 = master.resize((48, 48), Image.Resampling.LANCZOS)
    master_48.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved favicon.ico")

    # Clean SVG with solid background
    img512 = master.resize((512, 512), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img512.save(buf, format="PNG", optimize=True)
    b64_str = base64.b64encode(buf.getvalue()).decode("ascii")
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0B0D11"/>
  <image width="512" height="512" href="data:image/png;base64,{b64_str}"/>
</svg>
"""
    (PUBLIC_DIR / "favicon.svg").write_text(svg_content, encoding="utf-8")
    print("Saved favicon.svg")


if __name__ == "__main__":
    main()
