// app/api/newsletter/subscribe/route.ts
// Paso 1 del double opt-in: no da de alta a nadie, solo manda un mail pidiendo
// confirmación. Sin esto cualquiera podría suscribir la dirección de otro, y las
// quejas por spam resultantes dañan la reputación del dominio.

import {
  FROM_ADDRESS,
  escapeHtml,
  getResend,
  isValidEmail,
  normalizeEmail,
} from '../../../../lib/email';
import { createToken } from '../../../../lib/newsletter-token';
import { checkLimit, clientIp, consume } from '../../../../lib/rate-limit';
import { SITE_URL } from '../../../../lib/site';

export const runtime = 'nodejs';

const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

type Language = 'es' | 'en';

const COPY = {
  es: {
    subject: 'Confirmá tu suscripción',
    heading: 'Un paso más',
    body: 'Hacé clic en el botón para confirmar que querés recibir los artículos. Si no fuiste vos, ignorá este mail y no pasa nada.',
    cta: 'Confirmar suscripción',
    expiry: 'Este enlace vence en 48 horas.',
    ok: 'Te mandamos un mail para confirmar la suscripción.',
  },
  en: {
    subject: 'Confirm your subscription',
    heading: 'One more step',
    body: "Click the button to confirm you want to receive new articles. If this wasn't you, just ignore this email.",
    cta: 'Confirm subscription',
    expiry: 'This link expires in 48 hours.',
    ok: 'Check your inbox to confirm your subscription.',
  },
} as const;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rateKey = `subscribe:${ip}`;
  const limit = checkLimit(rateKey, LIMIT, WINDOW_MS);

  if (!limit.allowed) {
    return Response.json(
      { error: 'Demasiados intentos. Probá de nuevo más tarde.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  let payload: { email?: unknown; language?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Cuerpo inválido.' }, { status: 400 });
  }

  const language: Language = payload.language === 'es' ? 'es' : 'en';
  const copy = COPY[language];

  // Honeypot — 200 silencioso para no darle señal al bot.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    consume(rateKey, WINDOW_MS);
    return Response.json({ ok: true, message: copy.ok });
  }

  if (!isValidEmail(payload.email)) {
    return Response.json({ error: 'Email inválido.' }, { status: 400 });
  }

  const email = normalizeEmail(payload.email);
  const token = createToken(email, 'confirm');
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}&lang=${language}`;

  try {
    const { error } = await getResend().emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: copy.subject,
      text: `${copy.body}\n\n${confirmUrl}\n\n${copy.expiry}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#1c1a2e;max-width:480px">
          <h2 style="color:#2e294e;margin:0 0 1rem">${copy.heading}</h2>
          <p style="margin:0 0 1.5rem">${copy.body}</p>
          <a href="${confirmUrl}"
             style="display:inline-block;padding:.75rem 1.5rem;background:#2e294e;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">
            ${copy.cta}
          </a>
          <p style="margin:1.5rem 0 0;font-size:.85rem;color:#8a8599">${copy.expiry}</p>
          <p style="margin:.5rem 0 0;font-size:.8rem;color:#8a8599;word-break:break-all">${escapeHtml(
            confirmUrl
          )}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend rechazó el mail de confirmación:', error);
      return Response.json({ error: 'No se pudo enviar el mail.' }, { status: 502 });
    }

    consume(rateKey, WINDOW_MS);
    return Response.json({ ok: true, message: copy.ok });
  } catch (error) {
    console.error('Error en la suscripción:', error);
    return Response.json({ error: 'No se pudo procesar la suscripción.' }, { status: 500 });
  }
}
