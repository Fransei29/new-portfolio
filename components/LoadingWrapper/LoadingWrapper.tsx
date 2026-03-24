'use client'

import { useState } from 'react'
import IntroOverlay from '../IntroOverlay/IntroOverlay'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleIntroComplete = () => {
    setShowOverlay(false)
    setTimeout(() => setShowContent(true), 60)
  }

  return (
    <>
      {showOverlay && <IntroOverlay onComplete={handleIntroComplete} />}
      {showContent && (
        <div style={{ animation: 'contentFadeIn 0.5s ease both' }}>
          {children}
        </div>
      )}
      <style>{`
        @keyframes contentFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  )
}
