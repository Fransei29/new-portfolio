// Captura cada <section> del home por separado (escritorio y celu) → capturas/<dispositivo>-sec-NN.png
import { chromium } from '../../node_modules/playwright/index.mjs';
import { BASE, GPU } from './capturar.mjs';
const b = await chromium.launch(GPU);
for (const [dev, opts] of Object.entries({ desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 }, m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } })) {
  const p = await (await b.newContext(opts)).newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } });
  await p.addStyleTag({ content: 'header,nav{visibility:hidden!important} a[href^="https://wa.me"]{display:none!important}' });
  const secs = await p.$$('main section, body > section, section');
  let i = 0;
  for (const s of secs) {
    const bb = await s.boundingBox(); if (!bb || bb.height < 200) continue;
    await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200);
    await s.screenshot({ path: `capturas/${dev}-sec-${String(++i).padStart(2, '0')}.png` });
  }
  console.log(dev, i);
}
await b.close();
