import Head from 'next/head'
import styles from '../../../styles/Home.module.scss'
import logoImg from '../../../public/logo.svg'

import Image from 'next/image'

import Link from 'next/link'
import { Button } from '@/src/components/ui/Button'
import { Input } from '@/src/components/ui/Input'

export default function Home() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className={styles.conteinerCenter}>
        <Image src={logoImg} alt="Logo Sueito Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />
            <Input placeholder="Digite seu email" type="text" />
            <Input placeholder="Sua Senha" type="password" />
            <Button type="submit" loading={true}>
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
