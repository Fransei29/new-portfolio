// components/LoadingSpinner.tsx
import styles from './LoadingSpinner.module.scss'
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <Image
          src="/panda-loader.webp"
          alt="Cargando"
          width={96}
          height={96}
          className={styles.panda}
          unoptimized
          priority
        />
    </div>
  )
}
