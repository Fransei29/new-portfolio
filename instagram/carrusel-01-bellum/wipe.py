# Video del slide 06: una línea barre la pantalla y la pasa de claro a oscuro y de vuelta.
# Usa slides/06.png (claro) y slides/s6-dark.png (oscuro). Uso: python3 wipe.py → slides/06.mp4
import subprocess
from PIL import Image, ImageDraw

FPS, W, H = 30, 1080, 1440
light = Image.open('slides/06.png').convert('RGB')
dark = Image.open('slides/s6-dark.png').convert('RGB')

def ease(t):  # ease-in-out cúbico
    return 4 * t ** 3 if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2

# (duración en segundos, posición inicial y final de la línea: 0 = izquierda, 1 = derecha)
# A la izquierda de la línea se ve el oscuro.
STEPS = [(0.9, 0, 0), (1.6, 0, 1), (1.1, 1, 1), (1.6, 1, 0), (0.4, 0, 0)]

def frame(x):
    im = light.copy()
    px = round(x * W)
    if px > 0:
        im.paste(dark.crop((0, 0, px, H)), (0, 0))
    if 0 < px < W:
        d = ImageDraw.Draw(im)
        d.rectangle((px - 3, 0, px + 3, H), fill='#ffffff')
        cy, r = H // 2 + 120, 46
        d.ellipse((px - r, cy - r, px + r, cy + r), fill='#ffffff', outline='#8e7ae6', width=4)
        for s in (-1, 1):  # flechitas ‹ ›
            d.polygon([(px + s * 26, cy), (px + s * 12, cy - 13), (px + s * 12, cy + 13)], fill='#2e294e')
    return im

ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', 'slides/06.mp4'], stdin=subprocess.PIPE)
for dur, a, b in STEPS:
    n = round(dur * FPS)
    for i in range(n):
        ff.stdin.write(frame(a + (b - a) * ease(i / max(n - 1, 1))).tobytes())
ff.stdin.close(); ff.wait()
print('slides/06.mp4')
