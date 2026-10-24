# Arma publicar/index.html: los posts en orden de publicación, con todas sus slides/videos y el texto para copiar.
# Lee los textos de captions.md. Uso: python3 armar.py  → abrir index.html en el navegador.
import html, re
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent

POSTS = [
    (1, 'Reel · Presentación', ['reel-01-presentacion/renders/reel-01-v7.mp4'], 'feed-v2/out/01-portada-reel.png'),
    (2, 'Carrusel · Bellum', 'carrusel-01-bellum/slides', None),
    (4, 'Carrusel · 5 señales', 'carrusel-04-senales/slides', None),
    (5, 'Reel · Bellum en video', ['reel-02-bellum/renders/reel-02-v2.mp4'], 'feed-v2/out/05-portada-reel.jpg'),
    (6, 'Carrusel · Cómo es trabajar conmigo', 'carrusel-05-proceso/slides', None),
    (7, 'Foto · Muro de proyectos', ['carrusel-03-proyectos/slides/sola.png'], None),
    (8, 'Carrusel · Acer0', 'carrusel-02-acero/slides', None),
    (10, 'Carrusel · Arventa', 'carrusel-06-arventa/slides', None),
    (11, 'Carrusel · Comply DQ', 'carrusel-09-complydq/slides', None),
    (12, 'Carrusel · BGV Mayorista', 'carrusel-07-bgv/slides', None),
    (13, 'Carrusel · Globaly', 'carrusel-08-globaly/slides', None),
    (14, 'Carrusel · Tecnomar', 'carrusel-10-tecnomar/slides', None),
    (15, 'Carrusel · Ateevo Wholesale', 'carrusel-11-ateevo/slides', None),
    (16, 'Carrusel · Event Scheduler', 'carrusel-12-event-scheduler/slides', None),
]

def slides(folder):
    d = ROOT / folder
    out = []
    for png in sorted(d.glob('[0-9][0-9].png')):
        mp4 = png.with_suffix('.mp4')
        out.append(f'{folder}/{(mp4 if mp4.exists() else png).name}')
    return out

# captions.md: cada "## N · ..." hasta el próximo "##"; se descarta la línea "Archivo(s): ..."
caps = {}
for block in re.split(r'^## ', (HERE / 'captions.md').read_text(), flags=re.M)[1:]:
    m = re.match(r'(\d+)', block)
    if not m: continue
    lines = block.split('\n')[1:]
    lines = [l for l in lines if not l.startswith('Archivo')]
    caps[int(m.group(1))] = '\n'.join(lines).strip()

def media(path):
    src = '../' + path
    if path.endswith('.mp4'):
        return f'<video src="{src}" controls muted loop playsinline preload="metadata"></video>'
    return f'<a href="{src}" target="_blank"><img src="{src}" loading="lazy" alt="" /></a>'

cards = []
for i, (n, title, files, cover) in enumerate(POSTS, 1):
    items = files if isinstance(files, list) else slides(files)
    strip = ''.join(f'<figure>{media(p)}<figcaption>{Path(p).name}</figcaption></figure>' for p in items)
    if cover:
        strip += f'<figure>{media(cover)}<figcaption>portada del reel</figcaption></figure>'
    cap = html.escape(caps.get(n, ''))
    cards.append(f'''
  <article>
    <header><span class="n">{i}</span><div><h2>{title}</h2><p>{len(items)} archivo{"s" if len(items) > 1 else ""} · post #{n} del plan</p></div></header>
    <div class="strip">{strip}</div>
    <div class="cap"><pre>{cap}</pre><button onclick="navigator.clipboard.writeText(this.previousElementSibling.textContent);this.textContent='Copiado ✓'">Copiar texto</button></div>
  </article>''')

page = f'''<!doctype html>
<html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Publicar en Instagram</title>
<style>
  :root {{ --dark:#2e294e; --lilac:#b59cf8; --lilac-2:#8e7ae6; --paper:#f3f2f4; --ink:#292833; --muted:#8a8599; }}
  * {{ box-sizing:border-box; margin:0; }}
  body {{ background:var(--paper); color:var(--ink); font:16px/1.5 system-ui, sans-serif; padding:32px 16px 80px; }}
  main {{ max-width:1200px; margin:0 auto; }}
  h1 {{ font-size:32px; color:var(--dark); }}
  .intro {{ color:var(--muted); margin:6px 0 28px; }}
  .grid {{ max-width:420px; margin-bottom:40px; }} .grid img {{ width:100%; border-radius:8px; }}
  article {{ background:#fff; border-radius:16px; padding:20px; margin-bottom:28px; box-shadow:0 4px 20px rgba(46,41,78,.08); }}
  header {{ display:flex; gap:14px; align-items:center; margin-bottom:14px; }}
  .n {{ width:40px; height:40px; border-radius:50%; background:var(--dark); color:#fff; display:grid; place-items:center; font-weight:700; flex:none; }}
  h2 {{ font-size:20px; }} header p {{ color:var(--muted); font-size:14px; }}
  .strip {{ display:flex; gap:10px; overflow-x:auto; padding-bottom:8px; }}
  figure {{ flex:none; width:220px; }}
  figure img, figure video {{ width:100%; border-radius:8px; display:block; background:#ddd; }}
  figcaption {{ font-size:12px; color:var(--muted); margin-top:4px; }}
  .cap {{ margin-top:14px; display:flex; gap:12px; align-items:flex-start; }}
  pre {{ flex:1; white-space:pre-wrap; font:14px/1.5 system-ui, sans-serif; background:var(--paper); padding:14px; border-radius:10px; }}
  button {{ background:var(--lilac-2); color:#fff; border:0; border-radius:999px; padding:10px 18px; font-weight:600; cursor:pointer; flex:none; }}
  @media (max-width:640px) {{ .cap {{ flex-direction:column; }} figure {{ width:160px; }} }}
</style></head><body><main>
  <h1>Publicar en Instagram</h1>
  <p class="intro">En este orden, de arriba hacia abajo. Lo último que publiques queda arriba a la izquierda del perfil. Los videos de Franco a cámara (posts 3 y 9) van cuando estén grabados.</p>
  <div class="grid"><img src="../feed-v2/grilla.jpg" alt="Grilla del perfil" /></div>
  {"".join(cards)}
</main></body></html>'''
(HERE / 'index.html').write_text(page)
print('ok', len(POSTS), 'posts')
