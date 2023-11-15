import { canSSRAuth } from '@/src/utils/canSSRAuth'

export default function DashBoard() {
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  )
}

export const getServerSideProps = canSSRAuth(async ctx => {
  return { props: {} }
})
