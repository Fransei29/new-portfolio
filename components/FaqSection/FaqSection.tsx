'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import { useLanguage, useLocalePath } from '../../contexts/LanguageContext';
import type { FaqItem } from '../../lib/homeFaq';
import styles from './FaqSection.module.scss';

// Reemplaza a "Por qué trabajar así": en vez de argumentar, responde las dudas
// que frenan la compra. Las preguntas llegan del servidor (ver lib/homeFaq.ts)
// para que el HTML las traiga y coincidan con el JSON-LD de FAQPage.
//
// Acordeón propio y no <details>: <details> abre y cierra de golpe, y acá la
// respuesta tiene que desplegarse suave (grid-template-rows 0fr → 1fr). Las
// respuestas siguen en el HTML aunque estén cerradas, así Google las lee igual.
// Una sola abierta a la vez.
export default function FaqSection({ items }: { items: FaqItem[] }) {
  const { t } = useLanguage();
  const toLocale = useLocalePath();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className={styles.faqSection}>
      <div className={styles.inner}>
        <div className={`${styles.side} piece-l piece-delay-0`}>
          <h2 className={styles.title}>{t('faqSection.title')}</h2>
          <p className={styles.subtitle}>{t('faqSection.subtitle')}</p>

          <div className={styles.ask}>
            <p className={styles.askTitle}>{t('faqSection.askTitle')}</p>
            <p className={styles.askText}>{t('faqSection.askText')}</p>
            <Link href={toLocale('/contact')} className={styles.askButton}>
              {t('faqSection.askButton')}
              <HiArrowRight className={styles.arrow} />
            </Link>
          </div>
        </div>

        <div className={`${styles.list} piece-r piece-delay-1`}>
          {items.map((item, i) => {
            const isOpen = open === i;
            const qId = `${baseId}-q${i}`;
            const aId = `${baseId}-a${i}`;
            return (
              <div key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <h3 className={styles.questionWrap}>
                  <button
                    type="button"
                    id={qId}
                    className={styles.question}
                    aria-expanded={isOpen}
                    aria-controls={aId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className={styles.toggle} aria-hidden>+</span>
                  </button>
                </h3>
                <div id={aId} role="region" aria-labelledby={qId} className={styles.panel}>
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
