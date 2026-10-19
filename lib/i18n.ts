// lib/i18n.ts
// Idiomas con ruta propia. El inglés se sirve sin prefijo (las URLs que Google
// ya tiene indexadas no cambian) y el español vive bajo /es. Internamente todo
// está en app/[lang]: el middleware reescribe /x → /en/x sin que cambie la URL.

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

/** Cookie con el idioma que eligió el visitante. La lee el middleware para
 *  mandar a /es a quien eligió español y entra por un link sin prefijo. */
export const LOCALE_COOKIE = 'lang';

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** Ruta pública de `path` en `locale`: `/services` → `/es/services`. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  // `/` en español es `/es`, no `/es/`: una sola forma por URL.
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** Quita el prefijo de idioma: `/es/services` → `/services`, `/es` → `/`. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** Locale de Open Graph por idioma. */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_AR' };
