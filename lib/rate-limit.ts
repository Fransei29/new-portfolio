// lib/rate-limit.ts
// Rate limiting en memoria para las rutas que envían mail.
//
// LIMITACIÓN CONOCIDA: el estado vive en el proceso. En serverless cada
// instancia tiene el suyo, así que el límite real es por instancia, no global.
// Frena el abuso casual (que es el 99% de los casos) pero no un ataque
// distribuido. Si el volumen lo justifica, migrar a Upstash Redis.

import 'server-only';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Evita que el Map crezca sin límite si llegan muchas IPs distintas. */
function evictExpired(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of Array.from(buckets.entries())) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Segundos hasta que se libere el límite — se devuelve en Retry-After. */
  retryAfter: number;
}

/**
 * Consulta el límite SIN consumir cuota.
 *
 * Va separado de `consume()` a propósito: si una petición malformada gastara
 * cuota, cualquiera podría bloquearle el formulario a una IP mandando JSON
 * basura. Solo los envíos que llegan a despacharse deben contar.
 */
export function checkLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  evictExpired(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) return { allowed: true, retryAfter: 0 };

  if (bucket.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

/** Registra un uso. Llamar solo después de una operación exitosa. */
export function consume(key: string, windowMs: number): void {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  bucket.count += 1;
}

/** Solo para tests: vacía todos los contadores. */
export function resetLimits(): void {
  buckets.clear();
}

/**
 * IP del cliente. Detrás de Vercel el socket es el del proxy, así que la real
 * viene en x-forwarded-for (primer valor de la lista).
 */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
