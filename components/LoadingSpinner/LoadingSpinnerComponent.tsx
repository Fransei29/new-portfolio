// components/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react' // o cualquier otro ícono
import styles from './LoadingSpinner.module.scss' 
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <Loader2 className={styles.spinner} />
      <Image
          src="/dev3.png"
          alt="Logo"
          width={55}
          height={55}
          className={styles.logo}
        />
    </div>
  )
}
