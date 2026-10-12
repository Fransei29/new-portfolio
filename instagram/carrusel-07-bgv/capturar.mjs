// Capturas reales del sitio en vivo, escritorio (1440) y celu (390). Solo páginas públicas (sin cuenta los precios no se ven).
// Uso: node capturar.mjs  → capturas/<dispositivo>-<pagina>.png (página completa) y <dispositivo>-<pagina>-top.png (pantalla visible),
// más <dispositivo>-asistente.png con el chat abierto.
import { chromium } from '../../node_modules/playwright/index.mjs';
const BASE = 'https://www.bgvmayorista.com.ar';
const PAGES = { home: '/', catalogo: '/catalogo', producto: '/catalogo/conservadora-gemplast-34l', producto2: '/catalogo/balde-mopa-centrifuga-70561', comocomprar: '/como-comprar', cuenta: '/cuenta-mayorista', nosotros: '/nosotros', contacto: '/contacto' };
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
// Oculta el globito "¿Tenés un comercio? Preguntame..." del asistente, que tapa parte de cada captura.
const hideTeaser = (p) => p.addStyleTag({ content: '[data-chat-invite]{display:none!important}' });
const b = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await b.newContext(opts);
  const p = await ctx.newPage();
  for (const [name, path] of Object.entries(PAGES)) {
    try {
      await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
      // Recorre la página para disparar las animaciones de entrada.
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(2000);
      await hideTeaser(p);
      await p.screenshot({ path: `capturas/${dev}-${name}.png`, fullPage: true });
      await p.screenshot({ path: `capturas/${dev}-${name}-top.png` });
      console.log('ok', dev, name);
    } catch (e) { console.log('fail', dev, name, e.message.slice(0, 80)); }
  }
  // Asistente: abre el chat desde la home y lo captura.
  try {
    await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 });
    await p.waitForTimeout(1500);
    const btn = p.getByRole('button', { name: /asistente|chat|consulta/i }).first();
    await btn.click({ timeout: 8000 });
    await p.waitForTimeout(2000);
    await p.screenshot({ path: `capturas/${dev}-asistente.png` });
    console.log('ok', dev, 'asistente');
  } catch (e) { console.log('fail', dev, 'asistente', e.message.slice(0, 80)); }
  await ctx.close();
}
await b.close();
