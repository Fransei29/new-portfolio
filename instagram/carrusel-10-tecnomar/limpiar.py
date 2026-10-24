# Algunos cuadros de grabar.mjs salen con una franja blanca arriba (glitch de la captura con GPU, dura un cuadro).
# Los reemplaza por el cuadro bueno anterior. Uso: python3 limpiar.py && node video.mjs
from PIL import Image, ImageStat
import shutil
for d in ['desk', 'm']:
    prev = None
    for i in range(len(__import__('os').listdir(f'frames/{d}'))):
        f = f'frames/{d}/{i:04d}.jpg'
        if ImageStat.Stat(Image.open(f).convert('L').crop((0, 0, 300, 8))).mean[0] > 40 and prev:
            shutil.copy(prev, f); print('reemplazado', f)
        else:
            prev = f
