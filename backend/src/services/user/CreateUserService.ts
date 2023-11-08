interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserServices {
  async execute({ name, email, password }: UserRequest) {
    console.log(name)
    return { ok: true }
  }
}

export { CreateUserServices }
