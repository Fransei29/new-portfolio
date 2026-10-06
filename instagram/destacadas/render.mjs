// Exporta cada .story a out/<grupo>/NN.png y cada .cover a out/portadas/<grupo>.png (1080x1920).
// Uso: node render.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { mkdirSync, rmSync } from 'node:fs';
rmSync('out', { recursive: true, force: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 2100 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const count = {};
for (const s of await p.$$('.story')) {
  const g = await s.getAttribute('data-group');
  count[g] = (count[g] || 0) + 1;
  mkdirSync(`out/${g}`, { recursive: true });
  await s.screenshot({ path: `out/${g}/${String(count[g]).padStart(2, '0')}.png` });
}
mkdirSync('out/portadas', { recursive: true });
for (const s of await p.$$('.cover')) await s.screenshot({ path: `out/portadas/${await s.getAttribute('data-group')}.png` });
console.log(count);
await b.close();
