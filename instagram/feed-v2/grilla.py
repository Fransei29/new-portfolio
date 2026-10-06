# Arma la vista del perfil: grilla 3x3, lo más nuevo arriba a la izquierda.
from PIL import Image
W, H, G = 360, 480, 4
g = Image.new('RGB', (W*3 + G*2, H*3 + G*2), 'white')
for n in range(1, 10):
    pos = 9 - n
    im = Image.open(f'out/{n:02d}.png').convert('RGB').resize((W, H), Image.LANCZOS)
    g.paste(im, ((pos % 3) * (W + G), (pos // 3) * (H + G)))
g.save('grilla.jpg', quality=90)
