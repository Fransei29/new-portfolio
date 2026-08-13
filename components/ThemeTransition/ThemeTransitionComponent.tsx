'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

/** Debe coincidir con la duración de `html.theme-switching *` en globals.css. */
const SWITCH_MS = 280

/**
 * No pinta nada: sólo marca <html> mientras dura el cambio de tema.
 *
 * Antes esto montaba un overlay fijo a pantalla completa durante 500ms, pero
 * sus clases .dark/.light nunca existieron en el SCSS, así que tapaba el
 * viewport sin llegar a verse. Lo que sí se sentía era el `* { transition }`
 * global de 0.4s; ahora esa transición vive detrás de esta clase y sólo corre
 * durante el swap.
 */
export default function ThemeTransitionOverlay() {
  const { resolvedTheme } = useTheme()
  // El primer render (y la hidratación) no son un cambio de tema: sin esto,
  // la página arranca animando desde el tema equivocado.
  const previous = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!resolvedTheme) return

    if (previous.current === undefined || previous.current === resolvedTheme) {
      previous.current = resolvedTheme
      return
    }
    previous.current = resolvedTheme

    const root = document.documentElement
    root.classList.add('theme-switching')
    const timeout = window.setTimeout(
      () => root.classList.remove('theme-switching'),
      SWITCH_MS,
    )

    return () => {
      window.clearTimeout(timeout)
      // Si el usuario vuelve a togglear antes de que termine, el timeout viejo
      // se cancela pero la clase tiene que quedar puesta para el swap nuevo.
    }
  }, [resolvedTheme])

  return null
}
