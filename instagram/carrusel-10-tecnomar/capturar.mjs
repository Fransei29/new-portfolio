// Capturas reales del sitio en vivo, escritorio (1440) y celu (390).
// El hero 3D necesita GPU: Chromium headless nuevo con Vulkan (con SwiftShader la captura se cuelga).
// Uso: node capturar.mjs → capturas/<dispositivo>-<nombre>.png
import { chromium } from '../../node_modules/playwright/index.mjs';
export const BASE = 'https://www.tecno-mar.com.ar';
export const GPU = { channel: 'chromium', args: ['--enable-gpu', '--use-angle=vulkan', '--enable-features=Vulkan', '--ignore-gpu-blocklist'] };
// Posiciones del home (px de scroll a 1440x900): el hero 3D va de 0 a ~4800 y después vienen las secciones.
const HOME = { hero: 0, diagnostico: 600, impulsor: 1200, sello: 1800, tapa: 2400, motor: 3000, planta: 4200 };
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
// El botón flotante de WhatsApp tapa parte de cada captura.
const hideFab = (p) => p.addStyleTag({ content: 'a[href^="https://wa.me"][class*="loat"],[class*="whatsapp" i][class*="float" i],[class*="Whatsapp" i]{display:none!important}' });
if (import.meta.url === `file://${process.argv[1]}`) {
  const b = await chromium.launch(GPU);
  for (const [dev, opts] of Object.entries(DEVICES)) {
    const p = await (await b.newContext(opts)).newPage();
    await p.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 90000 });
    await p.waitForTimeout(5000);
    for (const [name, y] of Object.entries(HOME)) {
      await p.evaluate((y) => window.scrollTo(0, y), dev === 'm' ? Math.round(y * 844 / 900) : y);
      await p.waitForTimeout(2500);
      await p.screenshot({ path: `capturas/${dev}-${name}.png` });
    }
    // Resto del home: recorrido para disparar las animaciones y captura completa.
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
    await p.waitForTimeout(1500);
    await hideFab(p);
    await p.screenshot({ path: `capturas/${dev}-home-full.png`, fullPage: true });
    for (const path of ['/folletos', '/contacto']) {
      await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 90000 });
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(1500);
      await hideFab(p);
      await p.screenshot({ path: `capturas/${dev}${path.replace('/', '-')}.png`, fullPage: true });
      await p.screenshot({ path: `capturas/${dev}${path.replace('/', '-')}-top.png` });
    }
    console.log('ok', dev);
  }
  await b.close();
}
