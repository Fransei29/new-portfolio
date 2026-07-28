// lib/newsletter-token.ts
// Tokens firmados para confirmar y dar de baja suscripciones.
//
// El token lleva el email y la acción firmados con HMAC-SHA256. Así el flujo de
// double opt-in no necesita tabla de pendientes: si la firma valida, el email es
// auténtico. Sin firma, cualquiera podría dar de baja a otro con solo conocer
// su dirección.

import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
import { NEWSLETTER_SECRET, normalizeEmail } from './email';

export type TokenAction = 'confirm' | 'unsubscribe';

/** Los tokens de confirmación caducan; los de baja no (un unsubscribe siempre debe funcionar). */
const CONFIRM_TTL_MS = 1000 * 60 * 60 * 48; // 48 horas

const base64url = {
  encode: (value: string) => Buffer.from(value, 'utf8').toString('base64url'),
  decode: (value: string) => Buffer.from(value, 'base64url').toString('utf8'),
};

function sign(payload: string): string {
  if (!NEWSLETTER_SECRET) {
    throw new Error('NEWSLETTER_SECRET no está definida');
  }
  return createHmac('sha256', NEWSLETTER_SECRET).update(payload).digest('base64url');
}

/** Token con forma `<payload>.<firma>`. */
export function createToken(email: string, action: TokenAction): string {
  const payload = base64url.encode(
    JSON.stringify({ e: normalizeEmail(email), a: action, t: Date.now() })
  );
  return `${payload}.${sign(payload)}`;
}

export interface VerifiedToken {
  email: string;
  action: TokenAction;
  issuedAt: number;
}

/** Devuelve el contenido si la firma es válida y el token no expiró; si no, null. */
export function verifyToken(token: string, expectedAction: TokenAction): VerifiedToken | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return null;
  }

  // Comparación en tiempo constante: una comparación normal filtra información
  // sobre la firma correcta a través del tiempo de respuesta.
  const given = Buffer.from(signature);
  const valid = Buffer.from(expected);
  if (given.length !== valid.length || !timingSafeEqual(given, valid)) return null;

  try {
    const data = JSON.parse(base64url.decode(payload)) as { e: string; a: string; t: number };
    if (data.a !== expectedAction) return null;

    if (expectedAction === 'confirm' && Date.now() - data.t > CONFIRM_TTL_MS) {
      return null;
    }

    return { email: data.e, action: data.a as TokenAction, issuedAt: data.t };
  } catch {
    return null;
  }
}
