// Video del slide 01: una barra barre la notebook del login al tablero y vuelve, para que el loop no corte.
// Uso: node render.mjs && node wipe.mjs → slides/01.mp4
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const FPS = 30;
// (duración en segundos, desde, hasta): 0 = login entero, 1 = tablero entero
const STEPS = [[1.2, 0, 0], [1.6, 0, 1], [2.6, 1, 1], [1.6, 1, 0], [1.0, 0, 0]];
const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slide = await p.$('#s1');
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', 'slides/01.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
for (const [dur, a, z] of STEPS) {
  const n = Math.round(dur * FPS);
  for (let i = 0; i < n; i++) {
    const t = a + (z - a) * ease(i / Math.max(n - 1, 1));
    // el login ocupa lo que queda a la izquierda de la barra: va de 1 (entero) a 0
    // la barra se apaga al llegar a los bordes
    const o = Math.min(1, Math.min(t, 1 - t) * 25);
    await p.evaluate(([t, o]) => { const w = document.querySelector('#s1 .wipe'); w.style.setProperty('--p', (1 - t).toFixed(4)); w.style.setProperty('--o', o.toFixed(3)); }, [t, o]);
    ff.stdin.write(await slide.screenshot({ type: 'png' }));
  }
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('slides/01.mp4');
