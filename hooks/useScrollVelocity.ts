import { useMotionValueEvent, useScroll, useVelocity } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  useMotionValueEvent(velocity, 'change', (latest) => {
    if (latest < 0) {
      setDirection('up')
    } else if (latest > 0) {
      setDirection('down')
    }
  })

  return { velocity, direction }
}
