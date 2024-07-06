import { ActivityIndicator, View } from 'react-native'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

function Routes() {
  const isAutenticated = false
  const loading = false

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

  return isAutenticated ? <AppRoutes /> : <AuthRoutes />
}
export default Routes
