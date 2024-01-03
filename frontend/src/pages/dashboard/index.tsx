import { canSSRAuth } from '@/src/utils/canSSRAuth'
import Head from 'next/head'
import { Header } from '@/src/components/Header'
import styles from './styles.module.scss'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '@/src/services/api'
import { useState } from 'react'
import Modal from 'react-modal'
import { ModalOrder } from '@/src/components/ModalOrder'

export default function DashBoard({ orderList }: HomeProps) {
  const [orders, setOrders] = useState<HomeProps['orderList']>(orderList || [])

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisibility] = useState(false)

  function handleCloseModalView() {
    setModalVisibility(false)
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient()

    const response = await apiClient.get('/order/detail', {
      params: {
        order_id: id
      }
    })

    setModalItem(response.data)
    setModalVisibility(true)
  }

  Modal.setAppElement('#__next')
  return (
    <>
      <Head>
        <title>Painer - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="3fffa3"></FiRefreshCcw>
            </button>
          </div>

          <article className={styles.listOrders}>
            {orders.map((item, index) => {
              return (
                <section key={item.id} className={styles.orderItem}>
                  <button onClick={() => handleOpenModalView(item.id)}>
                    <div className={styles.tag}></div>
                    <span>Mesa {item.table}</span>
                  </button>
                </section>
              )
            })}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModalView}
            order={modalItem!}
          />
        )}
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/orders')
  console.log(response.data)

  return { props: { orderList: response.data } }
})
