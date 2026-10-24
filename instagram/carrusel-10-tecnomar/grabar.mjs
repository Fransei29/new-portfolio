// Graba el hero 3D del sitio en vivo mientras se scrollea: la bomba se desarma y se vuelve a armar (así el loop no corta).
// Saca un cuadro por paso de scroll → frames/<dispositivo>/NNNN.jpg. Después: node video.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
import { BASE, GPU } from './capturar.mjs';
const FPS = 30;
// (duración en segundos, desde, hasta): 0 = arriba, 1 = fin del recorrido 3D
const STEPS = [[0.8, 0, 0], [8, 0, 1], [1, 1, 1], [3, 1, 0], [0.4, 0, 0]];
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const DEVICES = {
  desk: { opts: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, end: 4100 },
  m: { opts: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, end: 3780 },
};
const b = await chromium.launch(GPU);
for (const [dev, { opts, end }] of Object.entries(DEVICES)) {
  mkdirSync(`frames/${dev}`, { recursive: true });
  const p = await (await b.newContext(opts)).newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await p.addStyleTag({ content: 'a[href^="https://wa.me"]{display:none!important}' });
  await p.waitForTimeout(5000);
  let n = 0;
  for (const [dur, a, z] of STEPS) {
    const k = Math.round(dur * FPS);
    for (let i = 0; i < k; i++) {
      const t = a + (z - a) * ease(i / Math.max(k - 1, 1));
      await p.evaluate((y) => window.scrollTo(0, y), Math.round(t * end));
      await p.waitForTimeout(60);
      await p.screenshot({ path: `frames/${dev}/${String(n++).padStart(4, '0')}.jpg`, quality: 92 });
    }
  }
  console.log(dev, n);
}
await b.close();
