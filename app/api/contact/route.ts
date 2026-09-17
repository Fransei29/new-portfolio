// app/api/contact/route.ts
// Reemplaza pages/api/contact.js (que era el snippet de ejemplo de SendGrid sin
// modificar) y el envío client-side con EmailJS, que exponía las credenciales
// en el bundle del navegador.

import {
  CONTACT_INBOX,
  FROM_ADDRESS,
  escapeHtml,
  getResend,
  isValidEmail,
  normalizeEmail,
} from '../../../lib/email';
import { checkLimit, clientIp, consume } from '../../../lib/rate-limit';

export const runtime = 'nodejs';

const MAX_NAME = 100;
const MAX_MESSAGE = 5000;
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Campo trampa: los humanos no lo ven, los bots sí lo completan. */
  website?: unknown;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rateKey = `contact:${ip}`;
  const limit = checkLimit(rateKey, LIMIT, WINDOW_MS);

  if (!limit.allowed) {
    return Response.json(
      { error: 'Demasiados envíos. Probá de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  // Honeypot: se responde 200 a propósito para que el bot crea que funcionó y
  // no reintente con otra estrategia.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    consume(rateKey, WINDOW_MS); // el bot sí gasta cuota, aunque crea que funcionó
    return Response.json({ ok: true });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || name.length > MAX_NAME) {
    return Response.json({ error: 'Nombre inválido.' }, { status: 400 });
  }
  if (!isValidEmail(payload.email)) {
    return Response.json({ error: 'Email inválido.' }, { status: 400 });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return Response.json({ error: 'Mensaje inválido.' }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);

  try {
    const { error } = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_INBOX,
      // replyTo permite responder directo desde el cliente de correo.
      replyTo: `${name} <${email}>`,
      subject: `Nuevo mensaje de ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1c1a2e">
          <h2 style="color:#2e294e;margin:0 0 1rem">Nuevo mensaje del formulario</h2>
          <p style="margin:0 0 .5rem"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 1.5rem"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <div style="padding:1rem;background:#f3f2f4;border-radius:8px;white-space:pre-wrap">${escapeHtml(
            message
          )}</div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend rechazó el mensaje de contacto:', error);
      return Response.json({ error: 'No se pudo enviar el mensaje.' }, { status: 502 });
    }

    // Recién acá: un fallo de envío no debe gastarle la cuota al usuario.
    consume(rateKey, WINDOW_MS);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Error enviando el mensaje de contacto:', error);
    return Response.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 });
  }
}
