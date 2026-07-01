import { useFooterData } from '../../hooks/useFooterData'
import { FooterContentView, FooterSkeleton } from './FooterContent'
import styles from './Footer.module.css'

export default function Footer() {
  const state = useFooterData()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {state.status === 'loading' ? (
          <FooterSkeleton />
        ) : (
          <FooterContentView content={state.data} />
        )}
      </div>
    </footer>
  )
}
