'use client';

import Script from 'next/script';
import styles from './CalendlyWidget.module.scss';

interface CalendlyWidgetProps {
  url: string;
  minWidth?: number;
  height?: number;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ 
  url, 
  minWidth = 320, 
  height = 700 
}) => {
  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div 
        className={`calendly-inline-widget ${styles.calendlyWidget}`}
        data-url={url}
        style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
      />
    </>
  );
};

export default CalendlyWidget;

