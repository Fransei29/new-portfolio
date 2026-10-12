// Video del slide 02: la notebook recorre la ficha de una factura y el celu el tablero (scroll suave) y vuelven arriba, para que el loop no corte.
// Cada .scroll del slide baja hasta su data-max (px). Uso: node render.mjs && node scroll.mjs → slides/02.mp4
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const FPS = 30;
// (duración en segundos, desde, hasta): 0 = arriba de todo, 1 = data-max
const STEPS = [[0.8, 0, 0], [4.2, 0, 1], [0.8, 1, 1], [1.6, 1, 0], [0.4, 0, 0]];
const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slide = await p.$('#s2');
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', 'slides/02.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
for (const [dur, a, z] of STEPS) {
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    const t = a + (z - a) * ease(i / Math.max(n - 1, 1));
    await p.evaluate((t) => document.querySelectorAll('#s2 .scroll').forEach((s) => s.style.setProperty('--y', (t * s.dataset.max).toFixed(1))), t);
    ff.stdin.write(await slide.screenshot({ type: 'png' }));
  }
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('slides/02.mp4');
