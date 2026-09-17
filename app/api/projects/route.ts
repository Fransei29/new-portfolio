import { NextResponse } from 'next/server';
import { getProjectCards, type CardLanguage } from '../../../lib/projectCards';

/**
 * La lista ya no vive acá: se movió a lib/projectCards.ts para que la página
 * /projects pueda renderizarla en el servidor. Esta ruta se mantiene con la
 * misma respuesta de siempre.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get('lang') === 'es' ? 'es' : 'en') as CardLanguage;
  return NextResponse.json(getProjectCards(lang));
}
