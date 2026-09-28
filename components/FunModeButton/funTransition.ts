// components/FunModeButton/funTransition.ts
// Transiciones entre el sitio clásico y el modo fun (/fun).
//
// Las dos funcionan igual: una capa fija en <body>, fuera de React, que
// sobrevive a la navegación. La página de destino la retira al montar.
//
// - Entrada (clásico → fun): círculos coral y lilas salen del botón y el panda
//   aparece de un salto. /fun encoge la capa hacia el centro (app/fun/FunIntro).
// - Salida (fun → clásico): la misma idea al revés, en clave calma: lila suave,
//   Lila Profundo y por último el fondo del sitio clásico. El panda saluda y se
//   achica. El sitio desvanece la capa (finishExit), y como su último color es
//   el fondo del sitio, la página aparece sin corte.

export const ENTER_ID = 'fun-mode-transition';
export const EXIT_ID = 'fun-mode-exit';

const ENTER_COLORS = ['#ff6b57', '#b59cf8', '#7863d6'];
/** Tiempo desde el clic hasta navegar, en ms. */
export const ENTER_NAV_DELAY = 640;
export const EXIT_NAV_DELAY = 820;

const BOUNCE = 'cubic-bezier(.34,1.56,.64,1)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fondo del sitio clásico según el tema guardado por next-themes. */
function classicBackground() {
  try {
    return localStorage.getItem('theme') === 'dark' ? '#292833' : '#ffffff';
  } catch {
    return '#ffffff';
  }
}

function buildLayer(id: string, colors: string[], originX: number, originY: number, stagger: number) {
  document.getElementById(ENTER_ID)?.remove();
  document.getElementById(EXIT_ID)?.remove();

  const layer = document.createElement('div');
  layer.id = id;
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '2147483000',
    pointerEvents: 'none',
    clipPath: 'circle(150% at 50% 50%)',
  });

  const circles = colors.map((color, i) => {
    const circle = document.createElement('div');
    Object.assign(circle.style, {
      position: 'absolute',
      inset: '0',
      background: color,
      clipPath: `circle(0px at ${originX}px ${originY}px)`,
      transition: `clip-path 520ms cubic-bezier(.7,0,.25,1) ${i * stagger}ms`,
    });
    layer.appendChild(circle);
    return circle;
  });

  const panda = document.createElement('img');
  panda.src = '/isotipo-panda.svg';
  panda.alt = '';
  Object.assign(panda.style, {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '120px',
    transform: 'translate(-50%, -50%) scale(0) rotate(-20deg)',
    filter: 'drop-shadow(5px 5px 0 #2e294e)',
  });
  layer.appendChild(panda);
  document.body.appendChild(layer);

  // El radio tiene que cubrir la esquina más lejana al botón.
  const radius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY)
  );
  const expand = () =>
    circles.forEach((c) => {
      c.style.clipPath = `circle(${radius}px at ${originX}px ${originY}px)`;
    });

  // Red de seguridad: si la página de destino no llega a retirarla, se va igual.
  window.setTimeout(() => layer.remove(), 5000);
  return { layer, panda, expand };
}

/** Clásico → fun. */
export function playEnter(originX: number, originY: number) {
  const { panda, expand } = buildLayer(ENTER_ID, ENTER_COLORS, originX, originY, 90);
  panda.style.transition = `transform 420ms ${BOUNCE} 380ms`;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      expand();
      panda.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    })
  );
}

/** Fun → clásico. */
export function playExit(originX: number, originY: number) {
  const { panda, expand } = buildLayer(EXIT_ID, ['#b59cf8', '#2e294e', classicBackground()], originX, originY, 110);
  // El panda entra sobre el Lila Profundo, saluda con un vaivén y se achica
  // justo cuando la última capa (el fondo del sitio) termina de cubrir todo.
  panda.style.transition = `transform 380ms ${BOUNCE} 200ms`;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      expand();
      panda.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)';
    })
  );
  window.setTimeout(() => {
    panda.style.transition = 'transform 140ms ease-in-out';
    panda.style.transform = 'translate(-50%, -50%) scale(1) rotate(-12deg)';
  }, 560);
  window.setTimeout(() => {
    panda.style.transform = 'translate(-50%, -50%) scale(1) rotate(10deg)';
  }, 700);
  window.setTimeout(() => {
    panda.style.transition = 'transform 260ms cubic-bezier(.6,0,.8,.2), opacity 260ms ease';
    panda.style.transform = 'translate(-50%, -50%) scale(0) rotate(20deg)';
    panda.style.opacity = '0';
  }, 840);
}

/** Lo llama el sitio clásico al montar: desvanece la capa de salida si la hay. */
export function finishExit() {
  const layer = document.getElementById(EXIT_ID);
  if (!layer) return;
  // Un frame para que la página ya esté pintada debajo.
  requestAnimationFrame(() => {
    layer.style.transition = 'opacity 480ms ease';
    layer.style.opacity = '0';
  });
  window.setTimeout(() => layer.remove(), 560);
}
