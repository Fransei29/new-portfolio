// app/global-not-found.tsx
// El 404 del sitio, para rutas inexistentes y para los notFound() de las
// páginas (un case study o un post que no existe). Es un documento completo
// porque no hereda ningún layout: por eso arma el suyo con RootDocument y el
// mismo header y footer del sitio.
import type { Metadata } from 'next';
import RootDocument, { rootMetadata } from '../components/Shell/RootDocument';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NotFoundView from '../components/NotFound/NotFoundView';

export const metadata: Metadata = {
  ...rootMetadata,
  title: 'Page not found | Franco Seiler',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  // El idioma lo resuelve NotFoundView desde la URL (/es/...): acá no hay params.
  return (
    <RootDocument lang="en" routed>
      <Header />
      <NotFoundView />
      <Footer />
    </RootDocument>
  );
}
