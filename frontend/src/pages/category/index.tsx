import Head from 'next/head'
import { Header } from '@/src/components/Header'
import styles from './styles.module.scss'
import { FormEvent, useState } from 'react'

import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'

export default function Category() {
  const [categoryName, setCategoryName] = useState<string>('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    if (!categoryName) {
      return
    }

    const apiClient = setupAPIClient()

    await apiClient.post('/category', { name: categoryName })

    toast.success('Categoria cadastrada com sucesso!')
    setCategoryName('')
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.conteiner}>
          <h1>Cadastrar categorias</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              className={styles.input}
              type="text"
              placeholder="Disgite o nome da categoria"
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}
