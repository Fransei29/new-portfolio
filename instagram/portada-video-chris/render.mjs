// Exporta cada .slide a out/<id>.png (1920x1080 y 1080x1920). Uso: node render.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 2000, height: 2000 } });
await p.goto(pathToFileURL('index.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
for (const s of await p.$$('.slide')) {
  const id = await s.getAttribute('id');
  await s.screenshot({ path: `out/${id}.png` });
}
await b.close();
