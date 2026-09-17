# Cómo completar los case studies

La página ya se llama "Case Studies" y cada proyecto puede mostrar contexto, resultados y un testimonio. Los campos son **todos opcionales**: un proyecto sin ellos se ve exactamente como antes, así que podés ir completando de a uno.

Los datos van en `app/data/projects.ts`, dentro del objeto de cada proyecto.

## Los campos

```ts
{
  slug: 'acer0',
  title: 'Acer0',
  // ...lo que ya estaba...

  // Contexto — aparece como una fila de datos bajo el título
  role: 'Full-stack · Arquitectura',
  duration: '6 semanas',
  client: 'Acer0',              // omitir si no se puede nombrar
  industry: 'Manufactura y retail',
  year: '2025',

  // Resultados — las tarjetas lilas con los números
  outcomes: [
    { value: '+23%', label: 'conversión de checkout', context: 'vs. la tienda anterior' },
    { value: '1.2s', label: 'carga del catálogo', context: 'antes 4.8s' },
    { value: '0', label: 'incidentes en producción', context: 'primeros 6 meses' },
  ],

  // Testimonio — opcional
  testimonial: {
    quote: 'Entendió el negocio antes de escribir una línea de código.',
    author: 'Nombre Apellido',
    role: 'Fundador, Acer0',
  },
}
```

Un campo con `'—'` se trata como "sin cargar" y no se muestra. Sirve para dejarlo marcado sin que aparezca a medias.

## Qué poner en `outcomes`

Esto es lo único que requiere trabajo real, y es lo que convierte una descripción en un case study. Dos o tres por proyecto alcanzan.

**Sirve:**
- `+23%` · conversión de checkout
- `1.2s` · tiempo de carga (antes 4.8s)
- `40h/mes` · ahorradas en carga manual
- `3x` · pedidos procesados sin sumar personal
- `0` · incidentes en producción en 6 meses

**No sirve** (no es un resultado, es una descripción):
- `15` · funcionalidades entregadas
- `100%` · responsive
- `8` · tecnologías usadas

La diferencia: un resultado le importa al **cliente**, no al desarrollador. "Responsive" es una expectativa, no un logro.

### Si no tenés números

Es lo más común, y hay salida. Tres opciones, de mejor a peor:

1. **Preguntale al cliente.** "¿Notaron alguna diferencia desde que salió?" suele dar algo usable, aunque sea aproximado. Vale más un `~30%` que ellos confirman que un dato inventado.
2. **Medí lo que todavía podés medir.** Tiempo de carga con PageSpeed, cantidad de pasos de un flujo antes y después, horas de trabajo manual que el sistema eliminó. Eso lo sabés vos sin preguntar.
3. **Usá resultados cualitativos con una cifra concreta al lado.** `4` · integraciones de pago unificadas en un solo flujo. No es una métrica de negocio, pero es verificable y concreto.

Lo que no conviene es inventar números. Un prospecto técnico los va a cuestionar en la primera llamada, y ahí perdés más de lo que ganaste.

## Por dónde empezar

No hace falta completar los 22. Empezá por los 3 o 4 que más querés que te contraten para hacer de nuevo — los que un prospecto vería primero. El resto puede quedarse como está sin que se note el corte.

`acer0` ya tiene la estructura puesta como plantilla, con `outcomes: []` esperando datos.
