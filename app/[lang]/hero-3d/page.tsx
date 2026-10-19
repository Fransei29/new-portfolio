// app/[lang]/hero-3d/page.tsx
// Fue la ruta de prueba del hero 3D. Ya es la home, así que esto solo redirige
// para que los links viejos no terminen en un 404.
import { permanentRedirect } from 'next/navigation';
import { isLocale, localePath } from '../../../lib/i18n';

export default async function Hero3DPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  permanentRedirect(localePath(isLocale(lang) ? lang : 'en', '/'));
}
