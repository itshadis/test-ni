import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/constant"
import { formatIDRCurrency } from "../utils/function"
import photoProfile from "../assets/image/photo_profile.png"
import bgSaldo  from "../assets/image/bg_saldo.png"

const Hero = () => {
  const { user, token } = useSelector((state) => state.auth)
  const [balance, setBalance] = useState(0)
  const [visibleSaldo, setVisibleSaldo] = useState(false)

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch(`${BASE_URL}/balance`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        if (data && data.data !== undefined) {
          const formatRupiah = formatIDRCurrency(data.data.balance)
          setBalance(formatRupiah)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getBalance()
  }, [token])

  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-between">
        <img className="w-20" src={user?.profile_image || photoProfile} alt="photo-profile" />

        <>
          <p className="text-xl">Selamat Datang,</p>
          <p className="text-3xl font-semibold">{`${user?.first_name} ${user?.last_name}`}</p>
        </>
      </div>

      <div className="relative">
        <img className="" src={bgSaldo} alt="bg-saldo" />

        <div className="absolute inset-0 z-10 text-white flex flex-col justify-between pl-5 py-7">
          <p>Saldo anda</p>
          <p className="text-3xl font-semibold">
            <span>Rp </span><span>{visibleSaldo ? balance : "********"}</span>
          </p>
          <p className="text-sm cursor-pointer" onClick={() => setVisibleSaldo(!visibleSaldo)}>Lihat Saldo</p>
        </div>
      </div>
    </div>
  )
}

export default Hero