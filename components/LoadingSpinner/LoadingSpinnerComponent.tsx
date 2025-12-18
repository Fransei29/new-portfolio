// components/LoadingSpinner.tsx
import styles from './LoadingSpinner.module.scss' 
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
      <Image
          src="/dev3.png"
          alt="Logo"
          width={50}
          height={50}
          className={styles.logo}
        />
    </div>
  )
}
