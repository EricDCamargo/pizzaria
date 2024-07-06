import { ActivityIndicator, View } from 'react-native'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1D1D2E',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size={60} color="#F5F7FB" />
      </View>
    )
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />
}
export default Routes
