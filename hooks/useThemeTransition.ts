'use client';

import { useCallback } from 'react';
import { useTheme } from 'next-themes';

/**
 * Cambio de tema con View Transitions API: el tema nuevo entra recortado por un
 * círculo que crece desde el propio botón hasta cubrir la pantalla.
 *
 * Por qué la API nativa y no una librería: el navegador toma un snapshot real
 * del "antes" y lo deja quieto debajo mientras el "después" se revela encima.
 * Cualquier alternativa en JS tendría que duplicar el DOM o pintar un overlay
 * de color plano — que es justo lo que hacía el overlay viejo, y por eso no se
 * notaba nada.
 *
 * Degradación: si el navegador no soporta startViewTransition (Firefox <144,
 * Safari viejo) o el usuario pidió reduced motion, se cambia el tema directo y
 * queda el crossfade de colores de `html.theme-switching` que ya existía.
 */
export function useThemeTransition() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (event?: { currentTarget: Element | null }) => {
      const current = resolvedTheme ?? theme;
      const next = current === 'dark' ? 'light' : 'dark';

      const root = document.documentElement;

      // El crossfade global de colores sigue corriendo debajo del círculo: es
      // lo que salva a los elementos que la View Transition no captura (nada
      // hoy, pero también es el fallback completo cuando no hay soporte).
      const markSwitching = () => {
        root.classList.add('theme-switching');
        window.setTimeout(() => root.classList.remove('theme-switching'), 280);
      };

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      const startViewTransition = document.startViewTransition?.bind(document);

      if (!startViewTransition || prefersReducedMotion) {
        markSwitching();
        setTheme(next);
        return;
      }

      // Origen del círculo: el centro del botón que se tocó. Sin evento (por
      // ejemplo si el toggle se dispara por teclado desde otro lado), cae en la
      // esquina superior derecha, que es donde vive el control en el header.
      const target = event?.currentTarget as HTMLElement | null;
      const rect = target?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 56;
      const y = rect ? rect.top + rect.height / 2 : 56;

      // Radio final = distancia del origen a la esquina más lejana. Sin esto el
      // círculo deja de crecer antes de cubrir la pantalla en pantallas anchas.
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      root.classList.add('theme-transition-active');

      const transition = startViewTransition(() => {
        setTheme(next);
      });

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 620,
              // Arranca rápido y afloja al final: el círculo se siente como una
              // onda que se expande, no como una barra de progreso lineal.
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              // Se anima SÓLO la capa nueva, que es la que se revela encima del
              // snapshot viejo. Animar la vieja la haría encogerse en su lugar.
              pseudoElement: '::view-transition-new(root)',
            },
          );
        })
        .catch(() => {
          // Una transición interrumpida por otra rechaza `ready`. El tema ya se
          // aplicó igual, así que no hay nada que reparar: sólo limpiar.
        });

      transition.finished.finally(() => {
        root.classList.remove('theme-transition-active');
      });
    },
    [theme, resolvedTheme, setTheme],
  );

  return { theme, resolvedTheme, toggleTheme };
}
