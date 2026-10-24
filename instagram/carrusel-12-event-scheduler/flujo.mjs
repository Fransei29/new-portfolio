// Video del slide 02: las pantallas del recorrido pasan de a una dentro del navegador (.reel en index.html).
// La última imagen del .reel repite la primera, así el loop no corta. Uso: node render.mjs && node flujo.mjs → slides/02.mp4
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const FPS = 30, HOLD = 1.7, MOVE = 0.6;
const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slide = await p.$('#s2');
const n = await p.$$eval('#s2 .reel img', (l) => l.length - 1);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', 'slides/02.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
const frame = async (x) => {
  await p.evaluate((x) => document.querySelector('#s2 .reel').style.setProperty('--x', x.toFixed(4)), x);
  ff.stdin.write(await slide.screenshot({ type: 'png' }));
};
for (let i = 0; i < n; i++) {
  for (let k = 0; k < HOLD * FPS; k++) await frame(i);
  for (let k = 1; k <= MOVE * FPS; k++) await frame(i + ease(k / (MOVE * FPS)));
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('slides/02.mp4');
