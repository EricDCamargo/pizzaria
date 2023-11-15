import Head from 'next/head'
import styles from '../../../styles/Home.module.scss'
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { Input } from '@/src/components/ui/Input'
import { useState, ChangeEvent, FormEvent, useContext } from 'react'
import { AuthConext } from '@/src/contexts/AuthContext'
import { toast } from 'react-toastify'

export default function SignUp() {
  const { signUp } = useContext(AuthConext)

  const [loading, setLoading] = useState(false)

  //-//
  const [userData, setUserData] = useState<SignUpCredentials>({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  //-//

  async function handleSignUp(event: FormEvent) {
    const { name, email, password } = userData
    event.preventDefault()
    if (!name || !email || !password) {
      toast.warning('Preencha todos os campos!')
      return
    }
    setLoading(true)
    await signUp(userData)
    setLoading(false)
  }
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.conteinerCenter}>
        <Image src={logoImg} alt="Logo Sueito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              name="name"
              value={userData.name}
              onChange={e => handleChange(e)}
            />
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
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <p className={styles.text}>Já possui uma conta? Faça login!</p>
          </Link>
        </div>
      </div>
    </>
  )
}
