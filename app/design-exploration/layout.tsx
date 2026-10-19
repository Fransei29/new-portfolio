// app/design-exploration/layout.tsx
// Layout raíz propio: no hereda header, footer ni overlays del sitio.
// Cada opción trae su propia cabecera y su propio pie.
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ExplorationBar from './_shared/ExplorationBar';
import NeutralTheme from './_shared/NeutralTheme';
import './_shared/exploration.css';
import RootDocument, { rootMetadata } from '../../components/Shell/RootDocument';

export const metadata: Metadata = {
  ...rootMetadata,
  title: 'Exploración de diseño | Franco Seiler',
  // Es material de trabajo: no se indexa aunque llegue a producción.
  robots: { index: false, follow: false },
};

export default function DesignExplorationLayout({ children }: { children: ReactNode }) {
  return (
    <RootDocument lang="en">
      <NeutralTheme />
      {children}
      <ExplorationBar />
    </RootDocument>
  );
}
