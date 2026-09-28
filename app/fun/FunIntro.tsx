'use client';

// app/fun/FunIntro.tsx
// Cierra la transición de entrada y aísla la página del tema oscuro del sitio.
//
// La transición la abre el botón del panda en el header del sitio (ver
// components/FunModeButton/funTransition.ts); acá se encoge la capa y se saca.

import { useEffect } from 'react';
import { ENTER_ID } from '../../components/FunModeButton/funTransition';

export default function FunIntro() {
  useEffect(() => {
    // El NavigationLoader del sitio marca html.page-transitioning al hacer clic
    // en un link y lo saca cuando cambia la ruta, pero vive en el layout de
    // (site): al venir acá se desmonta antes de sacarla y la página quedaría
    // desenfocada (globals.css difumina el <main> con esa clase).
    document.documentElement.classList.remove('page-transitioning');

    const overlay = document.getElementById(ENTER_ID);
    if (overlay) {
      // Un frame para que la página nueva ya esté pintada debajo.
      requestAnimationFrame(() => {
        overlay.style.transition = 'clip-path 650ms cubic-bezier(.7,0,.2,1), opacity 650ms ease';
        overlay.style.clipPath = 'circle(0% at 50% 50%)';
      });
      const done = window.setTimeout(() => overlay.remove(), 800);
      return () => window.clearTimeout(done);
    }
  }, []);

  // globals.css pinta textos con !important bajo html.dark (el modo oscuro del
  // sitio). El modo fun tiene su propia paleta, así que mientras se está acá se
  // saca la clase y al salir se devuelve.
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains('dark');
    const strip = () => {
      if (html.classList.contains('dark')) html.classList.remove('dark');
    };
    strip();
    const mo = new MutationObserver(strip);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => {
      mo.disconnect();
      if (hadDark) html.classList.add('dark');
    };
  }, []);

  return null;
}
