'use client'

import { useEffect, useRef, useState } from 'react'
import IntroOverlay from '../IntroOverlay/IntroOverlay'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)
  const showContentTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (showContentTimerRef.current !== null) window.clearTimeout(showContentTimerRef.current)
    }
  }, [])

  const handleIntroComplete = () => {
    setShowOverlay(false)
    // El contenido arranca DESPUÉS de que termina el overlay (pero sin “hueco” perceptible).
    if (showContentTimerRef.current !== null) {
      window.clearTimeout(showContentTimerRef.current)
      showContentTimerRef.current = null
    }
    // Mostrar inmediatamente al desmontar el overlay evita el “gap” visual.
    setShowContent(true)
  }

  return (
    <>
      {showOverlay && (
        <IntroOverlay
          onComplete={handleIntroComplete}
        />
      )}

      {showContent && (
        <div
          style={!animationDone ? {
            animation: `contentFadeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both`,
          } : undefined}
          onAnimationEnd={() => setAnimationDone(true)}
        >
          {children}
        </div>
      )}
      <style>{`
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
