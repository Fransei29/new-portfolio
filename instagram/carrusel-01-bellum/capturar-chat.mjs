// El chat del sitio de Bellum abierto (local, next dev -p 3411), en escritorio y celu. Uso: node capturar-chat.mjs
import { chromium } from '../../node_modules/playwright/index.mjs';
const B = 'http://localhost:3411';
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const b = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await b.newContext({ ...opts, colorScheme: 'light' });
  await ctx.addInitScript(() => localStorage.setItem('theme', 'light'));
  const p = await ctx.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle', timeout: 60000 });
  await p.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
  await p.waitForTimeout(1500);
  const launcher = p.locator('button[aria-label*="chat" i], button[aria-label*="assistant" i]').first();
  console.log(dev, 'launcher', await launcher.count(), await launcher.getAttribute('aria-label').catch(() => null));
  await launcher.click();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `capturas/${dev}-chat.png` });
  await ctx.close();
}
await b.close();
