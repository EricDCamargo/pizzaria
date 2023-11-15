import Link from 'next/link'
import styles from './styles.module.scss'
import { FiLogOut } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthConext } from '@/src/contexts/AuthContext'

export function Header() {
  const { signOut } = useContext(AuthConext)

  return (
    <header className={styles.headerConteiner}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img src="/logo.svg" width={190} height={90} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">
            <p>Categoria</p>
          </Link>
          <Link href="/product">
            <p>Cardapio</p>
          </Link>
          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
