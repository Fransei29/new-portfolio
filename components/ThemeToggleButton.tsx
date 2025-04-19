'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';  // Usamos el hook de next-themes

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();  // Obtenemos el tema actual y la función para cambiarlo
  const [isMounted, setIsMounted] = useState(false);  // Estado para saber si el componente ya está montado

  // Solo después de que el componente esté montado, cambiar el tema
  useEffect(() => {
    setIsMounted(true);  // Se asegura que el código se ejecute solo en el cliente
  }, []);

  // Asegúrate de que no se renderice nada hasta que el componente esté montado
  if (!isMounted) {
    return null;  // No renderizamos nada hasta que se haya montado completamente
  }

  const toggleTheme = () => {
    // Cambia entre los temas
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className={`theme-toggle-button ${theme === 'dark' ? 'dark' : ''}`}>
      {theme === 'light' ? (
        <Image
          src="/moon.png" // Ruta de la imagen de la luna
          alt="Modo Claro"
          width={28}
          height={28}
        />
      ) : (
        <Image
          src="/sun.svg" // Ruta de la imagen del sol
          alt="Modo Oscuro"
          width={28}
          height={28}
        />
      )}
    </button>
  );
}
