import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type AuthContextData = {
  user?: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signOut: () => void
}

type UserProps = {
  id: string
  name: string
  email: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthConext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('Error while logging out.')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then(response => {
          const { id, name, email } = response.data

          setUser({ id, name, email })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })
      const { id, name, token } = response.data
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expires in 30 days
        path: '/'
      })
      setUser({ id, name, email })
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Logado com sucesso!')
      Router.push('/dashboard')
    } catch (err) {
      toast.error('Erro ao acesar!')

      console.log('Erro ao logar!', err)
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      const response = await api.post('/users', { name, email, password })
      toast.success('Cadastrado com sucesso!')
      Router.push('/')
    } catch (err) {
      toast.error('Erro ao cadastrar!')
      console.log('Erro ao cadastrar', err)
    }
  }

  return (
    <AuthConext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthConext.Provider>
  )
}
