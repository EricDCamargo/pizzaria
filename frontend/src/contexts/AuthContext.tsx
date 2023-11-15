import { createContext, ReactNode, useState } from 'react'

type AuthContextData = {
  user?: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
}

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthConext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  async function signIn() {
    alert('signing in...')
  }

  return (
    <AuthConext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthConext.Provider>
  )
}
