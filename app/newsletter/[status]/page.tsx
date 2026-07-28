// app/newsletter/[status]/page.tsx
// Páginas de resultado del flujo de suscripción (confirmado, baja, error).

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ClientLayout from '../../../components/ClientLayout/ClientLayout';
import styles from './status.module.scss';

const STATUSES = ['confirmed', 'unsubscribed', 'invalid', 'error'] as const;
type Status = (typeof STATUSES)[number];

const COPY: Record<Status, Record<'es' | 'en', { title: string; body: string; cta: string }>> = {
  confirmed: {
    es: {
      title: '¡Listo! Ya estás suscrito',
      body: 'Vas a recibir un mail cada vez que publique un artículo nuevo. Sin spam y sin promociones — solo los posts.',
      cta: 'Ir al blog',
    },
    en: {
      title: "You're in",
      body: "You'll get an email whenever I publish a new article. No spam, no promotions — just the posts.",
      cta: 'Go to the blog',
    },
  },
  unsubscribed: {
    es: {
      title: 'Suscripción cancelada',
      body: 'No vas a recibir más mails. Si fue un error, podés volver a suscribirte desde el blog cuando quieras.',
      cta: 'Volver al blog',
    },
    en: {
      title: 'You have been unsubscribed',
      body: "You won't receive any more emails. If this was a mistake, you can subscribe again from the blog anytime.",
      cta: 'Back to the blog',
    },
  },
  invalid: {
    es: {
      title: 'Este enlace no es válido',
      body: 'Puede que haya vencido (los de confirmación duran 48 horas) o que esté incompleto. Probá suscribiéndote de nuevo.',
      cta: 'Ir al blog',
    },
    en: {
      title: 'This link is not valid',
      body: 'It may have expired (confirmation links last 48 hours) or been truncated. Try subscribing again.',
      cta: 'Go to the blog',
    },
  },
  error: {
    es: {
      title: 'Algo salió mal',
      body: 'No pudimos procesar tu pedido. Probá de nuevo en un rato; si sigue fallando, escribime y lo resuelvo a mano.',
      cta: 'Contacto',
    },
    en: {
      title: 'Something went wrong',
      body: "We couldn't process your request. Try again shortly; if it keeps failing, drop me a line and I'll sort it out.",
      cta: 'Contact',
    },
  },
};

interface Props {
  params: Promise<{ status: string }>;
  searchParams: Promise<{ lang?: string }>;
}

// Estas páginas no aportan nada a la búsqueda y no deberían competir con el blog.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export function generateStaticParams() {
  return STATUSES.map((status) => ({ status }));
}

export default async function NewsletterStatusPage({ params, searchParams }: Props) {
  const [{ status }, { lang }] = await Promise.all([params, searchParams]);

  if (!STATUSES.includes(status as Status)) return notFound();

  const language = lang === 'es' ? 'es' : 'en';
  const copy = COPY[status as Status][language];
  const isError = status === 'invalid' || status === 'error';

  const href =
    status === 'error'
      ? '/contact'
      : language === 'es'
      ? '/blog?lang=es'
      : '/blog';

  return (
    <ClientLayout>
      <section className={styles.container}>
        <div className={styles.card}>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG: next/image no lo optimiza */}
          <img
            src="/isotipo-panda.svg"
            alt=""
            aria-hidden
            className={`${styles.mark} ${isError ? styles.markMuted : ''}`}
          />
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.body}>{copy.body}</p>
          <Link href={href} className={styles.cta}>
            {copy.cta}
          </Link>
        </div>
      </section>
    </ClientLayout>
  );
}
