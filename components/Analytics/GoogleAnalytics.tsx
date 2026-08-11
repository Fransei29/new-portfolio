import Script from 'next/script';

/**
 * GA4. No se monta si falta NEXT_PUBLIC_GA_ID, así que en local y en los
 * previews de Vercel no se ensucian las métricas con tráfico propio: alcanza
 * con no definir la variable en esos entornos.
 *
 * `afterInteractive` y no `beforeInteractive`: analytics nunca debe competir
 * con el render inicial. Se pierde una fracción de las sesiones que rebotan en
 * el primer segundo, y a cambio no se toca el LCP.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
