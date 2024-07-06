import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  loadingAuth: boolean
  loading: boolean
  signIn(credentials: SignInProps): Promise<void>
  signOut(): Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
  token: string
}

type AuthProviderProps = {
  children: React.ReactNode
}

type SignInProps = {
  email: string
  password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  })

  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)
  const isAuthenticated = !!user.name

  useEffect(() => {
    async function getUser() {
      //Retrieve Saved User Data
      const userSession = await AsyncStorage.getItem('@userSession')
      let hasUser: UserProps = JSON.parse(userSession || `{}`)

      //Verify user data
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
        setUser(hasUser)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true)

    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const data = { ...response.data }

      const { id, name, token } = response.data

      await AsyncStorage.setItem('@userSession', JSON.stringify(data))

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({ id, name, email, token })

      setLoadingAuth(false)
    } catch (err) {
      console.log('Erro ao acessar', err)
      setLoadingAuth(false)
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({ id: '', name: '', email: '', token: '' })
    })
  }
  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, isAuthenticated, loading, loadingAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}
