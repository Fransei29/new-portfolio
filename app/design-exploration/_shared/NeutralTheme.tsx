'use client';

// design-exploration/_shared/NeutralTheme.tsx
// globals.css pinta textos con !important cuando <html> tiene la clase `dark`
// (el modo oscuro del sitio). Cada opción define su propia paleta, así que
// mientras se recorre la exploración se saca esa clase y al salir se restaura.

import { useEffect } from 'react';

export default function NeutralTheme() {
  useEffect(() => {
    const html = document.documentElement;
    const strip = () => html.classList.contains('dark') && html.classList.remove('dark');
    const hadDark = html.classList.contains('dark');
    strip();
    // next-themes puede volver a ponerla (por ejemplo, al cambiar de pestaña).
    const mo = new MutationObserver(strip);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => {
      mo.disconnect();
      if (hadDark) html.classList.add('dark');
    };
  }, []);
  return null;
}
