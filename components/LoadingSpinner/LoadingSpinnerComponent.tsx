// components/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react' // o cualquier otro ícono
import styles from './LoadingSpinner.module.scss' 

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingOverlay}>
      <Loader2 className={styles.spinner} />
    </div>
  )
}
