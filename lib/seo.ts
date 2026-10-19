// lib/seo.ts
// Canonical y hreflang por ruta, en un solo lugar. Cada página declara su path
// sin idioma ("/services") y esto arma las URLs absolutas de los dos idiomas.

import type { Metadata } from 'next';
import { LOCALES, localePath, OG_LOCALE, type Locale } from './i18n';
import { OG_IMAGE, SITE_URL } from './site';

/** URL absoluta de `path` en `locale`. La home en inglés queda sin barra final,
 *  igual que el canonical que Google ya tiene registrado. */
export function absoluteUrl(locale: Locale, path: string): string {
  const localized = localePath(locale, path);
  return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`;
}

interface RouteMetadataInput {
  locale: Locale;
  /** Path sin idioma: "/", "/services", "/projects/bellum". */
  path: string;
  title: string;
  description: string;
  /** false cuando el cuerpo de la página no está traducido: la versión /es
   *  existe para navegar, pero el canonical apunta a la inglesa y no se anuncia
   *  como alternate, porque sería contenido duplicado. */
  translated?: boolean;
  ogType?: 'website' | 'article';
  images?: { url: string; alt?: string; width?: number; height?: number }[];
}

export function routeMetadata({
  locale,
  path,
  title,
  description,
  translated = true,
  ogType = 'website',
  images = [OG_IMAGE],
}: RouteMetadataInput): Metadata {
  const canonical = absoluteUrl(translated ? locale : 'en', path);

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(translated && {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(l, path)])),
          'x-default': absoluteUrl('en', path),
        },
      }),
    },
    // Las páginas que declaran openGraph reemplazan el del layout entero, así
    // que la imagen y el locale van siempre explícitos.
    openGraph: {
      type: ogType,
      url: canonical,
      title,
      description,
      locale: OG_LOCALE[locale],
      siteName: 'Franco Seiler',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}
