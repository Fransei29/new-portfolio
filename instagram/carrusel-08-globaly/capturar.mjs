// Capturas reales del sitio en vivo, en español (cookie NEXT_LOCALE=es), escritorio (1440) y celu (390 @3x).
// Uso: node capturar.mjs  → capturas/<dispositivo>-<pagina>.png (página completa) y <dispositivo>-<pagina>-top.png (pantalla visible).
import { chromium } from '../../node_modules/playwright/index.mjs';
const BASE = 'https://getglobaly.com';
const PAGES = {
  // Solo las páginas que ya están traducidas al español (otras siguen en inglés).
  home: '/', plataforma: '/platform', precios: '/pricing', trabajo: '/solutions/remote-hybrid-work', contacto: '/contact',
};
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const only = process.argv.slice(2); // node capturar.mjs home precios → solo esas páginas
const b = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await b.newContext({ ...opts, locale: 'es-AR' });
  await ctx.addCookies([{ name: 'NEXT_LOCALE', value: 'es', domain: 'getglobaly.com', path: '/' }]);
  // Sin el globo del chat ni el botón de volver arriba: tapan contenido en las capturas.
  await ctx.route('**/widget/widget.js', (r) => r.abort());
  const p = await ctx.newPage();
  for (const [name, path] of Object.entries(PAGES)) {
    if (only.length && !only.includes(name)) continue;
    try {
      await p.goto(BASE + path, { waitUntil: 'load', timeout: 60000 });
      await p.addStyleTag({ content: '[data-smart-widget-host], button.fixed.bottom-6 { display: none !important; }' });
      await p.waitForTimeout(3500); // deja terminar la intro animada
      // Recorre la página para disparar las animaciones de entrada.
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(2000);
      await p.screenshot({ path: `capturas/${dev}-${name}.png`, fullPage: true });
      await p.screenshot({ path: `capturas/${dev}-${name}-top.png` });
      console.log('ok', dev, name);
    } catch (e) { console.log('fail', dev, name, e.message.slice(0, 80)); }
  }
  await ctx.close();
}
// Portada del home en celu en los tres idiomas (misma dirección, cambia solo la cookie) → capturas/m-home-<idioma>.png
const ctx = await b.newContext({ ...DEVICES.m });
await ctx.route('**/widget/widget.js', (r) => r.abort());
for (const lang of ['en', 'fr', 'es']) {
  await ctx.addCookies([{ name: 'NEXT_LOCALE', value: lang, domain: 'getglobaly.com', path: '/' }]);
  const p = await ctx.newPage();
  await p.goto(BASE + '/', { waitUntil: 'load', timeout: 60000 });
  await p.addStyleTag({ content: '[data-smart-widget-host], button.fixed.bottom-6 { display: none !important; }' });
  await p.waitForTimeout(3500);
  // Baja y vuelve para que se revele la sección de abajo del hero.
  await p.evaluate(async () => { for (let y = 0; y <= 1600; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `capturas/m-home-${lang}.png` });
  console.log('ok idioma', lang);
  await p.close();
}
await ctx.close();
await b.close();
