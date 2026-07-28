// app/api/newsletter/unsubscribe/route.ts
// Baja en un clic. Es un requisito legal (CAN-SPAM, GDPR) y además Gmail y Yahoo
// exigen List-Unsubscribe para remitentes de volumen: sin esto, los envíos van a
// spam. Nunca debe pedir login ni pasos extra.
//
// Acepta GET (clic desde el mail) y POST (List-Unsubscribe-Post, que algunos
// clientes disparan automáticamente sin abrir el navegador).

import { AUDIENCE_ID, getResend } from '../../../../lib/email';
import { verifyToken } from '../../../../lib/newsletter-token';

export const runtime = 'nodejs';

/**
 * Se distingue 'invalid' (token mal firmado o vencido) de 'error' (el token era
 * bueno pero falló Resend). Si a alguien le mostramos "enlace inválido" cuando
 * en realidad se cayó el proveedor, va a creer que no puede darse de baja y va a
 * marcar el mail como spam — que es exactamente lo que hay que evitar.
 */
type UnsubResult = 'unsubscribed' | 'invalid' | 'error';

async function removeContact(token: string): Promise<UnsubResult> {
  const verified = verifyToken(token, 'unsubscribe');
  if (!verified) return 'invalid';

  if (!AUDIENCE_ID) {
    console.error('RESEND_AUDIENCE_ID no está definida — no se puede dar de baja');
    return 'error';
  }

  try {
    // Se marca como unsubscribed en vez de borrar: conserva el registro de que
    // esta dirección pidió no recibir más, así una resuscripción accidental no
    // la vuelve a incluir en silencio.
    const { error } = await getResend().contacts.update({
      email: verified.email,
      audienceId: AUDIENCE_ID,
      unsubscribed: true,
    });

    if (error) {
      console.error('Resend rechazó la baja:', error);
      return 'error';
    }
    return 'unsubscribed';
  } catch (error) {
    console.error('Error dando de baja:', error);
    return 'error';
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? '';
  const language = url.searchParams.get('lang') ?? 'en';

  const result = await removeContact(token);

  const target = new URL(`/newsletter/${result}`, url.origin);
  if (language === 'es') target.searchParams.set('lang', 'es');
  return Response.redirect(target, 302);
}

/** One-Click Unsubscribe (RFC 8058). El cliente de correo espera 200, no un redirect. */
export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token') ?? '';
  const result = await removeContact(token);

  // 400 si el token es inválido; 502 si falló Resend, para que el cliente de
  // correo pueda reintentar en vez de descartar la baja como malformada.
  if (result === 'unsubscribed') return new Response(null, { status: 200 });
  return new Response(null, { status: result === 'invalid' ? 400 : 502 });
}
