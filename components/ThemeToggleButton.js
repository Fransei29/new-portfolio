'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';  // Usamos el hook de next-themes

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();  // Obtenemos el tema actual y la función para cambiarlo
  const [isMounted, setIsMounted] = useState(false);

  // Solo después de que el componente esté montado, cambiar el tema
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Devuelve un fallback o un componente vacío mientras se hidrata
    return null;
  }

  const toggleTheme = () => {
    // Cambia entre los temas
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className={`theme-toggle-button ${theme === 'dark' ? 'dark' : ''}`}>
      {theme === 'light' ? (
        <Image
          src="/icons/sun.png" // Ruta de la imagen del sol
          alt="Modo Claro"
          width={28}
          height={28}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
          width="24px"
          height="24px"
        >
          <path d="M21.64 13A9 9 0 1111 2.36 7 7 0 0021.64 13z" />
        </svg>
      )}
    </button>
  );
}
