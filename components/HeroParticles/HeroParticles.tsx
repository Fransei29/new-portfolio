'use client';

import dynamic from 'next/dynamic';

/**
 * Punto de montaje del campo de partículas del hero.
 *
 * Este wrapper existe sólo para el `ssr: false`: el canvas depende de WebGL y
 * de matchMedia, y renderizarlo en el server no aporta nada (no hay markup que
 * hidratar, es un <canvas> vacío). Además next/dynamic corta el módulo del
 * bundle inicial, que es lo que mantiene a three fuera del critical path.
 *
 * Sin `loading`: cualquier placeholder acá sería un elemento de fondo que
 * aparece y desaparece. Mejor que no haya nada hasta que el campo esté listo.
 *
 * Montar / desmontar es una sola línea en app/page.tsx — sacándola, el hero
 * queda exactamente como estaba.
 */
const HeroParticles = dynamic(() => import('./HeroParticlesCanvas'), {
  ssr: false,
});

export default HeroParticles;
