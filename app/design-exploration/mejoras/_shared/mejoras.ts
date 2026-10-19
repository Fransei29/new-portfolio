// design-exploration/mejoras/_shared/mejoras.ts
// Ronda 2: siete mejoras sobre el sitio actual. A diferencia de la ronda 1
// (direcciones de rediseño total), acá la marca no se discute: paleta lila,
// Bricolage Grotesque + Plus Jakarta Sans, panda y copy real. Lo que cambia es
// layout, jerarquía, ritmo y comportamiento en mobile.

export interface Mejora {
  slug: string;
  number: string;
  name: string;
  /** Qué problema del sitio actual ataca. */
  problem: string;
  /** Qué propone, en una línea. */
  concept: string;
  desktop: string;
  mobile: string;
}

export const mejoras: Mejora[] = [
  {
    slug: 'option-01',
    number: '01',
    name: 'Orden',
    problem: 'En 1440px el contenido se pega al borde y cada sección alinea distinto (títulos centrados, otros a la izquierda).',
    concept: 'Un contenedor fijo con márgenes, títulos de sección alineados a la izquierda con número y rótulo, y una sola regla de espaciado.',
    desktop: 'Grilla de 12 columnas a 1200px, cabeceras de sección en dos columnas (título / bajada).',
    mobile: 'Gutter de 20px constante, misma jerarquía apilada, sin waves entre secciones.',
  },
  {
    slug: 'option-02',
    number: '02',
    name: 'Hero con prueba',
    problem: 'El hero tiene mucho aire muerto, el dashboard queda chico y las cifras casi no se ven.',
    concept: 'Titular más grande, captura real de un case study como protagonista y una franja de prueba (cifras + mercados) debajo.',
    desktop: 'Hero a pantalla completa en dos columnas; la franja de prueba corre a todo el ancho.',
    mobile: 'El titular entra en el primer scroll con los dos botones; la captura va después, no antes del CTA.',
  },
  {
    slug: 'option-03',
    number: '03',
    name: 'Casos primero',
    problem: 'Los case studies aparecen tarde, en un carrusel cortado y con las capturas tapadas por un velo lila.',
    concept: 'El trabajo sube a la segunda sección: filas grandes con captura limpia, problema, rol y stack.',
    desktop: 'Filas alternadas imagen / texto, la primera a todo el ancho.',
    mobile: 'Tarjetas apiladas con la captura arriba, sin carrusel horizontal.',
  },
  {
    slug: 'option-04',
    number: '04',
    name: 'Bento lila',
    problem: 'Servicios, principios y cifras están en secciones separadas y largas: hay que scrollear mucho para entender la oferta.',
    concept: 'Una grilla bento que resume estudio, servicios, principios y cifras en un solo vistazo.',
    desktop: 'Bento de 4 columnas con tarjetas de distinto tamaño y un acento lila profundo.',
    mobile: 'El bento colapsa a 2 columnas para cifras y a 1 para lo demás, sin perder el orden de lectura.',
  },
  {
    slug: 'option-05',
    number: '05',
    name: 'Noche lila',
    problem: 'El sitio claro alterna blanco, gris y lila en franjas; el lila profundo sólo aparece en metodología.',
    concept: 'Versión oscura de punta a punta sobre Grafito y Lila Profundo, con brillos de Lila Suave y el lila como luz.',
    desktop: 'Superficies elevadas, bordes finos y glows contenidos detrás de los elementos clave.',
    mobile: 'Mismo contraste, glows más chicos para no ensuciar pantallas pequeñas.',
  },
  {
    slug: 'option-06',
    number: '06',
    name: 'Rótulos fijos',
    problem: 'La metodología en zigzag deja grandes huecos vacíos y el recorrido de la home no tiene guía.',
    concept: 'Lectura editorial en dos columnas: el rótulo de cada sección queda fijo a la izquierda mientras el contenido corre.',
    desktop: 'Columna izquierda sticky con número y título; proceso como línea de tiempo vertical.',
    mobile: 'El rótulo pasa a una barra fina sticky arriba que indica en qué sección estás.',
  },
  {
    slug: 'option-07',
    number: '07',
    name: 'Pulgar primero',
    problem: 'En el celular la home es una columna muy larga: 5 servicios y 5 comparaciones apiladas antes de llegar al contacto.',
    concept: 'Diseñada desde el celular: carruseles con snap, acordeones y un CTA fijo al alcance del pulgar.',
    desktop: 'Lo mismo se abre en grillas; los acordeones quedan desplegados.',
    mobile: 'Barra inferior fija con "Empezá tu proyecto", servicios en carrusel y comparativa como tabla compacta.',
  },
];
