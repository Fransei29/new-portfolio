// Capturas del admin de Bellum corriendo en local (proyecto en ~/Documents/Work/Done/Bellum/Project/bellum, `next dev -p 3411`).
// Lee ADMIN_PASSWORD del .env.local del proyecto. Uso: node capturar-admin.mjs → capturas/admin-*.png
import { chromium } from '../../node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
const ENV = '/home/franco/Documents/Work/Done/Bellum/Project/bellum/.env.local';
const pass = readFileSync(ENV, 'utf8').match(/^ADMIN_PASSWORD=(.*)$/m)[1].trim().replace(/^["']|["']$/g, '');
const BASE = 'http://localhost:3411';
const PAGES = { dashboard: '/admin', chat: '/admin/chat', knowledge: '/admin/knowledge' };
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, colorScheme: 'light' });
const p = await ctx.newPage();
await p.goto(BASE + '/admin/login', { waitUntil: 'networkidle' });
await p.fill('input[type=password]', pass);
await Promise.all([p.waitForURL((u) => !u.pathname.includes('login'), { timeout: 30000 }), p.keyboard.press('Enter')]);
for (const [name, path] of Object.entries(PAGES)) {
  await p.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
  await p.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `capturas/admin-${name}.png`, fullPage: true });
  console.log('ok', name, p.url());
}
await b.close();
