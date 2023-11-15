import { FormEvent, useContext } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import logoImg from '../../public/logo.svg'

import Image from 'next/image'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import Link from 'next/link'

import { AuthConext } from '../contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthConext)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    let data = {
      email: 'email@teste.com',
      password: '12345'
    }

    await signIn(data)
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
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Sua Senha" type="password" />
            <Button type="submit" loading={false}>
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
