// Exporta cada .slide a slides/NN.png (1080x1440) y las versiones .alt a slides/<id>.png.
// Después: python3 wipe.py arma slides/06.mp4 (claro → oscuro). Uso: node render.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slides = await p.$$('.slide:not(.alt)');
for (const [i, s] of slides.entries()) await s.screenshot({ path: `slides/${String(i + 1).padStart(2, '0')}.png` });
for (const s of await p.$$('.slide.alt')) await s.screenshot({ path: `slides/${await s.getAttribute('id')}.png` });
console.log(`${slides.length} slides`);
await b.close();
