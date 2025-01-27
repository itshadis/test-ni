/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { BASE_URL } from "../../../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { getPromos } from "../../../store/slices/featSlice"

const Promo = ({ token }) => {
  const dispatch = useDispatch()
  const promoBanner = useSelector((state) => state.feat.promos)
  
  useEffect(() => {
    const getPromoBanner = async () => {
      try {
        if (promoBanner) return
        const response = await fetch(`${BASE_URL}/banner`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        dispatch(getPromos(data.data))
      } catch (error) {
        console.log('error', error)
      }
    }

    getPromoBanner()
  }, [])

  return (
    <div className="mt-10">
      <p className="text-lg font-bold text-gray-600 mb-5">Temukan promo menarik</p>
      <div className="flex gap-5 overflow-auto">
        {
          promoBanner?.map((item, index) => (
            <img key={index} className="" src={item.banner_image} alt={item.banner_image} />
          ))
        }
      </div>
    </div>
  )
}

export default Promo