/**
 * El proyecto no tiene @types/react-dom instalado: se declara sólo lo que se usa
 * (createPortal, en components/SystemHero). Si se instala el paquete de tipos,
 * este archivo se borra.
 */
declare module 'react-dom' {
  import type { ReactNode, ReactPortal } from 'react';
  export function createPortal(children: ReactNode, container: Element | DocumentFragment, key?: string | null): ReactPortal;
}
