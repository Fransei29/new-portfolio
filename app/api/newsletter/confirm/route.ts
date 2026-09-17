// app/api/newsletter/confirm/route.ts
// Paso 2 del double opt-in: valida el token firmado y da de alta en la audiencia
// de Resend. Es GET porque se llega desde un clic en el mail.

import { AUDIENCE_ID, getResend } from '../../../../lib/email';
import { verifyToken } from '../../../../lib/newsletter-token';

export const runtime = 'nodejs';

/** Redirige a la página de estado en vez de devolver JSON: al usuario le llega por navegador. */
const redirectTo = (request: Request, status: string, language: string) => {
  const url = new URL(`/newsletter/${status}`, new URL(request.url).origin);
  if (language === 'es') url.searchParams.set('lang', 'es');
  return Response.redirect(url, 302);
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? '';
  const language = url.searchParams.get('lang') ?? 'en';

  const verified = verifyToken(token, 'confirm');
  if (!verified) {
    return redirectTo(request, 'invalid', language);
  }

  if (!AUDIENCE_ID) {
    console.error('RESEND_AUDIENCE_ID no está definida — no se puede confirmar');
    return redirectTo(request, 'error', language);
  }

  try {
    const { error } = await getResend().contacts.create({
      email: verified.email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    // Un contacto ya existente no es un fallo: el usuario reconfirmó, y para él
    // el resultado es el mismo.
    if (error && !/already exists/i.test(error.message ?? '')) {
      console.error('Resend rechazó el alta del contacto:', error);
      return redirectTo(request, 'error', language);
    }

    return redirectTo(request, 'confirmed', language);
  } catch (error) {
    console.error('Error confirmando la suscripción:', error);
    return redirectTo(request, 'error', language);
  }
}
