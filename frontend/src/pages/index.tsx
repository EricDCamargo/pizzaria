import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import logoImg from '../../public/logo.svg'
import Image from 'next/image'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import Link from 'next/link'
import { AuthConext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

export default function Home() {
  const { signIn } = useContext(AuthConext)
  const [loading, setLoading] = useState(false)

  //-//
  const [userData, setUserData] = useState<SignInCredentials>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  //-//

  async function handleLogin(event: FormEvent) {
    const { email, password } = userData
    event.preventDefault()
    if (!email || !password) {
      toast.warning('Preencha todos os campos!')
      return
    }
    setLoading(true)
    await signIn(userData)
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça o login</title>
      </Head>
      <div className={styles.conteinerCenter}>
        <Image src={logoImg} alt="Logo Sueito Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              name="email"
              value={userData.email}
              onChange={e => handleChange(e)}
            />
            <Input
              placeholder="Sua Senha"
              type="password"
              name="password"
              value={userData.password}
              onChange={e => handleChange(e)}
            />
            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href="/signup">
            <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
          </Link>
        </div>
      </div>
    </>
  )
}
