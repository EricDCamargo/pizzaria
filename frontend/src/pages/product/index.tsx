import Head from 'next/head'
import styles from './styles.module.scss'
import { canSSRAuth } from '@/src/utils/canSSRAuth'
import { Header } from '@/src/components/Header'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, useState } from 'react'

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [imageAvatar, setImageAvatar] = useState<null | File>(null)

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.conteiner}>
          <h1>Novo Produto</h1>

          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload color="#fff" size={30} />
              </span>
              <input
                type="file"
                accept="image.pnj, image.jpeg"
                onChange={handleFile}
              />
              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select>
              <option>Bebida</option>
              <option>Pizzas</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
              value={''}
              onChange={e => null}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Preço do produto"
              value={''}
              onChange={e => null}
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto"
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
export const getServerSideProps = canSSRAuth(async ctx => {
  return { props: {} }
})
