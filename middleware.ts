/**
 * Rutas por idioma.
 *
 * Todas las páginas del sitio viven en `app/[lang]`, pero el inglés se sirve
 * sin prefijo para no cambiar las URLs que Google ya tiene indexadas:
 *
 *   /services        → reescritura interna a /en/services (la URL no cambia)
 *   /es/services     → queda como está
 *   /en/services     → 301 a /services (una sola URL por página)
 *   /x?lang=es       → 301 a /es/x (el formato viejo; el blog ya tenía esas
 *                      URLs indexadas y con clics)
 *
 * Quien eligió español (cookie `lang=es`) y entra por un link sin prefijo va a
 * /es con un 307. Los crawlers no mandan cookies, así que siempre reciben el
 * inglés en las URLs sin prefijo.
 */

import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, localePath, stripLocale } from './lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Las imágenes OG generadas viven bajo /en/... por el segmento [lang]; si se
  // redirigieran, cada scraper pagaría un salto extra.
  if (pathname.includes('/opengraph-image') || pathname.includes('/twitter-image')) {
    return NextResponse.next();
  }

  const legacyLang = searchParams.get('lang');
  if (isLocale(legacyLang)) {
    const url = request.nextUrl.clone();
    url.searchParams.delete('lang');
    url.pathname = localePath(legacyLang, stripLocale(pathname));
    return NextResponse.redirect(url, 301);
  }

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = stripLocale(pathname);
    return NextResponse.redirect(url, 301);
  }

  if (pathname === '/es' || pathname.startsWith('/es/')) return NextResponse.next();

  if (request.cookies.get(LOCALE_COOKIE)?.value === 'es') {
    const url = request.nextUrl.clone();
    url.pathname = localePath('es', pathname);
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Fuera: internos de Next, la API, las páginas sin idioma (fun mode, la
   * exploración de diseño y las demos para clientes, que next.config reescribe
   * a public/demos/*.html) y todo lo que tenga extensión — assets de public,
   * sitemap.xml, robots.txt, llms.txt, og.png, blog/rss.xml.
   */
  matcher: ['/((?!_next|api|fun|design-exploration|demos|.*\\.[\\w]+$).*)'],
};
