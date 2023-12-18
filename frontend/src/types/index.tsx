type SignInCredentials = {
  email: string
  password: string
}

type SignUpCredentials = {
  name: string
  email: string
  password: string
}

type NewProduct = {
  name: string
  price: string
  description: string
  imageAvatar: File | null
  avatarUrl: string
}
