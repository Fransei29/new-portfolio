import { NextResponse } from 'next/server';
import { tutorials } from '../../../lib/tutorialCards';

/**
 * La lista se movió a lib/tutorialCards.ts para poder renderizarla en el
 * servidor. La respuesta de esta ruta no cambia.
 */
export async function GET() {
  return NextResponse.json(tutorials);
}
