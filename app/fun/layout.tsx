// app/fun/layout.tsx
// Layout raíz propio: fun mode no tiene rutas por idioma (cambia de idioma en
// el lugar) ni hereda el header y el footer del sitio.
import type { ReactNode } from 'react';
import RootDocument, { rootMetadata } from '../../components/Shell/RootDocument';

export const metadata = rootMetadata;

export default function FunLayout({ children }: { children: ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
