import Head from 'next/head'
import styles from './styles.module.scss'
import { canSSRAuth } from '@/src/utils/canSSRAuth'
import { Header } from '@/src/components/Header'
import { FiUpload } from 'react-icons/fi'
import { ChangeEvent, FormEvent, useState } from 'react'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'

const newProduct: NewProduct = {
  name: '',
  description: '',
  price: '',
  avatarUrl: '',
  imageAvatar: null
}

export default function Product({ categoryList }: CategoryProps) {
  const [product, setProduct] = useState<NewProduct>(newProduct)

  const [categories, setCategories] = useState(categoryList || [])
  const [selectedCategory, setSelectedCategory] = useState(0)

  const { name, price, description, imageAvatar, avatarUrl } = product

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setProduct({
        ...product,
        ['imageAvatar']: image,
        ['avatarUrl']: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  function handleChangeCategory(event: any) {
    setSelectedCategory(event.target.value)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault()
    try {
      const data = new FormData()

      if (!name || !price || !description || imageAvatar === null) {
        toast.error('Preencha todos os campos!')
        return
      }
      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', categories[selectedCategory].id)
      data.append('file', imageAvatar)

      const apiClient = setupAPIClient()

      await apiClient.post('/product', data)

      toast.success('Cadastrado com sucesso!')
    } catch (err) {
      toast.error('Erro ao cadastrar')
      console.log(err)
    }
    setProduct(newProduct)
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

          <form className={styles.form} onSubmit={handleRegister}>
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

            <select value={selectedCategory} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              name="name"
              onChange={e => handleChange(e)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Preço do produto"
              value={price}
              name="price"
              onChange={e => handleChange(e)}
            />
            <textarea
              className={styles.input}
              placeholder="Descreva seu produto"
              value={description}
              name="description"
              onChange={e => handleChange(e)}
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
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/category')

  return {
    props: {
      categoryList: response.data
    }
  }
})
