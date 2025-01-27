import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailUser } from "../../store/slices/authSlice"
import { BASE_URL } from "../../utils/constant"
import Hero from "../../components/Hero"
import Services from "./components/Services"
import Promo from "./components/Promo"
import { Skeleton } from "antd"

const Home = () => {
  const { token, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        if(user) return
        const response = await fetch(`${BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json()
        dispatch(detailUser(data.data))
      } catch (error) {
        console.log(error)
      }
    }

    getDetailUser()
  }, [token, dispatch, user])

  return (
    <section className="w-4/5 mx-auto mt-10">
      {
        !user ? (
          <Skeleton 
            avatar
            active={!!user}
            paragraph={{ rows: 6 }}
          />
        ) : (
          <>
            <Hero />
            <Services token={token} />
            <Promo token={token} />
          </>
        )
      }
    </section>
  )
}

export default Home