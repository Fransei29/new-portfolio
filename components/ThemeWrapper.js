// components/ThemeWrapper.js
'use client';

import { ThemeProvider } from 'next-themes';  // Importa el ThemeProvider de next-themes

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
