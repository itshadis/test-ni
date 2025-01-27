import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../../components/Header"

const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth)

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default ProtectedRoute