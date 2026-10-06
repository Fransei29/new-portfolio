// Capturas reales del sitio en vivo, en claro y oscuro, escritorio (1440) y celu (390).
// Uso: node capturar.mjs  → capturas/<dispositivo>-<tema>-<pagina>.png (página completa)
import { chromium } from '../../node_modules/playwright/index.mjs';
const BASE = 'https://bellumhoafinance.com';
const PAGES = { home: '/', servicios: '/services', servicio: '/services/financial-management', propuesta: '/proposal', nosotros: '/about' };
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const b = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) for (const theme of ['light', 'dark']) {
  const ctx = await b.newContext({ ...opts, colorScheme: theme });
  await ctx.addInitScript((t) => localStorage.setItem('theme', t), theme);
  const p = await ctx.newPage();
  for (const [name, path] of Object.entries(PAGES)) {
    try {
      await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
      // Recorre la página para disparar las animaciones de entrada.
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `capturas/${dev}-${theme}-${name}.png`, fullPage: true });
      console.log('ok', dev, theme, name);
    } catch (e) { console.log('fail', dev, theme, name, e.message.slice(0, 80)); }
  }
  await ctx.close();
}
await b.close();
