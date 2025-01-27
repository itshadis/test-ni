import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import ProtectedRoute from "./pages/protected-route"
import { Spin } from "antd"

const Auth = lazy(() => import("./pages/auth"))
const Home = lazy(() => import("./pages/home"))
const TopUp = lazy(() => import("./pages/top-up"))
const Transaction = lazy(() => import("./pages/transaction"))
const Profile = lazy(() => import("./pages/profile"))
const Pembayaran = lazy(() => import("./pages/pembayaran"))

export default function App() {
  return (
    <Suspense 
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <Spin className="custom-spin" size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/top-up" element={<TopUp />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/pembayaran/:jenisPembayaran" element={<Pembayaran />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
