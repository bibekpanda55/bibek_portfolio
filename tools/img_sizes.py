"""Regenerate assets/img-sizes.js after adding or replacing images.

Every <img> on the page gets its real width and height from this file, so the
layout doesn't shift while images load (Safari has no scroll anchoring, so a
shift makes the page jump while you scroll). Run from the repo root:

    python3 tools/img_sizes.py
"""
import glob, json
from PIL import Image

sizes = {f: list(Image.open(f).size) for f in sorted(glob.glob("assets/img/**/*.webp", recursive=True))}
with open("assets/img-sizes.js", "w") as fh:
    fh.write("/* Generated: intrinsic sizes of images, so the layout never shifts while they load. */\n")
    fh.write("window.IMG_SIZES = " + json.dumps(sizes, separators=(",", ":")) + ";\n")
print(f"{len(sizes)} images")
