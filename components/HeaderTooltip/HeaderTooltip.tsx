// components/HeaderTooltip/HeaderTooltip.tsx
// Tooltip chico para los botones de ícono del header (idioma, tema, modo fun):
// sin texto visible, un ícono solo no siempre se entiende.
//
// Es sólo CSS (sin estado ni portal): aparece al pasar el mouse o al llegar con
// Tab, y no aparece en pantallas táctiles, donde un "hover" quedaría pegado
// después del toque. El nombre accesible sigue siendo el aria-label del botón.

import type { ReactNode } from 'react';
import styles from './HeaderTooltip.module.scss';

interface HeaderTooltipProps {
  label: string;
  children: ReactNode;
  /** Clase extra para el envoltorio (por ejemplo, para ocultarlo entero). */
  className?: string;
}

export default function HeaderTooltip({ label, children, className }: HeaderTooltipProps) {
  return (
    <span className={`${styles.wrap} ${className ?? ''}`}>
      {children}
      <span className={styles.tip} aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
