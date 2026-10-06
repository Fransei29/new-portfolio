// Capturas reales de los sitios en vivo: escritorio (1440) y celu (390@3x), primer pantallazo.
// Uso: node capturar.mjs [slug...]  → capturas/<slug>-desk.png y capturas/<slug>-m.png
import { chromium } from '../../node_modules/playwright/index.mjs';
const SITES = {
  acer0: 'https://www.acer0.com.ar/',
  globaly: 'https://getglobaly.com',
  complydq: 'https://www.complydq.com',
  sophie: 'https://sophiecallander.com',
  northfield: 'https://www.theclubatnorthfield.com/',
  augusto: 'https://www.augustoluque.com/',
  lexmax: 'https://lexmaxsoluciones.com/',
};
const DEVICES = {
  desk: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 },
  m: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
};
const only = process.argv.slice(2);
// miagenda.site y starton.it.com no cargaban (timeout / DNS) el 2026-10-06.
const SLOW = [];
const b = await chromium.launch();
for (const [slug, url] of Object.entries(SITES)) {
  if (only.length && !only.includes(slug)) continue;
  for (const [dev, opts] of Object.entries(DEVICES)) {
    const ctx = await b.newContext({ ...opts, colorScheme: 'light' });
    const p = await ctx.newPage();
    const slow = SLOW.includes(slug);
    try {
      await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await p.waitForTimeout(slow ? 8000 : 2500);
      // Cierra banners de cookies si aparecen.
      for (const t of ['Aceptar', 'Accept', 'Accept all', 'Aceptar todo', 'Got it', 'Entendido', 'OK']) {
        const btn = p.getByRole('button', { name: t, exact: true });
        if (await btn.count()) { await btn.first().click().catch(() => {}); }
      }
      await p.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 6000); y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(slow ? 6000 : 2000);
      // Oculta burbujas de chat y botones flotantes de la esquina inferior derecha.
      // Oculta burbujas de chat y botones flotantes (aparecen tarde, a veces dentro de shadow DOM).
      await p.waitForTimeout(10000);
      const hidden = await p.evaluate(() => {
        const all = []; const walk = (root) => { for (const el of root.querySelectorAll('*')) { all.push(el); if (el.shadowRoot) walk(el.shadowRoot); } }; walk(document);
        let n = 0;
        for (const el of all) {
          const cs = getComputedStyle(el); if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
          const r = el.getBoundingClientRect();
          if (r.width < 520 && r.top > innerHeight * 0.4 && r.left > innerWidth * 0.3) { el.style.setProperty('display', 'none', 'important'); n++; }
        }
        return n;
      });
      console.log('  ocultos', hidden);
      await p.screenshot({ path: `capturas/${slug}-${dev}.png` });
      console.log('ok', slug, dev);
    } catch (e) { console.log('fail', slug, dev, e.message.slice(0, 80)); }
    await ctx.close();
  }
}
await b.close();
