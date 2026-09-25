// Genera las fotos de fondo del sitio con la API de imágenes de OpenAI.
// Uso: OPENAI_API_KEY=... node scripts/generate-images.mjs [nombre...]
// Sin nombres genera todas. Cada una se guarda en WebP en public/img/.
// No se ejecuta en el build.

import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const STYLE =
  'Candid documentary-style photograph, soft natural window light, shallow depth of field, ' +
  'muted palette with gentle lilac and sand tones. No text, no logos, no brand names, no readable screens.';

// Los pasos de HowWeWork van casi sin caras: son escenas de proceso, no "el
// equipo". Ver el comentario en .stepPhoto.
const IMAGES = {
  'cta-humanity': {
    size: '1536x1024',
    prompt:
      'A small team of three people working together around a wooden table in a warm, sunlit studio: ' +
      'one person sketching a workflow on paper, another pointing at a laptop screen, a third smiling ' +
      'and listening with a coffee mug. Diverse, natural, relaxed expressions, genuine collaboration. ' +
      'Wide horizontal composition with calm negative space in the center.',
  },
  'step-discovery': {
    size: '1536x1024',
    prompt:
      'Close-up of two people in a relaxed conversation across a table, seen from the shoulders down: ' +
      'one listening and taking handwritten notes in a notebook, the other gesturing while explaining. ' +
      'Coffee cups, a printed business report, warm morning light.',
  },
  'step-design': {
    size: '1536x1024',
    prompt:
      'Hands arranging paper wireframe sketches and sticky notes on a large table, a pencil drawing ' +
      'arrows between boxes of a user flow diagram. Overhead angle, tidy and thoughtful.',
  },
  'step-development': {
    size: '1536x1024',
    prompt:
      'Hands typing on a laptop keyboard at a calm, tidy desk, blurred code-like shapes on the screen ' +
      '(not readable), a notebook with a checklist and a cup of tea beside it. Focused, quiet atmosphere.',
  },
  'step-launch': {
    size: '1536x1024',
    prompt:
      'Two people side by side at a desk looking at a laptop together, seen from behind and slightly to ' +
      'the side, one giving a friendly thumbs up, a printed handbook and documentation binder on the desk. ' +
      'Sense of a finished project and ongoing support.',
  },
};

const key = process.env.OPENAI_API_KEY;
if (!key) {
  console.error('Falta OPENAI_API_KEY en el entorno.');
  process.exit(1);
}

const names = process.argv.slice(2);
const todo = names.length ? names : Object.keys(IMAGES);
const unknown = todo.filter((n) => !IMAGES[n]);
if (unknown.length) {
  console.error(`No existen: ${unknown.join(', ')}. Opciones: ${Object.keys(IMAGES).join(', ')}`);
  process.exit(1);
}

await mkdir('public/img', { recursive: true });

await Promise.all(
  todo.map(async (name) => {
    const { size, prompt } = IMAGES[name];
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-1', prompt: `${prompt} ${STYLE}`, size, quality: 'high', n: 1 }),
    });
    if (!res.ok) throw new Error(`${name}: ${res.status} ${await res.text()}`);
    const { data } = await res.json();
    const out = `public/img/${name}.webp`;
    await sharp(Buffer.from(data[0].b64_json, 'base64')).webp({ quality: 78 }).toFile(out);
    console.log(`OK -> ${out}`);
  })
);
