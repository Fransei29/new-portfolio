// Capturas reales del sitio en vivo (el sitio no tiene modo oscuro), escritorio (1440) y celu (390).
// Uso: node capturar.mjs  → capturas/<dispositivo>-<pagina>.png (página completa) y <dispositivo>-carrito.png con un producto cargado.
import { chromium } from '../../node_modules/playwright/index.mjs';
const BASE = 'https://www.acer0.com.ar';
const PAGES = { home: '/', tienda: '/shop', producto: '/shop/mesa-cruz-ratona', producto2: '/shop/portavinilos', nosotros: '/nosotros', contacto: '/contacto' };
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
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
      await p.screenshot({ path: `capturas/${dev}-${name}.png`, fullPage: true });
      // Pantalla visible (sin fullPage) para usar de recorte en la notebook o el celu.
      await p.screenshot({ path: `capturas/${dev}-${name}-top.png` });
      console.log('ok', dev, name);
    } catch (e) { console.log('fail', dev, name, e.message.slice(0, 80)); }
  }
  // Carrito: agrega un producto y captura el carrito.
  try {
    await p.goto(BASE + '/shop/mesa-cruz-ratona', { waitUntil: 'networkidle', timeout: 60000 });
    const btn = p.getByRole('button', { name: /agregar|añadir|comprar/i }).first();
    await btn.click({ timeout: 8000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `capturas/${dev}-agregado.png` });
    await p.goto(BASE + '/cart', { waitUntil: 'networkidle', timeout: 60000 });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `capturas/${dev}-carrito.png`, fullPage: true });
    console.log('ok', dev, 'carrito');
  } catch (e) { console.log('fail', dev, 'carrito', e.message.slice(0, 80)); }
  await ctx.close();
}
await b.close();
