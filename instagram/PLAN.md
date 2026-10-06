# Plan de Instagram del estudio

_Última actualización: 2026-10-05_

## Estrategia

- **Reels = alcance** (llegar a gente nueva). El primer frame tiene que decir algo, no mostrar el nombre ni escribirse letra por letra.
- **Carruseles = profundidad** (se leen, se guardan, convencen al que entra al perfil).
- **Videos de Franco a cámara = confianza.** La gente le compra a personas.
- **Lanzamiento**: primero se arma la estructura completa (los 9 posts de la grilla listos) y se publican en 5 a 7 días, uno o dos por día. Recién ahí se difunde la cuenta. Después, ritmo de **3 posts por semana**, con una reserva de 3 a 6 posts listos.
- Todo pensado **para el celular**: formato 1080×1440 (3:4), texto propio de 34px o más, capturas mobile reales y capturas de escritorio solo recortadas con zoom.
- **Orgánico y creíble, no genérico**: un tercio de la grilla con Franco, proyectos reales en pantallas reales y nombres de clientes reales.

## Pilares de contenido

1. Casos (hay ~28 proyectos)
2. Educación para clientes (sin jerga técnica)
3. Proceso y detrás de escena
4. Franco: quién es, opiniones, el día a día del estudio

## Primeros 9 posts (orden de publicación)

Ver la grilla en `feed-v2/grilla.jpg` o en `planner/index.html`.

| # | Tipo | Post | Estado | Quién |
|---|---|---|---|---|
| 1 | Reel | Presentación del estudio | Listo; corregir el primer frame y la portada | Claude |
| 2 | Carrusel | Bellum, caso completo | **Listo** (el 06 es video claro/oscuro) | — |
| 3 | Video | Quién soy y qué hago | Grabar, después Claude edita | Franco → Claude |
| 4 | Carrusel | 5 señales de que tu web te cuesta clientes | Pendiente; Claude propone el texto y Franco lo aprueba | Claude + Franco |
| 5 | Reel | Bellum en video | Listo; falta la portada nueva | Claude |
| 6 | Carrusel | Cómo es trabajar conmigo | Pendiente | Claude + Franco |
| 7 | Carrusel | Muro de proyectos | Pendiente; capturas de los sitios en vivo | Claude |
| 8 | Carrusel | El Triunfo, caso completo | Pendiente; misma plantilla que Bellum | Claude |
| 9 | Video | Un tip para tu negocio | Grabar, después Claude edita | Franco → Claude |

Reserva para después del lanzamiento: reel de El Triunfo, casos de ComplyDQ, Royal Parking y Globaly, más carruseles educativos.

## Hoja de ruta

**Etapa 1 · Armar la base (esta semana).** En paralelo:
- Claude: carruseles 4, 6, 7 y 8, el primer frame del reel 01 y las portadas de los reels.
- Franco: sesión de fotos y video de 1 hora (guía abajo), revisar los textos de cada carrusel y armar la cuenta (bio, link y foto).

**Etapa 2 · Terminar con material real.** Claude edita los videos 3 y 9 (subtítulos y marca con HyperFrames) y reemplaza las fotos generadas por fotos reales en las portadas. Revisión final de la grilla.

**Etapa 3 · Lanzamiento (una semana).** Publicar los 9 en 6 o 7 días, uno por día y dos en algún día, siempre en el orden de la tabla. Fijar arriba del perfil: "Hola, soy Franco", Bellum y el reel de presentación. Destacadas: Proyectos, Proceso y Sobre mí. Recién después difundir la cuenta: estado de WhatsApp, LinkedIn, clientes y conocidos.

**Etapa 4 · Ritmo.** 3 posts por semana (por ejemplo lunes, miércoles y viernes), siempre con 3 a 6 posts de reserva. Producir por tandas: una sesión cada dos semanas.

## Dónde está cada cosa

- `carrusel-01-bellum/`: carrusel Bellum. `node capturar.mjs` saca capturas del sitio en vivo (claro y oscuro, escritorio y celu) a `capturas/`. Editar `index.html`, correr `node render.mjs` (genera `slides/NN.png`) y `python3 wipe.py` (genera `slides/06.mp4`, el corte claro/oscuro).
- `feed-v2/`: las 9 portadas de la grilla aprobada (más Franco y más proyectos). `node render.mjs` y `python3 grilla.py`.
- `portadas/`: portadas con notebook y celular, más la de "Hola, soy Franco". Se renderizan igual y quedan en `out/NN.png`.
- `planner/index.html`: grilla del perfil para ver y reordenar los posts arrastrándolos.
- `reel-01-presentacion/`, `reel-02-bellum/`: reels en HyperFrames.

---

## Guía: capturas de escritorio

- Ventana del navegador a **1440px de ancho**, zoom al 100%, sin extensiones ni barras de favoritos a la vista.
- **Una captura por sección**: hero, servicios, una página de servicio, el formulario de propuesta, el panel (dashboard, servicios, FAQ, blog), el modo oscuro.
- Mejor de más que de menos. Se recortan después.
- Guardarlas en una carpeta con nombres claros (por ejemplo, `bellum-desktop/hero.png`).

## Guía: sesión de fotos y video (1 hora)

### Antes

- **Luz natural**: al lado de una ventana, con la luz pegándote de costado o de frente, nunca de atrás. Mañana o tarde, no al mediodía.
- **Ropa**: lisa y oscura, como en la foto de perfil (remera negra). Nada de estampas ni logos.
- **Lugar**: el escritorio ordenado. Tiene que verse real, no vacío. Notebook, una taza o una planta suman.
- **Celular**: limpiá la lente. Usá la cámara de atrás, no la selfie. En modo foto normal; el modo retrato a veces recorta raro.
- **Pantalla**: el brillo de la notebook al máximo, para que el sitio se lea en la foto.

### Fotos (vertical, que alguien te las saque o con el celu apoyado y temporizador)

1. **Vos trabajando**: de costado y por arriba del hombro, con un proyecto abierto en la pantalla (Bellum). Mirás la pantalla, no la cámara.
2. **La notebook sola** con Bellum abierto, de frente y en diagonal (45°). Repetir con El Triunfo y ComplyDQ.
3. **Tu mano con el celu** mostrando un sitio tuyo, con el escritorio desenfocado atrás.
4. **3 o 4 fotos mirando a cámara**, en lugares distintos: escritorio, ventana, pared lisa, afuera. Algunas sonriendo y otras serio.
5. **Detalles**: manos en el teclado, la pantalla de cerca, un cuaderno con bocetos si tenés.

Sacá muchas de cada una. Elegimos después.

### Video "Quién soy" (30 a 40 segundos)

- Celular **vertical**, a la altura de los ojos, apoyado en algo firme. A un brazo y medio de distancia, encuadrado de la cintura para arriba.
- Mirás **a la lente**, no a la pantalla.
- **Sonido**: lugar sin eco ni ruido. Si tenés micrófono corbatero, mejor. Si no, cerca del celu.
- **Arrancás directo con el gancho**, sin "hola, ¿cómo están?". Por ejemplo: "Hago software para que tu negocio deje de depender de planillas." Después: quién sos, qué hacés y un ejemplo real (Bellum).
- No hace falta que salga perfecto. Grabá 3 o 4 tomas y elegimos. Si te equivocás, hacé una pausa y repetí la frase; se corta en la edición.
- Los subtítulos y el estilo de marca los agrega Claude con HyperFrames.

### Video extra: la pantalla real

- Filmá con el celu (vertical) la notebook mientras scrolleás el sitio de Bellum, 10 a 15 segundos y movimiento lento. Sirve como fondo para reels y se ve mucho más real que una grabación de pantalla.
