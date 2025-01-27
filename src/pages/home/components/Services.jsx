/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../../store/slices/featSlice" // Pastikan ini di-import dengan benar

const Services = ({ token }) => {
  const dispatch = useDispatch()
  const services = useSelector((state) => state.feat.services) // Ambil hanya services dari state.feat

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (services) return
        const response = await fetch(`${BASE_URL}/services`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        dispatch(getServices(data.data)) // Dispatch action Redux
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  return (
    <div className="flex justify-between mt-10">
      {services?.map((item, index) => (
        <div key={index} className="w-[70px] flex flex-col gap-2">
          <Link
            to={`/pembayaran/${item.service_code}`}
            state={{ service: item }}
          >
            <img
              className="cursor-pointer"
              src={item.service_icon}
              alt={item.service_name}
            />
          </Link>
          <span className="text-xs text-center">{item.service_name}</span>
        </div>
      ))}
    </div>
  )
}

export default Services
