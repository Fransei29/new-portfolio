'use client'

import { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinnerComponent'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false)
    }, 10) // subí a 1000ms para que el spinner dure un poco más

    // Mostrar contenido con fade-in un poco después del loading
    const showContentTimeout = setTimeout(() => {
      setShowContent(true)
    }, 1100) // 100ms después del spinner

    return () => {
      clearTimeout(loadingTimeout)
      clearTimeout(showContentTimeout)
    }
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      {children}
    </div>
  )
}
