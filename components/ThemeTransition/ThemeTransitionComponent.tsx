'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import styles from './ThemeTransition.module.scss'

export default function ThemeTransitionOverlay() {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timeout = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(timeout)
  }, [theme])

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
    />
  )
}
