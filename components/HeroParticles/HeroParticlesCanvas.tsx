'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroParticles.module.scss';
import { PARTICLE_CONFIG, PARTICLE_COLORS } from './particleConfig';
import { ParticleField, type FieldInput } from './particleField';
import { ParticleRenderer, computeViewSize } from './particleRenderer';
import { sampleShapeFromSvg } from './shapeSampler';
import { buildGraphShape } from './graphLayout';

/**
 * El isotipo de la marca, dibujado con partículas, que al scrollear se
 * reorganiza en un grafo de nodos conectados.
 *
 * QUÉ CUENTA: al entrar se ve el panda (la marca). Al bajar, las mismas
 * partículas se reacomodan en un diagrama de sistema — entrada, proceso,
 * salida. Es el pitch dicho en movimiento: "convierto tu operación en un
 * sistema". No es decoración de fondo; es el argumento.
 *
 * Este componente es el ÚNICO que junta las piezas: las dos figuras (sampler +
 * grafo), el campo (posiciones), el renderer (three) y el loop (rAF + scroll +
 * puntero). Todo lo pesado entra por import dinámico, así que el bundle inicial
 * no paga nada: el hero es lo primero que se pinta y meterle three al critical
 * path sería cambiar LCP por decoración.
 *
 * Todo el trabajo vive en refs y en imperativo. No hay un solo setState en el
 * loop a propósito: 60 re-renders por segundo de React costarían más que la
 * simulación entera. El único estado es el fade de entrada, que ocurre una vez.
 */
const HeroParticlesCanvas: React.FC = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || typeof window === 'undefined') return;

    // Reduced motion: no montamos nada. Un campo de partículas es exactamente
    // el tipo de movimiento ambiente que esta preferencia quiere apagar.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Sólo se excluyen teléfonos muy angostos. Ver minWidthToMount: con una
    // figura reconocible el cálculo cambió y ahora SÍ vale la pena en mobile.
    if (window.innerWidth < PARTICLE_CONFIG.minWidthToMount) return;

    // Flags de cancelación: el import dinámico puede resolver DESPUÉS de que el
    // componente se desmontó (navegación rápida), y sin esto montaríamos un
    // contexto WebGL sobre un canvas que ya no está en el DOM.
    let cancelled = false;
    let rafId = 0;

    let field: ParticleField | null = null;
    let renderer: ParticleRenderer | null = null;
    let themeObserver: MutationObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let scrollTrigger: { kill: () => void } | null = null;

    // Estado del loop. Fuera de React por lo dicho arriba.
    let progress = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerActive = false;
    let inView = true;
    let pageVisible = !document.hidden;
    let lastTime = 0;
    let elapsed = 0;
    let currentOpacity = 0;
    /**
     * Ancho CSS del hero, en px. Se guarda acá (y se refresca en el resize)
     * porque las figuras se colocan contra el LAYOUT, no contra el mundo 3D: el
     * hero pasa de dos columnas a una y con eso cambia dónde hay superficie
     * opaca. Las unidades de mundo no alcanzan para saberlo.
     */
    let cssWidth = 0;

    const isDark = () => document.documentElement.classList.contains('dark');

    const applyTheme = () => {
      if (!renderer) return;
      const c = isDark() ? PARTICLE_COLORS.dark : PARTICLE_COLORS.light;
      renderer.setColor(c.base.r, c.base.g, c.base.b);
      renderer.setAccentColor(c.accent.r, c.accent.g, c.accent.b);
    };

    /**
     * Opacidad objetivo: PLENA mientras dura el morfeo, y recién después se
     * disipa.
     *
     * La versión anterior arrancaba a bajar desde progress 0 con una curva
     * cuadrática y llegaba a 0.30 en progress 0.4 — o sea que el campo estaba
     * casi apagado justo cuando la mitad de las partículas todavía ni habían
     * salido del panda. El usuario veía el principio del morfeo y nunca el
     * grafo. Acá el fade NO empieza hasta `fadeStartAt`, que está calibrado por
     * encima del final del morfeo: primero se cuenta la historia completa,
     * después el hero se va.
     */
    const targetOpacity = () => {
      const base = isDark() ? PARTICLE_CONFIG.opacityDark : PARTICLE_CONFIG.opacityLight;
      const { fadeStartAt, fadeOutAt } = PARTICLE_CONFIG;
      if (progress <= fadeStartAt) return base;
      if (progress >= fadeOutAt) return 0;
      const k = (progress - fadeStartAt) / (fadeOutAt - fadeStartAt);
      // Smoothstep invertido: sale de la opacidad plena sin canto y llega a cero
      // sin frenazo. Un tramo lineal acá se nota como un escalón al arrancar.
      return base * (1 - k * k * (3 - 2 * k));
    };

    /**
     * Figuras cacheadas en coordenadas NORMALIZADAS ([-1,1]).
     *
     * Se guardan sin escalar a propósito: el resize cambia la escala de mundo
     * pero no la forma, así que reescalar es un lerp barato mientras que volver
     * a rasterizar el SVG implicaría un canvas 2D y un getImageData completo. El
     * panda se muestrea UNA sola vez por montaje.
     */
    let pandaShape: { points: Float32Array; ink: Float32Array; count: number } | null = null;
    let graphShape: { points: Float32Array; ink: Float32Array } | null = null;

    /**
     * Escala del panda acotada al viewport, en los DOS ejes.
     *
     * `shapeScale` es el tamaño deseado, pero tiene que sobrevivir a dos
     * recortes distintos:
     *  - alto: en laptops 16:9 con el hero a 80vh la figura no entra y sale
     *    cortada arriba y abajo;
     *  - ancho: si crece sin techo, el lado derecho del panda se mete debajo de
     *    la tarjeta del dashboard, que es OPACA y le come media cara. El
     *    limitante real del ancho no es el viewport sino esa tarjeta, por eso el
     *    factor es bastante menor que el vertical.
     *
     * El techo de ancho SÓLO aplica en desktop: la tarjeta se pone al costado
     * del texto recién a partir del breakpoint de dos columnas. Abajo de eso el
     * hero es una sola columna apilada, no hay nada opaco a los lados, y aplicar
     * igual el recorte dejaba al panda ridículamente chico justo en la pantalla
     * donde menos lugar sobra.
     * La escala es única para X e Y: el isotipo tiene que conservar proporción.
     */
    const shapeScaleFor = (viewW: number, viewH: number, cssWidth: number) => {
      const capped = Math.min(
        PARTICLE_CONFIG.shapeScale,
        viewH * PARTICLE_CONFIG.shapeMaxHeightRatio
      );
      const widthRatio =
        cssWidth >= PARTICLE_CONFIG.tabletBreakpoint
          ? PARTICLE_CONFIG.shapeMaxWidthRatio
          : PARTICLE_CONFIG.shapeMaxWidthRatioNarrow;
      return Math.min(capped, viewW * widthRatio);
    };

    /** Escribe las dos figuras en el campo con la escala de mundo actual. */
    const applyShapes = (count: number) => {
      if (!field || !renderer) return;
      const viewH = renderer.viewHeight;
      const viewW = renderer.viewWidth;
      // En una sola columna no hay tarjeta al costado, así que las figuras van
      // centradas: los corrimientos existen sólo para esquivarla.
      const twoColumn = cssWidth >= PARTICLE_CONFIG.tabletBreakpoint;

      if (!graphShape) {
        graphShape = buildGraphShape({
          count,
          seed: PARTICLE_CONFIG.seed,
          layers: PARTICLE_CONFIG.graphLayers,
          nodeShare: PARTICLE_CONFIG.graphNodeShare,
          nodeRadius: PARTICLE_CONFIG.graphNodeRadius,
          jitter: PARTICLE_CONFIG.graphJitter,
          edgeSpread: PARTICLE_CONFIG.graphEdgeSpread,
        });
      }

      // Los offsets son FRACCIONES del viewport, no unidades de mundo: en
      // pantallas angostas el hueco entre el texto y la tarjeta se achica en la
      // misma proporción, así que un corrimiento fijo dejaría la figura fuera de
      // cuadro justo donde menos lugar hay.
      const gox = twoColumn ? viewW * PARTICLE_CONFIG.graphOffsetXRatio : 0;
      const goy = viewH * PARTICLE_CONFIG.graphOffsetYRatio;

      // El grafo se estira al espacio disponible pero con techo. El techo se
      // mide DESCONTANDO el corrimiento: el grafo está corrido a la izquierda,
      // así que el lado que primero se sale de cuadro es ese, y un clamp contra
      // el semi-ancho pelado no lo veía. En tablets angostas el diagrama
      // arrancaba fuera de pantalla y se perdía la entrada del pipeline.
      const gx = Math.min(PARTICLE_CONFIG.graphScaleX, viewW * 0.94 - Math.abs(gox));
      const gy = Math.min(PARTICLE_CONFIG.graphScaleY, viewH * 0.85 - Math.abs(goy));
      field.setShapeB(
        graphShape.points,
        graphShape.ink,
        gx,
        gy,
        PARTICLE_CONFIG.graphDepth,
        gox,
        goy
      );

      if (pandaShape) {
        // Escala uniforme en X e Y: el isotipo tiene que conservar su
        // proporción o deja de ser el isotipo.
        const s = shapeScaleFor(viewW, viewH, cssWidth);
        field.setShapeA(
          pandaShape.points,
          pandaShape.ink,
          s,
          s,
          PARTICLE_CONFIG.shapeDepth,
          twoColumn ? viewW * PARTICLE_CONFIG.shapeOffsetXRatio : 0,
          viewH * PARTICLE_CONFIG.shapeOffsetYRatio,
          pandaShape.count
        );
      }
    };

    const start = async () => {
      // three entra acá, no arriba: import() dentro del efecto lo saca del
      // bundle inicial y lo baja recién cuando el hero está montado.
      const THREE = await import('three');
      if (cancelled) return;

      const rect = host.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      cssWidth = width;

      // dpr capado: arriba de 2 se renderizan 4x píxeles que en un fondo tan
      // tenue nadie distingue, y en retina eso sí se siente en el frame time.
      const dpr = Math.min(window.devicePixelRatio || 1, PARTICLE_CONFIG.maxPixelRatio);

      const count =
        width >= 1280
          ? PARTICLE_CONFIG.countDesktop
          : width >= PARTICLE_CONFIG.tabletBreakpoint
            ? PARTICLE_CONFIG.countTablet
            : PARTICLE_CONFIG.countMobile;

      // Cuánto mundo entra en cámara, calculado a mano ANTES de construir nada.
      // El orden importa: el campo necesita el tamaño visible para dimensionar
      // su volumen, y el renderer necesita los buffers del campo ya creados. La
      // única forma de romper ese círculo sin instanciar un WebGLRenderer de
      // descarte (que al disponerse mataría el contexto de este mismo canvas) es
      // que la geometría de cámara sea una función pura. Ver computeViewSize.
      const { viewWidth: viewW, viewHeight: viewH } = computeViewSize(width, height);

      field = new ParticleField({
        count,
        // Un poco más ancho que el viewport: si el campo terminara justo en el
        // borde, el empuje del mouse cerca de los costados dejaría un vacío
        // visible donde no hay partículas que traer de vuelta.
        spreadX: viewW * 1.25,
        spreadY: viewH * 1.25,
        spreadZ: PARTICLE_CONFIG.spreadZ,
        pointerRadius: PARTICLE_CONFIG.pointerRadius,
        pointerStrength: PARTICLE_CONFIG.pointerStrength,
        springStiffness: PARTICLE_CONFIG.springStiffness,
        springDamping: PARTICLE_CONFIG.springDamping,
        driftAmplitude: PARTICLE_CONFIG.driftAmplitude,
        scrollDrift: PARTICLE_CONFIG.scrollDrift,
        seed: PARTICLE_CONFIG.seed,
        morphStagger: PARTICLE_CONFIG.morphStagger,
        morphEndAt: PARTICLE_CONFIG.morphEndAt,
      });

      renderer = new ParticleRenderer({
        THREE,
        canvas,
        width,
        height,
        pixelRatio: dpr,
        positions: field.positions,
        scales: field.scales,
        weights: field.weights,
        pointSize: PARTICLE_CONFIG.pointSize,
        weightBoost: PARTICLE_CONFIG.weightBoost,
      });

      applyTheme();

      // El grafo es síncrono y barato, así que se arma ya. El panda necesita
      // bajar y rasterizar un SVG (asíncrono), y hasta que llegue el campo
      // muestra la distribución del constructor: por eso reseed() sigue
      // existiendo y no arranca en negro.
      applyShapes(count);

      // El tema no vive en React acá (next-themes escribe la clase en <html>),
      // así que lo observamos directo. Evita suscribir el componente al context
      // de tema sólo para cambiar dos uniforms.
      themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // ScrollTrigger provee el único `progress` global del que cuelgan deriva
      // y disipación. Se importa desde gsap.config, que ya registró el plugin.
      const { ScrollTrigger } = await import('../../animations/gsap.config');
      if (cancelled) return;

      const st = ScrollTrigger.create({
        trigger: host,
        start: 'top top',
        end: 'bottom top',
        // scrub no aplica: no animamos un tween, sólo leemos el progress en el
        // loop, que ya corre a 60fps y suaviza por sí mismo.
        onUpdate: (self) => {
          progress = self.progress;
        },
      });
      scrollTrigger = st as unknown as { kill: () => void };

      // onUpdate NO dispara al crearse. Si el usuario llega con la página ya
      // scrolleada (recarga a mitad, volver atrás con scroll restaurado, ancla),
      // el campo arrancaría en progress 0 — o sea con el panda armado y opacidad
      // llena — y recién al primer movimiento de rueda pegaría el salto al
      // estado real. Leerlo una vez acá lo deja sincronizado desde el frame uno.
      progress = st.progress ?? 0;
      // Mismo motivo para la opacidad: sin esto entraría con un fade desde 0
      // hacia un target que ya podría ser 0, o al revés un flash.
      currentOpacity = targetOpacity();

      setReady(true);
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);

      // El panda se muestrea DESPUÉS de arrancar el loop, no antes.
      // Motivo: rasterizar el SVG implica bajarlo y hacer un getImageData; si
      // bloqueáramos el arranque, el hero se quedaría sin nada visible durante
      // ese tiempo. Arrancando con la distribución del constructor, la figura
      // "cuaja" cuando llega — y como el resorte ya está corriendo, esa llegada
      // se ve como las partículas ordenándose solas, que es mejor que un pop.
      try {
        const shape = await sampleShapeFromSvg({
          src: PARTICLE_CONFIG.shapeSrc,
          resolution: PARTICLE_CONFIG.shapeResolution,
          count,
          seed: PARTICLE_CONFIG.seed,
          inkShare: PARTICLE_CONFIG.shapeInkShare,
        });
        if (cancelled || !field || !renderer) return;

        pandaShape = { points: shape.points, ink: shape.ink, count: shape.count };
        applyShapes(count);
      } catch {
        // Sin el isotipo, el campo se queda con la distribución del
        // constructor: pierde el significado pero NO se rompe el hero. Un
        // fallo de red en un elemento decorativo no puede tirar la página.
      }
    };

    /**
     * El loop se apaga solo cuando el hero no está a la vista o la pestaña está
     * oculta. Un campo de partículas invisible que sigue corriendo es batería
     * regalada, y el hero sale de pantalla apenas el usuario baja.
     */
    const shouldRun = () => inView && pageVisible;

    /**
     * Objeto de entrada del campo, REUSADO en cada frame. Se muta en vez de
     * construirlo dentro del tick porque el contrato de particleField es "cero
     * allocations a 60fps" y un literal nuevo por frame lo rompía justo en el
     * hilo donde una pausa de GC se ve como tirón.
     */
    const fieldInput: FieldInput = {
      progress: 0,
      pointerX: 0,
      pointerY: 0,
      pointerActive: false,
      dt: 0,
      elapsed: 0,
    };

    const tick = (now: number) => {
      if (cancelled || !field || !renderer) return;

      // dt clampeado: al volver de una pestaña en background o de un stall, el
      // delta real puede ser de segundos y el resorte explota (las partículas
      // se van al infinito en un frame). 1/30 es el techo razonable.
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      elapsed += dt;

      // Seguimiento suave del puntero. El mouse llega a saltos (un evento por
      // movimiento); interpolar hacia el target es lo que hace que el empuje se
      // sienta como una fuerza y no como un teletransporte.
      pointerX += (pointerTargetX - pointerX) * Math.min(dt * 8, 1);
      pointerY += (pointerTargetY - pointerY) * Math.min(dt * 8, 1);

      fieldInput.progress = progress;
      fieldInput.pointerX = pointerX;
      fieldInput.pointerY = pointerY;
      fieldInput.pointerActive = pointerActive;
      fieldInput.dt = dt;
      fieldInput.elapsed = elapsed;
      field.update(fieldInput);
      renderer.commitPositions();

      // La opacidad también se interpola: los saltos de progress (scroll con
      // rueda, anclas) se notarían como parpadeo del campo entero.
      const target = targetOpacity();
      currentOpacity += (target - currentOpacity) * Math.min(dt * 6, 1);
      renderer.setOpacity(currentOpacity);

      renderer.render();

      if (shouldRun()) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const resume = () => {
      if (cancelled || rafId !== 0 || !shouldRun() || !renderer) return;
      // Reset del reloj al despertar: si no, el primer dt incluye todo el
      // tiempo que estuvo pausado.
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!renderer) return;
      const rect = host.getBoundingClientRect();

      // Fuera del hero no hay push (pero el resorte sigue devolviendo, así el
      // campo se acomoda solo cuando el mouse se va).
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        pointerActive = false;
        return;
      }

      // px → unidades de mundo. Y se invierte porque en pantalla crece hacia
      // abajo y en el mundo de three hacia arriba.
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      pointerTargetX = nx * renderer.viewWidth;
      pointerTargetY = ny * renderer.viewHeight;
      pointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerActive = false;
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) resume();
    };

    const handleResize = () => {
      if (!renderer || !field) return;
      const rect = host.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, PARTICLE_CONFIG.maxPixelRatio);
      cssWidth = width;

      renderer.resize(width, height, dpr);
      field.resize(renderer.viewWidth * 1.25, renderer.viewHeight * 1.25);
      // Reescribir las anclas con la escala nueva. Las figuras están cacheadas
      // normalizadas, así que esto es un recorrido de buffers y nada más: NO se
      // vuelve a rasterizar el SVG en cada resize.
      applyShapes(field.count);
    };

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView) resume();
      },
      // El campo se disipa antes de que el hero salga del todo, así que no hace
      // falta margen: cuando deja de intersecar ya está invisible.
      { threshold: 0 }
    );
    intersectionObserver.observe(host);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    void start();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      intersectionObserver?.disconnect();
      themeObserver?.disconnect();
      scrollTrigger?.kill();

      // dispose explícito: sin esto queda vivo el contexto WebGL. Ver el
      // comentario en ParticleRenderer.dispose.
      renderer?.dispose();
      renderer = null;
      field = null;
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.layer} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${ready ? styles.visible : ''}`}
      />
    </div>
  );
};

export default HeroParticlesCanvas;
