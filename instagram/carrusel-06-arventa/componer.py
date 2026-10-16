# Arventa no tiene sitio público: todo sale de las capturas de escritorio ya anonimizadas
# (public/img/img/arventa-web/arventa-NN.webp). Este script recorta la ventana de la app
# y arma las pantallas de celu (recortes de esas mismas capturas apilados en una columna).
# Uso: python3 componer.py  → media/*.png
from pathlib import Path
from PIL import Image, ImageDraw

HERE = Path(__file__).parent
SRC = HERE.parent.parent / 'public/img/img/arventa-web'
OUT = HERE / 'media'
OUT.mkdir(exist_ok=True)

WIN = (68, 70, 1655, 844)        # ventana de la app dentro de la captura (sin el fondo azul)
MAIN = (323, 135, 1655, 844)     # columna principal, sin barra lateral ni encabezado
BG = (245, 247, 249)
LINE = (226, 230, 236)
W = 400                          # ancho del celu en px de captura


def src(n):
    return Image.open(SRC / f'arventa-{n:02d}.webp').convert('RGB')


def window(n):
    """Ventana de la app con las esquinas redondeadas rellenas (sin el fondo azul)."""
    im = src(n).crop(WIN)
    r = 26
    w, h = im.size
    px = im.load()
    for cx, cy, dx, dy in [(r, r, -1, -1), (w - r - 1, r, 1, -1), (r, h - r - 1, -1, 1), (w - r - 1, h - r - 1, 1, 1)]:
        fill = px[cx, cy]
        for y in range(r + 1):
            for x in range(r + 1):
                X, Y = cx + dx * x, cy + dy * y
                if x * x + y * y > r * r and 0 <= X < w and 0 <= Y < h:
                    px[X, Y] = fill
    return im


def fit(im, width):
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


class Phone:
    """Columna de celu: barra con el logo y bloques apilados."""

    def __init__(self, bg=BG):
        self.bg = bg
        self.parts = []
        logo = src(1).crop((138, 86, 256, 124))
        bar = Image.new('RGB', (W, 66), 'white')
        bar.paste(logo, (18, 14))
        d = ImageDraw.Draw(bar)
        for i in range(3):
            d.rounded_rectangle((W - 46, 22 + i * 9, W - 20, 24 + i * 9), 1, fill=(71, 85, 105))
        d.line((0, 65, W, 65), fill=LINE, width=1)
        self.add(bar, 0, 0)

    def add(self, im, gap=14, x=None):
        self.parts.append((im, gap, x))

    def card(self, im, gap=14, width=W - 32, pad=0):
        """Pega un recorte sobre una tarjeta blanca propia (para recortes que cortan el borde original)."""
        im = fit(im, width - 2 * pad)
        c = Image.new('RGB', (width, im.height + 2 * pad), self.bg)
        d = ImageDraw.Draw(c)
        d.rounded_rectangle((0, 0, width - 1, c.height - 1), 12, fill='white', outline=LINE, width=1)
        c.paste(im, (pad, pad))
        self.add(c, gap)

    def save(self, name, extra=0):
        h = sum(im.height + gap for im, gap, _ in self.parts) + extra
        canvas = Image.new('RGB', (W, h), self.bg)
        y = 0
        for im, gap, x in self.parts:
            y += gap
            canvas.paste(im, ((W - im.width) // 2 if x is None else x, y))
            y += im.height
        canvas.save(OUT / name)
        print(name, canvas.size)


# Pantallas de escritorio (ventana completa)
for n in [1, 4, 5, 8, 10]:
    window(n).save(OUT / f'd-{n:02d}.png')
    print(f'd-{n:02d}.png')

# Login (portada): 14 es pantalla completa, sin ventana ni fondo azul
src(14).save(OUT / 'd-login.png')
print('d-login.png')

# Ficha de factura completa para el video del slide 02: la columna principal de 05, 06 y 07
# (son tres posiciones de scroll de la misma página) apiladas.
cols = [src(n).crop((MAIN[0], MAIN[1] + 8, MAIN[2] - 16, MAIN[3])) for n in (5, 6, 7)]
ficha = Image.new('RGB', (cols[0].width, sum(c.height for c in cols)), BG)
y = 0
for c in cols:
    ficha.paste(c, (0, y))
    y += c.height
ficha.save(OUT / 'd-ficha-main.png')
print('d-ficha-main.png', ficha.size)

# Celu 1: tablero
p = Phone()
a = src(1)
p.add(a.crop((345, 160, 640, 220)), 18, 6)
for box in [(348, 243, 651, 418), (676, 243, 978, 418), (1003, 243, 1306, 418), (1331, 243, 1633, 418)]:
    p.add(fit(a.crop(box), W - 32))
p.add(fit(a.crop((348, 443, 760, 643)), W - 32))
p.save('m-tablero.png', 20)

# Celu 2: actividad por empresa (lista de empresas + detalle de la primera)
a = src(3)
p = Phone(bg=a.getpixel((600, 150)))
p.add(a.crop((345, 160, 480, 196)), 22, 8)
p.add(fit(a.crop((324, 243, 856, 768)), W), 14)
p.add(fit(a.crop((878, 262, 1080, 322)), 200), 24, 14)
p.add(fit(a.crop((881, 335, 1121, 408)), W - 32), 12)
k1, k2 = fit(a.crop((1137, 335, 1377, 408)), (W - 44) // 2), fit(a.crop((1393, 335, 1633, 408)), (W - 44) // 2)
r = Image.new('RGB', (W - 32, k1.height), p.bg)
r.paste(k1, (0, 0)); r.paste(k2, (r.width - k2.width, 0))
p.add(r, 12)
p.card(a.crop((883, 528, 1631, 734)), 16)
p.save('m-actividad.png', 24)

# Celu 3: recorrido de cobro (nodos del editor, uno debajo del otro)
p = Phone(bg=(249, 251, 252))
a10, a11, a12 = src(10), src(11), src(12)
nodes = [
    a10.crop((1158, 488, 1394, 578)),   # Make Call
    a12.crop((732, 413, 1004, 502)),    # Branch / Condition
    a12.crop((745, 266, 994, 365)),     # Send Email (en curso)
    a10.crop((1159, 692, 1396, 782)),   # Update Record
    a11.crop((706, 640, 1031, 768)),    # End (completado)
]
nodes = [fit(n, 300) for n in nodes]
GAP = 54
for n in nodes:
    p.add(n, GAP)
h = sum(n.height + GAP for n in nodes) + 60
canvas = Image.new('RGB', (W, h + 66), p.bg)
d = ImageDraw.Draw(canvas)
for yy in range(66, canvas.height, 22):  # grilla de puntos como el editor
    for xx in range(11, W, 22):
        d.point((xx, yy), fill=(214, 219, 227))
canvas.paste(p.parts[0][0], (0, 0))
y = 66
centers = []
for n in nodes:
    y += GAP
    x = (W - n.width) // 2
    centers.append((y, y + n.height))
    canvas.paste(n, (x, y))
    y += n.height
for (t0, b0), (t1, b1) in zip(centers, centers[1:]):
    d.line((W // 2, b0 + 2, W // 2, t1 - 2), fill=(148, 163, 184), width=2)
    d.polygon([(W // 2 - 6, t1 - 10), (W // 2 + 6, t1 - 10), (W // 2, t1 - 2)], fill=(148, 163, 184))
canvas.save(OUT / 'm-recorrido.png')
print('m-recorrido.png', canvas.size)

# Celu 4: pendientes para el equipo
p = Phone()
a4, a6 = src(4), src(6)
p.add(a4.crop((345, 160, 660, 220)), 18, 4)
# Aviso "Next step · needs you": se recorta el texto y se redibuja la caja.
box = a6.crop((385, 160, 965, 312))
inner = fit(box, W - 32 - 20)
c = Image.new('RGB', (W - 32, inner.height + 20), BG)
d = ImageDraw.Draw(c)
fill = a6.getpixel((380, 300))
d.rounded_rectangle((0, 0, c.width - 1, c.height - 1), 10, fill=fill, outline=(248, 180, 180), width=2)
c.paste(inner, (10, 10))
p.add(c, 14)
kpis = [a4.crop((x, 242, x + 243, 345)) for x in (348, 608, 868, 1129, 1389)]
for i in range(0, 4, 2):
    k1, k2 = fit(kpis[i], (W - 44) // 2), fit(kpis[i + 1], (W - 44) // 2)
    r = Image.new('RGB', (W - 32, k1.height), BG)
    r.paste(k1, (0, 0)); r.paste(k2, (r.width - k2.width, 0))
    p.add(r, 12)
k = fit(kpis[4], (W - 44) // 2)
r = Image.new('RGB', (W - 32, k.height), BG)
r.paste(k, (0, 0))
p.add(r, 12)
p.card(a4.crop((384, 500, 712, 582)), 14, pad=10)
# Aviso de mail rebotado: título y acciones (el texto largo del medio queda afuera)
t, l = a4.crop((384, 606, 700, 634)), a4.crop((384, 680, 700, 704))
both = Image.new('RGB', (t.width, t.height + 12 + l.height), 'white')
both.paste(t, (0, 0)); both.paste(l, (0, t.height + 12))
p.card(both, 12, pad=10)
p.card(a4.crop((384, 732, 712, 814)), 12, pad=10)
p.save('m-pendientes.png', 20)
