import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

function Routes() {
  const isAutenticated = false
  const loading = false
  return isAutenticated ? <AppRoutes /> : <AuthRoutes />
}
export default Routes
