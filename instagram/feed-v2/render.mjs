// Exporta cada .slide a out/NN.png (1080x1440). Uso: node render.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 1600 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const slides = await p.$$('.slide:not(.tall)');
for (const [i, s] of slides.entries()) await s.screenshot({ path: `out/${String(i + 1).padStart(2, '0')}.png` });
for (const s of await p.$$('.slide.tall')) await s.screenshot({ path: `out/${(await s.getAttribute('id')).slice(1)}-portada-reel.png` });
console.log(`${slides.length} slides`);
await b.close();
