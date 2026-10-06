// Capturas mobile reales (390px @3x) de los sitios en vivo.
import { chromium } from '../../node_modules/playwright/index.mjs';
const SITES = { triunfo: 'https://el-triunfo.vercel.app/', globaly: 'https://getglobaly.com', cdq: 'https://www.complydq.com' };
const b = await chromium.launch();
for (const [k, url] of Object.entries(SITES)) {
  try {
    const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `media/m-${k}.png` });
    console.log('ok', k);
  } catch (e) { console.log('fail', k, e.message); }
}
await b.close();
