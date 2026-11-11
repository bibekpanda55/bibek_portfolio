"""Regenerate assets/img-sizes.js after adding or replacing images or videos.

Every <img> and <video> on the page gets its real width and height from this
file, so the layout doesn't shift while media loads (Safari has no scroll
anchoring, so a shift makes the page jump while you scroll). A video takes its
size from its poster, which sits next to it as <name>-poster.webp.
Run from the repo root:

    python3 tools/img_sizes.py
"""
import glob, json, os
from PIL import Image

sizes = {f: list(Image.open(f).size) for f in sorted(glob.glob("assets/img/**/*.webp", recursive=True))}
for v in sorted(glob.glob("assets/img/**/*.mp4", recursive=True)):
    poster = v[:-4] + "-poster.webp"
    if os.path.exists(poster):
        sizes[v] = sizes[poster]
with open("assets/img-sizes.js", "w") as fh:
    fh.write("/* Generated: intrinsic sizes of images and videos, so the layout never shifts while they load. */\n")
    fh.write("window.IMG_SIZES = " + json.dumps(sizes, separators=(",", ":")) + ";\n")
print(f"{len(sizes)} files")
