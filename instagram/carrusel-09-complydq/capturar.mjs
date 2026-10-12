// Capturas reales del sitio público de ComplyDQ en vivo, escritorio (1440) y celu (390 @3x).
// La plataforma (my.complydq.com) pide login: para esas pantallas se usan las imágenes del portfolio (media/app-*.webp).
// Uso: node capturar.mjs  → capturas/<dispositivo>-<pagina>.png (página completa) y <dispositivo>-<pagina>-top.png (pantalla visible).
import { chromium } from '../../node_modules/playwright/index.mjs';
const BASE = 'https://www.complydq.com';
const PAGES = {
  home: '/',
  features: '/features',
  partners: '/partners',
  auditoria: '/resources/audit-readiness-assessment',
  roi: '/resources/roi-calculator',
  checklist: '/resources/dq-file-checklist',
};
// Recortes en celu: pantalla visible arrancando en un título de la home.
const SECTIONS = { aviso: 'Drivers get notified', precio: 'Your instant quote', costo: 'FMCSA CIVIL PENALTY', antes: 'Manual DQ' };
// Oculta el chat (vive en un shadow DOM al final del body) para que no tape la captura.
const hideChat = (p) => p.evaluate(() => { for (const el of document.querySelectorAll('body *')) if (el.shadowRoot && el.tagName !== 'NEXT-ROUTE-ANNOUNCER') el.style.setProperty('display', 'none', 'important'); });
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const b = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await b.newContext({ ...opts, colorScheme: 'light' });
  const p = await ctx.newPage();
  for (const [name, path] of Object.entries(PAGES)) {
    try {
      await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
      // Recorre la página para disparar las animaciones de entrada.
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(2000);
      await hideChat(p);
      await p.screenshot({ path: `capturas/${dev}-${name}.png`, fullPage: true });
      await p.screenshot({ path: `capturas/${dev}-${name}-top.png` });
      console.log('ok', dev, name);
    } catch (e) { console.log('fail', dev, name, e.message.slice(0, 80)); }
  }
  if (dev === 'm') {
    await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } });
    for (const [name, text] of Object.entries(SECTIONS)) {
      try {
        const el = p.getByText(text, { exact: false }).first();
        await el.evaluate((n) => window.scrollTo(0, n.getBoundingClientRect().top + window.scrollY - 110));
        await p.waitForTimeout(1200);
        await hideChat(p);
        await p.screenshot({ path: `capturas/m-${name}.png` });
        console.log('ok m', name);
      } catch (e) { console.log('fail m', name, e.message.slice(0, 80)); }
    }
  }
  await ctx.close();
}
await b.close();
