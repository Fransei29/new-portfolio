// app/(site)/layout.tsx
// Cromo del sitio: header, footer y overlays. Vive en el route group para que
// las rutas de fuera (design-exploration) rendericen sin él. Las URLs no cambian.
import type { ReactNode } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop';
import ThemeTransitionOverlay from '../../components/ThemeTransition/ThemeTransitionComponent';
import NavigationLoader from '../../components/NavigationLoader/NavigationLoader';
// Oculto temporalmente: se retoma cuando mejoremos el asistente.
// import ChatWidget from '../../components/ChatWidget/ChatWidget';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div id="banner"></div>
      {children}
      <Footer />
      <ThemeTransitionOverlay />
      <NavigationLoader />
      <ScrollToTop />
      {/* <ChatWidget /> */}
    </>
  );
}
