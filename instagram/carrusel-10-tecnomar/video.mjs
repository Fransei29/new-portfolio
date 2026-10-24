// Video del slide 02: pone los cuadros grabados del sitio en vivo (grabar.mjs → frames/) en la notebook y el celu.
// Uso: node grabar.mjs && node video.mjs → slides/02.mp4
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

const FPS = 30;
const frames = readdirSync('frames/desk').sort();
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slide = await p.$('#s2');
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '16', '-preset', 'slow', '-movflags', '+faststart', 'slides/02.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
for (const f of frames) {
  await p.evaluate(async (f) => {
    const set = (id, src) => new Promise((r) => { const im = document.getElementById(id); im.onload = r; im.src = src; });
    await Promise.all([set('vd', `frames/desk/${f}`), set('vm', `frames/m/${f}`)]);
  }, f);
  ff.stdin.write(await slide.screenshot({ type: 'png' }));
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('slides/02.mp4', frames.length, 'cuadros');
