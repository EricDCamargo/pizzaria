type ItemProps = {
  id: string
  name: string
}

interface CategoryProps {
  categoryList: ItemProps[]
}

type NewProduct = {
  name: string
  price: string
  description: string
  imageAvatar: File | null
  avatarUrl: string
}
