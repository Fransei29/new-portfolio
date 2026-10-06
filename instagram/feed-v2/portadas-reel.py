# Portadas de reels en 1080x1920: la portada 3:4 de la grilla centrada, con el mismo fondo arriba y abajo.
# Instagram muestra en el perfil el centro 3:4, así que la grilla queda igual. Uso: python3 portadas-reel.py
from PIL import Image
# La del 01 se arma en index.html (#r01).
for n, color in [(5, (46, 41, 78))]:
    src = Image.open(f'out/{n:02d}.png').convert('RGB')
    c = Image.new('RGB', (1080, 1920), color)
    c.paste(src, (0, 240))
    c.save(f'out/{n:02d}-portada-reel.jpg', quality=95)
