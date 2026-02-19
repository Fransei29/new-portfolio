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
          src="/Logo.svg"
          alt="Logo"
          width={55}
          height={55}
          className={styles.logo}
        />
    </div>
  )
}
