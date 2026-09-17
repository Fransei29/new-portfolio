// lib/email.ts
// Cliente Resend compartido + validación. Solo servidor: si este módulo se
// importara desde un componente cliente, la API key terminaría en el bundle.

import 'server-only';
import { Resend } from 'resend';

/**
 * Se instancia perezosamente para que la ausencia de la key no rompa el build
 * (Vercel construye sin env vars de runtime en algunos setups). El error
 * aparece al enviar, no al compilar.
 */
let client: Resend | null = null;

export function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY no está definida');
  }
  if (!client) {
    client = new Resend(process.env.RESEND_API_KEY);
  }
  return client;
}

/** Remitente. Debe ser un dominio verificado en Resend o los envíos fallan. */
export const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? 'Franco Seiler <hola@francoseiler.com>';

/** Destinatario de los mensajes del formulario de contacto. */
export const CONTACT_INBOX = process.env.CONTACT_INBOX ?? 'seilerfranco317@gmail.com';

export const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? '';

/** Secreto para firmar los tokens de confirmación y baja del newsletter. */
export const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET ?? '';

// Suficientemente permisivo para no rechazar direcciones válidas raras, pero
// descarta lo que claramente no es un email.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: unknown): value is string =>
  typeof value === 'string' && value.length <= 254 && EMAIL_PATTERN.test(value.trim());

/** Normaliza para comparar y deduplicar: los emails no distinguen mayúsculas en la práctica. */
export const normalizeEmail = (value: string) => value.trim().toLowerCase();

/**
 * Escapa HTML antes de interpolar input de usuario en el cuerpo de un mail.
 * Sin esto, un mensaje con etiquetas rompe el layout o inyecta enlaces.
 */
export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
