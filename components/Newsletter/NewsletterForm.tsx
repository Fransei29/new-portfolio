'use client';

// components/Newsletter/NewsletterForm.tsx

import { useState, type FormEvent } from 'react';
import styles from './NewsletterForm.module.scss';

const COPY = {
  es: {
    heading: 'Recibí los artículos por mail',
    body: 'Un mail cuando publico algo nuevo. Sin spam, sin promociones, y te das de baja en un clic.',
    placeholder: 'tu@email.com',
    submit: 'Suscribirme',
    sending: 'Enviando…',
    invalid: 'Revisá que el email esté bien escrito.',
    generic: 'No pudimos procesar la suscripción. Probá de nuevo en un rato.',
    rateLimited: 'Demasiados intentos. Esperá un momento antes de reintentar.',
  },
  en: {
    heading: 'Get new articles by email',
    body: 'One email when I publish something new. No spam, no promotions, unsubscribe in one click.',
    placeholder: 'you@email.com',
    submit: 'Subscribe',
    sending: 'Sending…',
    invalid: 'Please check that the email is spelled correctly.',
    generic: "We couldn't process your subscription. Please try again shortly.",
    rateLimited: 'Too many attempts. Please wait a moment before retrying.',
  },
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Props {
  language: 'es' | 'en';
  variant?: 'panel' | 'inline';
}

export default function NewsletterForm({ language, variant = 'panel' }: Props) {
  const copy = COPY[language];
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language, website }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus('success');
        setMessage(data.message ?? '');
        setEmail('');
        return;
      }

      setStatus('error');
      if (response.status === 429) setMessage(copy.rateLimited);
      else if (response.status === 400) setMessage(copy.invalid);
      else setMessage(copy.generic);
    } catch {
      setStatus('error');
      setMessage(copy.generic);
    }
  };

  return (
    <section className={`${styles.wrap} ${variant === 'inline' ? styles.inline : ''}`}>
      <div className={styles.text}>
        <h2 className={styles.heading}>{copy.heading}</h2>
        <p className={styles.body}>{copy.body}</p>
      </div>

      {status === 'success' ? (
        // role="status" para que los lectores de pantalla anuncien el resultado.
        <p className={styles.success} role="status">
          {message}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Honeypot: oculto visualmente y para lectores de pantalla, pero los
              bots que completan todos los campos caen igual. */}
          <div className={styles.honeypot} aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <label htmlFor="newsletter-email" className={styles.srOnly}>
            {copy.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={copy.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
            disabled={status === 'sending'}
            aria-invalid={status === 'error'}
          />
          <button type="submit" className={styles.button} disabled={status === 'sending'}>
            {status === 'sending' ? copy.sending : copy.submit}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className={styles.error} role="alert">
          {message}
        </p>
      )}
    </section>
  );
}
