// design-exploration/_shared/directions.ts
// Metadata de cada dirección de diseño. El índice arma las tarjetas desde acá y
// la ExplorationBar calcula anterior / siguiente con este mismo orden.

export interface Direction {
  slug: string;
  number: string;
  name: string;
  concept: string;
  /** Colores principales, del fondo al acento. */
  palette: { name: string; hex: string }[];
  fonts: { display: string; body: string };
}

export const directions: Direction[] = [
  {
    slug: 'option-01',
    number: '01',
    name: 'Editorial',
    concept: 'Mucho blanco, serif grande y un ritmo de lectura pausado, como un libro bien compuesto.',
    palette: [
      { name: 'Papel', hex: '#FBFAF7' },
      { name: 'Tinta', hex: '#1A1A1A' },
      { name: 'Gris', hex: '#6B6B6B' },
      { name: 'Óxido', hex: '#A4461F' },
    ],
    fonts: { display: 'Newsreader', body: 'Inter' },
  },
  {
    slug: 'option-02',
    number: '02',
    name: 'Terminal',
    concept: 'Dark tech: el portafolio como una sesión de consola, monospace y un verde que se usa con cuentagotas.',
    palette: [
      { name: 'Fondo', hex: '#0B0E0C' },
      { name: 'Panel', hex: '#131815' },
      { name: 'Texto', hex: '#D4DDD6' },
      { name: 'Fósforo', hex: '#7EE787' },
    ],
    fonts: { display: 'JetBrains Mono', body: 'IBM Plex Sans' },
  },
  {
    slug: 'option-03',
    number: '03',
    name: 'Brutalista',
    concept: 'Grillas duras, bordes gruesos, tipografía pesada y cero adornos: el contenido a la vista.',
    palette: [
      { name: 'Hueso', hex: '#F2EFE6' },
      { name: 'Negro', hex: '#0A0A0A' },
      { name: 'Naranja', hex: '#FF4F00' },
      { name: 'Amarillo', hex: '#FFE14D' },
    ],
    fonts: { display: 'Archivo Black', body: 'Space Mono' },
  },
  {
    slug: 'option-04',
    number: '04',
    name: 'Suizo',
    concept: 'Grilla tipográfica de 12 columnas, jerarquía por tamaño y posición, un solo rojo como señal.',
    palette: [
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Negro', hex: '#111111' },
      { name: 'Gris', hex: '#E6E6E6' },
      { name: 'Rojo', hex: '#E30613' },
    ],
    fonts: { display: 'Inter Tight', body: 'Inter Tight' },
  },
  {
    slug: 'option-05',
    number: '05',
    name: 'Bento',
    concept: 'Todo el perfil en tarjetas modulares tipo dashboard: se escanea en un vistazo.',
    palette: [
      { name: 'Fondo', hex: '#EEF0F3' },
      { name: 'Tarjeta', hex: '#FFFFFF' },
      { name: 'Grafito', hex: '#15171C' },
      { name: 'Azul', hex: '#3D5AFE' },
    ],
    fonts: { display: 'Geist', body: 'Geist' },
  },
  {
    slug: 'option-06',
    number: '06',
    name: 'Case study first',
    concept: 'Los proyectos son el protagonista: historias largas, imágenes a sangre y el problema antes que el stack.',
    palette: [
      { name: 'Noche', hex: '#101012' },
      { name: 'Hueso', hex: '#EDEAE3' },
      { name: 'Gris', hex: '#8E8C87' },
      { name: 'Ámbar', hex: '#E8B04B' },
    ],
    fonts: { display: 'Instrument Serif', body: 'Inter' },
  },
  {
    slug: 'option-07',
    number: '07',
    name: 'Playful',
    concept: 'Color, formas y microinteracciones: serio en el trabajo, divertido en la forma.',
    palette: [
      { name: 'Crema', hex: '#FFF7EC' },
      { name: 'Violeta', hex: '#5B3DF5' },
      { name: 'Coral', hex: '#FF6B57' },
      { name: 'Menta', hex: '#3DDC97' },
    ],
    fonts: { display: 'Unbounded', body: 'DM Sans' },
  },
  {
    slug: 'option-08',
    number: '08',
    name: 'Consultora premium',
    concept: 'Sobrio y confiable, como una firma de consultoría: resultados, proceso y credenciales primero.',
    palette: [
      { name: 'Marfil', hex: '#F7F5F0' },
      { name: 'Navy', hex: '#0E1B2C' },
      { name: 'Pizarra', hex: '#4A5568' },
      { name: 'Oro', hex: '#B08D57' },
    ],
    fonts: { display: 'Source Serif 4', body: 'Manrope' },
  },
  {
    slug: 'option-09',
    number: '09',
    name: 'Revista',
    concept: 'Una edición impresa: portada, índice, columnas, capitulares y citas destacadas.',
    palette: [
      { name: 'Papel prensa', hex: '#F4EFE4' },
      { name: 'Tinta', hex: '#161412' },
      { name: 'Rojo', hex: '#C8102E' },
      { name: 'Sepia', hex: '#7A6A55' },
    ],
    fonts: { display: 'DM Serif Display', body: 'Libre Franklin' },
  },
  {
    slug: 'option-10',
    number: '10',
    name: 'Blueprint',
    concept: 'Propuesta propia: tus case studies son de arquitectura, así que el sitio se lee como un plano técnico.',
    palette: [
      { name: 'Azul plano', hex: '#0F2A4A' },
      { name: 'Línea', hex: '#9CC3F0' },
      { name: 'Blanco', hex: '#F4F8FC' },
      { name: 'Marcador', hex: '#FFC857' },
    ],
    fonts: { display: 'IBM Plex Sans Condensed', body: 'IBM Plex Mono' },
  },
];
